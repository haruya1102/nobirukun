# CLAUDE.md

> このファイルはClaude Codeがプロジェクト全体を把握するための記憶。
> 作業開始時に必ず読むこと。詳細は `docs/` と各モジュールの `CLAUDE.md` を参照。

---

## WHY ― なぜこのシステムを作るのか

リモートワーカーはデスクワークで身体が固まりやすいが、ストレッチは地味で継続しにくい。
このアプリは「ストレッチした分だけキャラクターの身体が伸びる」という
視覚フィードバックによって、毎日の習慣化を助ける。

---

## WHAT ― このシステムは何をするのか

- ユーザーがストレッチした部位と時間（分）を記録する
- 累積ストレッチ時間に応じて、画面上の人体キャラクターの各部位が連続的に伸長する
- 1ヶ月（暦月）単位でキャラクターがリセットされ、過去月の姿がギャラリーに残る
- ソーシャル機能なし。個人の習慣記録に特化。

**現フェーズのスコープ:** PWA（Web）。UIモックで動作確認後、Supabase連携・認証を実装。

---

## HOW ― どう作るのか

| レイヤー       | 技術                                              |
| -------------- | ------------------------------------------------- |
| フロントエンド | Next.js 15 (App Router) + TypeScript              |
| スタイリング   | Tailwind CSS（UIライブラリは導入せず、モックベースで自作） |
| バックエンド   | Supabase (PostgreSQL + Auth)                      |
| アニメーション | CSS transform (scaleY) + spring easing            |
| デプロイ       | Vercel                                            |

---

## MAP ― どこに何があるのか

```
/
├─ CLAUDE.md                    # ← 今ここ
├─ docs/
│   └─ architecture.md          # アプリ仕様・成長計算ロジック詳細
├─ src/
│   ├─ app/
│   │   ├─ page.tsx             # → /home にリダイレクト
│   │   ├─ layout.tsx           # ルートレイアウト
│   │   ├─ globals.css          # カラートークン・ユーティリティ
│   │   ├─ home/page.tsx        # ホーム（キャラクター表示）
│   │   ├─ record/page.tsx      # ストレッチ記録フォーム
│   │   ├─ log/page.tsx         # 月別キャラクターギャラリー
│   │   ├─ settings/page.tsx    # 設定（目標時間など）
│   │   └─ login/page.tsx       # 認証UI
│   ├─ components/
│   │   ├─ character/           # キャラクター関連
│   │   │   ├─ stretch-character.tsx   # SVG人体・部位別scaleY適用
│   │   │   └─ body-part-badge.tsx    # 部位ごとの伸長率バッジ
│   │   ├─ home/                # ホーム画面専用
│   │   │   ├─ home-header.tsx
│   │   │   ├─ record-button.tsx
│   │   │   └─ stats-bento.tsx
│   │   ├─ log/                 # ギャラリー関連
│   │   │   └─ monthly-character-card.tsx
│   │   └─ layout/
│   │       └─ bottom-nav.tsx
│   ├─ lib/
│   │   ├─ growth.ts            # calcScaleFactor(), calcBodyPartStats()
│   │   └─ supabase/            # DBクライアント・クエリ（未実装）
│   └─ types/
│       └─ index.ts             # BodyPart, StretchLog, BodyPartStats 型定義
└─ src/mock-design/             # デザイン参照用HTMLモック
```

---

## RULES ― 何をしていい／ダメなのか

### やること

- 成長計算は `src/lib/growth.ts` に集約し、コンポーネントに直接書かない
- 共通の型は `/src/types/index.ts` に集約する
- Supabaseへのデータ操作は **Server Actions** を使う
- Supabase・APIの呼び出しは必ず **try-catch** で囲む
- 環境変数は `.env.local` で管理する（コードにハードコードしない）

### やらないこと

- ソーシャル・共有機能の実装（スコープ外）
- `src/lib/supabase/` のスキーマ変更（migrations経由で行う）

---

## 環境変数（.env.local）

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```
