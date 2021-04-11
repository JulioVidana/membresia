import React from 'react'
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    useTheme,
    makeStyles,
    colors
} from '@material-ui/core'
import { Bar } from 'react-chartjs-2'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
    avatar: {
        marginRight: theme.spacing(2)
    }
}))

const ChartEdades = ({ keys, values }) => {
    const classes = useStyles()
    const theme = useTheme()

    const data = {
        datasets: [
            {
                backgroundColor: colors.indigo[500],
                data: values,
                label: 'Total',
                barThickness: 22,
                maxBarThickness: 30,
                barPercentage: 0.5,
                categoryPercentage: 0.5,
            },
        ],
        labels: keys
    }

    const options = {
        cornerRadius: 20,
        layout: { padding: 0 },
        legend: { display: false },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            xAxes: [
                {

                    ticks: {
                        fontColor: theme.palette.text.secondary
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }
            ],
            yAxes: [
                {
                    ticks: {
                        fontColor: theme.palette.text.secondary,
                        beginAtZero: true,
                        min: 0
                    },
                    gridLines: {
                        borderDash: [2],
                        borderDashOffset: [2],
                        color: theme.palette.divider,
                        drawBorder: false,
                        zeroLineBorderDash: [2],
                        zeroLineBorderDashOffset: [2],
                        zeroLineColor: theme.palette.divider
                    }
                }
            ]
        },
        tooltips: {
            backgroundColor: theme.palette.background.default,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }
    }


    return (
        <Card className={classes.root} >
            <CardHeader
                title="Edades"
            />
            <CardContent>
                <Box
                    height={290}
                    position="relative"
                >
                    <Bar
                        data={data}
                        options={options}
                    />
                </Box>
            </CardContent>

        </Card>
    )
}

export default ChartEdades
