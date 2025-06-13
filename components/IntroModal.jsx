'use client';

import React, { useEffect } from 'react';

function IntroModal() {
  useEffect(() => {
    const modal = document.getElementById('introVideoModal');
    const iframe = modal?.querySelector('iframe');

    const handleOpen = () => {
      const src = iframe?.getAttribute('data-src');
      if (iframe && src) iframe.setAttribute('src', src + '?autoplay=1');
    };

    const handleClose = () => {
      if (iframe) {
        iframe.setAttribute('src', '');
      }
    };

    modal?.addEventListener('shown.bs.modal', handleOpen);
    modal?.addEventListener('hidden.bs.modal', handleClose);

    // Cleanup
    return () => {
      modal?.removeEventListener('shown.bs.modal', handleOpen);
      modal?.removeEventListener('hidden.bs.modal', handleClose);
    };
  }, []);

  return (
    <div
      className="modal fade"
      id="introVideoModal"
      tabIndex={-1}
      aria-labelledby="introVideoModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <p className='m-0'>Python - The Game Changer</p>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-0">
            <div className="ratio ratio-16x9">
              <iframe
                data-src="https://www.youtube.com/embed/oWKWITWUH8s"
                title="EasyLearn introduction video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroModal;
