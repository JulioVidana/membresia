import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPersonas, getBautismos } from 'src/redux/dasboardDucks'
import {
    Container,
    Grid,
    makeStyles
} from '@material-ui/core'
import Page from 'src/components/Page'
import TotalPersonas from './TotalPersonas'
import TotalMujer from './TotalMujer'
import TotalHombres from './Totalhombres'
import TotalBautizados from './TotalBautizados'
import ChartEdades from './ChartEdades'
import ChartTipoMiembros from './ChartTipoMiembros'
import ChartBautismos from './ChartBautismos'
import PersonasRecientes from './PersonasRecientes'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}))

const rangoEdades = {
    "No definido": { min: 0, max: 0 },
    "0-3": { min: 0, max: 3 },
    "4-11": { min: 4, max: 11 },
    "12-18": { min: 12, max: 18 },
    "19-25": { min: 19, max: 25 },
    "26-35": { min: 26, max: 35 },
    "36-50": { min: 36, max: 50 },
    "51-54": { min: 51, max: 64 },
    "65+": { min: 65, max: Infinity },
}

const suma = (dato) => {
    let acum = {}
    dato.forEach(
        function (i) {
            acum[i] = (acum[i] || 0) + 1;
        }
    )
    return acum
}

const calcEdades = (age, ranges) => {
    let sumAge = {};
    for (const datum of age) {
        var range = Object.keys(ranges).find(r => ranges[r].min <= datum && ranges[r].max >= datum) || "Other";
        let entry = sumAge[range];
        if (entry) {
            ++entry.count;
        } else {
            sumAge[range] = { age: range, count: 1 };
        }
    }
    return sumAge
}


const Dashboard = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const iglesia = useSelector(store => store.general.iglesia)
    const personas = useSelector(store => store.dashboard.personas)
    const bautismos = useSelector(store => store.dashboard.bautismos)
    const bautismosTotales = suma(bautismos.map(x => x.month))
    const totalMiembros = suma(personas.map(x => x.tipoMiembro?.tipo))
    const totalSexo = suma(personas.map(x => x.sexo))
    const totalBautismo = suma(personas.map(x => x.bautismo.activo))
    const edadesArray = personas.map(x => x.edad).sort((a, b) => a - b)
    const edades = Object.values(calcEdades(edadesArray, rangoEdades))


    useEffect(() => {
        const fetchData = () => {
            dispatch(getPersonas(iglesia))
            dispatch(getBautismos(iglesia, 2021))
        }
        fetchData()
    }, [dispatch, iglesia])

    return (
        <Page
            className={classes.root}
            title="Dashboard"
        >
            <Container maxWidth={false}>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <TotalPersonas total={personas.length} />

                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <TotalMujer total={totalSexo.Mujer} />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <TotalHombres total={totalSexo.Hombre} />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <TotalBautizados total={totalBautismo.true} />
                    </Grid>

                    <Grid
                        item
                        lg={8}
                        md={6}
                        xl={9}
                        xs={12}
                    >
                        <ChartEdades
                            keys={edades.map(x => x.age)}
                            values={edades.map(x => x.count)}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xl={3}
                        xs={12}
                    >
                        <ChartTipoMiembros
                            keys={Object.keys(totalMiembros)}
                            values={Object.values(totalMiembros)} />
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={6}
                        xl={9}
                        xs={12}
                    >
                        <ChartBautismos
                            keys={Object.keys(bautismosTotales)}
                            values={Object.values(bautismosTotales)}
                            iglesia={iglesia}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xl={3}
                        xs={12}
                    >
                        <PersonasRecientes datos={personas.slice(0, 6)} />
                    </Grid>

                </Grid>
            </Container>
        </Page>
    )
}

export default Dashboard
