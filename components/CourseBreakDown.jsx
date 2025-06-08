'use client';

import { useEffect } from 'react';
import Link from 'next/link';
export default function CourseBreakdown({breakdown}) {
  useEffect(() => {
    // Load Bootstrap's JS for Collapse functionality
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <section>
      <div className="accordion" id="faqAccordion">
        {breakdown.map((item, index) => (
          <div className="accordion-item border rounded mb-3 shadow-sm" key={index}>
            <h2 className="accordion-header">
              <button
                className="accordion-button d-flex justify-content-between align-items-center collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded="false"
                aria-controls={`collapse${index}`}
              >
                <span>{item.weekTitle}</span>
                
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body text-muted">
                {item.description}
                
               </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .accordion-button:focus {
          box-shadow: none;
        }

        .accordion-button:not(.collapsed) .icon-open {
          display: none;
        }

        .accordion-button:not(.collapsed) .icon-close {
          display: inline;
        }

        .accordion-button.collapsed .icon-close {
          display: none;
        }
      `}</style>
    </section>
  );
}
