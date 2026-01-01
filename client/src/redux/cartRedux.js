import { createSlice } from '@reduxjs/toolkit';


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
            state.quantity += 1;
            state.total += action.payload.price * action.payload.quantity;

        }
    }
})
/*Here payload itself is an product object which contains price quantity, etc. */
/*Before we passed price, quantity separately */

export const { addProduct } = cartSlice.actions
//addProduct(payload) Automatically creates this function

export default cartSlice.reducer
//state=initialState
//action={} object we get from the UI dispatch(addProduct({ }))

//action function=addProduct
