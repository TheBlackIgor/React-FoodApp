import { useState, useContext, useEffect } from 'react'
import classes from './HeaderCartButton.module.css'

import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'

const HeaderCartButton = props => {
    const [highlightBtn, setHighlightBtn] = useState(false)
    const cartCtx = useContext(CartContext)

    useEffect(() => {
        if (cartCtx.items.length === 0) return
        setHighlightBtn(true)
        const timer = setTimeout(() => {
            setHighlightBtn(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [cartCtx.items])

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)

    const btnClasses = `${classes.button} ${highlightBtn ? classes.bump : ''}`

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton