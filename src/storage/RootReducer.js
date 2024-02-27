// var initialState = {
//     cart: {
//     }
// }

// export default function RootReducer(state = initialState, action) {
//     switch (action.type) {
//         case 'ADD_SERVICE':
//             state.cart[action.payload[0]] = action.payload[1]
//             return { cart: state.cart }
//         case 'DELETE_SERVICE':
//             delete state.cart[action.payload[0]]
//             return { cart: state.cart }
//         case 'RESET_STATE':
//             return { cart: {} };
//         case 'REFRESH_STATE':
//             return { ...state };
//         default:
//             return { cart: state.cart }
//     }
// }



var initialState = {
    cart: {}
}

export default function RootReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_SERVICE':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    [action.payload[0]]: action.payload[1]
                }
            };
        case 'DELETE_SERVICE':
            const { [action.payload[0]]: deletedItem, ...newCart } = state.cart;
            return { cart: newCart };
        case 'RESET_STATE':
            return { cart: {} };
        case 'REFRESH_CART':
            return { ...state }; // Assuming a refresh just needs to return the current state
        default:
            return state;
    }
}
