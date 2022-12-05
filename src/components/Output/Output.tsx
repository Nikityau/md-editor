import React, {useEffect, useState} from 'react';

import './style.common/Output.scss'

import app, {IRaw} from "../App/App";

import axios from "axios";
import {parseMd} from "./parse-md.mjs";

//const uri = new URL('/src/components/Output/parse-md.mjs', import.meta.url)
//const mdWorker = new Worker(uri)

const Output = ({raws}: {
    raws: IRaw[]
}) => {

    const parseToMdText = (): string => {
        const copyRaws = JSON.parse(JSON.stringify(raws))

        let str = ''

        for (let i = 0; i < copyRaws.length; ++i) {
            const {
                md_tag,
                raw_text
            } = copyRaws[i]

            if (md_tag) {
                if (md_tag[0] == '[' || md_tag[0] == '!') {
                    str += md_tag + raw_text
                } else {
                    str += md_tag + ' ' + raw_text
                }
            } else {
                str += raw_text
            }
            str += '\n'
        }

        return str
    }

    useEffect(() => {
        (async () => {
            /*const { data } = await axios.post('http://localhost:3000/md-parse', {
                params: {
                    mdText: parseToMdText()
                }
            })*/

            //const dataWorker = new Worker("/src/components/Output/parse-md.mjs")
           /* mdWorker.addEventListener('message', (data) => {
                console.log(data)
                //setHtmlText(data)
            })


            mdWorker.postMessage({mdText: parseToMdText()})*/

            await (async () => {
                const parsed = await parseMd({mdText: parseToMdText()})
                setHtmlText(parsed)
            })()
        })()
    }, [raws])

    const setHtmlText = (data) => {
        const root = document.querySelector('.output')
        root.innerHTML = data
    }

    return (
        <div className={'output'}>

        </div>
    );
};

export default Output;