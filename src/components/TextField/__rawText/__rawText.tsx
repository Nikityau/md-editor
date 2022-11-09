import React from 'react';

const __RawText = ({ raw_num,raw_text, md_tag,onClick }:{
    raw_text:string,
    raw_num: number,
    md_tag?: string
    onClick: any
}) => {
    return (
        <div className={'text-field__raw-text'}
            onClick={() => onClick(raw_num)}
        >
            { md_tag && `${md_tag} ` } { raw_text }
        </div>
    );
};

export default __RawText;