import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
} from '@material-ui/core'
import SortIcon from '@material-ui/icons/Sort'


const sortBar = ({ sortBy, handleSortChange, menuItems, label, size, icono = true }) => {
    return (
        <FormControl variant="outlined" fullWidth size={size || 'medium'}>
            <InputLabel id="sort-label">filtrar {label}</InputLabel>
            <Select
                labelId="sort-label"
                value={sortBy}
                onChange={handleSortChange}
                label={`Sort ${label} By`}
                startAdornment={
                    icono &&
                    <InputAdornment position="start">
                        <SortIcon
                            color="primary"
                            fontSize={size === 'small' ? 'default' : 'large'}
                        />
                    </InputAdornment>
                }
            >
                {menuItems.map((m) => (
                    <MenuItem key={m.value} value={m.value}>
                        {m.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default sortBar
