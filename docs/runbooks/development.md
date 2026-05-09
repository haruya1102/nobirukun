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

## Phase 3 — Supabase 連携 ⏳（現在ここ）

**目的:** 各ページのモックデータを実DBに繋ぎ、匿名認証で個人データを分離する。
ログイン画面を介さず起動即記録できる UX を維持するため、認証は Supabase の **匿名認証（Anonymous Sign-In）** を採用する。

- [ ] Supabase プロジェクト作成、`.env.local` に接続情報設定
- [ ] Supabase ダッシュボードで匿名認証（Anonymous Sign-In）を有効化
- [ ] `src/lib/supabase/` にクライアント・クエリ実装
- [ ] `middleware.ts` で未セッション時に `signInAnonymously()` を自動実行
- [ ] テーブル設計
  - [ ] `stretch_logs` (user_id, body_part_id, recorded_at)
  - [ ] (1日に同じ部位を複数回記録しても1日換算するためのインデックス／ユニーク制約検討)
- [ ] Row Level Security（user_id ベース。匿名ユーザーも `auth.users` に格納されるため通常認証と同じポリシーで動作）
- [ ] 記録保存の Server Action（`createStretchLogAction`）
- [ ] `/home`・`/log` のログ取得を実データに差し替え

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

---

## Phase 6 — アカウント昇格（任意）

**目的:** 匿名ユーザーが機種変や端末追加でデータを引き継げるようにする。
匿名認証はブラウザの Cookie に紐づくため、Cookie 消去・端末紛失でデータが失われる弱点がある。それを救済する任意フェーズ。

- [ ] `/login` をメアド登録UIとして実装（`linkIdentity()` で匿名→正規ユーザーに昇格）
- [ ] パスワードリセットフロー
- [ ] 端末間でのセッション同期確認
