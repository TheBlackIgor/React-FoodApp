import { useReducer } from "react"

import CartContext from "./cart-context"

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount

        const existingItemIndex = state.items.findIndex(item => item.id === action.item.id)

        const existingCartItem = state.items[existingItemIndex]
        let updatedItems;

        if (existingCartItem) {

            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.item)
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    } else if (action.type === "REMOVE") {
        console.log(action.id)
        const existingItemIndex = state.items.findIndex(item => item.id === action.id)
        const existingItem = state.items[existingItemIndex]

        const updatedTotalAmount = state.totalAmount - existingItem.price
        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id)
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
            updatedItems = [...state.items]
            updatedItems[existingItemIndex] = updatedItem
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if (action.type === 'CLEAR') {
        return defaultCartState
    }
    return defaultCartState
}

const CartProvider = props => {
    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState)
    const handleAddItem = item => {
        dispatchCart({ type: "ADD", item: item })
    }

    const handleRemoveItem = id => {
        dispatchCart({ type: "REMOVE", id: id })
    }

    const handleClearCart = () => {
        dispatchCart({ type: "CLEAR" })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: handleAddItem,
        removeItem: handleRemoveItem,
        clearCart: handleClearCart
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider