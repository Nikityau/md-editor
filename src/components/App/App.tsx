import React, {useEffect, useState} from 'react';

import TextField from "../TextField/TextField";

import '../UI/UI.Kit.Styles/global/global.scss'
import './style.common/App.scss'

import SpecButtons from "../SpecButtons/SpecButtons";
import Output from "../Output/Output";

type State<T> = [state: T, setter: any]
export type Handler = (...args: any[]) => any

interface IAppContext {
    gapBetweenRaw: number
    raws: State<IRaw[]>
    isCursor: State<boolean>
    currentRaw: State<number>,
    onFieldTextClick: Handler,
    onTextFieldClick: Handler
}


export interface IRaw {
    raw_num: number,
    raw_text: string,
    md_tag?: string
}

export const AppContext = React.createContext<IAppContext>({
    gapBetweenRaw: 0,
    raws: [[], () => {
    }],
    isCursor: [false, () => {
    }],
    currentRaw: [0, () => {
    }],
    onFieldTextClick: () => {
    },
    onTextFieldClick: () => {
    }
})

const App = () => {
    const [gapBetweenRaw] = useState<number>(0)
    const [isCursor, setIsCursor] = useState<boolean>(false)
    const [currentRaw, setCurrentRaw] = useState<number>(2)
    const [raws, setRaws] = useState<IRaw[]>([
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

    useEffect(() => {
        console.log(raws)
    }, [raws])

    const onFieldTextClick = (e: React.MouseEvent) => {
        setIsCursor(true)
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (!isCursor) return


        const {key} = e

        if(key == 'ArrowUp' || key == 'ArrowDown' || key == 'ArrowLeft' || key == 'ArrowRight') {
            return;
        }

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

    const onTextFieldMd = (typeTag) => {
        if (!isCursor) return


        const copyRaws = JSON.parse(JSON.stringify(raws))

        const findRaw = copyRaws.find(raw => raw.raw_num == currentRaw)
        if (typeTag == 'title') {
            findRaw.md_tag = '#'
        }
        if(typeTag == 'link') {
            if(!findRaw.raw_text) return;
            const index = findRaw.raw_text.indexOf('http');

            const substr = findRaw.raw_text.substring(0, index)
            findRaw.md_tag = `[${substr}]`
            findRaw.raw_text = '(' + findRaw.raw_text.substring(index) + ')';
        }
        if(typeTag == 'image') {
            findRaw.md_tag = '![]'
            findRaw.raw_text = '(../../assets/image.jpg)';
        }
        if(typeTag == 'url') {
            findRaw.raw_text = '<http://google.com>';
        }

        setRaws(copyRaws)
    }

    return (
        <AppContext.Provider value={{
            gapBetweenRaw,
            isCursor: [isCursor, setIsCursor],
            currentRaw: [currentRaw, setCurrentRaw],
            raws: [raws, setRaws],
            onTextFieldClick,
            onFieldTextClick,
        }}>
            <div className={'app'}>
                <div className={'app__container'}>
                    <SpecButtons
                        onTextFieldMd={onTextFieldMd}
                    />
                    <TextField/>
                    <Output
                        raws={raws}
                    />
                </div>
            </div>
        </AppContext.Provider>
    );
};

export default App;