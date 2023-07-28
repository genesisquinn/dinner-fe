import { useState } from 'react';
import './meals.css';
import RecipeCard from "../../components/recipecard/recipecard";
import Calendar from "../../components/calendar/calendar";

const Meals = () => {
    const [calendarRecipes, setCalendarRecipes] = useState([]);

    const addToCalendar = (recipeTitle) => {
        setCalendarRecipes([recipeTitle, ...calendarRecipes]);
    };

    const removeFromCalendar = (recipeTitle) => {
        setCalendarRecipes(calendarRecipes.filter((title) => title !== recipeTitle));
    };

    return (
        <div>
            <h1>Meal Planning</h1>
            <div>
                <h2>Meal Planning Calendar</h2>
                <Calendar calendarRecipes={calendarRecipes} />
            </div>
        </div>
    );
};

export default Meals;
