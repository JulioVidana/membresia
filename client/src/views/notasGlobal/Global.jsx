import React, { useReducer, useState, useEffect } from 'react'
import {
    Container,
    Box,
    Card,
    CardContent,
    Slide
} from '@material-ui/core'
import Toolbar from './Toolbar'
import Item from './Items'
import ConfirmDialog from 'src/components/ConfirmDialog'
import Popup from 'src/components/Popup'
import Reporte from 'src/reports/NotasGloba'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})


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


const Global = ({
    notas,
    iglesia,
    confirmDialog,
    setConfirmDialog,
    sortMenu,
    setSortMenu
}) => {
    // Initial State And Reducer Function
    const initialState = {
        isLoading: false,
        data: notas,
        search: '',
        searchData: [],
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    const [csvNota, setCsvNota] = useState(notas)
    const [openPopup, setOpenPopup] = useState(false)

    useEffect(() => {
        dispatch({ type: 'SET_DATA', payload: notas })
        setCsvNota(notas)
    }, [notas])

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
                        <Box >
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

        </Container>

    )
}

export default Global
