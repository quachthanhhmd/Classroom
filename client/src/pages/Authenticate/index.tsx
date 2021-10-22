import { useEffect } from "react";
import "./index.scss";
import Login from "../../components/Login";

interface ILoginProps {
    themeMode: boolean,
}

const changeToggleMode = () => {
    const toggle = document.getElementById("toggle-mode");
    toggle && toggle.classList.add("toggle-mode-login");
}

const Authenticate = (props: ILoginProps) => {
    const {themeMode} = props;

    useEffect(() => {
        changeToggleMode();
    })
 

    return (
        <div className={`authenticate-main${themeMode ? " dark-mode" : " light-mode"}`}>
            <Login/>
        </div>
    )
}

export default Authenticate;