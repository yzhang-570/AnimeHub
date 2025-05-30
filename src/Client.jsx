import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// export default supabase

// import { createClient } from '@supabase/supabase-js'

// const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
// const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY
// const SERVICE_ROLE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY

// const supabase = createClient("https://mcuhjkedegqnyhumlerp.supabase.co", "6aLEITZowCdpWzPIQpoLttJ+p8C5vsD/h5zMmIT3CUDD9LTrKEHBvdEfRGzdttI9MSXil55ziesERYZGQ6JxSQ==")

/* temporarily remove for deployment */
// const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
//   auth: {
//     autoRefreshToken: false,
//     persistSession: false
//   }
// })

export { supabase}