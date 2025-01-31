import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00008B',


        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#DBE0E5',
                            borderWidth: "2px"
                        },
                        '&:hover fieldset': {
                            borderColor: '#00008B',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#00008B',
                        },
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'capitalize', // Transform button text to capitalize
                },
            },
        },
    },
});

export default theme;
