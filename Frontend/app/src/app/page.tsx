import Header from "@/components/Header";
import CategoryFilter from "@/components/CategoryFilter";
import MenuGrid from "@/components/MenuGrid";
import Hero from "@/components/Hero";
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
    <main className="min-h-screen bg-background dark:bg-slate-950 transition-colors duration-500">
      <Suspense fallback={<div className="h-20 bg-white dark:bg-slate-900 animate-pulse" />}>
        <Header />
      </Suspense>

      <div className="container mx-auto px-4 md:px-6">
        {/* Banner / Hero Section*/}
        <Hero />

        <div className="sticky top-[80px] md:top-[96px] z-40 bg-background/95 dark:bg-slate-950/95 backdrop-blur-md -mx-4 px-4 md:mx-0 md:px-0 mb-8 py-2 border-b border-transparent dark:border-slate-800/50">
          <Suspense fallback={<div className="h-14 bg-gray-100 dark:bg-slate-800 rounded-full animate-pulse" />}>
            <CategoryFilter categories={categories} />
          </Suspense>
        </div>

        <Suspense fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-100 dark:bg-slate-800 rounded-[2rem] animate-pulse" />
            ))}
          </div>
        }>
          <MenuGrid />
        </Suspense>
      </div>
    </main>
  );
}
