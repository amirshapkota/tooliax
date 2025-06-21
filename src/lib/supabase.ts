// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Auth helpers
export const auth = {
  signUp: async (email: string, password: string, metadata?: any) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
  },

  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password
    })
  },

  signOut: async () => {
    return await supabase.auth.signOut()
  },

  resetPassword: async (email: string) => {
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
  },

  updatePassword: async (password: string) => {
    return await supabase.auth.updateUser({ password })
  },

  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  getCurrentSession: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  }
}

// Database helpers
export const db = {
  // Users
  getUser: async (id: string) => {
    return await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
  },

  updateUser: async (id: string, updates: any) => {
    return await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
  },

  // Categories
  getCategories: async () => {
    return await supabase
      .from('categories')
      .select(`
        *,
        subcategories (*)
      `)
      .eq('is_active', true)
      .order('sort_order')
  },

  // AI Tools
  getTools: async (filters?: {
    category_id?: string
    pricing_type?: string
    search?: string
    limit?: number
    offset?: number
  }) => {
    let query = supabase
      .from('ai_tools')
      .select(`
        *,
        categories (name, slug),
        subcategories (name, slug),
        pricing_plans (*),
        users (full_name, company_name)
      `)
      .eq('status', 'approved')

    if (filters?.category_id) {
      query = query.eq('category_id', filters.category_id)
    }

    if (filters?.pricing_type) {
      query = query.eq('pricing_type', filters.pricing_type)
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    return await query
      .order('created_at', { ascending: false })
      .range(filters?.offset || 0, (filters?.offset || 0) + (filters?.limit || 20) - 1)
  },

  getTool: async (slug: string) => {
    return await supabase
      .from('ai_tools')
      .select(`
        *,
        categories (name, slug),
        subcategories (name, slug),
        pricing_plans (*),
        users (full_name, company_name, avatar_url)
      `)
      .eq('slug', slug)
      .eq('status', 'approved')
      .single()
  },

  getFeaturedTools: async (limit = 6) => {
    return await supabase.rpc('get_featured_tools', { p_limit: limit })
  },

  searchTools: async (query: string, filters?: any) => {
    return await supabase.rpc('search_tools', {
      p_query: query,
      p_category_id: filters?.category_id,
      p_pricing_type: filters?.pricing_type,
      p_limit: filters?.limit || 20,
      p_offset: filters?.offset || 0
    })
  },

  // Developer tools management
  getDeveloperTools: async (developerId: string) => {
    return await supabase
      .from('ai_tools')
      .select(`
        *,
        categories (name, slug),
        subcategories (name, slug),
        pricing_plans (*)
      `)
      .eq('developer_id', developerId)
      .order('created_at', { ascending: false })
  },

  createTool: async (toolData: any) => {
    // Create the tool
    const { data: tool, error: toolError } = await supabase
      .from('ai_tools')
      .insert([toolData])
      .select()
      .single()

    if (toolError) throw toolError

    // Create pricing plans if provided
    if (toolData.pricingPlans && toolData.pricingPlans.length > 0) {
      const pricingPlans = toolData.pricingPlans.map((plan: any) => ({
        ...plan,
        tool_id: tool.id
      }))

      const { error: plansError } = await supabase
        .from('pricing_plans')
        .insert(pricingPlans)

      if (plansError) throw plansError
    }

    return { data: tool, error: null }
  },

  updateTool: async (toolId: string, toolData: any) => {
    const { data: tool, error: toolError } = await supabase
      .from('ai_tools')
      .update(toolData)
      .eq('id', toolId)
      .select()
      .single()

    if (toolError) throw toolError

    // Update pricing plans if provided
    if (toolData.pricingPlans) {
      // Delete existing plans
      await supabase
        .from('pricing_plans')
        .delete()
        .eq('tool_id', toolId)

      // Insert new plans
      if (toolData.pricingPlans.length > 0) {
        const pricingPlans = toolData.pricingPlans.map((plan: any) => ({
          ...plan,
          tool_id: toolId
        }))

        const { error: plansError } = await supabase
          .from('pricing_plans')
          .insert(pricingPlans)

        if (plansError) throw plansError
      }
    }

    return { data: tool, error: null }
  },

  // Reviews
  getToolReviews: async (toolId: string) => {
    return await supabase
      .from('reviews')
      .select(`
        *,
        users (full_name, avatar_url)
      `)
      .eq('tool_id', toolId)
      .eq('is_flagged', false)
      .order('created_at', { ascending: false })
  },

  createReview: async (reviewData: any) => {
    return await supabase
      .from('reviews')
      .insert([reviewData])
      .select()
      .single()
  },

  getToolRating: async (toolId: string) => {
    return await supabase.rpc('calculate_tool_rating', { p_tool_id: toolId })
  },

  // Analytics
  trackToolInteraction: async (
    toolId: string, 
    eventType: string, 
    metadata?: any
  ) => {
    return await supabase.rpc('track_tool_interaction', {
      p_tool_id: toolId,
      p_event_type: eventType,
      p_user_ip: metadata?.userIp,
      p_user_agent: metadata?.userAgent,
      p_referrer: metadata?.referrer,
      p_search_query: metadata?.searchQuery
    })
  },

  // Bookmarks
  getUserBookmarks: async (userId: string) => {
    return await supabase
      .from('tool_bookmarks')
      .select(`
        *,
        ai_tools (
          id, name, slug, logo_url, description,
          categories (name)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
  },

  addBookmark: async (userId: string, toolId: string) => {
    return await supabase
      .from('tool_bookmarks')
      .insert([{ user_id: userId, tool_id: toolId }])
      .select()
      .single()
  },

  removeBookmark: async (userId: string, toolId: string) => {
    return await supabase
      .from('tool_bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('tool_id', toolId)
  },

  // Comparisons
  getUserComparisons: async (userId: string) => {
    return await supabase
      .from('tool_comparisons')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
  },

  createComparison: async (comparisonData: any) => {
    return await supabase
      .from('tool_comparisons')
      .insert([comparisonData])
      .select()
      .single()
  },

  // Admin functions
  getPendingTools: async () => {
    return await supabase
      .from('ai_tools')
      .select(`
        *,
        categories (name),
        subcategories (name),
        users (full_name, email, company_name),
        pricing_plans (*)
      `)
      .eq('status', 'pending')
      .order('submission_date', { ascending: true })
  },

  approveTool: async (toolId: string) => {
    return await supabase
      .from('ai_tools')
      .update({ 
        status: 'approved', 
        approval_date: new Date().toISOString() 
      })
      .eq('id', toolId)
      .select()
      .single()
  },

  rejectTool: async (toolId: string, reason: string) => {
    return await supabase
      .from('ai_tools')
      .update({ 
        status: 'rejected', 
        rejection_reason: reason 
      })
      .eq('id', toolId)
      .select()
      .single()
  },

  getFlaggedReviews: async () => {
    return await supabase
      .from('reviews')
      .select(`
        *,
        ai_tools (name),
        users (full_name, email)
      `)
      .eq('is_flagged', true)
      .order('created_at', { ascending: false })
  },

  // Promotional banners
  getActiveBanners: async () => {
    return await supabase
      .from('promotional_banners')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
  },

  createBanner: async (bannerData: any) => {
    return await supabase
      .from('promotional_banners')
      .insert([bannerData])
      .select()
      .single()
  },

  updateBanner: async (bannerId: string, bannerData: any) => {
    return await supabase
      .from('promotional_banners')
      .update(bannerData)
      .eq('id', bannerId)
      .select()
      .single()
  },

  deleteBanner: async (bannerId: string) => {
    return await supabase
      .from('promotional_banners')
      .delete()
      .eq('id', bannerId)
  },

  // Notifications
  getUserNotifications: async (userId: string) => {
    return await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
  },

  markNotificationAsRead: async (notificationId: string) => {
    return await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
  },

  createNotification: async (notificationData: any) => {
    return await supabase
      .from('notifications')
      .insert([notificationData])
      .select()
      .single()
  }
}

// Real-time subscriptions
export const subscriptions = {
  subscribeToToolUpdates: (callback: (payload: any) => void) => {
    return supabase
      .channel('tool-updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'ai_tools' }, 
        callback
      )
      .subscribe()
  },

  subscribeToReviews: (toolId: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`reviews-${toolId}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'reviews',
          filter: `tool_id=eq.${toolId}`
        }, 
        callback
      )
      .subscribe()
  },

  subscribeToNotifications: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`notifications-${userId}`)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        }, 
        callback
      )
      .subscribe()
  }
}

// Utility functions
export const utils = {
  generateSlug: (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  },

  uploadFile: async (file: File, bucket: string, path: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)

    return publicUrl
  },

  getPublicUrl: (bucket: string, path: string) => {
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)

    return publicUrl
  }
}