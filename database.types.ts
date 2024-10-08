export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profile: {
        Row: {
          birthdate: string | null
          created_at: string
          currency_code: Database["public"]["Enums"]["currency_codes"]
          display_name: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          locale: Database["public"]["Enums"]["locales"]
          timezone: Database["public"]["Enums"]["timezones"]
        }
        Insert: {
          birthdate?: string | null
          created_at?: string
          currency_code: Database["public"]["Enums"]["currency_codes"]
          display_name?: string | null
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          locale: Database["public"]["Enums"]["locales"]
          timezone: Database["public"]["Enums"]["timezones"]
        }
        Update: {
          birthdate?: string | null
          created_at?: string
          currency_code?: Database["public"]["Enums"]["currency_codes"]
          display_name?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          locale?: Database["public"]["Enums"]["locales"]
          timezone?: Database["public"]["Enums"]["timezones"]
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      transaction_category: {
        Row: {
          color: string
          created_at: string
          icon_name: Database["public"]["Enums"]["transaction_categories_icons"]
          id: string
          name: string
          user_id: string
        }
        Insert: {
          color: string
          created_at?: string
          icon_name: Database["public"]["Enums"]["transaction_categories_icons"]
          id?: string
          name: string
          user_id: string
        }
        Update: {
          color?: string
          created_at?: string
          icon_name?: Database["public"]["Enums"]["transaction_categories_icons"]
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transaction_category_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount_cents: number
          category: string
          created_at: string
          currency_code: Database["public"]["Enums"]["currency_codes"]
          date: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          amount_cents: number
          category: string
          created_at?: string
          currency_code: Database["public"]["Enums"]["currency_codes"]
          date: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          amount_cents?: number
          category?: string
          created_at?: string
          currency_code?: Database["public"]["Enums"]["currency_codes"]
          date?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "transaction_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      aggregate_balance_and_monthly_incomes_expenses: {
        Args: {
          _user_id: string
        }
        Returns: {
          current_balance: number
          expenses: number
          incomes: number
        }[]
      }
      delete_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      sum_amounts_per_category: {
        Args: {
          _category_ids: string[]
          _user_id: string
          _start_date: string
          _end_date: string
        }
        Returns: {
          category_id: string
          category_name: string
          category_icon_name: Database["public"]["Enums"]["transaction_categories_icons"]
          category_color: string
          incomes_sum: number
          expenses_sum: number
        }[]
      }
    }
    Enums: {
      currency_codes: "EUR" | "USD"
      locales: "fr-FR" | "en-US"
      timezones: "Europe/Paris" | "America/Santiago"
      transaction_categories:
        | "general"
        | "dining_out"
        | "groceries"
        | "entertainment"
        | "transportation"
        | "lifestyle"
        | "personal_care"
        | "education"
        | "bills"
      transaction_categories_icons:
        | "apple"
        | "bills"
        | "carrot"
        | "cooking_pot"
        | "hand_plater"
        | "bike"
        | "bus"
        | "car"
        | "train_front"
        | "fuel"
        | "film"
        | "rss"
        | "cigarette"
        | "smartphone"
        | "tram_front"
        | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
