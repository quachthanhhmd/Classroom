import { createButton } from "react-social-login-buttons";

const config = {
    text: "Đăng nhập với Facebook",
    icon: "facebook",
    iconFormat: (name: string) => `fab fa-${name}-square`,
    style: { background: "#3b5998", fontSize: "1rem", width: "200px"},
    activeStyle: { background: "#293e69" }
};
/** My Facebook login button. */
export const FacebookButton = createButton(config);

