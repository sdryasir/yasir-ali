export const revalidate = 60;
import Hero from "@/components/hero";
import CourseSlider from "@/components/courseslider";


async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
    cache: "no-store" // disables caching if you want fresh data always
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
      {
        categories.map((category)=>{
          return (
            <CourseSlider key={category._id} category={category}/>
          )
        })
      }
      
    </>
  );
}
