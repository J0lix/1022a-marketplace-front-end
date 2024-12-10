import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

type ProdutoType = {
  id: number;
  titulo: string;
  preco: string;
  autor: string;
  imagem: string;
  categoria_id: number;
  descricao: string;
};

type CategoriaType = {
  id: number;
  nome: string;
};

function App() {
  // Estados para armazenar livros e categorias
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [categorias, setCategorias] = useState<CategoriaType[]>([]);

  // Carregar produtos e categorias da API
  useEffect(() => {
    // Carregar livros
    fetch("https://one022a-marketplace-33kr.onrender.com/livros")
      .then(resposta => resposta.json())
      .then(dados => setProdutos(dados));

    // Carregar categorias
    fetch("https://one022a-marketplace-33kr.onrender.com/categorias")
      .then(resposta => resposta.json())
      .then(dados => setCategorias(dados));
  }, []);

  // Agrupar livros por categoria
  const livrosPorCategoria = categorias.map(categoria => {
    const livrosDaCategoria = produtos.filter(produto => produto.categoria_id === categoria.id);
    return {
      categoria,
      livros: livrosDaCategoria
    };
  });

  return (
    <>
      {/* Cabeçalho do site */}
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
      
         {/* Publicidade logo abaixo do cabeçalho */}
         <div className="publicidade-container">
        <img src="publi.png" alt="Publicidade" className="publi" />
      </div>

      {/* Seção de Categorias de Livros */}
      <div className="categorias-container">
        {livrosPorCategoria.map((categoriaComLivros) => (
          <div key={categoriaComLivros.categoria.id} className="categoria">
            <h2>{categoriaComLivros.categoria.nome}</h2>
            <div className="livros-scroll">
              {categoriaComLivros.livros.map((produto) => (
                <div key={produto.id} className="produto-item">
                  <h3 className="produto-titulo">{produto.titulo}</h3>
                  <div className='container-imagem'>
                    <img src={produto.imagem} alt={produto.titulo} />
                  </div>
                  <p className="produto-preco">R$ {produto.preco}</p>
                  <p className="produto-autor"><strong> Autor: </strong> {produto.autor}</p>
                  <p className="produto-descricao"><strong> Descrição: </strong>{produto.descricao}</p>
                  <button className="botao-comprar">Comprar</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Rodapé do site */}
      <footer className="site-footer">
        <p>&copy; 2024 Aurea Books. Todos os direitos reservados.</p>
        <p>Criadoras: Bianca de Oliveira Moraes e Júlia Strey Bem</p>
        <p>Emails: bianca.moraes@estudante.ifms.edu.br, julia.bem@estudante.ifms.edu.br</p>
        <p>Email da loja: aurea.books@gmail.com</p>
      </footer>
    </>
  );
}

export default App;
