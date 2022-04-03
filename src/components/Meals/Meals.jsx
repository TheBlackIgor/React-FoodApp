import React from "react";

import MealsSummary from "./MealsSummary";
import AvailbleMeals from "./AvailbleMeals";

const Meals = () => {
    return (
        <React.Fragment>
            <MealsSummary />
            <AvailbleMeals />
        </React.Fragment>
    )
}
export default Meals