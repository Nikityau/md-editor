import React, {useEffect, useState} from 'react';

import './style.common/TextField.scss'
import __RawText from "./__rawText/__rawText";

const TextField = () => {

    const [gapBetweenRaw] = useState<number>(0)
    const [isCursor, setIsCursor] = useState<boolean>(false)
    const [currentRaw, setCurrentRaw] = useState<number>(2)
    const [raws, setRaws] = useState<{
        raw_num: number,
        raw_text: string
    }[]>([
        {
            raw_num: 1,
            raw_text: '',
        },
        {
            raw_num: 2,
            raw_text: ''
        }
    ])

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown)

        return () => {
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isCursor, raws])

    const onFieldTextClick = (e: React.MouseEvent) => {
        setIsCursor(true)

    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (!isCursor) return

        const {key} = e
        if (key == 'Enter') {
            const lastRow = raws[raws.length - 1]

            setRaws(prev => [
                ...prev,
                {
                    raw_num: lastRow.raw_num + 1,
                    raw_text: ''
                }
            ])
            setCurrentRaw(lastRow.raw_num + 1)

            return;
        }

        const copyRows = JSON.parse(JSON.stringify(raws))
        const currRaw = copyRows.find(r => r.raw_num == currentRaw)
        currRaw.raw_text += key
        setRaws(copyRows)
    }

    const onTextFieldClick = (num) => {
        setCurrentRaw(num)
    }

    return (
        <div className={'text-field'}>
            <div className={'text-field__container'}>
                <div className={'text-field__field-num'}
                    style={{
                        gap: `${gapBetweenRaw}px`
                    }}
                >
                    {
                        raws.map(raw => (
                            <span key={raw.raw_num}>{raw.raw_num}</span>
                        ))
                    }
                </div>
                <div className={'text-field__field-text'}
                     onClick={onFieldTextClick}
                     style={{
                         gap: `${gapBetweenRaw}px`
                     }}
                >
                    {
                        raws.map(raw => (
                            <__RawText
                                key={raw.raw_num}
                                raw_num={raw.raw_num}
                                raw_text={raw.raw_text}
                                onClick={onTextFieldClick}
                            />
                        ))
                    }
                    <div className={[
                        'text-field__cursor',
                        isCursor && 'text-field__cursor_awake'
                    ].join(' ')}
                         style={{
                             transform: `translate(0, ${(20 + gapBetweenRaw) * (currentRaw - 1)}px)`
                         }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default TextField;
