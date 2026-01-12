
import Header from "@/components/Header";
import CategoryFilter from "@/components/CategoryFilter";
import MenuGrid from "@/components/MenuGrid";
import { api } from "@/lib/api";
import { Category } from "@/types";
import { Suspense } from "react";

export default async function Home() {
  let categories: Category[] = [];
  try {
    categories = await api.getCategories();
  } catch (e) {
    console.error("Failed to fetch categories:", e);
  }

  return (
    <main className="min-h-screen bg-gray-50/50">
      <Suspense fallback={<div className="h-16 bg-white animate-pulse" />}>
        <Header />
      </Suspense>

      <div className="container mx-auto px-4 md:px-6">
        {/* Banner / Hero Section (Optional, but adds "Wow" factor) */}
        <div className="py-8 md:py-12 ">
          <h2 className="text-5xl text-center md:text-5xl font-extrabold text-gray-900 mb-2">
            Our <span className="text-primary">Menu</span>
          </h2>
          <p className="text-gray-500 max-w-xl text-lg text-center mx-auto">
            Discover our culinary creations. From fresh appetizers to delightful desserts.
          </p>
        </div>

        <div className="sticky top-[80px] z-40 bg-gray-50/95 backdrop-blur-sm -mx-4 px-4 md:mx-0 md:px-0 mb-6">
          <Suspense fallback={<div className="h-12 bg-gray-100 rounded-full animate-pulse" />}>
            <CategoryFilter categories={categories} />
          </Suspense>
        </div>

        <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-4 gap-6"><div className="h-64 bg-gray-200 rounded-2xl animate-pulse" /></div>}>
          <MenuGrid />
        </Suspense>
      </div>
    </main>
  );
}
