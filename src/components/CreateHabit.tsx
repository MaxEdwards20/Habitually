import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../lib/firebase";
import { Day, Habit } from "../utils/models";

type CreateHabitProps = {
  habits: Habit[];
  setHabits: (habits: Habit[]) => void;
};

export const CreateHabit = ({ setHabits, habits }: CreateHabitProps) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [daysList, setDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date || !time || !title) {
      console.log("Please fill out all fields");
      return;
    }

    const trueDays = [];
    for (const day in daysList) {
      if (day) {
        trueDays.push(day);
      }
    }

    const habit: Habit = {
      startDate: date,
      time,
      description,
      name: title,
      days: trueDays,
      // How to fix this to allow for type of Day instead of string?
    };

    // Add your habit creation logic here
    console.log("Submitting form with values:", habit);

    const docRef = await addDoc(collection(db, "habits"), habit);
    habit.id = docRef.id;
    setHabits([...habits, habit as Habit]);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-medium mb-4">Create a new habit</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-gray-300 border-solid border-2 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-gray-300 border-solid border-2 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-gray-700 font-medium mb-2"
          >
            Start Date
          </label>
          <input
            id="date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border-gray-300 border-solid border-2 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="time"
            className="block text-gray-700 font-medium mb-2"
          >
            Time
          </label>
          <input
            id="time"
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border-gray-300 border-solid border-2 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <fieldset className="mt-4 items-center">
          <legend className="block text-gray-700 font-bold mb-2">
            Select the days to do this habit
          </legend>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="monday"
              checked={daysList.Monday}
              onChange={(e) =>
                setDays({ ...daysList, Monday: e.target.checked })
              }
              className="form-checkbox h-5 w-5 text-pink-500"
            />
            <label htmlFor="monday" className="ml-2 block text-gray-700">
              Monday
            </label>
          </div>

          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="tuesday"
              checked={daysList.Tuesday}
              onChange={(e) =>
                setDays({ ...daysList, Tuesday: e.target.checked })
              }
              className="form-checkbox h-5 w-5 text-pink-500"
            />
            <label htmlFor="tuesday" className="ml-2 block text-gray-700">
              Tuesday
            </label>
          </div>

          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="wednesday"
              checked={daysList.Wednesday}
              onChange={(e) =>
                setDays({ ...daysList, Wednesday: e.target.checked })
              }
              className="form-checkbox h-5 w-5 text-pink-500"
            />
            <label htmlFor="wednesday" className="ml-2 block text-gray-700">
              Wednesday
            </label>
          </div>

          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="thursday"
              checked={daysList.Thursday}
              onChange={(e) =>
                setDays({ ...daysList, Thursday: e.target.checked })
              }
              className="form-checkbox h-5 w-5 text-pink-500"
            />
            <label htmlFor="thursday" className="ml-2 block text-gray-700">
              Thursday
            </label>
          </div>

          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="friday"
              checked={daysList.Friday}
              onChange={(e) =>
                setDays({ ...daysList, Friday: e.target.checked })
              }
              className="form-checkbox h-5 w-5 text-pink-500"
            />
            <label htmlFor="friday" className="ml-2 block text-gray-700">
              Friday
            </label>
          </div>

          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="saturday"
              checked={daysList.Saturday}
              onChange={(e) =>
                setDays({ ...daysList, Saturday: e.target.checked })
              }
              className="form-checkbox h-5 w-5 text-pink-500"
            />
            <label htmlFor="saturday" className="ml-2 block text-gray-700">
              Saturday
            </label>
          </div>

          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="sunday"
              checked={daysList.Sunday}
              onChange={(e) =>
                setDays({ ...daysList, Sunday: e.target.checked })
              }
              className="form-checkbox h-5 w-5 text-pink-500"
            />
            <label htmlFor="sunday" className="ml-2 block text-gray-700">
              Sunday
            </label>
          </div>
        </fieldset>

        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Add Habit
        </button>
      </form>
    </div>
  );
};
