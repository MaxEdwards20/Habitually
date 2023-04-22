import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { CreateHabit } from "../components/CreateHabit";
import { AuthContext } from "../contexts/AuthContext";
import { db } from "../lib/firebase";
import { Habit } from "../utils/models";

export const Profile = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadHabits();
  }, []);

  async function loadHabits() {
    const querySnapshot = await getDocs(
      query(collection(db, "habits"), where("userId", "==", user.id))
    );
    const habits: Habit[] = [];
    querySnapshot.forEach((doc) => {
      const habit = doc.data() as Habit;
      habits.push(habit);
    });
    setHabits(habits);
  }

  return (
    <div>
      Profile
      <CreateHabit />
    </div>
  );
};
