import {
    Grid,
    Button
} from '@material-ui/core'
import moment from 'moment'
import PublishIcon from '@material-ui/icons/Publish'
import GetAppIcon from '@material-ui/icons/GetApp'
import { CSVLink } from 'react-csv'

const ImportExport = ({ classes, usuariosList, iglesia }) => {

    const csvData = usuariosList.map(x => {
        let nuevo = {
            Nombre: x.nombre,
            aPaterno: x.aPaterno,
            aMaterno: x.aMaterno,
            Genero: x.sexo,
            Fecha_Nacimiento: moment(x.nacimiento).locale('es').format('l'),
            Edad: x.edad,
            Email: x.email,
            Telefono: x.telefono,
            Direccion: x.calle + ' ' + x.colonia + ' ' + x.cp + ' ' + x.ciudad,
            Oficio: x.oficio,
            Estado_Civil: x.civil?.estado,
            Escolaridad: x.escolaridad?.escolaridad,
            Grupo_Edad: x.grupoEdad,
            Tipo_Miembro: x.tipoMiembro?.tipo,
            Bautizado: x.bautismo.activo ? 'SI' : 'NO',
            Fecha_Bautismo: x.bautismo.activo && moment(x.bautismo.fecha).locale('es').format('l'),
            Activo: x.estatus.activo ? 'SI' : 'NO',
            Motivo_Baja: !x.estatus.activo && x.estatus.motivo,
            Fecha_Baja: !x.estatus.activo && moment(x.estatus.fecha).locale('es').format('l'),
        }
        return nuevo
    })

    return (
        <Grid
            className={classes.barExport}
            container
            spacing={1}
            justify='flex-start'
            alignItems="center"
        >
            <Grid item >
                <CSVLink data={csvData} filename={`${iglesia.nombre}-ListaMiembros.csv`} >
                    <Button
                        color='primary'
                        startIcon={<GetAppIcon />}
                    >
                        Exportar</Button>
                </CSVLink>

            </Grid>
            <Grid item >
                <Button
                    color='primary'
                    startIcon={<PublishIcon />}

                >
                    Importar</Button>
            </Grid>

        </Grid>
    )
}

export default ImportExport