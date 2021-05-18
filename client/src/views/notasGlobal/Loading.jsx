import {
    Container,
    Box,
    CardContent
} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'


const Loading = () => {
    return (
        <Container>
            <Box mt={1} mb={1}>
                <CardContent>
                    <Box>
                        <Skeleton variant="rect" width="100%" animation="wave">
                            <div style={{ paddingTop: '9%' }} />
                        </Skeleton>
                    </Box>
                </CardContent>
            </Box>
            <Box mt={1}>
                <CardContent>
                    <Box>
                        <Skeleton variant="rect" width="100%" animation="wave">
                            <div style={{ paddingTop: '70%' }} />
                        </Skeleton>
                    </Box>
                </CardContent>

            </Box>

        </Container>
    )
}

export default Loading
