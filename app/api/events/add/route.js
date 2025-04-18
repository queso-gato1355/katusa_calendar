// app/api/events/add/route.js
import { supabase } from '@/lib/supabase'

export async function POST(request) {
  const { title, description, location, start_at, end_at, all_day, category } = await request.json()

  const { data, error } = await supabase
    .from('events')
    .insert([{ title, description, location, start_at, end_at, all_day, category }])

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  return new Response(JSON.stringify({ data }), { status: 200 })
}
