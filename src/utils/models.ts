export type User = {
  id: string;
  email: string;
};

export type Habit = {
  id?: string;
  name: string;
  days: string[];
  time: string;
  startDate: string;
  description?: string;
};

export type HabitLog = {
  id: string;
  habit: Habit;
  createdAt: string;
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
