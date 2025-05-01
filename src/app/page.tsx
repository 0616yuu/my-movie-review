"use client";

import Header from "@/components/Header";
// import ReviewForm from "@/components/ReviewForm";
import ReviewList from "@/components/ReviewList";
import { useState } from "react";

export default function page() {
  return (
    <div>
      <Header />
      <ReviewList />
    </div>
  );
}
