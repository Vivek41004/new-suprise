import React, { useState, useEffect, useRef, useCallback } from "react";

// Questions/answers/buttons/chibi assets (placeholders for your generated images)
const cuteStages = [
  {
    question: "Do you miss me… sometimes or all the time?",
    dodgeLabel: "Sometimes",
    answerLabel: "All the time ❤️",
    modalText: "I knew it! You're my missing piece too 😘",
    chibi: "/images/chibis/chibi-happy.jpg", // Updated to .jpg
  },
  {
    question: "Will you be my favorite snuggle buddy forever?",
    dodgeLabel: "No (never!)",
    answerLabel: "Yes, forever! 🧸",
    modalText: "Yay! You’re my snuggle champion 🏆💖",
    chibi: "/images/chibis/chibi-playful.jpg", // Updated to .jpg
  },
  {
    question: "Am I the sweetest person you know?",
    dodgeLabel: "Maybe someone else…",
    answerLabel: "You’re the SWEETEST 🍯",
    modalText: "You have excellent taste! Sweethearts club only 💗",
    chibi: "/images/chibis/chibi-surprised.jpg", // Updated to .jpg
  },
  {
    question: "If you could hug me right now, would you squeeze tight?",
    dodgeLabel: "Just a tiny squeeze",
    answerLabel: "Big bear hug incoming! 🤗",
    modalText: "OOMF! That was a power hug! I felt it! 🥰",
    chibi: "/images/chibis/chibi-thoughtful.jpg", // Updated to .jpg
  },
];

// New data for the dodge button's specific modal (only chibi is static now)
const dodgeModalChibi = "/images/chibis/chibi-angry.jpg"; // Updated to .jpg

const HeartSparkleBG = () => {
  const [elements, setElements] = useState([]);
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 18; i++) {
      arr.push({
        type: Math.random() > 0.35 ? "heart" : "sparkle",
        left: Math.random() * 99,
        size: 24 + Math.random() * 32,
        delay: Math.random() * 12,
        key: Math.random() * 1e9,
        top: Math.random() * 95,
      });
    }
    setElements(arr);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {elements.map((el) =>
        el.type === "heart" ? (
          <svg
            key={el.key}
            className="absolute animate-floatAndFade"
            style={{
              left: `${el.left}%`,
              top: `${el.top}%`,
              width: el.size,
              height: el.size,
              filter: "drop-shadow(0 0 15px #ffb5d2)",
              opacity: 0.7,
              animationDuration: `${6 + Math.random() * 9}s`,
              animationDelay: `${el.delay}s`,
              zIndex: 0,
            }}
            viewBox="0 0 30 30"
            fill="none"
          >
            <path
              d="M15 26C-6 13 6 2 15 11.5C24 2 36 13 15 26Z"
              fill="#ff6f91"
              stroke="#ffb5d2"
              strokeWidth="2"
            />
          </svg>
        ) : (
          <svg
            key={el.key}
            className="absolute animate-floatAndFade"
            style={{
              left: `${el.left}%`,
              top: `${el.top}%`,
              width: el.size * 0.5,
              height: el.size * 0.5,
              opacity: 0.8,
              filter: "drop-shadow(0 0 11px #fff9e6)",
              animationDuration: `${6 + Math.random() * 8}s`,
              animationDelay: `${el.delay}s`,
              zIndex: 0,
            }}
            viewBox="0 0 20 20"
            fill="none"
          >
            <circle
              cx="10"
              cy="10"
              r="9"
              fill="#fffbe9"
              opacity="0.52"
              stroke="#ffd700"
              strokeWidth="2"
            />
          </svg>
        )
      )}
    </div>
  );
};

