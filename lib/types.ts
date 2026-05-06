export type Lead = {
  id?: string
  full_name: string
  email: string
  company?: string
  source: 'Google' | 'Referral' | 'Social' | 'Other'
  message?: string
  created_at?: string
}