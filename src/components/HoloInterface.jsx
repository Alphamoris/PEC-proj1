import React, { useState, useEffect, useRef } from "react";

const HoloInterface = ({ onAnimationComplete }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [count, setCount] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [showCircularText, setShowCircularText] = useState(true);
  const [fadeOutLoader, setFadeOutLoader] = useState(false);
  const [fadeOutCount, setFadeOutCount] = useState(false);
  const [rotationComplete, setRotationComplete] = useState(false);
  const [fadeOutAllText, setFadeOutAllText] = useState(false);
  const ringsRef = useRef(null);
  const textPathRef = useRef(null);
  const topRingRef = useRef(null);
  const dottedRingRef = useRef(null);
  const middleRingRef = useRef(null);
  const innerRingRef = useRef(null);
  const progressRingRef = useRef(null);
  const countTextRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const countUp = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount >= 100) {
          clearInterval(countUp);
          setIsRotating(true);
          return 100;
        }
        return prevCount + 1;
      });
    }, 30);

    return () => {
      clearInterval(timer);
      clearInterval(countUp);
    };
  }, []);

  useEffect(() => {
    if (isRotating) {
      if (
        topRingRef.current &&
        dottedRingRef.current &&
        middleRingRef.current &&
        innerRingRef.current &&
        textPathRef.current
      ) {
        const spinAngle = 180;

        const topRing = topRingRef.current;
        topRing.style.transition = "transform 0.5s ease-in-out";
        topRing.style.transform = `rotate(${spinAngle}deg)`;

        const dottedRing = dottedRingRef.current;
        dottedRing.style.transition = "transform 0.5s ease-in-out";
        dottedRing.style.transform = `rotate(${spinAngle}deg)`;

        const middleRing = middleRingRef.current;
        middleRing.style.transition = "transform 0.5s ease-in-out";
        middleRing.style.transform = `rotate(${spinAngle}deg)`;

        const innerRing = innerRingRef.current;
        innerRing.style.transition = "transform 0.5s ease-in-out";
        innerRing.style.transform = `rotate(${spinAngle}deg)`;

        const circularText = textPathRef.current;
        circularText.style.transition = "transform 0.5s ease-in-out";
        circularText.style.transform = `rotate(${spinAngle}deg)`;

        setTimeout(() => {
          topRing.style.transition = "none";
          topRing.style.transform = "rotateX(0) rotateY(0) rotateZ(0)";

          dottedRing.style.transition = "none";
          dottedRing.style.transform = "rotateX(0) rotateY(0) rotateZ(0)";

          middleRing.style.transition = "none";
          middleRing.style.transform = "rotateX(0) rotateY(0) rotateZ(0)";

          innerRing.style.transition = "none";
          innerRing.style.transform = "rotateX(0) rotateY(0) rotateZ(0)";

          circularText.style.transition = "none";
          circularText.style.transform = "rotate(0)";

          void topRing.offsetHeight;

          topRing.style.transition = "transform 1s ease-in-out";
          topRing.style.transform = "rotateX(360deg)";

          dottedRing.style.transition = "transform 1s ease-in-out";
          dottedRing.style.transform = "rotateY(360deg)";

          middleRing.style.transition = "transform 1s ease-in-out";
          middleRing.style.transform = "rotateZ(360deg)";

          innerRing.style.transition = "transform 1s ease-in-out";
          innerRing.style.transform = "rotateX(360deg) rotateY(360deg)";

          circularText.style.transition = "transform 1s ease-in-out";
          circularText.style.transform = "rotate(360deg)";

          setTimeout(() => {
            topRing.style.transition = "transform 0.8s ease-in-out";
            topRing.style.transform = "rotateX(90deg)";

            dottedRing.style.transition = "transform 0.8s ease-in-out";
            dottedRing.style.transform = "rotateX(90deg)";

            middleRing.style.transition = "transform 0.8s ease-in-out";
            middleRing.style.transform = "rotateX(90deg)";

            innerRing.style.transition = "transform 0.8s ease-in-out";
            innerRing.style.transform = "rotateX(90deg)";

            circularText.style.transition =
              "opacity 0.5s ease-out, transform 0.8s ease-in-out";
            circularText.style.transform = "rotateX(90deg)";
            circularText.style.opacity = "0";

            setFadeOutLoader(true);
            setFadeOutCount(true);
            setRotationComplete(true);
            setIsRotating(false);
            setFadeOutAllText(true);

            setTimeout(() => {
              if (onAnimationComplete) {
                onAnimationComplete();
              }
            }, 1000);
          }, 1000);
        }, 100);
      }
    }
  }, [isRotating, onAnimationComplete]);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };

  const circumference = 2 * Math.PI * 140;
  const strokeDashoffset = circumference - (count / 100) * circumference;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-transparent">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Bree+Serif&family=Passion+One:wght@400;700;900&display=swap');
          
          @media (max-width: 640px) {
            .local-time {
              display: none;
            }
            
            .circular-text {
              font-size: 8px !important;
              letter-spacing: 1px !important;
            }
            
            .count-text {
              font-size: 32px !important;
              letter-spacing: 5px !important;
            }
            
            .bottom-left-text {
              font-size: 16px !important;
            }
            
            .bottom-right-text {
              font-size: 10px !important;
            }
          }
        `}
      </style>

      <div className="relative z-10 w-full h-full text-white">
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@300;500&display=swap"
          rel="stylesheet"
        />

        <div
          className="absolute top-4 left-4 text-xl text-gray-300 flex space-x-4 font-semibold transition-opacity duration-500 ease-out"
          style={{ opacity: fadeOutAllText ? 0 : 1 }}
        >
          December, 2025
        </div>
        <div
          className="local-time absolute top-4 right-4 text-xl text-gray-300 font-semibold transition-opacity duration-500 ease-out"
          style={{ opacity: fadeOutAllText ? 0 : 1 }}
        >
          Local time: {formatTime(currentTime)}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 500 500" className="w-[85vmin] h-[85vmin]">
            <defs>
              <path
                id="circlePath"
                d="M250,250 m-200,0 a200,200 0 1,1 400,0 a200,200 0 1,1 -400,0"
                fill="none"
              />
              <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <g ref={ringsRef} className="origin-center">
              <circle
                ref={topRingRef}
                cx="250"
                cy="250"
                r="220"
                stroke="rgba(156, 163, 175, 0.2)"
                strokeWidth="2"
                fill="none"
                className="origin-center"
              />

              <circle
                ref={dottedRingRef}
                cx="250"
                cy="250"
                r="200"
                stroke="rgba(156, 163, 175, 0.3)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="4"
                className="origin-center"
              />

              {showCircularText && (
                <text
                  ref={textPathRef}
                  fill="#999"
                  fontSize="10"
                  letterSpacing="2"
                  fontFamily="'Bree Serif', serif"
                  className="circular-text origin-center"
                  style={{
                    opacity: 1,
                    transition:
                      "opacity 0.5s ease-out, transform 0.5s ease-in-out",
                  }}
                >
                  <textPath href="#circlePath" startOffset="0%">
                    PEC HACKS 3.0 • PEC HACKS 3.0 • PEC HACKS 3.0 • PEC HACKS
                    3.0 • PEC HACKS 3.0 • PEC HACKS 3.0 • PEC HACKS 3.0 • PEC
                    HACKS 3.0 • PEC HACKS 3.0 • PEC HACKS 3.0 • PEC HACKS 3.0 •
                    PEC HACKS 3.0 • PEC HACKS 3.0 • PEC HACKS 3.0 • PEC HACKS
                    3.0 • PEC HACKS 3.0 • PEC HACKS 3.0 •
                  </textPath>
                </text>
              )}

              <circle
                ref={middleRingRef}
                cx="250"
                cy="250"
                r="140"
                stroke="rgba(156, 163, 175, 0.1)"
                strokeWidth="1"
                fill="none"
                className="origin-center"
              />

              <circle
                ref={progressRingRef}
                cx="250"
                cy="250"
                r="140"
                stroke={count === 100 ? "#4ade80" : "rgba(74, 222, 128, 0.7)"}
                strokeWidth={count === 100 ? "2" : "1"}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 250 250)"
                className="transition-all duration-75 ease-linear"
                filter={count === 100 ? "url(#glow)" : "none"}
                style={{
                  opacity: fadeOutLoader ? 0 : 1,
                  transition: "opacity 0.5s ease-out",
                }}
              />

              <circle
                ref={innerRingRef}
                cx="250"
                cy="250"
                r="85"
                stroke="rgba(156, 163, 175, 0.3)"
                strokeWidth="2"
                fill="none"
                className="origin-center"
              />
            </g>

            <text
              ref={countTextRef}
              x="250"
              y="260"
              fontFamily="'Orbitron', sans-serif"
              fontSize="45"
              fill="#4ade80"
              textAnchor="middle"
              className="count-text"
              style={{
                fontWeight: 300,
                opacity: fadeOutCount ? 0 : 1,
                transition: "opacity 0.5s ease-out",
              }}
            >
              {count}
            </text>
          </svg>
        </div>

        <div
          className="absolute bottom-6 left-6 text-white text-lg space-y-1 font-mono transition-opacity duration-500 ease-out bottom-left-text"
          style={{ opacity: fadeOutAllText ? 0 : 1 }}
        >
          <p className="text-sm text-gray-400">
            since <span className="text-white">2025</span>
          </p>
          <p className="font-bold text-2xl">Tamilnadu's</p>
          <p className="font-bold text-2xl">Largest</p>
          <p className="font-bold text-2xl tracking-widest">Hackathon</p>
        </div>

        <div
          className="absolute bottom-6 right-6 text-2xl text-white font-bold space-y-1 text-right transition-opacity duration-500 ease-out bottom-right-text"
          style={{ opacity: fadeOutAllText ? 0 : 1 }}
        >
          <p>36 - hr</p>
          <p>Hackathon</p>
        </div>
      </div>
    </div>
  );
};

export default HoloInterface;
