import React, { useEffect, useRef } from "react";
import anime from "animejs";

const TimelineTrail = () => {
  const animatedPathRef = useRef(null);

  useEffect(() => {
    if (animatedPathRef.current) {
      const pathLength = animatedPathRef.current.getTotalLength();

      // Set initial style
      animatedPathRef.current.style.strokeDasharray = pathLength;
      animatedPathRef.current.style.strokeDashoffset = pathLength;

      // Animate the path over 40 seconds
      anime({
        targets: animatedPathRef.current,
        strokeDashoffset: [pathLength, 0],
        easing: "linear",
        duration: 40000, // 40 seconds
      });
    }
  }, []);

  return (
    <svg className="w-full h-40" viewBox="0 0 1000 100" preserveAspectRatio="none">
      {/* Gray static path */}
      <path
        d="M 50 50 Q 150 10, 250 50 T 450 50 T 650 50 T 850 50"
        fill="none"
        stroke="#d1d5db"
        strokeWidth="4"
      />

      {/* Green animated path */}
      <path
        ref={animatedPathRef}
        d="M 50 50 Q 150 10, 250 50 T 450 50 T 650 50 T 850 50"
        fill="none"
        stroke="#4ade80"
        strokeWidth="4"
      />
    </svg>
  );
};

export default TimelineTrail;
