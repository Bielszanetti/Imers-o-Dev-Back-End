import {getTodosPosts, criarPost, autlizarPost} from "../model/postsModel.js";
import fs from "fs"
import gerarDescricaoComGemini from "../service/geminiService.js";

export async function listarPosts (req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try{
        const PostCriado = await criarPost(novoPost);
        res.status(200).json(PostCriado);
    } catch(erro) {
        console.error(erro.menssage);
        res.status(500).json({"Erro": "Falha na Requisação"})
    }
}

export async function upLoadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }
    try{
        const PostCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${PostCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(PostCriado);
    } catch(erro) {
        console.error(erro.menssage);
        res.status(500).json({"Erro": "Falha na Requisação"})
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    
    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricaoIA = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricaoIA,
            alt: req.body.alt
        }

        const PostCriado = await autlizarPost(id, post);
        res.status(200).json(PostCriado);
    } catch(erro) {
        console.error(erro.menssage);
        res.status(500).json({"Erro": "Falha na Requisação"})
    }
}
