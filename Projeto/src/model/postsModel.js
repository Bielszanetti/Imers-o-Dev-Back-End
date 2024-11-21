import conectarAoBanco from "../config/dbConfig.js"; 

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// função para buscar Banco e a Coleção
export default async function getTodosPosts() {
    const db = conexao.db("Imersão-Backend");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}