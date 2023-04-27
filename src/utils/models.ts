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
  userId: string;
  logs?: HabitLog[];
};

export type HabitLog = {
  id?: string;
  habitId: string;
  createdAt: string;
  lat?: number;
  long?: number;
  dayCompleted: string;
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
