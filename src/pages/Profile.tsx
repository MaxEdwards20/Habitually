import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateHabit } from "../components/CreateHabit";
import { Modal } from "../components/Modal";
import { AuthContext } from "../contexts/AuthContext";
import { db } from "../lib/firebase";
import { Habit } from "../utils/models";

export const Profile = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showModal, setShowModal] = useState(false);
  const user = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Loading all habits");
    if (!user) {
      navigate("/login");
      return;
    }
    loadHabits();
  }, []);

  async function loadHabits() {
    const querySnapshot = await getDocs(
      query(collection(db, "habits"), where("userId", "==", user!!.id))
    );
    const habits: Habit[] = [];
    querySnapshot.forEach((doc) => {
      const habit = doc.data() as Habit;
      habits.push(habit);
    });
    setHabits(habits);
  }

  const handleCreateHabit = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="mt-30">
        <button onClick={handleCreateHabit} className="hover:text-pink-500">
          Create a Habit
        </button>
        <Modal isOpen={showModal} onClose={handleCloseModal}>
          <CreateHabit habits={habits} setHabits={setHabits} />
        </Modal>
      </div>
    </>
  );
};
