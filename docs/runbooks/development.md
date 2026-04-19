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
| アニメーション | CSS transform (scaleY) + spring easing | 連続的な部位伸長の表現         |
| デプロイ       | Vercel                                 | 無料枠で運用                  |

---

## Phase 0 — 環境セットアップ ✅

- Next.js + TypeScript プロジェクト初期化
- Tailwind CSS v4 セットアップ
- カラートークン初版（`src/app/globals.css`）
- 不要な UI ライブラリ（shadcn/ui, Radix, next-themes など）を削除

---

## Phase 1 — UIモック実装 ✅

- 全画面をモックデータで動作させる状態まで到達
  - `/home` ― キャラクター表示 + 部位バッジ + 統計ベントー
  - `/record` ― 3ステップ記録フロー（部位選択 → 時間 → 確認）
  - `/log` ― 月別キャラクターギャラリー（現在月除外）
  - `/settings` ― 設定
  - `/login` ― 認証UI（未接続）
- 成長計算ロジック（`src/lib/growth.ts`）
- SVG人体キャラクターと部位別 scaleY アニメーション

---

## Phase 2 — デザイン反映 ⏳（現在ここ）

**目的:** `src/mock-design/` のビジュアル言語を各画面に適用する。
旧プロダクト案のモックだが、色・タイポ・シャドウ・角丸のトーンを流用する方針。

- [ ] `MOCK_DESIGN.md` と各 mock-*.html からデザイントークン抽出
- [ ] `globals.css` のカラー/ラディウス/シャドウをモックに合わせて整理
- [ ] `/home`, `/record`, `/log`, `/settings`, `/login` の見た目をモックに寄せる
- [ ] フォント・余白・アイコンスタイルの統一

---

## Phase 3 — Supabase 連携 🔜

**目的:** モックデータを実DBに置き換え、認証を組み込む。

- [ ] Supabase プロジェクト作成、`.env.local` に接続情報設定
- [ ] `src/lib/supabase/` にクライアント・クエリ実装
- [ ] テーブル設計
  - [ ] `stretch_logs` (user_id, body_part_id, minutes, recorded_at)
  - [ ] `user_settings` (user_id, daily_goal_minutes)
- [ ] Row Level Security（user_id ベース）
- [ ] 記録保存の Server Action（`createStretchLogAction`）
- [ ] `/login` を Supabase Auth に接続
- [ ] `/home`・`/log` のモック定数を実データに差し替え

---

## Phase 4 — PWA化

- [ ] `manifest.json` 作成
- [ ] Service Worker（オフライン基本キャッシュ）
- [ ] ホーム画面追加アイコン対応
- [ ] Vercel にデプロイ

---

## Phase 5 — 継続支援機能（スコープ要検討）

- [ ] ストリーク表示
- [ ] 月初リセット時の演出
- [ ] PWA push 通知でのリマインド
