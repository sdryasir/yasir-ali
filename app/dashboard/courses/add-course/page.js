// app/dashboard/courses/page.tsx
import CreateCourseForm from '@/components/admin-components/CreateCourseForm';
import { createCourse } from '@/actions/createCourse';
import dbConnect from '@/lib/mongoose';
import Category from '@/models/Category';

export default async function CoursesPage() {
  await dbConnect();
  let categories = await Category.find().lean();
  categories = JSON.parse(JSON.stringify(categories));
  return (
    <div className="p-10">
      <CreateCourseForm categories={categories} onSubmit={createCourse} />
    </div>
  );
}