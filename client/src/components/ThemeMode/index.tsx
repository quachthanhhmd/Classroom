import DarkModeToggle from "react-dark-mode-toggle";
import { useDispatch, useSelector } from "react-redux";
import { updateThemeMode } from "../../actions/theme-mode.action";
import { AppState } from "../../reducers";

const ThemeMode = () => {

  const toggleMode = useSelector((state: AppState) => state.themeMode!.toggleMode);

  const dispatch = useDispatch();

  //const classes = useStyles();

  // Trigger toggle using onChange Switch
  const handleModeChange = () => {
    dispatch(updateThemeMode({ toggleMode }));
  };
  return (
    <div id="toggle-mode">
      <DarkModeToggle
        checked={toggleMode!}
        onChange={handleModeChange}
        size={60}
      />
    </div>
  )
}

export default ThemeMode;