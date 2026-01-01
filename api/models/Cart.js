import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true },
        products: [
            {
                productId: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ]
    },
    { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;

/*👉 One-to-Many relationship
👉 One cart → many products*/