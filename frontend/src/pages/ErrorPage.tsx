import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { Typography, Container } from '@mui/material';

function ErrorPage() {

    // Obtenemos la causa del error
    const error = useRouteError();

    // Variable que muestra un mensaje de error
    var errorMessage: string;

    // Con esta estructura manejamos el tipo de error y qué lo originó
    // Despues asociamos la causa con el mensaje de error correspondiente.
    if (isRouteErrorResponse(error)) {
        errorMessage = error.statusText;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        errorMessage = 'Not Found';
    }

    // vista de error
    return (
        <Container sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h1" component="h1" color="error.main">
                Error 404
            </Typography>

            <Typography variant="h2" color="error.main">
                {errorMessage}
            </Typography>

            <Typography variant="h5" component="h2" sx={{ mb: 4 }}>
                La URL que has introducido no es correcta o no existe
            </Typography>
        </Container>
    );
}

export default ErrorPage;
