import { createClient } from '@supabase/supabase-js'

const supabase = createClient("https://mcuhjkedegqnyhumlerp.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jdWhqa2VkZWdxbnlodW1sZXJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0ODA1NzAsImV4cCI6MjA2MDA1NjU3MH0.dEJquW6-e5_CNx0kHRyLgLNAMG_2uQLqXs7BTOrDcrM")

const service_role_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jdWhqa2VkZWdxbnlodW1sZXJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDQ4MDU3MCwiZXhwIjoyMDYwMDU2NTcwfQ.TeGcEArddV0refFhuSl5NRMAx0PqCQwp4oyiGrW51Lo"
const supabaseAdmin = createClient("https://mcuhjkedegqnyhumlerp.supabase.co", service_role_key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export { supabase, supabaseAdmin }