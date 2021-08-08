import React from 'react'

const Chatitem = ({data}) => {
    if (data.me) {
        return (
            <div className="d-flex justify-content-end">
                <span className="chat-item-text">
                    {data.text}
                </span>
            </div>
        )
    }

    return (
        <div className="d-flex">
            <span className="chat-item-pict mt-1">
            </span>
            <div className="d-flex flex-column">
                <span>{data.name}</span>
                <span className="chat-item-text">
                    {data.text}
                </span>
            </div>
        </div>
    )
}

export default Chatitem
