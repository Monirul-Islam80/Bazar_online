import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstant";


export const cartReducer = (state = { cartItem: [],shippingInfo:[] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItem.find(
                (i) => i.product === item.product
            );

            if (isItemExist) {
                return {
                    ...state,
                    cartItem: state.cartItem.map((i) =>
                        i.product === isItemExist.product ? item : i
                    )
                }
            } else {
                return {
                    ...state,
                    cartItem: [...state.cartItem, item]
                }
            }

        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItem: state.cartItem.filter((i) => i.product !== action.payload)
            }
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }


        default:
            return state;

    }
}