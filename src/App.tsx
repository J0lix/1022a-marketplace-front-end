<<<<<<< HEAD
// Importação de bibliotecas essenciais
import { useEffect, useState } from 'react'; // Hooks do React para efeitos colaterais e gerenciamento de estado
import { Link } from 'react-router-dom'; // Ferramenta para navegação entre páginas
import './App.css'; // Arquivo de estilos específicos para o componente
=======
import { useEffect, useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
// Tipo para produtos
type ProdutoType = {
  id: number,
  nome: string,
  preco: string,
  descricao: string,
  imagem: string
}
>>>>>>> 612c28cfe3f2d74d787c77bbfb3f65369a6da7d7

// Tipo para definir o formato de um produto
type ProdutoType = {
  id: number; // Identificador único do produto
  titulo: string; // Título do livro
  preco: string; // Preço do livro
  autor: string; // Nome do autor do livro
  imagem: string; // URL da imagem do livro
};

function App() {
  // Estado para armazenar a lista de produtos
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);

  // Hook para carregar os produtos da API quando o componente for montado
  useEffect(() => {
<<<<<<< Updated upstream
    fetch("https://one022a-marketplace-33kr.onrender.com/livros") // Faz uma requisição para a API
      .then(resposta => resposta.json()) // Converte a resposta para JSON
      .then(dados => setProdutos(dados)); // Atualiza o estado com os produtos recebidos
  });
=======
    // Buscar os produtos
    fetch("https://one022a-marketplace-33kr.onrender.com/livros")
      .then(resposta => resposta.json())
      .then(dados => setProdutos(dados))
  })
>>>>>>> Stashed changes

  return (
    <>
      {/* Cabeçalho do site */}
      <header className="site-header">
        <div className="logo">
          <h1>Aurea Books</h1> {/* Nome do site */}
        </div>
        <nav className="navigation">
<<<<<<< Updated upstream
          {/* Campo de busca de livros */}
          <div className="search-container">
            <input type="text" placeholder="Buscar livro..." /> {/* Campo de texto */}
            <button>Buscar</button> {/* Botão de busca */}
          </div>
          {/* Links de navegação */}
=======

        
>>>>>>> Stashed changes
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#produtos">Produtos</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#contato">Contato</a></li>
<<<<<<< HEAD
            <li><Link to={"/cadastro-produto"} className="cadastro-botao">Cadastrar Livros</Link></li>
=======
            <Link to="/cadastro-produto">Cadastro de Produto</Link>
>>>>>>> 612c28cfe3f2d74d787c77bbfb3f65369a6da7d7
          </ul>
        </nav>
      </header>

      {/* Listagem de Produtos */}
      <div className="produtos-container">
<<<<<<< HEAD
        <img src="publi.png" alt="aparece pfv" className="publi" /> {/* Imagem promocional */}
        <h1 className='titulo-produto'>Livros</h1> {/* Título da seção */}
=======
      <Link to="/cadastro-produto">Cadastro de Produto</Link>
        <h1 className='titulo-produto'>Produtos</h1>
>>>>>>> 612c28cfe3f2d74d787c77bbfb3f65369a6da7d7
        <div className="produtos-list">
          {/* Renderização da lista de produtos */}
          {
            produtos.map(produto => (
              <div key={produto.id} className="produto-item">
                <h3 className="produto-titulo">{produto.titulo}</h3> {/* Título do livro */}
                <div className='container-imagem'>
                  <img src={produto.imagem} alt="Imagem do produto" /> {/* Imagem do livro */}
                </div>
                <p className="produto-preco">R$ {produto.preco}</p> {/* Preço com "R$" */}
                <p className="produto-autor">{produto.autor}</p> {/* Nome do autor */}
                <button className="botao-comprar">Comprar</button> {/* Botão de compra */}
              </div>
            ))
          }
        </div>
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
