import { Typography } from '@material-ui/core'
import React from 'react'

interface ButtonSpanProps {
    label: string,
    size?: 'small' | 'medium' | 'large'
    color?: 'primary' | 'error' | 'inherit' | 'initial' | 'secondary' | 'textPrimary' | 'textSecondary'
    onClick?: any,
    className?: string,
}

export default function ButtonSpan({
    label,
    color = 'initial',
    onClick = () => { },
    className
}: ButtonSpanProps) {
    const css = `p-button-span ${className}`
    return (
        <Typography className={css} onClick={onClick} color={color} >
            {label}
        </Typography>
    )

}