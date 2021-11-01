import React from "react";
import { Container, Typography } from "@material-ui/core";

import "./index.scss";

function NotFound() {
  return (
    <Container maxWidth="sm" className="notfound-main" style={{ }}>
      <img
        alt="404"
        src="https://res.cloudinary.com/dghvjalhh/image/upload/c_scale,h_100,w_100/v1620033316/avatars/loupe_wzg9wc.png"
      />
      <Typography
        variant="h4"
        className="notfound-main___content"
      >
        Page Not Found
      </Typography>
    </Container>
  );
}

export default NotFound;