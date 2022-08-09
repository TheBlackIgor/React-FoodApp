import { useEffect, useState } from 'react'

import classes from './AvailbleMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem'

const AvailbleMeals = () => {
    const [meals, setmeals] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [httpError, sethttpError] = useState(false);

    const fetchMeals = async () => {
        const response = await fetch('https://foodapp-e4906-default-rtdb.europe-west1.firebasedatabase.app/meals.json')

        if (!response.ok) {
            throw new Error('Something went wrong!')
        }

        const responseData = await response.json()

        const loadedMeals = []

        for (const key in responseData) {
            loadedMeals.push({
                id: key,
                name: responseData[key].name,
                description: responseData[key].description,
                price: responseData[key].price
            })
        }
        setmeals([...loadedMeals])
        setisLoading(false)
    }

    useEffect(() => {
        fetchMeals().catch(error => {
            setisLoading(false)
            sethttpError(error.message)
            console.log(error.message)
        })
    }, []);


    if (isLoading)
        return <section className={classes['loading-meals']}>
            <p>Loading...</p>
        </section>


    if (httpError) {
        return (
            <section className={classes['error-meals']}>
                <p>{httpError}</p>
            </section>
        );
    }

    const mealsList = meals.map(meal => {
        return <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />
    })

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}

export default AvailbleMeals