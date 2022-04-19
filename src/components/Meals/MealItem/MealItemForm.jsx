import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'
import { useRef, useState } from 'react'

const MealItemForm = props => {
    const [amountIsValid, setAmountIsValid] = useState(true)
    const amountInputRef = useRef()

    const handleSubmit = event => {
        event.preventDefault()

        const enteredAmount = amountInputRef.current.value
        const enteredAmountNmber = +enteredAmount

        if (enteredAmount.trim().length === 0 || enteredAmountNmber < 1) return

        props.onAddToCart(enteredAmountNmber)
    }

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <Input
                ref={amountInputRef}
                label='Amount'
                input={{
                    id: 'amount_' + props.id, // this changed!
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1',
                }}
            />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter valid amount</p>}
        </form>
    )
}

export default MealItemForm