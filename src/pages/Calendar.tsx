import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NoHabits } from "../components/NoHabits";
import { db } from "../lib/firebase";
import { getLocation, loadHabits } from "../utils/hooks";
import { Habit, HabitLog } from "../utils/models";
interface HabitsByDay {
  [day: string]: string[];
}

export const Calendar: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const daysOfWeek = [
    { name: "Sunday", abbr: "Su" },
    { name: "Monday", abbr: "M" },
    { name: "Tuesday", abbr: "Tu" },
    { name: "Wednesday", abbr: "W" },
    { name: "Thursday", abbr: "Th" },
    { name: "Friday", abbr: "F" },
    { name: "Saturday", abbr: "Sa" },
  ];

  const months = [
    { name: "January", abbr: "Jan" },
    { name: "February", abbr: "Feb" },
    { name: "March", abbr: "Mar" },
    { name: "April", abbr: "Apr" },
    { name: "May", abbr: "May" },
    { name: "June", abbr: "Jun" },
    { name: "July", abbr: "Jul" },
    { name: "August", abbr: "Aug" },
    { name: "September", abbr: "Sep" },
    { name: "October", abbr: "Oct" },
    { name: "November", abbr: "Nov" },
    { name: "December", abbr: "Dec" },
  ];
  // Object mapping each day of the week to an array of habit names
  const habitsByDay: HabitsByDay = daysOfWeek.reduce((acc, day) => {
    // Filter the habits array to include only those that need to be done on this day
    const habitsForDay = habits
      .filter((habit) => habit.days.includes(day.name))
      .map((habit) => habit.id!!);

    // Add the array of habit names to the accumulator object
    return { ...acc, [day.name]: habitsForDay };
  }, {});
  const [habitsCompleted, setHabitsCompleted] = useState(habitsByDay);

  useEffect(() => {
    loadHabits().then((habits) => {
      console.log("Calendar habits:", habits);
      setHabits(habits);
      setIsLoaded(true);
    });
  }, []);

  const handleHabitLog = async (day: string, habit: Habit) => {
    // Update state
    const newHabitsCompleted = { ...habitsCompleted };
    if (newHabitsCompleted[day].includes(habit.id!!)) {
      newHabitsCompleted[day] = newHabitsCompleted[day].filter(
        (id) => id !== habit.id!!
      );
    } else {
      newHabitsCompleted[day] = [...newHabitsCompleted[day], habit.id!!];
    }
    setHabitsCompleted(newHabitsCompleted);

    // Save the values
    const { lat, long } = await getLocation();
    const habitRef = doc(db, "habits", habit.id!!);
    const habitDoc = await getDoc(habitRef);
    if (!habitDoc.exists()) {
      console.log("No such document!");
      return;
    }
    const habitLog: HabitLog = {
      habitId: habit.id!!,
      createdAt: new Date().toISOString(),
      dayCompleted: day,
      lat,
      long,
    };
    const habitLogRef = collection(habitDoc.ref, "habitLogs");
    const res = await addDoc(habitLogRef, habitLog);
  };

  if (!isLoaded) return <div className=" py-4 ">Loading...</div>;
  if (habits.length === 0) return <NoHabits></NoHabits>;

  const date = new Date();
  const displayDay =
    daysOfWeek[date.getDay()].name +
    ", " +
    months[date.getMonth()].name +
    " " +
    +date.getDate();

  return (
    <div className="mt-16 bg-white rounded-lg shadow overflow-hidden">
      <div className="text-4xl text-left px-4 py-2">Log for {displayDay}</div>
      <table className="min-w-full leading-normal">
        <thead className="bg-pink-500 text-white">
          <tr>
            <th
              scope="col"
              className="px-5 py-3 text-center text-xs font-medium uppercase tracking-wider"
            ></th>
            {habits.map((habit) => (
              <th
                key={habit.id}
                scope="col"
                className="px-3 py-3 text-center text-lg font-medium uppercase tracking-wider"
              >
                {habit.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day) => (
            <tr
              key={day.name}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="px-5 py-5 text-sm font-medium text-gray-900 whitespace-nowrap">
                {day.name}
              </td>
              {habits.map((habit) => (
                <td key={`${day.name}-${habit.id}`} className="text-center">
                  {habitsByDay[day.name].includes(habit.id!!) ? (
                    <input
                      type="checkbox"
                      checked={habitsCompleted[day.name].includes(habit.id!!)}
                      onChange={() => handleHabitLog(day.name, habit)}
                    />
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
