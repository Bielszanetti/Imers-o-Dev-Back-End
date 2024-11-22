import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"; 

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// função para buscar Banco e a Coleção
export async function getTodosPosts() {
    const db = conexao.db("Imerção-Backend");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}


export async function criarPost(novoPost) {
    const db = conexao.db("Imerção-Backend");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function autlizarPost(id, novoPost) {
    const db = conexao.db("Imerção-Backend");
    const colecao = db.collection("posts");
    const objId = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set:novoPost});
}

