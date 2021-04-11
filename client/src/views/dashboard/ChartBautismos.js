import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getBautismos } from 'src/redux/dasboardDucks'
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    useTheme,
    makeStyles,
    colors
} from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { Line } from 'react-chartjs-2'
import moment from 'moment'
import DateFnsUtils from '@date-io/moment'


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
    avatar: {
        marginRight: theme.spacing(2)
    }
}))
const ChartBautismos = ({ keys, values, iglesia }) => {
    const classes = useStyles()
    const theme = useTheme()
    const dispatch = useDispatch()
    const [selectedDate, handleDateChange] = useState(new Date());


    const labels = keys.map(x => moment(x, 'M').format('MMMM'))
    const data = {
        datasets: [{
            label: 'Total',
            data: values,
            fill: false,
            borderColor: colors.teal[300],
            backgroundColor: colors.teal[300],
            tension: 0.1
        }],
        labels: labels
    }

    const options = {
        layout: { padding: 0 },
        legend: { display: false },
        responsive: true,
        scales: {
            xAxes: [{
                title: {
                    display: false,
                    text: 'Month'
                }
            }],
            yAxes: [{
                title: {
                    display: false,
                    text: 'Value'
                },
                min: 0,
                max: 100,
                ticks: {
                    // forces step size to be 50 units
                    stepSize: 50
                }
            }]
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

    const SelectYear = valor => {
        const Año = moment(valor, 'Y').format('YYYY')
        dispatch(getBautismos(iglesia, parseInt(Año)))

    }

    return (
        <Card className={classes.root} >
            <CardHeader
                action={(
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            autoOk
                            margin="normal"
                            disableFuture
                            openTo="year"
                            format="YYYY"
                            label="Año"
                            variant="inline"
                            inputVariant="outlined"
                            name="año"
                            views={["year"]}
                            value={selectedDate}
                            onChange={handleDateChange}
                            onAccept={value => SelectYear(value)}
                        />
                    </MuiPickersUtilsProvider>
                )}
                title="Bautismos"
            />
            <CardContent>
                <Box

                    position="relative"
                >
                    <Line
                        data={data}
                        options={options}
                    />
                </Box>
            </CardContent>

        </Card>
    )
}

export default ChartBautismos
