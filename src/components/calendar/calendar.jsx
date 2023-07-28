import { useState } from 'react';
import './Calendar.css';


const Calendar = ({ calendarRecipes, removeFromCalendar }) => {
    return (
        <div className="calendar">
            <table>
                <thead>
                    <tr>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {Array.from({ length: 7 }).map((_, index) => {
                            const recipeTitle = calendarRecipes[index] || null;
                            return (
                                <td key={index}>
                                    {recipeTitle && (
                                        <>
                                            <p>{recipeTitle}</p>
                                            <button className="remove-button" onClick={() => removeFromCalendar(recipeTitle)}>
                                                Remove
                                            </button>
                                        </>
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;
