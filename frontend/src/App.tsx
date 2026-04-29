import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Reports from './pages/Reports';
import ErrorPage from './pages/ErrorPage';

// Enrutador principal para navegar entre páginas
const router = createBrowserRouter([
  // Ruta padre la primera que se expone
  {
    path: '/',
    errorElement: <ErrorPage />,
    // Rutas hijas
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'reports',
        element: <Reports />
      },
    ],
  }
]);

// Función principal
function App() {
  return (
    // Activamos el enrutador
    <RouterProvider router={router} />
  );
}

export default App;