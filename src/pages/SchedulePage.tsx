import React, { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { Spinner } from "../components/Spinner";
import { Schedule } from "../utils/models";

export const SchedulePage: FC = () => {
  const { id } = useParams();
  const scheduleId = parseInt(id || "");

  const [schedule, setSchedule] = useState<Schedule | null>();
  const [originalSchedule, setOriginalSchedule] = useState<Schedule>();
  const [error, setError] = useState<string>();
  const [reptileName, setReptileName] = useState<string>();

  if (!scheduleId) {
    return <div>Invalid schedule id</div>;
  }

  const dirty = (() => {
    if (!schedule || !originalSchedule) return false;
    for (const key in schedule) {
      if (
        schedule[key as keyof Schedule] !==
        originalSchedule[key as keyof Schedule]
      )
        return true;
    }
    return false;
  })();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSchedule((prev) => prev && { ...prev, [name]: checked });
  };

  const handleSave = () => {
    console.log("handling save");
  };

  if (schedule === undefined) return <Spinner />;

  if (schedule === null) {
    return <ErrorMessage message="Error fetching Schedule" />;
  }

  return <div> Schedule id</div>;
};
