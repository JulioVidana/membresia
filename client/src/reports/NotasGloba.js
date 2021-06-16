import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import moment from 'moment'
import './Style.css'





const NotasGloba = ({ notas, categoria }) => {
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })
    return (
        <div className='sans-serif'>


            <div className='print-wrapper' ref={componentRef}>
                <div className='header-row'>
                    <h1>Notas</h1>
                    {/* eslint-disable-next-line */}
                    <a className="print-action-btn" onClick={handlePrint}>Imprimir reporte</a>
                </div>
                <dl className='filters'>
                    <span className='category'>
                        <dt>Categoria:</dt>
                        <dd>{!categoria ? 'Todo' : categoria}</dd>
                    </span>
                    <span className='date'>
                        <dt>Fecha:</dt>
                        <dd>Todas</dd>
                    </span>
                </dl>
                <div className='row'>
                    <table className='notes-table' >
                        <tbody>
                            {
                                notas.map(item => (
                                    <tr key={item._id}>
                                        <td>
                                            <span className='person'>{item.persona.completo}</span>
                                        </td>
                                        <td>
                                            <span className='note'>
                                                <span className='ww-bw wb-bw hy-a'>
                                                    <span>
                                                        {item.nota}
                                                        <br />
                                                    </span>
                                                </span>
                                                <span className='author'>
                                                    {`${moment(item.fecha).format('LL')} por ${item.createdBy?.nombre}`}
                                                </span>
                                            </span>


                                        </td>
                                        <td>
                                            <span className='category-pill'>{item.categoria}</span>
                                        </td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>

                </div>

            </div>
        </div>
        /*  <Container maxWidth="lg">
             <Card >
                 
             </Card>
 
         </Container> */
    )
}

export default NotasGloba
