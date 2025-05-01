# 🎬 映画レビューアプリ - 構成と機能詳細まとめ

このドキュメントは、React + TypeScript + Tailwind CSS で作成した「映画レビューアプリ」の構成と、実装済みの主要機能（投稿・一覧表示・更新・削除）について、わかりやすく詳細にまとめたものです。

---

## 🏗️ 現在のファイル構成（簡略）

```
src/
├── app/
│   └── page.tsx               // アプリ全体を表示するページ
├── components/
│   ├── ReviewForm.tsx         // 投稿フォーム（新規・編集兼用）
│   └── ReviewList.tsx         // レビュー一覧と削除・編集ボタン
├── types/
│   └── Review.ts              // Review型の定義
```

---

## 🧩 使用している技術・仕組み

- **React（Next.js App Router 構成）**
- **TypeScript（型安全）**
- **Tailwind CSS（クラスベースのスタイリング）**
- **useState / useEffect（状態管理）**

---

## ✍️ 投稿機能の流れ

### 🔹 入力欄（ReviewForm.tsx）

```tsx
const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [rating, setRating] = useState(initialRating);
const [author, setAuthor] = useState("");
```

### 🔹 投稿処理

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const newReview: Review = {
    id: crypto.randomUUID(),
    title,
    content,
    rating,
    author,
    createdAt: new Date().toLocaleString(),
  };
  onAdd(newReview);
  // 入力欄を初期化
  setTitle("");
  setContent("");
  setAuthor("");
  setRating(initialRating);
};
```

---

## 📋 一覧表示の流れ（ReviewList.tsx）

```tsx
<ul>
  {reviews.map((review) => (
    <li key={review.id} className="border p-4 rounded">
      <h3>{review.title}</h3>
      <p>{review.content}</p>
      <p>{review.rating}/10</p>
      <p>
        投稿者: {review.author} / 投稿日: {review.createdAt}
      </p>
      <button onClick={() => setEditingReview(review)}>編集</button>
      <button onClick={() => handleDelete(review.id)}>削除</button>
    </li>
  ))}
</ul>
```

---

## 🔄 編集機能の流れ

### 🔹 編集ボタンの処理

```tsx
const [editingReview, setEditingReview] = useState<Review | null>(null);

<button onClick={() => setEditingReview(review)}>編集</button>;
```

### 🔹 ReviewForm に渡す

```tsx
<ReviewForm
  editing={editingReview}
  onUpdate={handleUpdateReview}
  ...
/>
```

### 🔹 useEffect で編集内容をセット

```tsx
useEffect(() => {
  if (editing) {
    setTitle(editing.title);
    setContent(editing.content);
    setRating(editing.rating);
    setAuthor(editing.author);
  }
}, [editing]);
```

### 🔹 更新処理

```tsx
if (editing) {
  onUpdate(updatedReview);
} else {
  onAdd(newReview);
}
```

---

## ❌ 削除機能の流れ

### 🔹 削除処理

```tsx
const handleDelete = (id: string) => {
  setReviews(reviews.filter((review) => review.id !== id));
};
```

---

## ✅ 型定義ファイル（Review.ts）

```ts
export type Review = {
  id: string;
  title: string;
  content: string;
  rating: number;
  author: string;
  createdAt: string;
};
```

---

## ✅ 状態管理フローまとめ

| 操作     | 子コンポーネント | 親が持つ処理                    | 更新対象           |
| -------- | ---------------- | ------------------------------- | ------------------ |
| 投稿     | `ReviewForm.tsx` | `onAdd(newReview)`              | `reviews[]` に追加 |
| 一覧表示 | `ReviewList.tsx` | `reviews.map()`                 | 表示だけ           |
| 編集開始 | `ReviewList.tsx` | `setEditingReview(review)`      | `editingReview`    |
| 編集投稿 | `ReviewForm.tsx` | `onUpdate(updatedReview)`       | 該当レビューを更新 |
| 削除     | `ReviewList.tsx` | `handleDelete(id)` → `filter()` | 該当レビューを削除 |

---

以上が、現時点での「映画レビューアプリ」の構成と実装フローです。
今後は「いいねボタン」や「並び替え」「Firebase 保存」などの追加機能も予定しています 🌟
