import React from "react";
import { CircularProgress, Container } from "@material-ui/core";

function CircularLoading() {
  return (
    <Container maxWidth="xs" style={{ padding: "5rem", width: "fit-content" }}>
      <CircularProgress />
    </Container>
  );
}

export default CircularLoading;