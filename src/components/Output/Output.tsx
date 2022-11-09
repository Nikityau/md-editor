import React, {useEffect, useState} from 'react';

import './style.common/Output.scss'

import app, {IRaw} from "../App/App";

import axios from "axios";

const Output = ({raws}: {
    raws: IRaw[]
}) => {

    const parseToMdText = ():string => {
        const copyRaws = JSON.parse(JSON.stringify(raws))

        let str = ''

        for(let i = 0; i < copyRaws.length; ++i) {
            const {
                md_tag,
                raw_text
            } = copyRaws[i]

            if(md_tag) {
                if(md_tag[0] == '[' || md_tag[0] == '!') {
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
            const { data } = await axios.post('http://localhost:3000/md-parse', {
                params: {
                    mdText: parseToMdText()
                }
            })

            setHtmlText(data)
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