export const TRANSACTION_CATEGORIES = {
  GENERAL: "general",
  ENTERTAINMENT: "entertainment",
  BILLS: "bills",
  GROCERIES: "groceries",
  DINING_OUT: "dining_out",
  TRANSPORTATION: "transportation",
  PERSONAL_CARE: "personal_care",
  LIFESTYLE: "lifestyle",
  EDUCATION: "education",
} as const

export const TRANSACTION_CATEGORIES_OPTIONS = [
  { label: "General", value: TRANSACTION_CATEGORIES.GENERAL },
  { label: "Groceries", value: TRANSACTION_CATEGORIES.GROCERIES },
  { label: "Bills", value: TRANSACTION_CATEGORIES.BILLS },
  {
    label: "Transportations",
    value: TRANSACTION_CATEGORIES.TRANSPORTATION,
  },
  { label: "Entertainment", value: TRANSACTION_CATEGORIES.ENTERTAINMENT },
  { label: "Dining out", value: TRANSACTION_CATEGORIES.DINING_OUT },
  { label: "Personal Care", value: TRANSACTION_CATEGORIES.PERSONAL_CARE },
  { label: "Lifestyle", value: TRANSACTION_CATEGORIES.LIFESTYLE },
] as const
