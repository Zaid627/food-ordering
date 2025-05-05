// import React, { useRef, useState } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function AddToCartButton({
//   hasSizesOrExtras,
//   onClick,
//   basePrice,
//   image,
// }) {
//   const [isFlying, setIsFlying] = useState(false);
//   const [flyStyle, setFlyStyle] = useState({ top: 0, left: 0 });

//   const buttonRef = useRef(null);

//   const handleClick = () => {
//     if (buttonRef.current) {
//       const rect = buttonRef.current.getBoundingClientRect();
//       setFlyStyle({
//         top: rect.top,
//         left: rect.left,
//       });
//     }

//     setIsFlying(true);

//     setTimeout(() => {
//       onClick();
//       setIsFlying(false);
//     }, 1200);
//   };

//   if (!hasSizesOrExtras && image) {
//     return (
//       <div className="relative mt-4 inline-block">
//         {isFlying && (
//           <motion.div
//             initial={{
//               x: 0,
//               y: 0,
//               opacity: 1,
//               scale: 1,
//               position: "fixed",
//               top: flyStyle.top,
//               left: flyStyle.left,
//             }}
//             animate={{
//               x: window.innerWidth - flyStyle.left - 100,
//               y: -flyStyle.top - 100,
//               opacity: 0,
//               scale: 0.2,
//             }}
//             transition={{ duration: 1.2, ease: "easeInOut" }}
//             className="pointer-events-none z-50"
//           >
//             <Image
//               src={image}
//               alt="flying"
//               width={100}
//               height={100}
//               className="rounded-lg shadow-lg"
//             />
//           </motion.div>
//         )}

//         <button
//           type="button"
//           ref={buttonRef}
//           onClick={handleClick}
//           className="bg-[#f13a01] text-white rounded-full px-8 py-2"
//         >
//           Add to Cart ${basePrice}
//         </button>
//       </div>
//     );
//   }

//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="mt-4 bg-[#f13a01] text-white rounded-full px-8 py-2"
//     >
//       <span>Add to cart (From ${basePrice})</span>
//     </button>
//   );
// }

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  basePrice,
  image,
}) {
  const { data: session, status } = useSession();

  const [isFlying, setIsFlying] = useState(false);
  const [flyStyle, setFlyStyle] = useState({ top: 0, left: 0 });
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const buttonRef = useRef(null);

  const handleClick = () => {
    if (status !== "authenticated") {
      setShowAuthPopup(true);
      return;
    }

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setFlyStyle({
        top: rect.top,
        left: rect.left,
      });
    }

    setIsFlying(true);

    setTimeout(() => {
      onClick();
      setIsFlying(false);
    }, 1200);
  };

  return (
    <>
      {/* Auth popup */}
      {showAuthPopup && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowAuthPopup(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-md text-center max-w-xs w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-2">Please Sign Up</h2>
            <p className="text-gray-600 mb-4">
              You must be logged in to add items to your cart.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowAuthPopup(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <a
                href="/register"
                className="px-4 py-2 bg-[#f13a01] text-white rounded"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Animated button (if no options) */}
      {image && !hasSizesOrExtras ? (
        <div className="relative mt-4 inline-block">
          {isFlying && (
            <motion.div
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                position: "fixed",
                top: flyStyle.top,
                left: flyStyle.left,
              }}
              animate={{
                x: window.innerWidth - flyStyle.left - 100,
                y: -flyStyle.top - 100,
                opacity: 0,
                scale: 0.2,
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="pointer-events-none z-50"
            >
              <Image
                src={image}
                alt="flying"
                width={100}
                height={100}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          )}

          <button
            type="button"
            ref={buttonRef}
            onClick={handleClick}
            className="bg-[#f13a01] text-white rounded-full px-8 py-2"
          >
            Add to Cart ${basePrice}
          </button>
        </div>
      ) : (
        // Basic button (with customization popup)
        <button
          type="button"
          onClick={handleClick}
          className="mt-4 bg-[#f13a01] text-white rounded-full px-8 py-2"
        >
          <span>Add to cart (From ${basePrice})</span>
        </button>
      )}
    </>
  );
}
