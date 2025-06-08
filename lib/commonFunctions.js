export async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
      next: {
        revalidate: 3600, // 1 hour
      },
    })

    if (!res.ok) throw new Error("Failed to fetch categories")
    return res.json()
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
}


export const getTrainings = async ()=> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trainings`, {
      cache: 'no-store', // Disable caching for fresh data
    });

    if (!res.ok) {
      throw new Error("Failed to fetch trainings");
    }

    return res.json();
  } catch (error) {
    console.error("failed fetch trainings", error);
  }
}


export const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');