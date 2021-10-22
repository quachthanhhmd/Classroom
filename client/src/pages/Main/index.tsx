import React from 'react';
import PropTypes from 'prop-types';

import Authenticate from '../Authenticate';
import ThemeMode from '../../components/ThemeMode';

interface IThemeMode {
    toggleDark: boolean,
    settoggleDark: Function,
}


function Main(props: IThemeMode) {
    const { toggleDark, settoggleDark } = props;

    return (
        <div className="App">
            <ThemeMode toggleDark={toggleDark}
                settoggleDark={settoggleDark} />
            <Authenticate themeMode={toggleDark} />
        </div>
    );
}

export default Main;
