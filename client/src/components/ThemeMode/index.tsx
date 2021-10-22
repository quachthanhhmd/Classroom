import Switch from "@material-ui/core/Switch";
import { red } from "@material-ui/core/colors";
import PropTypes from 'prop-types';

// const useStyles = makeStyles((theme) => ({
  
//     // Styling material components
//     root: {
//       width: "100%",
//       height: "100vh",
//       backgroundColor: theme.palette.background.default,
//       [theme.breakpoints.down("xs")]: {
//         paddingTop: theme.spacing(2),
//       },
//     },
//     media: {
//       height: 56,
//       paddingTop: "56.25%", // 16:9
//     },
//     avatar: {
//       backgroundColor: red[500],
//     },
//   }));
  

interface IThemeMode {
    toggleDark: boolean,
    settoggleDark: Function,
}

const ThemeMode = (props: IThemeMode) => {

    const {toggleDark, settoggleDark} = props;

    //const classes = useStyles();
    
    // Trigger toggle using onChange Switch
    const handleModeChange = () => {
      settoggleDark(!toggleDark);
    };
    return (
        <div id="toggle-mode">
            <Switch
            checked={toggleDark!}
            onChange={handleModeChange}
            name="toggleDark"
            color="default"
          />
        </div>
    )
}

export default ThemeMode;