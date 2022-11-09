import React from 'react';

import './style.common/SpecButtons.scss'
import {Handler} from "../App/App";

const SpecButtons = ({onTextFieldMd}:{
    onTextFieldMd: Handler
}) => {

    const onBtnClick = (type) => {
       onTextFieldMd(type)
    }

    return (
        <div className={'spec-btns'}>
            <button onClick={() => onBtnClick('title')}>
                Title
            </button>
            <button onClick={() => onBtnClick('link')}>
                Link
            </button>
            <button onClick={() => onBtnClick('image')}>
                Image
            </button>
            <button onClick={() => onBtnClick('url')}>
                Url
            </button>
        </div>
    );
};

export default SpecButtons;