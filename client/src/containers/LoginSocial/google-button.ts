import React from "react";
import { createButton } from "react-social-login-buttons";

const config = {
    text: "Đăng nhập với Google",
    icon: "google",
    iconFormat: (name: string) => `fab fa-${name}`,
    style: { background: "#DD4B39", fontSize: "1rem", width: "200px"  },
    activeStyle: { background: "#E74B37" },

};


/** My Facebook login button. */
export const GoogleButton = createButton(config);
