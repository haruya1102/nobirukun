# のびるクン 開発ロードマップ

> 伸ばした分だけキャラクターが伸びる、リモートワーカー向け習慣アプリ。
> 全体仕様は `docs/architecture.md`、プロジェクト把握は `CLAUDE.md` を参照。

---

## 技術スタック

| レイヤー       | 技術                                   | 備考                          |
| -------------- | -------------------------------------- | ----------------------------- |
| フロントエンド | Next.js 16 (App Router) + TypeScript   | PWA 対応予定                  |
| スタイリング   | Tailwind CSS v4                        | UIライブラリは導入せず自作     |
| アイコン       | lucide-react                           |                               |
| バックエンド   | Supabase (PostgreSQL + Auth)           | 未実装                        |
| アニメーション | SVG transform + spring easing          | 部位ごとの連続的伸長の表現     |
| デプロイ       | Vercel                                 | 無料枠で運用                  |

---

## Phase 0 — 環境セットアップ ✅

- Next.js + TypeScript プロジェクト初期化
- Tailwind CSS v4 セットアップ
- カラートークン初版（`src/app/globals.css`）
- 不要な UI ライブラリ（shadcn/ui, Radix, next-themes など）を削除

---

## Phase 1 — UI 雛形実装 ✅

- 全画面の構造とレイアウトを実装
  - `/home` ― キャラクター表示 + 部位バッジ + 統計ベントー（記録ゼロ件時はオンボーディング表示）
  - `/record` ― 2ステップ記録フロー（部位選択 → 確認）
  - `/log` ― 月別キャラクターギャラリー（現在月除外）
- 成長計算ロジック（`src/lib/growth.ts`）
  - 日数ベース：月内ユニーク記録日数で scaleFactor を算出
  - 部位ごとの伸長率上書き（首・腕は他の部位より大きく伸びる）
- SVG人体キャラクターと部位別 transform
  - 脊椎は上から下に積み上がり、上の部位の伸長分だけ下を押し下げる
  - 腕は横方向（T ポーズ）に scaleX で伸ばす

---

## Phase 2 — デザイン反映 ✅

**目的:** Hokkori Modernism デザイン言語（`.claude/rules/ui.md`）を各画面に適用する。
元は旧プロダクト案のHTMLモックから抽出した色・タイポ・シャドウ・角丸のトーンを流用。

- [x] `globals.css` のカラー/ラディウス/シャドウをデザイン言語に合わせて整理
- [x] `/home`, `/record`, `/log` の見た目を Hokkori Modernism に寄せる
- [x] フォント・余白・アイコンスタイルの統一

---

## Phase 3 — Supabase 連携 ✅

**目的:** 各ページのモックデータを実DBに繋ぎ、匿名認証で個人データを分離する。
ログイン画面を介さず起動即記録できる UX を維持するため、認証は Supabase の **匿名認証（Anonymous Sign-In）** を採用する。

> **注意:** 匿名認証はブラウザストレージ依存。iOS Safari は7日間未使用でストレージを自動削除する可能性がある。
> MVP段階では許容し、Phase 6（アカウント昇格）で早期に救済する。

### Step 1: Supabase プロジェクト準備（手動作業）

- [x] Supabase ダッシュボードでプロジェクト作成
- [x] Authentication → Settings で匿名認証（Anonymous Sign-In）を有効化
- [x] `.env.local` に接続情報を設定（`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`）

### Step 2: テーブル設計・RLS（SQL）

- [x] `stretch_logs` テーブル作成
  - `id` (uuid, PK, default `gen_random_uuid()`)
  - `user_id` (uuid, FK → `auth.users`, not null)
  - `body_part_id` (text, not null)
  - `recorded_at` (timestamptz, not null, default `now()`)
  - UNIQUE インデックス: `(user_id, body_part_id, (recorded_at at time zone 'Asia/Tokyo')::date)` — 同日同部位の重複をDB層で防止
- [x] RLS有効化 + ポリシー設定（`auth.uid() = user_id` で SELECT/INSERT を許可）

### Step 3: Supabase クライアント実装

- [x] `@supabase/supabase-js` + `@supabase/ssr` をインストール
- [x] `src/lib/supabase/client.ts` — ブラウザ用クライアント（`createBrowserClient`）
- [x] `src/lib/supabase/server.ts` — Server Components / Actions 用クライアント（`createServerClient`）

### Step 4: 匿名認証

- [x] クライアント側の Auth プロバイダ（`src/components/auth-provider.tsx`）で未ログイン時に `signInAnonymously()` を自動実行
- [x] `middleware.ts` はセッションのリフレッシュのみ担当（認証処理は行わない）

### Step 5: Server Actions

- [x] `createStretchLogAction` — 記録保存（UNIQUE制約による重複時は無視）
- [x] ログ取得クエリ関数（`src/lib/supabase/queries.ts`）

### Step 6: ページ差し替え

- [x] `/home` のモックデータを実データに置き換え
- [x] `/record` の記録処理を Server Action に接続
- [x] `/log` のギャラリーを実データに置き換え

---

## Phase 4 — PWA化 ⏳（現在ここ）

- [x] `manifest.json` 作成
- [x] Service Worker（オフライン基本キャッシュ）
- [x] ホーム画面追加アイコン対応
- [ ] Vercel にデプロイ

---

## Phase 5 — 継続支援機能（スコープ要検討）

- [ ] ストリーク表示
- [ ] 月初リセット時の演出
- [ ] PWA push 通知でのリマインド

---

## Phase 6 — アカウント昇格（任意）

**目的:** 匿名ユーザーが機種変や端末追加でデータを引き継げるようにする。
匿名認証はブラウザの Cookie に紐づくため、Cookie 消去・端末紛失でデータが失われる弱点がある。それを救済する任意フェーズ。

- [ ] `/login` をメアド登録UIとして実装（`linkIdentity()` で匿名→正規ユーザーに昇格）
- [ ] パスワードリセットフロー
- [ ] 端末間でのセッション同期確認
