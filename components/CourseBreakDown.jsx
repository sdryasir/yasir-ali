'use client';

import { useEffect } from 'react';
import DOMPurify from 'dompurify';

export default function CourseBreakdown({breakdown}) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <section>
      <div className="accordion rounded-0" id="courseAccordion">
        {breakdown.map((item, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header">
              <button
                className="accordion-button d-flex justify-content-between align-items-center collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-course${index}`}
                aria-expanded="false"
                aria-controls={`collapse-course${index}`}
              >
                <span>{item.topicTitle}</span>
                
              </button>
            </h2>
            <div
              id={`collapse-course${index}`}
              className="accordion-collapse collapse"
              data-bs-parent="#courseAccordion"
            >
              <div className="accordion-body text-muted" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description) }}>
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
