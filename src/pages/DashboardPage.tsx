import { Container } from "@mui/material";
import { FC } from "react";
import { HeaderTitle } from "../components/HeaderTitle";
export const DashboardPage: FC = () => {
  return (
    <Container maxWidth="md">
      <HeaderTitle title="Dashboard" />
    </Container>
  );
};
