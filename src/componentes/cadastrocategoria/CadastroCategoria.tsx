import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./CadastroCategoria.css"; 

function CadastroCategoria() {
  const navigate = useNavigate();

  // Estados para armazenar os dados da categoria
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");

  // Função chamada ao enviar o formulário
  async function handleForm(event: FormEvent) {
    event.preventDefault();

    try {
      // Requisição POST para cadastrar uma nova categoria
      const resposta = await fetch("https://maketplace-livraria.onrender.com/categorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          nome: nome,
        }),
      });

      if (resposta.status === 201) {
        alert("Categoria Cadastrada com Sucesso");
        navigate("/"); // Redireciona para a página inicial
      } else {
        const mensagem = await resposta.text();
        alert("Erro ao cadastrar categoria - Error: " + mensagem);
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
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#produtos">Produtos</a>
            </li>
            <li>
              <a href="#sobre">Sobre</a>
            </li>
            <li>
              <a href="#contato">Contato</a>
            </li>
            <li>
              <Link to={"/"} className="voltar-botao">
                Voltar
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="cadastro-container">
        <h1>Cadastro de Categoria</h1>
        <form onSubmit={handleForm}>
          <div>
            <input
              placeholder="Id"
              type="text"
              value={id}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Nome"
              type="text"
              value={nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
            />
          </div>
          <input type="submit" value="Cadastrar" />
        </form>
      </div>

      <footer className="site-footer">
        <p>&copy; 2024 Aurea Books. Todos os direitos reservados.</p>
        <p>Criadoras: Bianca de Oliveira Moraes e Júlia Strey Bem</p>
        <p>
          Emails: bianca.moraes@estudante.ifms.edu.br, julia.bem@estudante.ifms.edu.br
        </p>
        <p>Email da loja: aurea.books@gmail.com</p>
      </footer>
    </>
  );
}

export default CadastroCategoria;
