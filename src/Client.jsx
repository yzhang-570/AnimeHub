import { createClient } from '@supabase/supabase-js'

const supabase = createClient("https://mcuhjkedegqnyhumlerp.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jdWhqa2VkZWdxbnlodW1sZXJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0ODA1NzAsImV4cCI6MjA2MDA1NjU3MH0.dEJquW6-e5_CNx0kHRyLgLNAMG_2uQLqXs7BTOrDcrM")

export default supabase