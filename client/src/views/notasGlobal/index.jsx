import React, { useState, useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { traeNotasGlobal } from 'src/redux/notasDucks'
import { obtenerCatalogosPersonas } from 'src/redux/CatalogosPersonasDucks'
import Page from 'src/components/Page'
import Titulo from 'src/components/Toolbar'
import {
    makeStyles,
    Container,
    Box,
    Card,
    CardContent,
    Slide
} from '@material-ui/core'
import Toolbar from './Toolbar'
import ConfirmDialog from 'src/components/ConfirmDialog'
import Item from './Items'
import Popup from 'src/components/Popup'
import Reporte from 'src/reports/NotasGloba'


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    pageContent: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    searchInput: {
        width: '80%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    avatar: {
        marginRight: theme.spacing(2)
    }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

// Initial State And Reducer Function
const initialState = {
    isLoading: true,
    data: [],
    search: '',
    searchData: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                data: action.payload,
                isLoading: false
            }
        case 'SEARCH_INPUT':
            return { ...state, search: action.payload }
        case 'SEARCH_DATA':
            return { ...state, searchData: action.payload }
        default:
            throw new Error()
    }
}


const NotasView = () => {
    const classes = useStyles()
    const dispatchRdx = useDispatch()
    const [state, dispatch] = useReducer(reducer, initialState)
    const iglesia = useSelector(store => store.general.iglesia)
    const notas = useSelector(store => store.notas.notasGlobal)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', type: '' })
    const [sortMenu, setSortMenu] = useState('')
    const [csvNota, setCsvNota] = useState(notas)
    const [openPopup, setOpenPopup] = useState(false)


    useEffect(() => {
        const fetchData = () => {
            dispatchRdx(traeNotasGlobal(iglesia._id))
            dispatchRdx(obtenerCatalogosPersonas())

        }
        setCsvNota(notas)
        dispatch({ type: 'SET_DATA', payload: notas })
        state.data.length === 0 && fetchData()
    }, [dispatchRdx, iglesia._id, notas, state.data])

    // Search And Highlight Function
    const handleInput = e => {
        let str = e.target.value
        dispatch({ type: 'SEARCH_INPUT', payload: str })
        const newArr = state.data
            .filter(
                item =>
                    item.persona?.completo.toLowerCase().includes(str.toLowerCase()) ||
                    item.nota.toLowerCase().includes(str.toLowerCase())
            )
            .map(item => {
                let newTitle = item.persona?.completo.replace(
                    new RegExp(str, 'gi'),
                    match =>
                        `<mark style="background: #ffe8a8; ">${match}</mark>`
                )
                let newBody = item.nota.replace(
                    new RegExp(str, 'gi'),
                    match =>
                        `<mark style="background: #ffe8a8; ">${match}</mark>`
                )
                return {
                    ...item,
                    persona: { ...item.persona, completo: newTitle },
                    nota: newBody,
                }
            })

        dispatch({ type: 'SEARCH_DATA', payload: newArr })

        const newArrCSV = state.data
            .filter(
                item =>
                    item.persona?.completo.toLowerCase().includes(str.toLowerCase()) ||
                    item.nota.toLowerCase().includes(str.toLowerCase())
            )

        setCsvNota(newArrCSV)

    }
    //filtro por categoría
    const filtroChange = e => {
        let filtro = e.target.value
        dispatch({ type: 'SEARCH_INPUT', payload: filtro })
        setSortMenu(filtro)
        let newArr

        filtro === 'Todo'
            ?
            newArr = state.data
            :
            newArr = state.data
                .filter(item => item.categoria.includes(filtro))

        setCsvNota(newArr)
        dispatch({ type: 'SEARCH_DATA', payload: newArr })
    }


    return (
        <Page
            className={classes.root}
            title="Notas de personas"
        >
            <Titulo
                title="Notas de Personas"
                btnType='no'
            />
            <Container maxWidth={false}>
                <Toolbar
                    iglesia={iglesia.nombre}
                    handleInput={handleInput}
                    filtroChange={filtroChange}
                    sortMenu={sortMenu}
                    setSortMenu={setSortMenu}
                    notas={csvNota}
                    setOpenPopup={setOpenPopup}
                />
                <Box mt={1}>
                    <Card >
                        <CardContent>
                            <Box className={classes.form}>
                                {state.isLoading ? (
                                    <p>Loading...</p>
                                ) : state.search.length > 0 ? (
                                    state.searchData.map(post => (
                                        <Item
                                            key={post._id}
                                            nota={post}
                                            confirmDialog={confirmDialog}
                                            setConfirmDialog={setConfirmDialog}
                                            dispatch={dispatch}
                                            setCsvNota={setCsvNota}
                                            stateData={state.data}
                                        />

                                    ))
                                ) : (
                                    state.data.map(post => (
                                        <Item
                                            key={post._id}
                                            nota={post}
                                            confirmDialog={confirmDialog}
                                            setConfirmDialog={setConfirmDialog}
                                            dispatch={dispatch}
                                            setCsvNota={setCsvNota}
                                            stateData={state.data}
                                        />
                                    ))
                                )
                                }
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

            </Container>

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />

            <Popup
                title='Notas Preview'
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                fullScreen={true}
                maxWidth={'sm'}
                Transition={Transition}
            >
                <Reporte notas={csvNota} categoria={sortMenu} />

            </Popup>

        </Page>
    )
}

export default NotasView
