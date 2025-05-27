export const dynamic = "force-dynamic";

import Hero from "@/components/hero";
import CourseSlider from "@/components/courseslider";
import Review from "@/components/Review";


async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
      next: {
        revalidate: 3600, // 1 hour
      },
    })

    if (!res.ok) throw new Error("Failed to fetch categories")
    return res.json()
  } catch (error) {
    console.error("Fetch failed 11:", error);
  }
}

export default async function Home() {
  const categories = await getCategories();  
  return (
    <>
      <Hero/>
      {!categories ? (
          <p>Loading categories...</p>
        ) : categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          categories.map((category) => (
            <CourseSlider key={category._id} category={category} />
          ))
        )}
      <Review/>
    </>
  );
}
