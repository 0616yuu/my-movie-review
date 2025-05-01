# 🎬 映画レビューアプリ

React × TypeScript × Tailwind CSS を使って作成した映画レビュー投稿アプリです。  
映画のタイトル・感想・評価・投稿者名を入力して、レビューを追加・編集・削除できます。

---

## 🔧 使用技術

- フレームワーク: **Next.js**（App Router構成）
- 言語: **TypeScript**
- UIスタイル: **Tailwind CSS**
- 状態管理: **useState / useEffect**
- コンポーネント構成: **ReviewForm / ReviewList**

---

## 📸 機能一覧

| 機能         | 内容                                                                 |
|--------------|----------------------------------------------------------------------|
| ✅ 投稿       | タイトル、本文、評価（1〜10）、投稿者名を入力してレビュー投稿可能              |
| ✅ 一覧表示   | 投稿されたレビューをリスト形式で表示。タイトル・評価・投稿者名・日付を含む        |
| ✅ 編集       | 任意のレビューを編集モードでフォームに読み込み、上書きして更新可能              |
| ✅ 削除       | 任意のレビューを削除可能                                              |

---

## 🧩 型定義（`types/Review.ts`）

```ts
export type Review = {
  id: string;
  title: string;
  content: string;
  rating: number;
  author: string;
  createdAt: string;
  
---  

## 🧩 ディレクトリ構成（抜粋）  

```ts
  src/
├── app/
│   └── page.tsx
├── components/
│   ├── ReviewForm.tsx
│   └── ReviewList.tsx
├── types/
│   └── Review.ts