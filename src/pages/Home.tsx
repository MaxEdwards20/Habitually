import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage: FC = () => {
  const navigate = useNavigate();
  return <div> Home Page</div>;
};

export default HomePage;
