"use client";

import { useState, useEffect } from "react";
import { Review } from "../../types/Review";

type Props = {
  onAdd: (review: Review) => void;
  onUpdate: (review: Review) => void;
  initialRating: number;
  formTitle: string;
  editing?: Review | null;
  onClose: () => void;
};

export default function ReviewForm({
  onAdd,
  onUpdate,
  initialRating,
  formTitle,
  editing,
  onClose,
}: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(initialRating);
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setContent(editing.content);
      setRating(editing.rating);
      setAuthor(editing.author);
    }
  }, [editing]);

  const ClickSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReview: Review = {
      id: editing ? editing.id : crypto.randomUUID(),
      title,
      content,
      rating,
      author,
      createdAt: editing ? editing.createdAt : new Date().toLocaleString(),
    };

    if (editing) {
      onUpdate(newReview);
    } else {
      onAdd(newReview);
    }

    setTitle("");
    setContent("");
    setAuthor("");
    setRating(initialRating);

    onClose();
  };

  return (
    <div>
      <form onSubmit={ClickSubmit} className="p-10 space-y-6">
        <h2 className="text-lg font-bold">{formTitle}</h2>

        <div>
          <label className="block font-bold">
            タイトル
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full "
              required
            />
          </label>
        </div>

        <div>
          <label className="block font-bold">
            レビュー
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </label>
        </div>

        <div>
          <label className="block font-bold">
            評価（1〜10）
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border p-2 w-full"
              min={1}
              max={10}
              required
            />
          </label>
        </div>

        <div>
          <label className="block font-bold">
            投稿者名
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editing ? "更新する" : "投稿する"}
        </button>
      </form>
    </div>
  );
}
