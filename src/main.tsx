import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CadastroProduto from './componentes/cadastroproduto/CadastroProduto.tsx';
<<<<<<< HEAD
=======
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/cadastro-produto",
    element: <CadastroProduto/>,
  },
]);
>>>>>>> 612c28cfe3f2d74d787c77bbfb3f65369a6da7d7

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/cadastro-produto",
    element: <CadastroProduto/>,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
<<<<<<< HEAD
    <RouterProvider router ={router} />
=======
    <RouterProvider router={router} />
>>>>>>> 612c28cfe3f2d74d787c77bbfb3f65369a6da7d7
  </StrictMode>,
)
