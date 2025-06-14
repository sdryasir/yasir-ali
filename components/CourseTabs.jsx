'use client';
import { useEffect, useState } from 'react';
import CSlider from './CSlider'; // Your course slider component


async function getCoursesByCategory(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/category/${id}`,{
          next: {
            revalidate: 3600, // 1 hour
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch categories");

      return res.json();
  } catch (error) {
    console.error("Failed", error);
    
  }
}

const CourseTabs = ({ publicCategories }) => {
  const [coursesByCategory, setCoursesByCategory] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      const allCourses = {};
      for (const cat of publicCategories) {
        const courses = await getCoursesByCategory(cat._id);
        allCourses[cat._id] = courses;
      }
      setCoursesByCategory(allCourses);
    };
    fetchCourses();
  }, [publicCategories]);

  
  useEffect(() => {
    if(publicCategories.length>0){
      const wrapper = document.getElementById("tabsWrapper");
          const prevBtn = document.getElementById("prevBtn");
          const nextBtn = document.getElementById("nextBtn");

          const scrollAmount = 150;

          const scrollLeft = () => wrapper.scrollBy({ left: -scrollAmount, behavior: "smooth" });
          const scrollRight = () => wrapper.scrollBy({ left: scrollAmount, behavior: "smooth" });

          const updateButtons = () => {
            const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
            prevBtn.style.display = wrapper.scrollLeft > 10 ? "block" : "none";
            nextBtn.style.display = wrapper.scrollLeft < maxScroll - 10 ? "block" : "none";
          };

          prevBtn.addEventListener("click", scrollLeft);
          nextBtn.addEventListener("click", scrollRight);
          wrapper.addEventListener("scroll", updateButtons);
          window.addEventListener("resize", updateButtons);
          updateButtons();

          return () => {
            prevBtn.removeEventListener("click", scrollLeft);
            nextBtn.removeEventListener("click", scrollRight);
            wrapper.removeEventListener("scroll", updateButtons);
            window.removeEventListener("resize", updateButtons);
          };
    }
    
  }, []);

  if (publicCategories.length === 0) return <p>No categories/Courses found.</p>;

  return (
    <>
      {/* Tabs */}
      <div className="position-relative course-tabs-wrapper">
        <button
          id="prevBtn"
          className="btn btn-light position-absolute start-0 top-50 translate-middle-y z-3"
          style={{ zIndex: 10 }}
        >‹</button>
        <div
          id="tabsWrapper"
          className="overflow-auto"
          style={{ whiteSpace: 'nowrap', scrollbarWidth: 'none' }}
        >
          <ul
            className="nav nav-pills flex-nowrap"
            id="categoryTabs"
            role="tablist"
            style={{ display: 'flex', gap: '0.5rem' }}
          >
            {publicCategories.map((category, index) => (
              <li className="nav-item" key={category._id} role="presentation">
                <button
                  className={`nav-link rounded-0 ${index === 0 ? 'active' : ''}`}
                  id={`tab-${category._id}`}
                  data-bs-toggle="tab"
                  data-bs-target={`#content-${category._id}`}
                  type="button"
                  role="tab"
                  aria-controls={`content-${category._id}`}
                  aria-selected={index === 0}
                >
                  {category.name}
                </button>
              </li>
            ))}
            
          </ul>
        </div>

        <button
          id="nextBtn"
          className="btn btn-light position-absolute end-0 top-50 translate-middle-y z-3"
          style={{ zIndex: 10 }}
        >
          ›
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content mt-3" id="categoryTabContent">
        {publicCategories.map((category, index) => (
          <div
            key={category._id}
            className={`tab-pane bg-light fade ${index === 0 ? 'show active' : ''}`}
            id={`content-${category._id}`}
            role="tabpanel"
            aria-labelledby={`tab-${category._id}`}
          >
            <div className="container p-0 py-2">
              {coursesByCategory[category._id] ? (
                <CSlider courses={coursesByCategory[category._id]} />
              ) : (
                <div><p className='m-0 fw-bold'>Loading courses...</p></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CourseTabs;
