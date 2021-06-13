import React, { useState } from 'react'
import {
    List,
    makeStyles,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse
} from '@material-ui/core'
import NavItem from './NavItem'
import ExpandMore from '@material-ui/icons/ExpandMore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
    list: {
        paddingTop: 0,
        paddingBottom: 0
    },
    ListItem: {
        paddingLeft: 10,
        paddingRight: 0
    },
    listIcon: {
        minWidth: 30
    }
}))
const NavCollapse = ({ item, rol, icon: Icon }) => {
    const classes = useStyles()
    const [state, setState] = useState(
        { settings: [{ id: 1, open: false }, { id: 2, open: false }, { id: 3, open: false }] }
    )
    const { settings } = state

    const handleClick2 = id => {

        setState({
            ...state,
            settings: state.settings.map(item => (item.id === id ? { ...item, open: !item.open } : item)
            )
        })
    }


    return (
        <List className={classes.list}>
            <ListItem button onClick={() => handleClick2(item._id)} className={classes.ListItem}>
                <ListItemIcon className={classes.listIcon}>
                    {Icon && (
                        <Icon
                            className={classes.icon}
                            size="20"
                        />
                    )}
                </ListItemIcon>
                <ListItemText primary={item.grupo} />
                {settings.find(x => x.id === item._id)?.open ? <ExpandMore /> : <NavigateNextIcon />}
            </ListItem>

            <Collapse
                in={settings.find(x => x.id === item._id)?.open}
                timeout="auto"
                unmountOnExit
            >
                <List
                    component="div"
                    disablePadding
                >
                    {
                        item.items.map((option) => (
                            <NavItem
                                className={classes.nested}
                                href={option.href}
                                key={option.title}
                                title={option.title}
                            />

                        ))
                    }
                </List>
            </Collapse>
        </List>
    )
}

export default NavCollapse
