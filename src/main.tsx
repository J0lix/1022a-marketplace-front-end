import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import CadastroProduto from './componentes/cadastroproduto/CadastroProduto.tsx';
import AlterarLivro from './componentes/alterarproduto/AlterarProduto.tsx';
import AlterarCategoria from './componentes/alterarcategoria/AlterarCategoria.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cadastro-produto",
    element: <CadastroProduto />,
  },
  {
    path: "/alterar-produto/:id",
    element: <AlterarLivro />,
  },
  {
    path: "/alterar-categoria/:id",
    element: <AlterarCategoria />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
