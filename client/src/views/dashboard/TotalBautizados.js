import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography,
    makeStyles,
    colors
} from '@material-ui/core'
import PoolIcon from '@material-ui/icons/Pool';

const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
    },
    avatar: {
        backgroundColor: colors.green[600],
        height: 56,
        width: 56
    }
}))
const TotalBautizados = ({ className, total, ...rest }) => {
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
                            BAUTIZADOS
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
                            <PoolIcon />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

TotalBautizados.propTypes = {
    className: PropTypes.string
}

export default TotalBautizados
