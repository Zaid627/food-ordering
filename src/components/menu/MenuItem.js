// import Image from "next/image";
// import { useContext, useState } from "react";
// import { CartContext } from "../AppContext";
// import MenuItemTile from "../../components/menu/MenuItemTile";
// import { motion } from "framer-motion";

// export default function MenuItem(menuItem) {
//   const {
//     image,
//     name,
//     description,
//     basePrice,
//     sizes = [],
//     extraIngredientPrices = [],
//   } = menuItem;

//   const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
//   const [selectedExtras, setSelectedExtras] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [isFlying, setIsFlying] = useState(false);
//   const [flyTarget, setFlyTarget] = useState({ top: 0, left: 0 });

//   const { addToCart } = useContext(CartContext);

//   async function handleAddToCartButtonClick() {
//     const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
//     if (hasOptions && !showPopup) {
//       setShowPopup(true);
//       return;
//     }

//     const targetX = 500; 
//     const targetY = 500;
//     setFlyTarget({ top: targetY, left: targetX });

    
//     setIsFlying(true);

//     addToCart(menuItem, selectedSize, selectedExtras);

//     await new Promise((resolve) => setTimeout(resolve, 1200));
//     setIsFlying(false);
//     setShowPopup(false);
//   }

//   function handleExtraThingClick(e, extraThing) {
//     const checked = e.target.checked;
//     if (checked) {
//       setSelectedExtras((prev) => [...prev, extraThing]);
//     } else {
//       setSelectedExtras((prev) =>
//         prev.filter((e) => e.name !== extraThing.name)
//       );
//     }
//   }

//   let selectedPrice = basePrice;
//   if (selectedSize) selectedPrice += selectedSize.price;
//   if (selectedExtras?.length > 0)
//     for (const extra of selectedExtras) selectedPrice += extra.price;

//   return (
//     <>
//       {showPopup && (
//         <div
//           onClick={() => setShowPopup(false)}
//           className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className="my-8 bg-white p-2 rounded-lg max-w-md relative overflow-hidden"
//           >
//             <div
//               className="overflow-y-scroll p-2"
//               style={{ maxHeight: "calc(100vh - 80px)" }}
//             >
//               <Image
//                 src={image}
//                 alt={name}
//                 width={300}
//                 height={200}
//                 style={{ height: "auto" }}
//                 className="mx-auto"
//               />

//               <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
//               <p className="text-center text-gray-500 text-sm mb-2">
//                 {description}
//               </p>

//               {sizes?.length > 0 && (
//                 <div className="py-2">
//                   <h3 className="text-center text-gray-700">Pick your size</h3>
//                   {sizes.map((size, i) => (
//                     <label
//                       key={i}
//                       className="flex items-center gap-2 p-4 border rounded-md mb-1"
//                     >
//                       <input
//                         type="radio"
//                         onChange={() => setSelectedSize(size)}
//                         checked={selectedSize?.name === size.name}
//                         name="size"
//                       />
//                       {size.name} ($ {basePrice + size.price})
//                     </label>
//                   ))}
//                 </div>
//               )}

//               {extraIngredientPrices?.length > 0 && (
//                 <div className="py-2">
//                   <h3 className="text-center text-gray-700">Any extras?</h3>
//                   {extraIngredientPrices.map((extraThing, i) => (
//                     <label
//                       key={i}
//                       className="flex items-center gap-2 p-4 border rounded-md mb-1"
//                     >
//                       <input
//                         type="checkbox"
//                         onChange={(e) => handleExtraThingClick(e, extraThing)}
//                         checked={selectedExtras
//                           .map((e) => e._id)
//                           .includes(extraThing._id)}
//                         name={extraThing.name}
//                       />
//                       {extraThing.name} ($ {extraThing.price})
//                     </label>
//                   ))}
//                 </div>
//               )}

//               <button
//                 type="button"
//                 className="primary w-full mt-4"
//                 onClick={handleAddToCartButtonClick}
//                 style={{
//                   position: "sticky",
//                   bottom: "2rem",
//                   zIndex: 1000,
//                 }}
//               >
//                 Add to cart ${selectedPrice}
//               </button>

