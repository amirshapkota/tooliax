// src/services/api.ts
import { db, auth, utils } from '@/lib/supabase'
import { Database } from '@/lib/database.types'

type AITool = Database['public']['Tables']['ai_tools']['Row']
type User = Database['public']['Tables']['users']['Row']
type Review = Database['public']['Tables']['reviews']['Row']
type Category = Database['public']['Tables']['categories']['Row']

// Authentication Services
export const authService = {
  signUp: async (email: string, password: string, userData: any) => {
    try {
      const { data, error } = await auth.signUp(email, password, {
        full_name: userData.fullName,
        company_name: userData.companyName,
        role: 'developer'
      })

      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await auth.signIn(email, password)
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  signOut: async () => {
    try {
      const { error } = await auth.signOut()
      
      if (error) throw error

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  getCurrentUser: async () => {
    try {
      const user = await auth.getCurrentUser()
      
      if (user) {
        const { data: profile } = await db.getUser(user.id)
        return { success: true, data: { ...user, profile } }
      }

      return { success: false, data: null }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  updateProfile: async (userId: string, profileData: any) => {
    try {
      const { data, error } = await db.updateUser(userId, profileData)
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}

// Tool Services
export const toolService = {
  submitTool: async (toolData: any) => {
    try {
      const user = await auth.getCurrentUser()
      if (!user) throw new Error('User not authenticated')

      // Generate slug from tool name
      const slug = utils.generateSlug(toolData.name)

      // Process arrays from comma-separated strings
      const processedData = {
        ...toolData,
        slug,
        developer_id: user.id,
        features: toolData.features ? toolData.features.split(',').map((f: string) => f.trim()) : [],
        use_cases: toolData.useCases ? toolData.useCases.split(',').map((u: string) => u.trim()) : [],
        tags: toolData.tags ? toolData.tags.split(',').map((t: string) => t.trim()) : [],
        integrations: toolData.integrations ? toolData.integrations.split(',').map((i: string) => i.trim()) : [],
        supported_languages: toolData.supportedLanguages ? toolData.supportedLanguages.split(',').map((l: string) => l.trim()) : [],
        status: 'pending' as const,
        submission_date: new Date().toISOString()
      }

      const { data, error } = await db.createTool(processedData)
      
      if (error) throw error

      // Create notification for admin
      await db.createNotification({
        user_id: user.id,
        title: 'Tool Submitted Successfully',
        message: `Your tool "${toolData.name}" has been submitted for review.`,
        type: 'success'
      })

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  getDeveloperTools: async () => {
    try {
      const user = await auth.getCurrentUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await db.getDeveloperTools(user.id)
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  updateTool: async (toolId: string, toolData: any) => {
    try {
      const { data, error } = await db.updateTool(toolId, toolData)
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  getTools: async (filters?: any) => {
    try {
      const { data, error } = await db.getTools(filters)
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  getTool: async (slug: string) => {
    try {
      const { data, error } = await db.getTool(slug)
      
      if (error) throw error

      // Track view
      if (data) {
        await db.trackToolInteraction(data.id, 'view', {
          userAgent: navigator.userAgent,
          referrer: document.referrer
        })
      }

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  getFeaturedTools: async () => {
    try {
      const { data, error } = await db.getFeaturedTools(6)
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  searchTools: async (query: string, filters?: any) => {
    try {
      const { data, error } = await db.searchTools(query, filters)
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  trackClick: async (toolId: string) => {
    try {
      await db.trackToolInteraction(toolId, 'click', {
        userAgent: navigator.userAgent,
        referrer: document.referrer
      })

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}

// Category Services
export const categoryService = {
  getCategories: async () => {
    try {
      const { data, error } = await db.getCategories()
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  getCategoryTools: async (categoryId: string, filters?: any) => {
    try {
      const { data, error } = await db.getTools({
        category_id: categoryId,
        ...filters
      })
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}

// Review Services
export const reviewService = {
  getToolReviews: async (toolId: string) => {
    try {
      const { data, error } = await db.getToolReviews(toolId)
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  getToolRating: async (toolId: string) => {
    try {
      const { data, error } = await db.getToolRating(toolId)
      
      if (error) throw error

      return { success: true, data: data?.[0] || { average_rating: 0, total_reviews: 0 } }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  submitReview: async (reviewData: any) => {
    try {
      const user = await auth.getCurrentUser()
      
      const processedData = {
        ...reviewData,
        user_id: user?.id || null,
        user_email: user?.email || reviewData.userEmail,
        pros: reviewData.pros ? reviewData.pros.split(',').map((p: string) => p.trim()) : [],
        cons: reviewData.cons ? reviewData.cons.split(',').map((c: string) => c.trim()) : []
      }

      const { data, error } = await db.createReview(processedData)
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  flagReview: async (reviewId: string, reason: string) => {
    try {
      const { data, error } = await db.updateUser(reviewId, {
        is_flagged: true,
        flag_reason: reason
      })
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}

// Bookmark Services
export const bookmarkService = {
  getUserBookmarks: async () => {
    try {
      const user = await auth.getCurrentUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await db.getUserBookmarks(user.id)
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  addBookmark: async (toolId: string) => {
    try {
      const user = await auth.getCurrentUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await db.addBookmark(user.id, toolId)
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  removeBookmark: async (toolId: string) => {
    try {
      const user = await auth.getCurrentUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await db.removeBookmark(user.id, toolId)
      
      if (error) throw error

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}

// Comparison Services
export const comparisonService = {
  getUserComparisons: async () => {
    try {
      const user = await auth.getCurrentUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await db.getUserComparisons(user.id)
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  createComparison: async (comparisonData: any) => {
    try {
      const user = await auth.getCurrentUser()
      if (!user) throw new Error('User not authenticated')

      const processedData = {
        ...comparisonData,
        user_id: user.id
      }

      const { data, error } = await db.createComparison(processedData)
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  getComparisonTools: async (toolIds: string[]) => {
    try {
      const promises = toolIds.map(id => db.getTool(id))
      const results = await Promise.all(promises)
      
      const tools = results
        .filter(result => result.data)
        .map(result => result.data)

      return { success: true, data: tools }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}

// Admin Services
export const adminService = {
  getPendingTools: async () => {
    try {
      const { data, error } = await db.getPendingTools()
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  approveTool: async (toolId: string) => {
    try {
      const { data, error } = await db.approveTool(toolId)
      
      if (error) throw error

      // Create notification for developer
      if (data) {
        await db.createNotification({
          user_id: data.developer_id,
          title: 'Tool Approved!',
          message: `Your tool "${data.name}" has been approved and is now live.`,
          type: 'success',
          action_url: `/tools/${data.slug}`
        })
      }

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  rejectTool: async (toolId: string, reason: string) => {
    try {
      const { data, error } = await db.rejectTool(toolId, reason)
      
      if (error) throw error

      // Create notification for developer
      if (data) {
        await db.createNotification({
          user_id: data.developer_id,
          title: 'Tool Rejected',
          message: `Your tool "${data.name}" was rejected. Reason: ${reason}`,
          type: 'error'
        })
      }

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  getFlaggedReviews: async () => {
    try {
      const { data, error } = await db.getFlaggedReviews()
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  getAllUsers: async () => {
    try {
      // This would need a custom function in your database
      // For now, we'll use a simple query
      const { data, error } = await db.getUser('') // This is a placeholder
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}

// Banner Services
export const bannerService = {
  getActiveBanners: async () => {
    try {
      const { data, error } = await db.getActiveBanners()
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  createBanner: async (bannerData: any) => {
    try {
      const user = await auth.getCurrentUser()
      if (!user) throw new Error('User not authenticated')

      const processedData = {
        ...bannerData,
        created_by: user.id
      }

      const { data, error } = await db.createBanner(processedData)
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  updateBanner: async (bannerId: string, bannerData: any) => {
    try {
      const { data, error } = await db.updateBanner(bannerId, bannerData)
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  deleteBanner: async (bannerId: string) => {
    try {
      const { error } = await db.deleteBanner(bannerId)
      
      if (error) throw error

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}

// Notification Services
export const notificationService = {
  getUserNotifications: async () => {
    try {
      const user = await auth.getCurrentUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await db.getUserNotifications(user.id)
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  markAsRead: async (notificationId: string) => {
    try {
      const { data, error } = await db.markNotificationAsRead(notificationId)
      
      if (error) throw error

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}

// Upload Services
export const uploadService = {
  uploadLogo: async (file: File) => {
    try {
      const user = await auth.getCurrentUser()
      if (!user) throw new Error('User not authenticated')

      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`
      
      const publicUrl = await utils.uploadFile(file, 'tool-logos', fileName)

      return { success: true, data: { url: publicUrl } }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  uploadAvatar: async (file: File) => {
    try {
      const user = await auth.getCurrentUser()
      if (!user) throw new Error('User not authenticated')

      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/avatar.${fileExt}`
      
      const publicUrl = await utils.uploadFile(file, 'avatars', fileName)

      return { success: true, data: { url: publicUrl } }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}

// Analytics Services
export const analyticsService = {
  getDeveloperAnalytics: async () => {
    try {
      const user = await auth.getCurrentUser()
      if (!user) throw new Error('User not authenticated')

      // Get developer's tools
      const { data: tools } = await db.getDeveloperTools(user.id)
      
      if (!tools) return { success: true, data: null }

      // Calculate analytics
      const totalViews = tools.reduce((sum, tool) => sum + tool.view_count, 0)
      const totalClicks = tools.reduce((sum, tool) => sum + tool.click_count, 0)
      const approvedTools = tools.filter(tool => tool.status === 'approved').length

      return {
        success: true,
        data: {
          totalTools: tools.length,
          approvedTools,
          pendingTools: tools.filter(tool => tool.status === 'pending').length,
          totalViews,
          totalClicks,
          tools: tools.map(tool => ({
            id: tool.id,
            name: tool.name,
            views: tool.view_count,
            clicks: tool.click_count,
            status: tool.status
          }))
        }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  getAdminAnalytics: async () => {
    try {
      // This would require additional functions in your database
      // For now, return mock data structure
      return {
        success: true,
        data: {
          totalTools: 0,
          pendingReviews: 0,
          totalUsers: 0,
          totalViews: 0
        }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}