export default function App() {
  const [idx, setIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [dodgeModalOpen, setDodgeModalOpen] = useState(false); // New state for dodge modal

  // Next stage/modal
  const handleMainChoice = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setIdx((i) => (i + 1) % cuteStages.length);
    }, 200);
  };

  // New handler for the dodge button
  const handleDodgeChoice = () => {
    setDodgeModalOpen(true);
  };

  // Handler to close the dodge modal (does not change question)
  const handleCloseDodgeModal = () => {
    setDodgeModalOpen(false);
  };

  const current = cuteStages[idx];

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start relative font-quicksand overflow-x-hidden overflow-y-auto"
      style={{
        background: "linear-gradient(135deg, #fff0f5 0%, #fce4ec 75%, #ff80ab 100%)",
        transition: "background 1s",
      }}
    >
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-center py-3 bg-white/70 backdrop-blur-2xl shadow-md border-b-2 border-pink-200 text-pink-600 font-pacifico text-xl sm:text-2xl tracking-tight"
        style={{
          textShadow: "0 1px 16px #ffb6d666, 0 2px 4px #fff",
        }}>
        <span className="inline-flex items-center gap-1">
          <span>👑💕</span>
          Only for my
          <span className="ml-2 text-pink-500 underline underline-offset-2 px-1 rounded-md drop-shadow">
            bestest princess
          </span>
          <span>💖✨</span>
        </span>
        {/* Sparkle */}
        <span className="ml-1 animate-sparkle font-bold">❄️</span>
      </nav>
      {/* Floating BG Hearts & Sparkles */}
      <HeartSparkleBG />

      {/* Foreground: Cute content card */}
      <main
        className="relative flex flex-col justify-center items-center w-full z-20 mt-20"
        style={{ minHeight: "80vh" }}
      >
        <section
          className="relative p-6 sm:p-8 md:p-10 rounded-[3rem] bg-white/80 backdrop-blur-xl border border-pink-200 shadow-2xl mx-auto w-[90vw] max-w-md flex flex-col items-center gap-3 transition-all duration-500"
          style={{
            boxShadow: "0 24px 46px 14px #ffb5d2b2",
            border: "3px solid #ffc1e3",
          }}
        >
          {/* Speech bubble (Question) */}
          <div className="flex flex-col items-center mb-3">
            <div className="relative mb-[-1.4rem]" style={{ filter: "drop-shadow(0 0 14px #fff5)" }}>
              <div
                className="bg-white px-8 py-5 rounded-full border-2 border-pink-200 drop-shadow-lg"
                style={{
                  fontFamily: "'Pacifico', cursive",
                  color: "#ff4081",
                  fontSize: "1.57rem",
                  minWidth: 165,
                  textAlign: "center",
                  boxShadow: "0 0 0 6px #ffe9f586",
                }}
              >
                ❤️ <span className="px-2 align-middle" style={{
                  textShadow: "0 0 10px #ffb7d4c5, 0 2px 0 #fff7",
                }}>{current.question}</span> ❤️
              </div>
              <svg width="32" height="22" className="absolute left-1/2 -translate-x-1/2 top-[99%]">
                <path
                  d="M10 10Q16 22 22 10"
                  stroke="#ffe9f5"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Chibi image */}
          <div className="flex flex-col items-center pb-3">
            <img
              src={current.chibi}
              alt="Chibi character"
              className="w-32 sm:w-40 teddyBounce drop-shadow-lg"
              style={{
                filter: "drop-shadow(0px 6px 12px #ffb7d4cc)",
                minHeight: 82,
              }}
            />
          </div>

          {/* Button row, now using flexbox to center both buttons */}
          <div className="flex justify-center items-center gap-6 w-full mt-2 mb-0 h-[64px] min-h-[64px]">
            {/* Dodge Button - no longer absolutely positioned */}
            <button
              className="select-none pointer-events-auto px-6 py-2
                text-pink-400 border-2 border-pink-100 rounded-full bg-white/80 font-bold font-quicksand text-lg
                transition-all duration-150 shadow-md"
              style={{
                zIndex: 41,
                userSelect: "none",
                cursor: "pointer",
              }}
              onClick={handleDodgeChoice}
              tabIndex="0"
            >
              {current.dodgeLabel}
            </button>
            {/* Main (glowing, huggable) choice - no longer absolutely positioned */}
            <button
              className="px-7 py-2 bg-pink-600 text-white font-pacifico text-lg rounded-full border-2 border-pink-800 shadow-xl animate-pulseGlow
                cursor-pointer transition-all duration-150 outline-none ring-pink-600 focus:ring-4 hover:scale-105"
              style={{
                boxShadow: "0 0 28px #d6336cdd, 0 5px 60px #d6336c99", /* Darker shadow */
                zIndex: 50,
                minWidth: 148,
              }}
              onClick={handleMainChoice}
            >
              {current.answerLabel}
            </button>
          </div>
        </section>
      </main>

      {/* Main Modal (for correct answers) */}
      {modalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/25 backdrop-blur-[2px] transition-all duration-400"
          onClick={handleCloseModal}
          style={{
            animation: "fadeInModal 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none z-10">
            <HeartSparkleBG />
          </div>
          <div
            className="relative z-30 flex flex-col items-center rounded-[2.2rem] gap-4 bg-pink-100/90 shadow-2xl border-2 border-pink-300 px-7 py-10 w-[94vw] max-w-xl mx-auto scale-100 opacity-100 animate-scaleFadeIn"
            style={{
              boxShadow: "0 8px 42px 15px #ffb5d2cc",
              border: "3px solid #ffb5d2",
              animation: "scaleFadeIn 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-5 right-8 text-pink-500 bg-white/80 border border-pink-200 rounded-full shadow-sm w-9 h-9 flex items-center justify-center text-2xl transition hover:bg-pink-100/90"
              aria-label="Close"
              onClick={handleCloseModal}
              style={{ zIndex: 99 }}
            >×</button>
            <img
              src={current.chibi}
              alt="Surprise chibi"
              className="w-40 sm:w-52 teddyBounce drop-shadow-lg"
              style={{
                filter: "drop-shadow(0px 6px 18px #ffb5d2aa)",
                minHeight: 110,
              }}
            />
            <div
              className="font-pacifico text-2xl text-pink-600 mt-2 text-center"
              style={{ lineHeight: 1.13, textShadow: "0 2px 12px #ffe9f5ee" }}
            >
              {current.modalText}
            </div>
            <div className="font-quicksand text-pink-400 mt-2 text-center text-base">
              Tap outside this card, or the "×" to play again.<br />Every round is a brand new&nbsp;surprise!
            </div>
          </div>
        </div>
      )}

      {/* Dodge Modal (for incorrect answers) */}
      {dodgeModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/25 backdrop-blur-[2px] transition-all duration-400"
          onClick={handleCloseDodgeModal}
          style={{
            animation: "fadeInModal 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none z-10">
            <HeartSparkleBG />
          </div>
          <div
            className="relative z-30 flex flex-col items-center rounded-[2.2rem] gap-4 bg-pink-100/90 shadow-2xl border-2 border-pink-300 px-7 py-10 w-[94vw] max-w-xl mx-auto scale-100 opacity-100 animate-scaleFadeIn"
            style={{
              boxShadow: "0 8px 42px 15px #ffb5d2cc",
              border: "3px solid #ffb5d2",
              animation: "scaleFadeIn 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-5 right-8 text-pink-500 bg-white/80 border border-pink-200 rounded-full shadow-sm w-9 h-9 flex items-center justify-center text-2xl transition hover:bg-pink-100/90"
              aria-label="Close"
              onClick={handleCloseDodgeModal}
              style={{ zIndex: 99 }}
            >×</button>
            <img
              src={dodgeModalChibi} // Use angry chibi
              alt="Angry chibi"
              className="w-40 sm:w-52 teddyBounce drop-shadow-lg"
              style={{
                filter: "drop-shadow(0px 6px 18px #ffb5d2aa)",
                minHeight: 110,
              }}
            />
            <div
              className="font-pacifico text-2xl text-pink-600 mt-2 text-center"
              style={{ lineHeight: 1.13, textShadow: "0 2px 12px #ffe9f5ee" }}
            >
              {"Hey! That's not the right answer! You know " + current.question.toLowerCase().replace('?', '!') + " 😉"}
            </div>
            <div className="font-quicksand text-pink-400 mt-2 text-center text-base">
              Hint: You know the right answer! 😉
            </div>
          </div>
        </div>
      )}

      {/* Custom keyframes, sparkle, teddy, floating anim, etc */}
      <style>{`
        body { font-family: 'Quicksand', Arial, sans-serif; }
        .font-pacifico { font-family: 'Pacifico', cursive !important; }
        .font-quicksand { font-family: 'Quicksand', Arial, sans-serif !important; }
        .teddyBounce { animation: teddyBounce 2.2s infinite cubic-bezier(.62,0,.21,1); }
        @keyframes teddyBounce { 0%,100% { transform: translateY(0);} 12% { transform: translateY(-5px);} 24% { transform: translateY(-1px);} 34% { transform: translateY(-12px);} 61% { transform: translateY(2px);} 80% { transform: translateY(-2px);} }
        @keyframes pulseGlow { 0%, 100% { box-shadow: 0 0 18px #ffb5d2cc, 0 5px 32px #ffb5d288;} 60% { box-shadow: 0 0 36px #ff80abbb, 0 8px 40px #ffc1e3d2;} }
        .animate-pulseGlow { animation: pulseGlow 1.6s infinite alternate; }
        @keyframes sparkle { 0% {transform: scale(1) rotate(0deg);} 36% {transform: scale(1.2) rotate(-17deg);} 52% {transform: scale(0.97) rotate(12deg);} 100% {transform: scale(1) rotate(0deg);} }
        .animate-sparkle { animation: sparkle 1.4s infinite linear; }
        @keyframes floatAndFade { 0% { opacity: 0; transform: translateY(30px) scale(0.97);} 20% { opacity: 0.72;} 63% { opacity: 1;} 100% { opacity: 0.2; transform: translateY(-64vh) scale(1.16);} }
        .animate-floatAndFade { animation: floatAndFade 9s linear infinite; }
        @keyframes scaleFadeIn { 0% { opacity: 0; transform: scale(0.75);} 80% { opacity: 1;} 100% { opacity: 1; transform: scale(1);} }
        .animate-scaleFadeIn { animation: scaleFadeIn 0.50s cubic-bezier(.45, 1.3, .23, 1.01) 1;}
        @keyframes fadeInModal { from { background:rgba(0,0,0,0); } to { background:rgba(0,0,0,0.13);} }
        @media only screen and (max-width: 600px) {
          .font-pacifico { font-size: 1.23rem !important; }
        }
      `}</style>
    </div>
  );
}