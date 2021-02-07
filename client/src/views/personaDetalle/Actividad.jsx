import React, { useState } from 'react';
import moment from 'moment';
import {
    Box,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    makeStyles,
    Paper
} from '@material-ui/core';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineOppositeContent,
    TimelineDot
} from '@material-ui/lab'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { v4 as uuid } from 'uuid';

const datos = [
    {
        _id: uuid(),
        idPersona: 1,
        fechaCambio: '2021-02-23',
        editor: 'Julio Vidana',
        cambios: [
            {
                tipo: 'email',
                before: '',
                after: 'julio.vidana@gmail.com'
            }
        ]
    },
    {
        _id: uuid(),
        idPersona: 1,
        fechaCambio: '2021-02-10',
        editor: 'Maria Lopez',
        cambios: [
            {
                tipo: 'Membresia',
                before: 'visita',
                after: 'Miembro'
            }
        ]
    },
    {
        _id: uuid(),
        idPersona: 1,
        fechaCambio: '2021-01-12',
        editor: 'Julio Vidana',
        cambios: [
            {
                tipo: 'Phone',
                before: '888-323-5126',
                after: '972-333-4106'
            },
            {
                tipo: 'Nombre',
                before: 'Julio V',
                after: 'Julio Cesar Vidana'
            }
        ]
    }
]

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

const Actividad = () => {
    const classes = useStyles();
    const [data] = useState(datos);
    return (
        <Timeline align="alternate">

            {
                data.length !== 0
                    ?
                    data.map((item) => (
                        <TimelineItem key={item._id}>
                            <TimelineOppositeContent>
                                <Typography variant="body1" color="textSecondary">
                                    Perfil editado por {item.editor}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {moment(item.fechaCambio).format('LL')}
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary">
                                    <AccountBoxIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="h6" component="h1">
                                        PERSONAL
                                     </Typography>
                                    <Divider />
                                    <PerfectScrollbar>
                                        <Box>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>

                                                        </TableCell>
                                                        <TableCell>
                                                            Before
                                                        </TableCell>
                                                        <TableCell>
                                                            After
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {item.cambios.map((item2) => (
                                                        <TableRow
                                                            hover
                                                            key={item2.tipo}
                                                        >
                                                            <TableCell>
                                                                {item2.tipo}
                                                            </TableCell>
                                                            <TableCell>
                                                                {item2.before}
                                                            </TableCell>
                                                            <TableCell>
                                                                {item2.after}
                                                            </TableCell>

                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Box>
                                    </PerfectScrollbar>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                    ))

                    :
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot color="primary" >
                                <AccountBoxIcon />
                            </TimelineDot>
                            <TimelineConnector className={classes.secondaryTail} />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Paper elevation={3} className={classes.paper}>

                                <Typography>No hay datos</Typography>
                            </Paper>
                        </TimelineContent>
                    </TimelineItem>

            }

        </Timeline>
    )
}

export default Actividad
