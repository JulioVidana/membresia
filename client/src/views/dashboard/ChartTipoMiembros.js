import React from 'react'
import {
    Card,
    CardHeader,
    CardContent,
    Box,
    colors,
    useTheme,
    makeStyles
} from '@material-ui/core'
import { Doughnut } from 'react-chartjs-2'

const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
    }
}))

const ChartTipoMiembros = ({ keys, values }) => {
    const classes = useStyles()

    const theme = useTheme()

    const datos = {
        datasets: [{
            label: 'Tipo de Miembros',
            data: values,
            backgroundColor: [
                colors.indigo[500],
                colors.teal[500],
                colors.blueGrey[500],
                colors.deepPurple[500],
                colors.cyan[600],
                colors.amber[600],
                colors.grey[300]
            ],
        }],
        labels: keys
    }


    /* keys.map(tipos => {
        switch (tipos) {
            case 'Miembro':
                return datos.datasets[0].backgroundColor.push(colors.indigo[500])
            case 'Visita':
                return datos.datasets[0].backgroundColor.push(colors.teal[500])
            case 'En Proceso':
                return datos.datasets[0].backgroundColor.push(colors.blueGrey[500])
            case 'VIP':
                return datos.datasets[0].backgroundColor.push(colors.deepPurple[500])
            default:
                return datos.datasets[0].backgroundColor.push(colors.grey[300])
        }
    }) */




    const options = {
        cutoutPercentage: 70,
        layout: { padding: 0 },
        legend: {
            display: true,
            position: 'bottom',
            align: 'start'
        },
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            backgroundColor: theme.palette.background.default,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 2,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary,
        }
    }

    return (
        <Card className={classes.root}>
            <CardHeader title="Tipo de Miembro" />
            <CardContent>
                <Box
                    height={300}
                    position="relative"
                >
                    <Doughnut
                        data={datos}
                        options={options}
                    />
                </Box>
            </CardContent>
        </Card>
    )
}

export default ChartTipoMiembros
