import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { Habit, HabitLog, User } from "./models";

export const logout = () => {
  console.log("Logging out...");
  signOut(auth);
};

export const loadHabits = async () => {
  verifyUser();
  const habits: Habit[] = [];
  const userHabits = await getDocs(
    query(
      collection(db, "habits"),
      where("userId", "==", auth.currentUser!!.uid)
    )
  );
  userHabits.forEach((userHabit) => {
    let habit = userHabit.data() as Habit;
    habit.id = userHabit.id;
    habits.push(habit);
  });

  for (let habit of habits) {
    habit.logs = await getHabitLogs(habit.id!!);
  }
  console.log("Habits: ", habits);
  return habits;
};

const getHabitLogs = async (habitId: string) => {
  const logs: HabitLog[] = [];
  const url = `habits/${habitId}/habitLogs`;
  const habitLogs = await getDocs(query(collection(db, url)));
  habitLogs.forEach((habitLog) => {
    let log = habitLog.data() as HabitLog;
    log.id = habitLog.id;
    logs.push(log);
  });
  return logs;
};

type Coordinates = {
  lat: number;
  long: number;
};

export const getLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude, position.coords.longitude);
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          resolve({ lat, long });
        },
        (error) => reject(error)
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

export const verifyUser = () => {
  if (!auth.currentUser) {
    console.error("User is not signed in and can't access this page.");
    return;
  }
};
