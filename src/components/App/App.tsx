import React from 'react';

import TextField from "../TextField/TextField";

import '../UI/UI.Kit.Styles/global/global.scss'
import './style.common/App.scss'

const App = () => {
    return (
        <div className={'app'}>
            <div className={'app__container'}>
                <TextField/>
            </div>
        </div>
    );
};

export default App;