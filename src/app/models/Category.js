const { Schema, models, model } = require("mongoose");
// const { type } = require("os");

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Category = models?.Category || model("Category", CategorySchema);

export default Category;


