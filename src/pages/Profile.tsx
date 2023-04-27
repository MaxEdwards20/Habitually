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
            <FiSettings className="text-3xl hover:text-pink-500 cursor-pointer" />
            <FiLogOut
              className="text-3xl hover:text-pink-500 cursor-pointer"
              onClick={handleLogout}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-8">
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

          {/* Add more items here */}
        </div>
      </div>
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <CreateHabit habits={habits} setHabits={setHabits} />
      </Modal>
    </>
  );
};
