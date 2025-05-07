"use client";

import { useState, useEffect, use } from "react";
import ReviewForm from "./ReviewForm";
import { Review } from "../../types/Review";

export default function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* 読み込み処理（最初の一回だけ） 1番目*/
  useEffect(() => {
    const saved = localStorage.getItem("reviews");
    if (saved) {
      setReviews(JSON.parse(saved));
    }
  }, []);
  /* 保存処理（レビュー配列が変わるたびに保存） ２番目*/
  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleAddReview = (newReview: Review) => {
    setReviews([newReview, ...reviews]);
  };

  const handleDelete = (id: string) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  const handleUpdateReview = (updated: Review) => {
    setReviews(reviews.map((r) => (r.id === updated.id ? updated : r)));
    setEditingReview(null); // 編集終了！
  };

  return (
    <div className="p-4">
      {/*　投稿ボタン */}
      <div className="mb-6 text-right">
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => {
            setEditingReview(null);
            setIsModalOpen(true);
          }}
        >
          + レビューを書く
        </button>
      </div>

      {/*　モーダルウィンドウ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <ReviewForm
              onAdd={handleAddReview}
              onUpdate={handleUpdateReview}
              initialRating={1}
              formTitle="新しいレビュー"
              editing={editingReview}
              onClose={() => {
                setIsModalOpen(false);
                setEditingReview(null);
              }}
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute text-xl text-gray-400 top-2 right-3 hover:text-gray-600"
            >
              x
            </button>
          </div>
        </div>
      )}
      <h2 className="pb-2 mt-12 mb-6 text-2xl font-bold tracking-wide text-blue-800 border-b border-gray-500">
        みんなのレビュー
      </h2>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li
            key={review.id}
            className="max-w-2xl p-6 mx-auto space-y-4 text-gray-900 bg-white border border-gray-200 shadow-md rounded-xl"
          >
            <h3 className="text-2xl font-bold">{review.title}</h3>

            <p className="text-base leading-relaxed text-gray-700">
              {review.content}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="italic">投稿者: {review.author}</span>
              <span>{review.createdAt}</span>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-yellow-500">
                {review.rating}/10
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingReview(review);
                    setIsModalOpen(true);
                  }}
                  className="px-3 py-1 text-sm text-white transition bg-indigo-500 rounded-full hover:bg-indigo-600"
                >
                  編集
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="px-3 py-1 text-sm text-white transition bg-red-500 rounded-full hover:bg-red-600"
                >
                  削除
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
