const { Schema, models, model } = require("mongoose");

const OrderSchema = new Schema(
  {
    userEmail: String,
    phone: String,
    streetAddress: String,
    postalCode: String,
    city: String,
    country: String,
    cartProducts: Object,
    paid: { type: Boolean, default: false },
  },
  { timesStamps: true }
);

const Order = models?.Order || model("Order", OrderSchema);
export default Order;
