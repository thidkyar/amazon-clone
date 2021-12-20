import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const index = state.items.findIndex(
                (basketItem) => basketItem.id === action.payload.id
            );

            if (index === -1) {
                state.items = [
                    ...state.items,
                    { ...action.payload, quantity: 1 },
                ];
            } else {
                const newBasket = state.items.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                state.items = newBasket;
            }
        },
        removeFromBasket: (state, action) => {
            const index = state.items.findIndex(
                (basketItem) => basketItem.id === action.payload.id
            );
            let newBasket = [...state.items];
            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    `Cant remove product (id: ${action.payload.id}) as its not in the basket`
                );
            }

            state.items = newBasket;
        },
        addQuantity: (state, action) => {
            const newBasket = state.items.map((item) =>
                item.id === action.payload.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

            state.items = newBasket;
        },
        removeQuantity: (state, action) => {
            const newBasket = state.items.map((item) =>
                item.id === action.payload.id
                    ? {
                          ...item,
                          quantity: item.quantity !== 1 ? item.quantity - 1 : 1,
                      }
                    : item
            );
            state.items = newBasket;
        },
    },
});

export const { addToBasket, removeFromBasket, addQuantity, removeQuantity } =
    basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
    state.basket.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

export default basketSlice.reducer;
