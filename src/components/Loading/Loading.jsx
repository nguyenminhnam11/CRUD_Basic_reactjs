import React from 'react'
import './Loading.css'

export default function Loading({ style }) {
    return (
        <div style={style}>
            <svg viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
            </svg>
        </div>
    )
}
