'use client';

import { useState } from 'react';
import ReviewForm from './ReviewForm';
import { Review } from '../../types/Review';

export default function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

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
      <ReviewForm
        onAdd={handleAddReview}
        onUpdate={handleUpdateReview}
        initialRating={1}
        formTitle="新しいレビュー"
        editing={editingReview}
      />

      <h2 className="text-lg font-semibold mt-8 mb-4">みんなのレビュー</h2>
      <ul className="space-y-4">
        {reviews.map((review, index) => (
          <li key={index} className="border p-4 rounded shadow">
            <h3 className="text-xl font-bold">{review.title}</h3>
            <p className="text-sm text-gray-600">{review.content}</p>
            <p className="text-right font-semibold mt-2">{review.rating}/10</p>
            <p className="text-sm text-gray-500 mt-1">
              投稿者：{review.author} / 投稿日：{review.createdAt}
            </p>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => setEditingReview(review)}
                className="text-sm text-blue-500"
              >
                編集
              </button>
              <button
                onClick={() => handleDelete(review.id)}
                className="text-sm text-red-500"
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}