import { signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Api } from "../api/api";
import { auth, db } from "../lib/firebase";
import { Habit, User } from "./models";

export const logout = () => {
  console.log("Logging out...");
  signOut(auth);
};

export const loadHabits = async () => {
  const querySnapshot = await getDocs(
    query(
      collection(db, "habits"),
      where("userId", "==", auth.currentUser!!.uid)
    )
  );
  const habits: Habit[] = [];
  querySnapshot.forEach((doc) => {
    const habit = doc.data() as Habit;
    habit.id = doc.id;
    habits.push(habit);
  });
  console.log("Habits: ", habits);
  return habits;
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
