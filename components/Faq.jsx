'use client';

import { useEffect } from 'react';

export default function FAQ() {
  useEffect(() => {
    // Load Bootstrap's JS for Collapse functionality
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  const faqs = [
    {
      question: 'What is EasyLearn?',
      answer:
        'EasyLearn is a platform that offers affordable programming courses, tutorials, and a supportive community for beginners.',
    },
    {
      question: 'Are the courses beginner-friendly?',
      answer:
        'Yes! All our courses are designed with beginners in mind, offering step-by-step explanations and real-world projects.',
    },
    {
      question: 'Is there a free trial?',
      answer:
        'Many of our resources, including YouTube tutorials, are completely free. Premium content is also available at low prices.',
    },
    {
      question: 'How can I join the community?',
      answer:
        'You can join us by subscribing to our YouTube channel and enrolling in our courses. We also have a growing Discord group for learners.',
    },
  ];

  return (
    <section className="container">
      <h3 className="mb-4 fw-bold">Frequently Asked Questions</h3>
      <div className="accordion" id="faqAccordion">
        {faqs.map((faq, index) => (
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
                <span>{faq.question}</span>
                
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body text-muted">{faq.answer}</div>
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
