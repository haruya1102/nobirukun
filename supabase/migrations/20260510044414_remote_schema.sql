-- stretch_logs: ストレッチ記録テーブル
create table public.stretch_logs (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null,
  body_part_id text not null,
  recorded_at timestamptz not null default now()
);

-- 同一ユーザー・同一部位・同一日（JST）の重複を防止
create unique index idx_stretch_logs_unique_daily
  on public.stretch_logs (user_id, body_part_id, ((recorded_at at time zone 'Asia/Tokyo')::date));

-- RLS 有効化
alter table public.stretch_logs enable row level security;

-- 自分のログのみ参照可能
create policy "select own logs" on public.stretch_logs
  for select using (auth.uid() = user_id);

-- 自分のログのみ挿入可能
create policy "insert own logs" on public.stretch_logs
  for insert with check (auth.uid() = user_id);
