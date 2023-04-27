import React, { useEffect, useState } from "react";
import { loadHabits } from "../utils/hooks";
import { Habit } from "../utils/models";

interface HabitsByDay {
  [day: string]: string[];
}

export const Calendar: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const daysOfWeek = [
    { name: "Sunday", abbr: "Su" },
    { name: "Monday", abbr: "M" },
    { name: "Tuesday", abbr: "Tu" },
    { name: "Wednesday", abbr: "W" },
    { name: "Thursday", abbr: "Th" },
    { name: "Friday", abbr: "F" },
    { name: "Saturday", abbr: "Sa" },
  ];

  useEffect(() => {
    loadHabits().then((habits) => setHabits(habits));
  }, []);

  // Object mapping each day of the week to an array of habit names
  const habitsByDay: HabitsByDay = daysOfWeek.reduce((acc, day) => {
    // Filter the habits array to include only those that need to be done on this day
    const habitsForDay = habits
      .filter((habit) => habit.days.includes(day.name))
      .map((habit) => habit.name);

    // Add the array of habit names to the accumulator object
    return { ...acc, [day.name]: habitsForDay };
  }, {});

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {habits.map((habit) => (
            <th key={habit.id}>{habit.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {daysOfWeek.map((day) => (
          <tr key={day.name}>
            <td>{day.name}</td>
            {habits.map((habit) => (
              <td key={`${day.name}-${habit.id}`}>
                {habitsByDay[day.name].includes(habit.name) ? "X" : ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
