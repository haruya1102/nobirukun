'use server'

import { createClient } from '@/lib/supabase/server'
import type { BodyPartId } from '@/types'

export async function createStretchLogAction(bodyPartIds: BodyPartId[]) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('認証されていません')
  }

  const rows = bodyPartIds.map((id) => ({
    user_id: user.id,
    body_part_id: id,
  }))

  const { error } = await supabase
    .from('stretch_logs')
    .insert(rows)

  if (error) {
    if (error.code === '23505') return
    throw error
  }
}
