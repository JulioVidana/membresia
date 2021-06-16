import React from 'react'
import AvatarEditor from 'react-avatar-editor'
import {
    Box,
    Slider,
    Grid
} from '@material-ui/core'
import ImageIcon from '@material-ui/icons/Image'

const ImagenEditor = ({ files, setEditor }) => {

    const [scale, setScale] = React.useState(1.2);

    const handleChange = (event, newValue) => {
        const scaleNew = parseFloat(newValue)
        setScale(scaleNew)
    };
    //const setEditorRef = (editor) => setEditor(editor)
    return (
        <Box>

            <AvatarEditor
                ref={(ref) => setEditor(ref)}
                image={files[0]?.preview}
                width={300}
                height={300}
                border={50}
                borderRadius={150}
                color={[0, 0, 0, 0.5]} // RGBA
                scale={parseFloat(scale)}
                rotate={0}
            />
            <Grid container spacing={2}>
                <Grid item>
                    <ImageIcon fontSize='small' />
                </Grid>
                <Grid item xs>
                    <Slider
                        value={scale}
                        onChange={handleChange}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="continuous-slider" />
                </Grid>
                <Grid item>
                    <ImageIcon fontSize='large' />
                </Grid>
            </Grid>
        </Box>
    )
}

export default ImagenEditor
