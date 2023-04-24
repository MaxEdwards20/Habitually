export type User = {
  id: string;
  email: string;
};

export type Habit = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  schedule: Schedule;
};

export type HabitLog = {
  id: string;
  habit: Habit;
  createdAt: string;
};

export type Schedule = {
  id: string;
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
