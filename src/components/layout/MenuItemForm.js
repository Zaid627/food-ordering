import { useEffect, useState } from "react";
import EditableImage from "./EditableImage";
import MenuItemPriceProps from "../layout/MenuItemPriceProps";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [category, setCategory] = useState(menuItem?.category || "");
  const [categories, setCategories] = useState([]);

  const [sizes, setSizes] = useState(
    (menuItem?.sizes || []).map((size) => ({
      name: size.name || "",
      price: size.price ?? "",
    }))
  );

  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    (menuItem?.extraIngredientPrices || []).map((ingredient) => ({
      name: ingredient.name || "",
      price: ingredient.price ?? "",
    }))
  );

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        console.log("Fetched categories:", categories); // 👈 Added console.log
        setCategories(categories);
      });
    });
  }, []);

  return (
    <form
      onSubmit={(e) =>
        onSubmit(e, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraIngredientPrices,
          category,
        })
      }
      className="mt-8 max-w-2xl mx-auto"
    >
      <div
        className="md:grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories?.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>

          <label>Base price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
          />

          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add Item Sizes"}
            props={sizes}
            setProps={setSizes}
          />

          <MenuItemPriceProps
            name={"Extra ingredients"}
            addLabel={"Add ingredients price"}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />
          <button className="mt-2 justify-center" type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
