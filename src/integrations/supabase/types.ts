export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      leads: {
        Row: {
          anio: string | null
          ciudad: string | null
          created_at: string
          email: string | null
          id: string
          marca: string | null
          mensaje: string | null
          modelo: string | null
          nombre: string
          notes: string | null
          preferred_contact_method: string | null
          servicio: string
          source: string | null
          status: string
          telefono: string
          updated_at: string
          vehiculo_tipo: string | null
          whatsapp: string | null
        }
        Insert: {
          anio?: string | null
          ciudad?: string | null
          created_at?: string
          email?: string | null
          id?: string
          marca?: string | null
          mensaje?: string | null
          modelo?: string | null
          nombre: string
          notes?: string | null
          preferred_contact_method?: string | null
          servicio: string
          source?: string | null
          status?: string
          telefono: string
          updated_at?: string
          vehiculo_tipo?: string | null
          whatsapp?: string | null
        }
        Update: {
          anio?: string | null
          ciudad?: string | null
          created_at?: string
          email?: string | null
          id?: string
          marca?: string | null
          mensaje?: string | null
          modelo?: string | null
          nombre?: string
          notes?: string | null
          preferred_contact_method?: string | null
          servicio?: string
          source?: string | null
          status?: string
          telefono?: string
          updated_at?: string
          vehiculo_tipo?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          images: string[] | null
          published: boolean | null
          slug: string | null
          title: string
          updated_at: string
          vehicle_type: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          images?: string[] | null
          published?: boolean | null
          slug?: string | null
          title: string
          updated_at?: string
          vehicle_type?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          images?: string[] | null
          published?: boolean | null
          slug?: string | null
          title?: string
          updated_at?: string
          vehicle_type?: string | null
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          admin_notes: string | null
          attachment_urls: string[] | null
          budget_range: string | null
          created_at: string
          id: string
          lead_id: string | null
          quote_status: string | null
          request_type: string | null
          urgency: string | null
        }
        Insert: {
          admin_notes?: string | null
          attachment_urls?: string[] | null
          budget_range?: string | null
          created_at?: string
          id?: string
          lead_id?: string | null
          quote_status?: string | null
          request_type?: string | null
          urgency?: string | null
        }
        Update: {
          admin_notes?: string | null
          attachment_urls?: string[] | null
          budget_range?: string | null
          created_at?: string
          id?: string
          lead_id?: string | null
          quote_status?: string | null
          request_type?: string | null
          urgency?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quote_requests_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string
          featured: boolean | null
          icon: string | null
          id: string
          long_description: string | null
          published: boolean | null
          short_description: string | null
          slug: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          featured?: boolean | null
          icon?: string | null
          id?: string
          long_description?: string | null
          published?: boolean | null
          short_description?: string | null
          slug?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          featured?: boolean | null
          icon?: string | null
          id?: string
          long_description?: string | null
          published?: boolean | null
          short_description?: string | null
          slug?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      settings: {
        Row: {
          id: string
          key: string
          value: string | null
        }
        Insert: {
          id?: string
          key: string
          value?: string | null
        }
        Update: {
          id?: string
          key?: string
          value?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          client_name: string
          created_at: string
          featured: boolean | null
          id: string
          published: boolean | null
          rating: number
          testimonial: string
        }
        Insert: {
          client_name: string
          created_at?: string
          featured?: boolean | null
          id?: string
          published?: boolean | null
          rating?: number
          testimonial: string
        }
        Update: {
          client_name?: string
          created_at?: string
          featured?: boolean | null
          id?: string
          published?: boolean | null
          rating?: number
          testimonial?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor"],
    },
  },
} as const
