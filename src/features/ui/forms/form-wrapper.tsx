import React from 'react'
import styles from './forms.module.css'

interface IFormWrapperProps {
	children?: React.ReactNode
	title: string
	theme: string
}

export default function FormWrapper({ children, title, theme }: IFormWrapperProps) {
	return (
		<div className={`${styles.formBox} ${styles[theme]}`}>
			<h2>{title}</h2>
			{children}
		</div>
	)
}
