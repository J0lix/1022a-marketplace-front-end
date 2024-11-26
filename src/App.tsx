import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import './App.css'

// Tipo para produtos
type ProdutoType = {
  id: number,
  titulo: string,
  preco: string,
  autor: string,
  imagem: string
}

function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([])

  // useEffect para carregar produtos
  useEffect(() => {
    // Buscar os produtos
    fetch("http://localhost:8000/livros")
      .then(resposta => resposta.json())
      .then(dados => setProdutos(dados))
  })

  return (
    <>
      <header className="site-header">
        <div className="logo">
          <h1>Aurea Books</h1>
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#produtos">Produtos</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#contato">Contato</a></li>
            <li><Link to={"/cadastro-produto"} className="cadastro-botao">Cadastrar Livros</Link></li>
          </ul>
        </nav>
      
        
      </header>

      {/* Listagem de Produtos */}
      <div className="produtos-container">
        <h1 className='titulo-produto'>Livros</h1>
        <div className="produtos-list">
          {
            produtos.map(produto => (
              <div key={produto.id} className="produto-item">
                <h3 className="produto-titulo">{produto.titulo}</h3>
                <div className='container-imagem'>
                  <img src={produto.imagem} alt="Imagem do produto" />
                </div>
                <p className="produto-preco">{produto.preco}</p>
                <p className="produto-autor">{produto.autor}</p>
                <button className="botao-comprar">Comprar</button>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App
