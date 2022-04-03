import React from "react";

import classes from './Header.module.css'
import MealsImg from '../../assets/meals.jpeg'

import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {

    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton />
            </header>
            <div className={classes['main-image']}>
                <img src={MealsImg} alt="Meals" />
            </div>
        </React.Fragment>
    )
}

export default Header