// src/lib/database.types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'admin' | 'developer' | 'visitor'
export type ToolStatus = 'pending' | 'approved' | 'rejected' | 'draft'
export type PricingType = 'free' | 'freemium' | 'paid'
export type ApiAvailability = 'yes' | 'no' | 'limited'
export type BannerType = 'top' | 'content'

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          company_name: string | null
          role: UserRole
          avatar_url: string | null
          social_media: Json
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          company_name?: string | null
          role?: UserRole
          avatar_url?: string | null
          social_media?: Json
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          company_name?: string | null
          role?: UserRole
          avatar_url?: string | null
          social_media?: Json
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon_url: string | null
          color_hex: string
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon_url?: string | null
          color_hex?: string
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon_url?: string | null
          color_hex?: string
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      subcategories: {
        Row: {
          id: string
          category_id: string
          name: string
          slug: string
          description: string | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          slug: string
          description?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          slug?: string
          description?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      ai_tools: {
        Row: {
          id: string
          developer_id: string
          name: string
          slug: string
          description: string
          website_url: string
          logo_url: string
          category_id: string | null
          subcategory_id: string | null
          custom_category: string | null
          custom_subcategory: string | null
          pricing_type: PricingType
          free_trial_duration: string | null
          features: string[] | null
          use_cases: string[] | null
          target_audience: string | null
          tags: string[] | null
          api_available: ApiAvailability
          integrations: string[] | null
          supported_languages: string[] | null
          status: ToolStatus
          is_featured: boolean
          submission_date: string
          approval_date: string | null
          rejection_reason: string | null
          view_count: number
          click_count: number
          meta_title: string | null
          meta_description: string | null
          additional_info: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          developer_id: string
          name: string
          slug: string
          description: string
          website_url: string
          logo_url: string
          category_id?: string | null
          subcategory_id?: string | null
          custom_category?: string | null
          custom_subcategory?: string | null
          pricing_type?: PricingType
          free_trial_duration?: string | null
          features?: string[] | null
          use_cases?: string[] | null
          target_audience?: string | null
          tags?: string[] | null
          api_available?: ApiAvailability
          integrations?: string[] | null
          supported_languages?: string[] | null
          status?: ToolStatus
          is_featured?: boolean
          submission_date?: string
          approval_date?: string | null
          rejection_reason?: string | null
          view_count?: number
          click_count?: number
          meta_title?: string | null
          meta_description?: string | null
          additional_info?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          developer_id?: string
          name?: string
          slug?: string
          description?: string
          website_url?: string
          logo_url?: string
          category_id?: string | null
          subcategory_id?: string | null
          custom_category?: string | null
          custom_subcategory?: string | null
          pricing_type?: PricingType
          free_trial_duration?: string | null
          features?: string[] | null
          use_cases?: string[] | null
          target_audience?: string | null
          tags?: string[] | null
          api_available?: ApiAvailability
          integrations?: string[] | null
          supported_languages?: string[] | null
          status?: ToolStatus
          is_featured?: boolean
          submission_date?: string
          approval_date?: string | null
          rejection_reason?: string | null
          view_count?: number
          click_count?: number
          meta_title?: string | null
          meta_description?: string | null
          additional_info?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      pricing_plans: {
        Row: {
          id: string
          tool_id: string
          name: string
          price: number
          duration: string
          features: string[] | null
          is_popular: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          name: string
          price?: number
          duration: string
          features?: string[] | null
          is_popular?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          name?: string
          price?: number
          duration?: string
          features?: string[] | null
          is_popular?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          tool_id: string
          user_email: string
          user_id: string | null
          rating: number
          title: string | null
          content: string | null
          pros: string[] | null
          cons: string[] | null
          is_verified: boolean
          is_flagged: boolean
          flag_reason: string | null
          helpful_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          user_email: string
          user_id?: string | null
          rating: number
          title?: string | null
          content?: string | null
          pros?: string[] | null
          cons?: string[] | null
          is_verified?: boolean
          is_flagged?: boolean
          flag_reason?: string | null
          helpful_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          user_email?: string
          user_id?: string | null
          rating?: number
          title?: string | null
          content?: string | null
          pros?: string[] | null
          cons?: string[] | null
          is_verified?: boolean
          is_flagged?: boolean
          flag_reason?: string | null
          helpful_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      tool_comparisons: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          tool_ids: string[]
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          tool_ids: string[]
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          tool_ids?: string[]
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      promotional_banners: {
        Row: {
          id: string
          type: BannerType
          title: string
          description: string | null
          cta_text: string | null
          cta_link: string | null
          background_color: string
          text_color: string
          is_active: boolean
          start_date: string | null
          end_date: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          type: BannerType
          title: string
          description?: string | null
          cta_text?: string | null
          cta_link?: string | null
          background_color?: string
          text_color?: string
          is_active?: boolean
          start_date?: string | null
          end_date?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          type?: BannerType
          title?: string
          description?: string | null
          cta_text?: string | null
          cta_link?: string | null
          background_color?: string
          text_color?: string
          is_active?: boolean
          start_date?: string | null
          end_date?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tool_analytics: {
        Row: {
          id: string
          tool_id: string
          event_type: string
          user_ip: string | null
          user_agent: string | null
          referrer: string | null
          search_query: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          event_type: string
          user_ip?: string | null
          user_agent?: string | null
          referrer?: string | null
          search_query?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          event_type?: string
          user_ip?: string | null
          user_agent?: string | null
          referrer?: string | null
          search_query?: string | null
          created_at?: string
        }
      }
      tool_bookmarks: {
        Row: {
          id: string
          user_id: string
          tool_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tool_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tool_id?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          is_read: boolean
          action_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: string
          is_read?: boolean
          action_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          is_read?: boolean
          action_url?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_new_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      track_tool_interaction: {
        Args: {
          p_tool_id: string
          p_event_type: string
          p_user_ip?: string
          p_user_agent?: string
          p_referrer?: string
          p_search_query?: string
        }
        Returns: undefined
      }
      calculate_tool_rating: {
        Args: {
          p_tool_id: string
        }
        Returns: {
          average_rating: number
          total_reviews: number
        }[]
      }
      get_featured_tools: {
        Args: {
          p_limit?: number
        }
        Returns: {
          id: string
          name: string
          slug: string
          description: string
          logo_url: string
          category_name: string
          average_rating: number
          total_reviews: number
          pricing_type: PricingType
        }[]
      }
      search_tools: {
        Args: {
          p_query?: string
          p_category_id?: string
          p_pricing_type?: PricingType
          p_limit?: number
          p_offset?: number
        }
        Returns: {
          id: string
          name: string
          slug: string
          description: string
          logo_url: string
          category_name: string
          average_rating: number
          total_reviews: number
          pricing_type: PricingType
          view_count: number
        }[]
      }
    }
    Enums: {
      user_role: UserRole
      tool_status: ToolStatus
      pricing_type: PricingType
      api_availability: ApiAvailability
      banner_type: BannerType
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}