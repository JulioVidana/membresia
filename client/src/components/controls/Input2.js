import React from 'react'
import { TextField, InputAdornment } from '@material-ui/core'

export default function Input2(props) {

    const { name, label, value, error = null, onChange, ...other } = props;
    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder={label}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && { error: true, helperText: error })}
        />
    )
}
