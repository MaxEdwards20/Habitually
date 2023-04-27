import { Link } from "react-router-dom";

export const NoHabits = () => {
  return (
    <div className=" px-4 py-2">
      You have not created any habits. Return to the{" "}
      <Link to="/profile" className="text-pink-500 hover:text-pink-700">
        profile
      </Link>{" "}
      page to do so.
    </div>
  );
};
