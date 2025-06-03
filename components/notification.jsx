"use client"
import React from 'react'
import Countdown from './CountDownTimer';

function Notification() {
  const targetDate = '2025-07-03T23:59:59';
  const handleComplete = () => {
    console.log('Countdown complete!');
  };

  return (
    <div className="notification">
    <div className="container-large">
      <div className="text-center">

        <div className="timer-wrapper d-flex justify-content-center gap-3">
          <div className="pre-text">
            <p className='m-0 pre-text-head'>Hurry Up!</p>
            <p className='m-0 pre-text-normal'>Next batch starts</p>
          </div>
          <Countdown targetDate={targetDate} onComplete={handleComplete} />
          <button className='btn text-white fw-bold gradient-border'>Apply Now!</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Notification