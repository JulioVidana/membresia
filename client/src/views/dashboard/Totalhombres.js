import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography,
    makeStyles
} from '@material-ui/core'
import WcIcon from '@material-ui/icons/Wc'

const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
    },
    avatar: {
        backgroundColor: '#1565c0',
        height: 56,
        width: 56
    }
}))
const Totalhombres = ({ className, total, ...rest }) => {
    const classes = useStyles()
    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <CardContent>
                <Grid
                    container
                    justify="space-between"
                    spacing={3}
                >
                    <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="h6"
                        >
                            HOMBRES
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h3"
                        >
                            {total}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <WcIcon />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

Totalhombres.propTypes = {
    className: PropTypes.string
}
export default Totalhombres
