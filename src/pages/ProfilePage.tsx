import { Button, Container, Stack, Typography } from "@mui/material";
import React, { FC, useContext } from "react";
import { HeaderTitle } from "../components/HeaderTitle";
import { AuthContext } from "../contexts/AuthContext";

export const ProfilePage: FC = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <Container maxWidth="md">
      <HeaderTitle title="Profile" />
      <Stack spacing={4}>
        <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
        <Typography>{user.email}</Typography>
        <Button
          sx={{ minWidth: "12rem", alignSelf: "center" }}
          onClick={logout}
        >
          Logout
        </Button>
      </Stack>
    </Container>
  );
};

export default ProfilePage;
