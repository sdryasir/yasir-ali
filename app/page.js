import Image from "next/image";
import styles from "./page.module.css";
import Hero from "@/components/hero";
import CourseSlider from "@/components/courseslider";


async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
    cache: "no-store" // disables caching if you want fresh data always
  })

  if (!res.ok) throw new Error("Failed to fetch categories")
  return res.json()
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
