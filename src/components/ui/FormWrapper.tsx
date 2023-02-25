
import React from 'react'

interface IFormWrapperProps {
    children: React.ReactNode
    title: string
    theme: string
}

export default function FormWrapper({ children, title, theme }: IFormWrapperProps) {
    return (
        <div className={`form-box ${theme}`}>
            <h2>{title}</h2>
            {children}
        </div>
    )
}
