import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { HiUserCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { CreateHabit } from "../components/CreateHabit";
import { Modal } from "../components/Modal";
import { AuthContext } from "../contexts/AuthContext";
import { db } from "../lib/firebase";
import { logout } from "../utils/hooks";
import { Habit } from "../utils/models";
import { Calendar } from "./Calendar";
import { HabitMap } from "./HabitMap";

const quotes = [
  {
    text: "Good habits formed at youth make all the difference.",
    author: "Aristotle",
  },
  {
    text: "Your beliefs become your thoughts, your thoughts become your words, your words become your actions, your actions become your habits, your habits become your values, your values become your destiny.",
    author: "Mahatma Gandhi",
  },
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
  },
];

export const Profile = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showModal, setShowModal] = useState(false);
  const user = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, []);

  const handleCreateHabit = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="mt-30 flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-between w-full mb-10">
          <HiUserCircle className="text-5xl text-pink-500" />
          <div className="flex flex-row space-x-8">
            <AiOutlineCalendar
              onClick={() => navigate("/calendar")}
              className="text-3xl hover:text-pink-500 cursor-pointer"
            />
            {/* <FiSettings className="text-3xl hover:text-pink-500 cursor-pointer" /> */}
            <FiLogOut
              className="text-3xl hover:text-pink-500 cursor-pointer"
              onClick={handleLogout}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="w-full flex justify-center">
            <div className="w-2/3 text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                "We are what we repeatedly do. Excellence, then, is not an act,
                but a habit."
              </h2>
              <p className="text-lg font-semibold text-gray-700">- Aristotle</p>
            </div>
          </div>
          <button
            onClick={handleCreateHabit}
            className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 transition-colors duration-300"
          >
            Create a Habit
          </button>

          <button
            onClick={() => navigate("/calendar")}
            className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 transition-colors duration-300"
          >
            Log Your Progress
          </button>
          <button
            onClick={() => navigate("/habit-map")}
            className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 transition-colors duration-300"
          >
            View Your Habit Map
          </button>

          <div className="flex justify-between w-full">
            <div className="w-5/12 text-center border-r-2">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                "Your net worth to the world is usually determined by what
                remains after your bad habits are subtracted from your good
                ones."
              </h3>
              <p className="text-lg font-semibold text-gray-700">
                - Benjamin Franklin
              </p>
            </div>
            <div className="w-5/12 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                "The chains of habit are generally too small to be felt until
                they are too strong to be broken."
              </h3>
              <p className="text-lg font-semibold text-gray-700">
                - Samuel Johnson
              </p>
            </div>
            <div className="w-5/12 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2 border-l-2">
                "Sow a thought, and you reap an act; Sow an act, and you reap a
                habit; Sow a habit, and you reap a character; Sow a character,
                and you reap a destiny."
              </h3>
              <p className="text-lg font-semibold text-gray-700">
                - Charles Reade
              </p>
            </div>
          </div>

          {/* Add more items here */}
        </div>
      </div>
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <CreateHabit habits={habits} setHabits={setHabits} />
      </Modal>
    </>
  );
};
