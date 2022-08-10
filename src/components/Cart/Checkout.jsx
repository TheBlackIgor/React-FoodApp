import classes from './Checkout.module.css'
import useInput from '../../hooks/use-input'

import { useEffect, useState } from 'react'

function Checkout(props) {
      const [formIsValid, setFormIsValid] = useState(false);
      const {
            value: enteredName,
            isValid: enteredNameIsValid,
            hasError: nameInputIsInvalid,
            handleInputChange: handleInputNameChange,
            handleInputBlur: handleInputNameBlur,
            reset: resetNameInput
      } = useInput(value => value.trim() !== '')

      const {
            value: enteredStreet,
            isValid: enteredStreetIsValid,
            hasError: streetInputIsInvalid,
            handleInputChange: handleInputStreetChange,
            handleInputBlur: handleInputStreetBlur,
            reset: resetStreetInput
      } = useInput(value => value.trim() !== '')

      const {
            value: enteredPostal,
            isValid: enteredPostalIsValid,
            hasError: postalInputIsInvalid,
            handleInputChange: handleInputPostalChange,
            handleInputBlur: handleInputPostalBlur,
            reset: resetPostalInput
      } = useInput(value => value.trim() !== '' && value.trim().length === 6 && value[2] === '-')
      const {
            value: enteredCity,
            isValid: enteredCityIsValid,
            hasError: cityInputIsInvalid,
            handleInputChange: handleInputCityChange,
            handleInputBlur: handleInputCityBlur,
            reset: resetCityInput
      } = useInput(value => value.trim() !== '' && value[0].toUpperCase() === value[0])



      useEffect(() => {

            if (enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid) {
                  setFormIsValid(true)
            } else {
                  setFormIsValid(false)
            }
      }, [enteredNameIsValid, enteredStreetIsValid, enteredPostalIsValid, enteredCityIsValid]);

      const handleConfrim = (e) => {
            e.preventDefault()

            props.onConfirm({
                  name: enteredName,
                  street: enteredStreet,
                  city: enteredCity,
                  postalCode: enteredPostal,
            })

            resetNameInput()
            resetStreetInput()
            resetPostalInput()
            resetCityInput()
      }

      const nameControlClasses = `${classes.control} ${nameInputIsInvalid ? classes.invalid : ''}`;
      const streetControlClasses = `${classes.control} ${streetInputIsInvalid ? classes.invalid : ''}`;
      const postalControlClasses = `${classes.control} ${postalInputIsInvalid ? classes.invalid : ''}`;
      const cityControlClasses = `${classes.control} ${cityInputIsInvalid ? classes.invalid : ''}`;

      return (
            <form className={classes.form} onSubmit={handleConfrim}>
                  <div className={nameControlClasses}>
                        <label htmlFor='name'>Your Name</label>
                        <input
                              value={enteredName}
                              onChange={handleInputNameChange}
                              onBlur={handleInputNameBlur}
                              type='text' id='name' />
                        {nameInputIsInvalid && <p>Please enter a valid name!</p>}
                  </div>
                  <div className={streetControlClasses}>
                        <label htmlFor='street'>Street</label>
                        <input
                              value={enteredStreet}
                              onChange={handleInputStreetChange}
                              onBlur={handleInputStreetBlur}
                              type='text' id='street' />
                        {streetInputIsInvalid && <p>Please enter a valid street!</p>}
                  </div>
                  <div className={postalControlClasses}>
                        <label htmlFor='postal'>Postal Code</label>
                        <input
                              value={enteredPostal}
                              onChange={handleInputPostalChange}
                              onBlur={handleInputPostalBlur}
                              type='text' id='postal' />
                        {postalInputIsInvalid && <p>Please enter a valid postal code (5 characters long)!</p>}
                  </div>
                  <div className={cityControlClasses}>
                        <label htmlFor='city'>City</label>
                        <input
                              value={enteredCity}
                              onChange={handleInputCityChange}
                              onBlur={handleInputCityBlur}
                              type='text' id='city' />
                        {cityInputIsInvalid && <p>Please enter a valid city!</p>}
                  </div>
                  <div className={classes.actions}>
                        <button type='button' onClick={props.onCancel}>
                              Cancel
                        </button>
                        <button className={classes.submit} disabled={!formIsValid}>Confirm</button>
                  </div>
            </form>
      )
}

export default Checkout