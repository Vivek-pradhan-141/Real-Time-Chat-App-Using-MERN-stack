// import { createPortal } from "react-dom";
// import { AlertTriangle, XCircle, CheckCircle } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useThemeStore } from "../store/useThemeStore.js";

// function ConfirmPopup({ message, onConfirm, onCancel }) {
//   const [animateIn, setAnimateIn] = useState(false);
//   const {theme} = useThemeStore();

//   useEffect(() => {
//     setAnimateIn(true);
//     const handleKeyDown = (e) => {
//       if (e.key === "Enter" || e.key.toLowerCase() === "y") onConfirm();
//       if (e.key === "Escape" || e.key.toLowerCase() === "n") onCancel();
//     };
//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [onConfirm, onCancel]);

//   return createPortal(
//     <div className="fixed inset-0 z-[9999]">
//       <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
//       <div className="relative w-full h-full flex items-start justify-center pt-24 drop-shadow-[0_0_5px_rgba(156,163,175,0.8)]">
//         <div
//           className={` p-12 rounded-2xl shadow-2xl w-80 flex flex-col items-center text-center
//             transform transition-all duration-500 ease-out
//             ${animateIn ? "animate-slideDownBounce" : "-translate-y-5 opacity-0"}`}
//             data-theme = {theme}
//         >
//           <AlertTriangle className="w-12 h-12 text-yellow-400 mb-3  drop-shadow-[0_0_8px_rgba(255,255,150,0.9)] " />
//           <p className="text-lg text-base-content/70 font-medium mb-6">{message}</p>
//           <p className="text-xs text-base-content/70 mb-8">
//             Press <b>Y / Enter</b> to confirm, <b>N / Esc</b> to cancel
//           </p>
//           <div className="flex gap-8">
//             <button onClick={onCancel} className="btn  hover:drop-shadow-[0_0_5px_rgba(255,0,0,0.8)] hover:text-red-800 text-base-content/70 font-bold">
//               <XCircle className="size-4" /> No
//             </button>
//             <button onClick={onConfirm} className="btn  hover:text-green-900 hover:drop-shadow-[0_0_5px_rgba(0,255,0,0.8)] text-base-content/70 font-bold">
//               <CheckCircle className="size-4" /> Yes
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>,
//     document.body // Mount outside navbar
//   );
// }

// export default ConfirmPopup;








import { createPortal } from "react-dom";
import { AlertTriangle, XCircle, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useThemeStore } from "../store/useThemeStore.js";



export default function ConfirmPopup({ message, onConfirm, onCancel }) {
  const [animateIn, setAnimateIn] = useState(false);
  const { theme } = useThemeStore();

  useEffect(() => {
    setAnimateIn(true);

    const handleKeyDown = (e) => {
      if (e.key === "Enter" || e.key.toLowerCase() === "y") {
        onConfirm();
      }
      if (e.key === "Escape" || e.key.toLowerCase() === "n") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onConfirm, onCancel]);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex  justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm " />

      <div
        className={`relative z-10 drop-shadow-[0_0_8px_rgba(156,163,175,0.8)] p-12 rounded-2xl shadow-2xl flex flex-col items-center text-center 
        transform transition-all duration-500 ease-out w-80 h-[350px] mt-14
        ${animateIn ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"}`}
        data-theme={theme}
      >
        <AlertTriangle className="w-12 h-12 text-yellow-400 mb-3 drop-shadow-[0_0_8px_rgba(255,255,150,0.9)]" />

        <p className="text-lg font-medium mb-6 text-base-content/70">{message}</p>
        <p className="text-xs mb-8 font-semibold text-base-content/70">
          Press <b>Y / Enter</b> to confirm, <b>N / Esc</b> to cancel
        </p>

        <div className="flex gap-8">
          <button onClick={onCancel} className="btn  hover:drop-shadow-[0_0_5px_rgba(255,0,0,0.8)] hover:text-red-800 text-base-content/70 font-bold">
            <XCircle className="size-4" /> No
          </button>
          <button onClick={onConfirm} className="btn  hover:text-green-900 hover:drop-shadow-[0_0_5px_rgba(0,255,0,0.8)] text-base-content/70 font-bold">
            <CheckCircle className="size-4" /> Yes
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
