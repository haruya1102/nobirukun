# UIルール

## ビジュアル言語：Hokkori Modernism

"Hokkori"（ほっこり）＝温かく、ふんわり、安心感。和の自然主義をモダンに解釈したデザインシステム。
箱型のリジッドなレイアウトを避け、**意図的な非対称・有機的レイヤリング・トーン深度**で「川の石」「木の机の上の麻布」のような質感を作る。

### カラー哲学

- 土・空・太陽に根ざした「アナログで触れられる」パレット
- Primary（`#326a35`）= セージグリーン／成長・アクション・成功
- Secondary（`#705b3e`）= サンドベージュ・木肌／接地要素
- Tertiary（`#875218`）= ウォームアンバー／攻撃的でない強調
- Surface 階層で深さを作る：`surface` → `surface-container-low` → `surface-container-highest`

### No-Line Rule（境界は色で）

1pxの実線ボーダーでセクションを区切らない。境界は必ず**背景色のシフト**で表現する。
`surface-container-low` のカードを `surface` の上に置くと、統合感のある柔らかな境界ができる。
アクセシビリティ上どうしても必要なら `outline-variant` を15%透明度で（"Ghost Border"）。

### Glass & Gradient

大きなヒーロー領域でフラットな単色は避ける。

- **Signature Gradient:** Primary CTA は `primary-container → primary` の135度リニアグラデ（`garden-gradient` ユーティリティ）で"ふっくら"感
- **Glassmorphism:** フローティングナビ／オーバーレイは `surface-container-lowest` の80%不透明＋`backdrop-blur`

### タイポグラフィ

| 用途       | フォント           | ウェイト               | 備考                                            |
| ---------- | ------------------ | ---------------------- | ----------------------------------------------- |
| ヘッドライン | Plus Jakarta Sans  | 700 / 800              | `font-headline`。`rounded-xl` の形と呼応する丸み |
| 本文・UI   | Be Vietnam Pro     | 400 / 500 / 600 / 700  | `font-body`。編集的で清潔な対比                 |

- ヒーロー見出しは `tracking-tight`（-0.02em 相当）で雑誌的な上質さ
- セカンダリテキストは `on-surface-variant` でトーンオントーンに（コントラストを優しく保つ）

### エレベーション：Tonal Layering First

影よりも**トーンレイヤー**で深さを作る：

1. Level 0（ベース）: `surface`
2. Level 1（セクション）: `surface-container-low`
3. Level 2（インタラクション）: `surface-container-highest` ／ カードは `surface-container-lowest`

物理的な"浮き"が必要な時のみ Ambient Shadow を使う（グレーではなく色味を持たせる）：

- **Green Button Shadow**（`custom-shadow-green`）: `0 20px 40px -12px rgba(124, 184, 122, 0.3)`
- **General Card Shadow**（`card-shadow`）: `0 12px 30px -10px rgba(61, 50, 38, 0.08)`

### コンポーネント基準

- **Buttons（"Plump" Style）:** Primary は `primary` / `primary-container` 背景、`rounded-xl`（3rem）、`px-6 py-3` 以上の余裕。ホバーは色変更ではなく `scale-105` ＋ shadow 深化（物理的フィードバック）
- **Inputs:** 背景 `surface-container-highest` or `surface-container-low`、ボーダーなし、`rounded-lg`（2rem）。フォーカス時は `primary` 40% の2pxゴーストボーダー＋内側グロー
- **Cards / Lists:** 区切り線禁止。`gap-3` 以上の縦余白 or 背景トーンの交互で区切る。`rounded-xl` で柔らかいシルエット
- **Leaf Navigation:** 標準の bottom-nav を使わず、フローティングドック（`backdrop-blur` + `rounded-full`）。アイコンは lucide-react、`strokeWidth={2.5}`

### Do / Don't

**Do**

- 非対称を受け入れる（画像を中央から少しずらす、カードを背景セクションに跨がせる）
- メジャーセクション間は `gap-8`〜`gap-16` の余白（余白は高級感の骨格）
- 二次テキストは `on-surface-variant` でトーンオントーン

**Don't**

- `#000000` を使わない。常に `on-background`（`#231a0f`）で"ウォームチャコール"を保つ
- `rounded-none` / `rounded-sm` を使わない。すべて"触っても安全"な丸み
- 派手なアニメーションを避ける。`ease-out` で 300〜400ms、庭のペースを模倣

---

## 実装ルール

- カラー・角丸・シャドウ・タイポは `src/app/globals.css` のトークン／ユーティリティ（`garden-gradient`, `card-shadow`, `custom-shadow-green`）に集約し、コンポーネント側でハードコードしない
- 共通パーツ（ボタン・カード・ヘッダー等）は `src/components/` 配下に切り出して再利用する
- アイコンは `lucide-react` を使用する。`strokeWidth={2.5}` でヘッドラインの太さと揃える
- ローディング状態はスケルトン（プレースホルダ要素）で表現する（スピナー禁止）
- UIライブラリ（shadcn/ui, Radix等）は現状導入しない。必要になった時点で都度議論する
