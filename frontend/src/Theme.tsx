import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
    palette: {
        mode: 'dark',
        //Color primario
        primary: {
        main: '#164cfdff',
        },
        //Color secundario
        secondary: {
        main: '#ff3db5ff',
        },
        //Color de fondo
        background: {
        default: '#121212',
        paper: '#1e1e1e',
        },

        //Texto
        text: {
        primary: '#b1afafff',    
        secondary: '#949393ff',  
        },

        //Error
        error: {
        main: '#ff2b1cff',
        },

        //Advertencia
        warning: {
        main: '#ff9800',
        },

        //Información
        info: {
        main: '#2196f3',
        },

        //Éxito
        success: {
        main: '#38b53cff',
        },
    },
});
