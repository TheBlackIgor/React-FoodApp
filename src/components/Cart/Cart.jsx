import React from 'react'
import { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = props => {
    const cartCtx = useContext(CartContext)
    const [showCheckout, setShowCheckout] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [didSumbit, setDidSumbit] = useState(false);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

    const hasItems = cartCtx.items.length > 0 ? true : false

    const handleRemoveCartItem = id => {
        cartCtx.removeItem(id)
    }

    const handleAddCartItem = item => {
        cartCtx.addItem({ ...item, amount: 1 })
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item => {
                return <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onAdd={handleAddCartItem.bind(null, item)} onRemove={handleRemoveCartItem.bind(null, item.id)} />
            })}
        </ul>
    )

    const handleChangeCheckout = () => {
        setShowCheckout(showCheckout ? false : true)
    }

    const handleSubmitOrder = (userData) => {
        setIsSubmiting(true)
        fetch('https://foodapp-e4906-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        })
        setIsSubmiting(false)
        setDidSumbit(true)

        cartCtx.clearCart()
    }

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={handleChangeCheckout}>Order</button>}
        </div>
    )


    const cartModalContent = <React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {showCheckout && <Checkout onConfirm={handleSubmitOrder} onCancel={handleChangeCheckout} />}
        {!showCheckout && modalActions}
    </React.Fragment>


    const isSubmittingModalContent = <p>Sending order data...</p>

    const didSubmitModalContent = <div>
        <p>Succesfully sent the order!</p>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
    </div>

    return (
        <Modal onClick={props.onClose}>
            {!isSubmiting && !didSumbit && cartModalContent}
            {isSubmiting && isSubmittingModalContent}
            {!isSubmiting && didSumbit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart