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

- ユーザーがストレッチした部位を1日単位で記録する（時間は問わない）
- 週内のユニーク記録日数に応じて、画面上の人体キャラクターの各部位が連続的に伸長する
- 1週間（月曜〜日曜）単位でキャラクターがリセットされ、過去週の姿がギャラリーに残る
- ソーシャル機能なし。個人の習慣記録に特化。

**現フェーズのスコープ:** PWA（Web）。UI雛形を実装したうえで Supabase 連携・認証を組み込む。

---

## HOW ― どう作るのか

| レイヤー       | 技術                                              |
| -------------- | ------------------------------------------------- |
| フロントエンド | Next.js 16 (App Router) + TypeScript              |
| スタイリング   | Tailwind CSS v4（UIライブラリは導入せず自作）     |
| バックエンド   | Supabase (PostgreSQL + Auth)                      |
| アニメーション | SVG transform (脊椎: scaleY / 腕: scaleX) + spring easing |
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
│   │   └─ log/page.tsx         # 月別キャラクターギャラリー
│   ├─ components/
│   │   ├─ character/           # キャラクター関連
│   │   │   ├─ stretch-character.tsx   # SVG人体・部位別 transform 適用
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
│   │   ├─ growth.ts            # calcScaleFactor(), calcBodyPartStats(), calcStretchSummary(), groupLogsByMonth()
│   │   └─ supabase/            # DBクライアント・クエリ（未実装）
│   └─ types/
│       └─ index.ts             # BodyPartId / BODY_PARTS / StretchLog / BodyPartStats / StretchSummary 型定義
└─ .claude/rules/               # コーディング／UI／コミットの運用ルール
    ├─ coding.md
    ├─ commit.md
    └─ ui.md                    # Hokkori Modernism デザイン言語の基準
```

> UI/ビジュアル言語（カラー・タイポ・シャドウ・コンポーネント基準）の詳細は
> `.claude/rules/ui.md` に集約。新しい画面・コンポーネントを作る前に必ず参照すること。

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

## 開発コマンド運用ガイドライン

| コマンド | 用途 | いつ使うか |
| --- | --- | --- |
| `npm run dev` | 開発サーバー起動（ホットリロード） | 普段の開発中は立ち上げっぱなしにする |
| `npm run lint` / `npx tsc --noEmit` | Lint・型チェック | ファイル変更時に軽く確認したいとき |
| `npm run build` | 本番用ビルド | PR提出前・デプロイ前の最終確認のみ |

- **ファイル変更のたびに `npm run build` を実行する必要はない**。`npm run dev` が自動反映する
- 型エラーだけ確認したい場合は `npx tsc --noEmit` の方が `build` より速い
- 本番ビルド特有の問題（SSR・環境変数・Tree Shaking等）を検証したいときだけ `build` を使う

---

## 環境変数（.env.local）

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```
