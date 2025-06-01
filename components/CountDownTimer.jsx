'use client';

import { useEffect, useState } from 'react';

export default function Countdown({ targetDate, onComplete }) {
  const [timeLeft, setTimeLeft] = useState({});
  const [isExpired, setIsExpired] = useState(false);

  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    if (difference <= 0) return null;

    return {
      Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      Hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
      Mins: Math.floor((difference / (1000 * 60)) % 60),
      Secs: Math.floor((difference / 1000) % 60),
    };
  };

  useEffect(() => {
    const updateCountdown = () => {
      const updated = calculateTimeLeft();
      if (updated) {
        setTimeLeft(updated);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
        if (onComplete) onComplete();
        clearInterval(timer);
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div>
      <div className="row justify-content-center">
        {['Days', 'Hrs', 'Mins', 'Secs'].map((unit, index) => (
          <div className="col-auto mx-0 px-0" key={index}>
            <div className="" style={{ minWidth: '3rem' }}>
              <div className="timer-body">
                <p className="m-0 p-0 timer-numbers">{timeLeft[unit]}</p>
                <span className="m-0 small timer-units">{unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isExpired && (
        <div className="alert alert-danger">
          ⏰ The countdown has ended!
        </div>
      )}
    </div>
  );
}
