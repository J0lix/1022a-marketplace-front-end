import { useParams } from "react-router-dom";
import { FormEvent, useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import './AlterarCategoria.css'; // Importando o CSS

// Definição da interface para categoria
interface Categoria {
    id: number;
    nome: string;
}

function AlterarCategoria() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Estado para armazenar os dados da categoria
    const [nome, setNome] = useState<string>("");

    // Buscar dados da categoria específica
    useEffect(() => {
        fetch(`http://localhost:8000/categorias/${id}`)
            .then(resposta => resposta.json())
            .then((dados: Categoria) => {
                setNome(dados.nome);
            });
    }, [id]);

    // Função para lidar com a submissão do formulário
    async function handleForm(event: FormEvent) {
        event.preventDefault();
        try {
            const resposta = await fetch(`http://localhost:8000/categorias/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome
                })
            });

            if (resposta.ok) {
                alert("Categoria alterada com sucesso!");
                navigate("/"); // Redireciona para a página inicial ou para onde for necessário
            } else {
                const mensagem = await resposta.text();
                alert("Erro ao alterar categoria - Error: " + mensagem);
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
            <h1>Alterar Categoria</h1>
            <form onSubmit={handleForm}>
                <div>
                    <label htmlFor="id">Id</label>
                    <input type="text" id="id" value={id} readOnly />
                </div>
                <div>
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome da Categoria"
                    />
                </div>
                <input type="submit" value="Alterar Categoria" />
            </form>
        </div>
        </>
    );
}

export default AlterarCategoria;
