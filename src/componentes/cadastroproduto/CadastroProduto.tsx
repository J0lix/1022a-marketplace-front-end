<<<<<<< HEAD
// Importações necessárias
import { ChangeEvent, FormEvent, useState } from "react"; // Hooks do React para gerenciar estado e eventos
import { useNavigate, Link } from 'react-router-dom'; // Ferramentas de navegação do React Router
import './CadastroProduto.css'; // Estilos específicos para a página de cadastro

// Componente principal: CadastroProduto
function CadastroProduto() {
    // Navegação para redirecionar após o cadastro
    const navigate = useNavigate();

    // Estados para armazenar os dados inseridos no formulário
    const [id, setId] = useState("");
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState("");

    // Função chamada ao enviar o formulário
    async function handleForm(event: FormEvent) {
        event.preventDefault(); // Previne o comportamento padrão de recarregar a página

        try {
            // Faz uma requisição POST para a API para cadastrar um novo livro
            const resposta = await fetch("https://one022a-marketplace-33kr.onrender.com", {
                method: "POST", // Método HTTP POST para envio de dados
                headers: {
                    "Content-Type": "application/json" // Indica que o corpo da requisição é JSON
                },
                body: JSON.stringify({
                    id: id, // Dados do livro
                    titulo: titulo,
                    autor: autor,
                    preco: preco,
                    imagem: imagem
                })
            });

            // Verifica o status da resposta
            if (resposta.status === 201) { // Cadastro bem-sucedido
                alert("Livro Cadastrado Com Sucesso");
                navigate("/"); // Redireciona para a página inicial
            } else { // Erro ao cadastrar
                const mensagem = await resposta.text();
                alert("Erro ao Cadastrar livro - Error: " + mensagem);
            }
        } catch (e) { // Tratamento de erro em caso de falha na conexão com o servidor
            alert("Servidor não está respondendo.");
        }
    }

    // Funções para atualizar os estados com os valores digitados nos campos do formulário
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

    // JSX do componente: estrutura da página de cadastro
    return (
        <>
            {/* Cabeçalho da página */}
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

            {/* Container principal do formulário */}
            <div className="cadastro-container">
                <h1>Cadastro de Livro</h1>
                <form onSubmit={handleForm}>
                    {/* Campos do formulário */}
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
                    {/* Botão para submeter o formulário */}
                    <input type="submit" value="Cadastrar" />
                </form>
            </div>

            {/* Rodapé da página */}
            <footer className="site-footer">
                <p>&copy; 2024 Aurea Books. Todos os direitos reservados.</p>
                <p>Criadoras: Bianca de Oliveira Moraes e Júlia Strey Bem</p>
                <p>Emails: bianca.moraes@estudante.ifms.edu.br, julia.bem@estudante.ifms.edu.br</p>
                <p>Email da loja: aurea.books@gmail.com</p>
            </footer>
        </>
    );
}

export default CadastroProduto;
=======
import {  ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from 'react-router-dom';
function CadastroProduto(){
    const navigate = useNavigate()
    const [id,setId] = useState("")
    const [nome,setNome] = useState("")
    const [descricao,setDescricao] = useState("")
    const [preco,setPreco] = useState("")
    const [imagem,setImagem] = useState("")
    async function handleForm(event:FormEvent){
        event.preventDefault()
        try{
            const resposta = await fetch("http://localhost:8000/produtos",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    id:id,
                    nome:nome,
                    descricao:descricao,
                    preco:preco,
                    imagem:imagem
                })
            })
            if(resposta.status!=500){
                alert("Produto Cadastro com Sucesso")
                navigate("/")
            }
            else{
                const mensagem = await resposta.text()
                alert("Erro ao Cadastrar Produto - Error: "+mensagem)
            }
        }
        catch(e){
            alert("Servidor não está respondendo.")
        }
        
    }
    function handleId(event:ChangeEvent<HTMLInputElement>){
        setId(event.target.value)
    }
    function handleNome(event:ChangeEvent<HTMLInputElement>){
        setNome(event.target.value)
    }
    function handleDescricao(event:ChangeEvent<HTMLInputElement>){
        setDescricao(event.target.value)
    }
    function handlePreco(event:ChangeEvent<HTMLInputElement>){
        setPreco(event.target.value)
    }
    function handleImagem(event:ChangeEvent<HTMLInputElement>){
        setImagem(event.target.value)
    }
    return(
        <>
            <h1>Meu Componente de Cadastro de Produtos</h1>
            <form onSubmit={handleForm}>
                <div>
                    <input placeholder="Id" type="text" name="id" id="id" onChange={handleId} />
                </div>
                <div>
                    <input placeholder="Nome" type="text" name="nome" id="nome" onChange={handleNome} />
                </div>
                <div>
                    <input placeholder="Descrição" type="text" name="descricao" id="descricao" onChange={handleDescricao} />
                </div>
                <div>
                    <input placeholder="Preço" type="text" name="preco" id="preco" onChange={handlePreco} />
                </div>
                <div>
                    <input placeholder="URL Imagem" type="text" name="imagem" id="imagem" onChange={handleImagem} />
                </div>
                <input type="submit" value="Cadastrar" />
            </form>
        </>
    )
}

export default CadastroProduto
>>>>>>> 612c28cfe3f2d74d787c77bbfb3f65369a6da7d7
