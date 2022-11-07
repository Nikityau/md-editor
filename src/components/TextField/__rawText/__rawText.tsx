import React from 'react';

const __RawText = ({ raw_num,raw_text, onClick }:{
    raw_text:string,
    raw_num: number,
    onClick: any
}) => {
    return (
        <div className={'text-field__raw-text'}
            onClick={() => onClick(raw_num)}
        >
            { raw_text }
        </div>
    );
};

export default __RawText;