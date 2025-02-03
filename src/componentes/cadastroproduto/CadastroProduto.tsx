import { ChangeEvent, FormEvent, useState, useEffect } from "react"; 
import { useNavigate, Link } from 'react-router-dom'; 
import './CadastroProduto.css'; 

// Definição do tipo de categoria
interface Categoria {
    id: string;
    nome: string;
}

function CadastroProduto() {
    const navigate = useNavigate();

    // Estados para armazenar os dados do livro
    const [id, setId] = useState("");
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState("");
    const[descricao, setDescricao] = useState("");
    const [categoria_id, setCategoriaId] = useState(""); // Estado para armazenar a categoria selecionada
    const [categorias, setCategorias] = useState<Categoria[]>([]); // Estado para armazenar as categorias carregadas

    // Função para carregar as categorias do banco de dados
    useEffect(() => {
        async function fetchCategorias() {
            try {
                const resposta = await fetch("http://localhost:8000/categorias"); // Corrigir o endpoint, caso seja necessário
                const categoriasData: Categoria[] = await resposta.json(); // Tipando a resposta como um array de Categoria

                // Verifica se a resposta tem o formato esperado
                if (Array.isArray(categoriasData)) {
                    setCategorias(categoriasData);
                } else {
                    alert("Erro ao carregar categorias: dados não no formato esperado.");
                }
            } catch (e) {
                alert("Erro ao carregar categorias");
            }
        }
        fetchCategorias();
    }, []);

    // Função chamada ao enviar o formulário
    async function handleForm(event: FormEvent) {
        event.preventDefault();

        try {
            // Faz uma requisição POST para a API para cadastrar um novo livro
            const resposta = await fetch("http://localhost:8000/livros", { // Alterar endpoint para onde o livro é cadastrado
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    titulo: titulo,
                    autor: autor,
                    preco: preco,
                    imagem: imagem,
                    categoria_id: categoria_id,
                    descricao: descricao

                })
            });

            if (resposta.status === 201) {
                alert("Livro Cadastrado Com Sucesso");
                navigate("/"); // Redireciona para a página inicial
            } else {
                const mensagem = await resposta.text();
                alert("Erro ao Cadastrar livro - Error: " + mensagem);
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
                <h1>Cadastro de Livro</h1>
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
                            placeholder="Título" 
                            type="text" 
                            value={titulo} 
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitulo(e.target.value)} 
                        />
                    </div>
                    <div>
                        <input 
                            placeholder="Autor" 
                            type="text" 
                            value={autor} 
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setAutor(e.target.value)} 
                        />
                    </div>
                    <div>
                        <input 
                            placeholder="Preço" 
                            type="text" 
                            value={preco} 
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPreco(e.target.value)} 
                        />
                    </div>
                    <div>
                        <input 
                            placeholder="URL Imagem" 
                            type="text" 
                            value={imagem} 
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setImagem(e.target.value)} 
                        />
                    </div>
                    <div>
  <textarea 
    placeholder="Descrição" 
    value={descricao} 
    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescricao(e.target.value)} 
  />
</div>


                    {/* Campo de Seleção de Categoria */}
                    <div className="select-container">
  <select onChange={(e) => setCategoriaId(e.target.value)} value={categoria_id}>
    <option value="">Selecione a Categoria</option>
    {categorias.map((categoria) => (
      <option key={categoria.id} value={categoria.id}>
        {categoria.nome}
      </option>
    ))}
  </select>
</div>

                    <input type="submit" value="Cadastrar" />
                </form>
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

export default CadastroProduto;