//               <button
//                 className="mt-2 w-full"
//                 onClick={() => setShowPopup(false)}
//               >
//                 Cancel
//               </button>
//             </div>

//             {isFlying && (
//               <motion.div
//                 initial={{
//                   x: 0,
//                   y: 0,
//                   opacity: 1,
//                   scale: 1,
//                   position: "fixed",
//                   top: flyTarget.top,
//                   left: flyTarget.left,
//                 }}
//                 animate={{
//                   x: window.innerWidth - flyTarget.left - 100,
//                   y: -flyTarget.top - 100,
//                   opacity: 0,
//                   scale: 0.2,
//                 }}
//                 transition={{ duration: 1.2, ease: "easeInOut" }}
//                 className="pointer-events-none z-50"
//               >
//                 <Image
//                   src={image}
//                   alt="flying"
//                   width={100}
//                   height={100}
//                   className="rounded-lg shadow-lg"
//                 />
//               </motion.div>
//             )}
//           </div>
//         </div>
//       )}

//       <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
//     </>
//   );
// }


import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import MenuItemTile from "../../components/menu/MenuItemTile";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function MenuItem(menuItem) {
  const {
    image,
    name,
    description,
    basePrice,
    sizes = [],
    extraIngredientPrices = [],
  } = menuItem;

  const { data: session, status } = useSession();
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [flyTarget, setFlyTarget] = useState({ top: 0, left: 0 });

  const { addToCart } = useContext(CartContext);

  async function handleAddToCartButtonClick() {
    if (status !== "authenticated") {
      setShowAuthPopup(true);
      return;
    }

    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }

    const targetX = 500;
    const targetY = 500;
    setFlyTarget({ top: targetY, left: targetX });

    setIsFlying(true);
    addToCart(menuItem, selectedSize, selectedExtras);

    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsFlying(false);
    setShowPopup(false);
  }

  function handleExtraThingClick(e, extraThing) {
    const checked = e.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) =>
        prev.filter((e) => e.name !== extraThing.name)
      );
    }
  }

  let selectedPrice = basePrice;
  if (selectedSize) selectedPrice += selectedSize.price;
  if (selectedExtras?.length > 0)
    for (const extra of selectedExtras) selectedPrice += extra.price;

  return (
    <>
      {/* Auth Required Popup */}
      {showAuthPopup && (
        <div
          onClick={() => setShowAuthPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-md text-center max-w-xs w-full"
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

      {/* Add to Cart Customization Popup */}
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="my-8 bg-white p-2 rounded-lg max-w-md relative overflow-hidden"
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: "calc(100vh - 80px)" }}
            >
              <Image
                src={image}
                alt={name}
                width={300}
                height={200}
                style={{ height: "auto" }}
                className="mx-auto"
              />

              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>

              {sizes?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {sizes.map((size, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        type="radio"
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        name="size"
                      />
                      {size.name} ($ {basePrice + size.price})
                    </label>
                  ))}
                </div>
              )}

              {extraIngredientPrices?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Any extras?</h3>
                  {extraIngredientPrices.map((extraThing, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        type="checkbox"
                        onChange={(e) => handleExtraThingClick(e, extraThing)}
                        checked={selectedExtras
                          .map((e) => e._id)
                          .includes(extraThing._id)}
                        name={extraThing.name}
                      />
                      {extraThing.name} ($ {extraThing.price})
                    </label>
                  ))}
                </div>
              )}

              <button
                type="button"
                className="primary w-full mt-4"
                onClick={handleAddToCartButtonClick}
                style={{
                  position: "sticky",
                  bottom: "2rem",
                  zIndex: 1000,
                }}
              >
                Add to cart ${selectedPrice}
              </button>

              <button
                className="mt-2 w-full"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>

            {isFlying && (
              <motion.div
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  position: "fixed",
                  top: flyTarget.top,
                  left: flyTarget.left,
                }}
                animate={{
                  x: window.innerWidth - flyTarget.left - 100,
                  y: -flyTarget.top - 100,
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
          </div>
        </div>
      )}

      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
