import { useParams } from "react-router-dom";
import { FormEvent, useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import './AlterarProduto.css'

// Definição da interface para categoria
interface Categoria {
  id: number;
  nome: string;
}

function AlterarLivro() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados para armazenar os dados do livro
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState<number | "">("");

  // Estado para armazenar as categorias
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Buscar dados do livro específico
  useEffect(() => {
    fetch(`http://localhost:8000/livros/${id}`)
      .then(resposta => resposta.json())
      .then(dados => {
        console.log('Dados retornados:', dados);
        setTitulo(dados.titulo);
        setAutor(dados.autor);
        setPreco(dados.preco);
        setImagem(dados.imagem);
        setDescricao(dados.descricao);
        setCategoriaId(dados.categoria_id || "");
      });
  }, [id]);

  // Buscar todas as categorias disponíveis
  useEffect(() => {
    fetch(`http://localhost:8000/categorias`)
      .then(resposta => resposta.json())
      .then((dados: Categoria[]) => setCategorias(dados));
  }, []);

  async function handleForm(event: FormEvent) {
    event.preventDefault();
    try {
      const resposta = await fetch(`http://localhost:8000/livros/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          titulo,
          autor,
          preco,
          imagem,
          descricao,
          categoria_id: categoriaId
        })
      });

      if (resposta.ok) {
        alert("Livro alterado com sucesso!");
        navigate("/");
      } else {
        const mensagem = await resposta.text();
        alert("Erro ao alterar livro - Error: " + mensagem);
      }
    } catch (e) {
      alert("Servidor não está respondendo.");
    }
  }

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
                            <li><Link to={"/"} className="voltar-botao">Voltar</Link></li>
                        </ul>
                    </nav>
                </header>

    <div className="cadastro-container">
      <h1>Alterar Livro</h1>
      <form onSubmit={handleForm}>
        <div>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título"
          />
        </div>
        <div>
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            placeholder="Autor"
          />
        </div>
        <div>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição"
          />
        </div>
        <div>
          <input
            type="text"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            placeholder="Preço"
          />
        </div>
        <div>
          <input
            type="text"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            placeholder="URL da Imagem"
          />
          {imagem && (
            <img
              className="imagem-produto-reduzida"
              src={imagem}
              alt="Imagem do livro"
            />
          )}
        </div>
        <div>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(Number(e.target.value))}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>
        <input type="submit" value="Alterar Livro" />
      </form>
    </div>
    </>
  );
}

export default AlterarLivro;
