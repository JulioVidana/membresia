import React from 'react';
import { useNavigate } from 'react-router-dom'
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Typography,
    makeStyles,
    CardActionArea
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    icono: {

    },
}));

const BtnMenu = ({ link, title, icon: Icon }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    return (
        <Card >
            <CardActionArea onClick={() => navigate(link)} >
                <CardContent >
                    <Box
                        alignItems="center"
                        display="flex"
                        flexDirection="column"
                    >
                        <Avatar
                            color="primary"
                            className={classes.icono}>
                            {Icon && (
                                <Icon
                                    className={classes.icono}
                                />
                            )}
                        </Avatar>
                        <Typography
                            align="center"
                            color="textPrimary"
                            gutterBottom
                            variant="h4"
                        >
                            {title}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>

        </Card>
    )
}

export default BtnMenu
