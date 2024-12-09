// Importação de bibliotecas essenciais
import { useEffect, useState } from 'react'; // Hooks do React para efeitos colaterais e gerenciamento de estado
import { Link } from 'react-router-dom'; // Ferramenta para navegação entre páginas
import './App.css'; // Arquivo de estilos específicos para o componente

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
    fetch("https://one022a-marketplace-33kr.onrender.com/livros") // Faz uma requisição para a API
      .then(resposta => resposta.json()) // Converte a resposta para JSON
      .then(dados => setProdutos(dados)); // Atualiza o estado com os produtos recebidos
  });

  return (
    <>
      {/* Cabeçalho do site */}
      <header className="site-header">
        <div className="logo">
          <h1>Aurea Books</h1> {/* Nome do site */}
        </div>
        <nav className="navigation">
          {/* Campo de busca de livros */}
          <div className="search-container">
            <input type="text" placeholder="Buscar livro..." /> {/* Campo de texto */}
            <button>Buscar</button> {/* Botão de busca */}
          </div>
          {/* Links de navegação */}
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
        <img src="publi.png" alt="aparece pfv" className="publi" /> {/* Imagem promocional */}
        <h1 className='titulo-produto'>Livros</h1> {/* Título da seção */}
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
