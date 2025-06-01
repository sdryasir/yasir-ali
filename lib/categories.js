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