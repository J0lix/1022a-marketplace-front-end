import { ChangeEvent, FormEvent, useState} from "react";
import { useNavigate, Link } from 'react-router-dom';
import './CadastroProduto.css';



function CadastroProduto(){
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState("");

    async function handleForm(event: FormEvent) {
        event.preventDefault();
        try {
            const resposta = await fetch("http://localhost:8000/livros", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    titulo: titulo,
                    autor: autor,
                    preco: preco,
                    imagem: imagem
                })
            });
            if (resposta.status === 201) {
                alert("Livro Cadastrado Com Sucesso");
                navigate("/");
            } else {
                const mensagem = await resposta.text();
                alert("Erro ao Cadastrar livro - Error: " + mensagem);
            }
        } catch (e) {
            alert("Servidor não está respondendo.");
        }
    }

    function handleId(event: ChangeEvent<HTMLInputElement>) {
        setId(event.target.value);
    }

    function handleTitulo(event: ChangeEvent<HTMLInputElement>) {
        setTitulo(event.target.value);
    }

    function handleAutor(event: ChangeEvent<HTMLInputElement>) {
        setAutor(event.target.value);
    }

    function handlePreco(event: ChangeEvent<HTMLInputElement>) {
        setPreco(event.target.value);
    }

    function handleImagem(event: ChangeEvent<HTMLInputElement>) {
        setImagem(event.target.value);
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
                        <li><Link to={"/cadastro-produto"} className="cadastro-botao">Cadastrar Livros</Link></li>
                    </ul>
                </nav>
            </header>

            <div className="cadastro-container">
                <h1>Cadastro de Livro</h1>
                <form onSubmit={handleForm}>
                    <div>
                        <input placeholder="Id" type="text" name="id" id="id" onChange={handleId} />
                    </div>
                    <div>
                        <input placeholder="Título" type="text" name="titulo" id="titulo" onChange={handleTitulo} />
                    </div>
                    <div>
                        <input placeholder="Autor" type="text" name="autor" id="autor" onChange={handleAutor} />
                    </div>
                    <div>
                        <input placeholder="Preço" type="text" name="preco" id="preco" onChange={handlePreco} />
                    </div>
                    <div>
                        <input placeholder="URL Imagem" type="text" name="imagem" id="imagem" onChange={handleImagem} />
                    </div>
                    <input type="submit" value="Cadastrar" />
                </form>
            </div>
            <footer className="site-footer"> <p>&copy; 2024 Aurea Books. Todos os direitos reservados.</p> 
            <p>Criadoras: Bianca de Oliveira Moraes e Júlia Strey Bem</p> 
            <p>Emails: bianca.moraes@estudante.ifms.edu.br, julia.bem@estudante.ifms.edu.br</p> 
            <p>Email da loja: aurea.books@gmail.com</p>  </footer>
        </>
    )
}

export default CadastroProduto;
