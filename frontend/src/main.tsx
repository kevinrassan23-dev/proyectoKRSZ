import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material'
import { customTheme } from "./Theme.tsx";
import { Provider } from 'react-redux';
import { store } from './store/index';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
    </ThemeProvider>
  </StrictMode>
)
