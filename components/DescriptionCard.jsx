'use client';
import { useState } from 'react';
import DOMPurify from 'dompurify';

export default function DescriptionCard({ description }) {
  const [showModal, setShowModal] = useState(false);

  const getPlainText = (html, max = 450) => {
    const el = document.createElement('div');
    el.innerHTML = html;
    const text = el.textContent || el.innerText || '';
    return text.length > max ? text.slice(0, max) + '...' : text;
  };

  return (
    <>
      <div className="card border-0 p-0 mb-3">
        <div className="card-body p-0">
          {/* <h5 className="card-title">{topic.topicTitle}</h5> */}
          <p className="card-text">{getPlainText(description)}</p>
          <button className="btn p-0 btn-sm" style={{color:'blue'}} onClick={() => setShowModal(true)}>
            See More
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-xl modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                {/* <h5 className="modal-title">{topic.topicTitle}</h5> */}
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(description),
                  }}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
