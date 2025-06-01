export const dynamic = "force-dynamic";

import Hero from "@/components/hero";
import CourseSlider from "@/components/courseslider";
import Review from "@/components/Review";
import { getCategories } from "@/lib/categories";

export default async function Home() {
  const categories = await getCategories();  
  return (
    <>
      <Hero/>
      {!categories ? (
          <p>Loading categories...</p>
        ) : categories?.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          categories?.map((category) => (
              category.status == 'public'? <CourseSlider key={category._id} category={category} />:null
          ))
        )}
      <Review/>
    </>
  );
}
