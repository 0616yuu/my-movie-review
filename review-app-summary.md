
# 🎬 映画レビューSNSアプリ（仮完成版）

## 📌 アプリ概要
ユーザーが映画に関するレビューを投稿・編集・削除できるアプリケーション。  
レビューはローカルストレージに保存され、リロードしても内容が保持されるようになっています。

---

## 🛠 使用技術スタック
- **Next.js (App Router構成)**
- **React**
- **TypeScript**
- **Tailwind CSS**

---

## ⚙ 機能ごとの解説

### ✅ 1. 投稿機能（`ReviewForm.tsx`）
- モーダルウィンドウとして表示されるフォームで、レビューの投稿が可能。
- 投稿情報は `Review` 型で定義されており、`id, title, content, rating, author, createdAt` を保持。
- `useState` で入力値を管理し、`onSubmit` 時に `onAdd()` を呼び出す。

### ✅ 2. 一覧表示機能（`ReviewList.tsx`）
- `useState` で管理されている `reviews` 配列を `.map()` でループ表示。
- 1件ずつ Tailwind を使ったカードデザインで視認性を高めている。
- `review.id` を `key` にしてReactの最適化も対応済み。

### ✅ 3. 編集機能
- 編集ボタンを押すと、そのレビューを `editingReview` に設定。
- モーダルフォームに過去データが初期値として入り、編集・更新ができる。
- 完了時には `onUpdate()` が呼ばれ、レビュー配列内で該当レビューを差し替える。

### ✅ 4. 削除機能
- `handleDelete(id)` により、レビューを `id` ベースでフィルタリング削除。
- 削除後は自動で再レンダーされ、UIにも反映。

### ✅ 5. ローカル保存機能
- `useEffect` を2回使用：
  - 初回マウント時に `localStorage` から読み込み
  - `reviews` が変わるたびに `localStorage` に保存

---

## 🎨 UI・レイアウトに関する工夫

- **Tailwind CSS** を全面採用し、シンプルで見やすいUIを実現。
- 投稿カードは `max-w-2xl` & `rounded-xl` で見た目を整え、余白や影で柔らかい印象に。
- フォームやボタンも `hover` や `transition` を使って動きのあるデザインに。
- モーダルは `fixed + z-50` により画面全体にオーバーレイ、視認性◎。

---

## 🧩 今後の拡張予定（NEXTステップ）

- ⭐ お気に入り登録機能（ステートで管理）
- 🔍 検索・絞り込み（レビュータイトル/投稿者）
- 🏷 タグ機能（ジャンル分け）
- ☁ Firebase Firestore との連携
- 📱 レスポンシブ最適化（スマホ・タブレット対応）

---

## 📁 コンポーネント構成

```
src/
├── components/
│   ├── Header.tsx
│   ├── ReviewForm.tsx
│   └── ReviewList.tsx
├── types/
│   └── Review.ts
├── app/
│   └── page.tsx
```

---

