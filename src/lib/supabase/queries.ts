import { createClient } from '@/lib/supabase/server'
import type { StretchLog } from '@/types'

interface StretchLogRow {
  id: string
  user_id: string
  body_part_id: string
  recorded_at: string
}

function toStretchLog(row: StretchLogRow): StretchLog {
  return {
    id: row.id,
    bodyPartId: row.body_part_id as StretchLog['bodyPartId'],
    recordedAt: new Date(row.recorded_at),
  }
}

export async function fetchStretchLogs(): Promise<StretchLog[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('stretch_logs')
    .select('*')
    .order('recorded_at', { ascending: false })

  if (error) throw error

  return (data as StretchLogRow[]).map(toStretchLog)
}
