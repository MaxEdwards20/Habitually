export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type Habit = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  schedule: Schedule;
};

export type HabitLog = {
  id: number;
  habit: Habit;
  createdAt: string;
};

export type Schedule = {
  id: number;
  habit: Habit;
  days: Day[];
  time: string;
};

export type Day = {
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
};
