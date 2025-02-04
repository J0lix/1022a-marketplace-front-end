import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa'; // Importação dos ícones
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
  const [livros, setLivros] = useState<ProdutoType[]>([]);
  const [categorias, setCategorias] = useState<CategoriaType[]>([]);

  useEffect(() => {
    fetch("https://maketplace-livraria.onrender.com/livros")
      .then((resposta) => resposta.json())
      .then((dados) => setLivros(dados));

    fetch("https://maketplace-livraria.onrender.com/categorias")
      .then((resposta) => resposta.json())
      .then((dados) => setCategorias(dados));
  }, []);

  function handleExcluirLivro(id: number) {
    if (window.confirm(`Tem certeza que deseja excluir o livro com id ${id}?`)) {
      fetch(`https://maketplace-livraria.onrender.com/livros/${id}`, {
        method: 'DELETE',
      })
        .then((resposta) => {
          if (resposta.ok) {
            alert('Produto excluído com sucesso');
            setLivros((livros) => livros.filter((livro) => livro.id !== id));
          } else {
            alert('Erro ao excluir o produto: Confira o terminal do backend');
          }
        });
    }
  }

  function handleExcluirCategoria(id: number) {
    if (window.confirm(`Tem certeza que deseja excluir a categoria com id ${id}?`)) {
      fetch(`https://maketplace-livraria.onrender.com/categorias/${id}`, {
        method: 'DELETE',
      })
        .then((resposta) => {
          if (resposta.ok) {
            alert('Categoria excluída com sucesso');
            setCategorias((categorias) => categorias.filter((categoria) => categoria.id !== id));
          } else {
            alert('Não é possível excluir uma categoria que contenha livros!');
          }
        });
    }
  }

  const livrosPorCategoria = categorias.map((categoria) => {
    const livrosDaCategoria = livros.filter((livro) => livro.categoria_id === categoria.id);
    return {
      categoria,
      livros: livrosDaCategoria,
    };
  });

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
            <li>
              <Link to="/cadastro-produto" className="cadastro-botao">
                Cadastrar Livros
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="publicidade-container">
        <img src="publi.png" alt="Publicidade" className="publi" />
      </div>

      <div className="categorias-container">
        {livrosPorCategoria.map((categoriaComLivros) => (
          <div key={categoriaComLivros.categoria.id} className="categoria">
            <h2>{categoriaComLivros.categoria.nome}</h2>
            {/* Seção de ações para categorias com estilo diferenciado */}
            <div className="categoria-acoes">
              <button
                className="categoria-btn excluir"
                onClick={() => handleExcluirCategoria(categoriaComLivros.categoria.id)}
                aria-label="Excluir Categoria"
              > <FaTrash className="icon" />
                <span>Deletar</span>
              </button>
              <Link
                to={`/alterar-categoria/${categoriaComLivros.categoria.id}`}
                className="categoria-btn alterar"
                aria-label="Alterar Categoria"
              >
                <FaEdit className="icon" />
                <span>Alterar</span>
              </Link>
            </div>
            <div className="livros-scroll">
              {categoriaComLivros.livros.map((produto) => (
                <div key={produto.id} className="produto-item">
                <div className="produto-info">
                  <h3 className="produto-titulo">{produto.titulo}</h3>
                  <div className="container-imagem">
                    <img src={produto.imagem} alt={produto.titulo} />
                  </div>
                  <p className="produto-preco">R$ {produto.preco}</p>
                  <p className="produto-autor"><strong>Autor:</strong> {produto.autor}</p>
                  <p className="produto-descricao"><strong>Descrição:</strong> {produto.descricao}</p>
                </div>
                <button className="botao-comprar">Comprar</button>
                <div className="botoes-container">
                  <button
                    className="botao-excluir-livro"
                    onClick={() => handleExcluirLivro(produto.id)}
                    aria-label="Excluir Livro"
                  >
                    Excluir <FaTrash />
                  </button>
                  <Link
                    to={`/alterar-produto/${produto.id}`}
                    className="botao-alterar"
                    aria-label="Alterar Livro"
                  >
                    Alterar <FaEdit />
                  </Link>
                </div>
              </div>
              ))}
            </div>
          </div>
        ))}
      </div>

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
