import {
  Button,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderTitle } from "../components/HeaderTitle";

export const HomePage: FC = () => {
  const navigate = useNavigate();
  return <div> Home Page</div>;
};

export default HomePage;
