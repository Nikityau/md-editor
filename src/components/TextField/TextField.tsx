import React, {useContext, useEffect, useState} from 'react';

import './style.common/TextField.scss'
import __RawText from "./__rawText/__rawText";
import {AppContext} from "../App/App";

const TextField = () => {

    const appContext = useContext(AppContext)

    return (
        <div className={'text-field'}>
            <div className={'text-field__container'}>
                <div className={'text-field__field-num'}
                    style={{
                        gap: `${appContext.gapBetweenRaw}px`
                    }}
                >
                    {
                        appContext.raws[0].map(raw => (
                            <span key={raw.raw_num}>{raw.raw_num}</span>
                        ))
                    }
                </div>
                <div className={'text-field__field-text'}
                     onClick={appContext.onFieldTextClick}
                     style={{
                         gap: `${appContext.gapBetweenRaw}px`
                     }}
                >
                    {
                        appContext.raws[0].map(raw => (
                            <__RawText
                                key={raw.raw_num}
                                raw_num={raw.raw_num}
                                raw_text={raw.raw_text}
                                md_tag={raw.md_tag}
                                onClick={appContext.onTextFieldClick}
                            />
                        ))
                    }
                    <div className={[
                        'text-field__cursor',
                        appContext.isCursor && 'text-field__cursor_awake'
                    ].join(' ')}
                         style={{
                             transform: `translate(0, ${(20 + appContext.gapBetweenRaw) * (appContext.currentRaw[0] - 1)}px)`
                         }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default TextField;
