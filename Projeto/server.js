import express from "express";


//criando um array (Lista)
const posts = [
    {
        id: 1,
        descricao: "Uma foto teste",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Gato brincando com um novelo de lã",
        imagem: "https://placecats.com/felix/400/200"
    },
    {
        id: 3,
        descricao: "Gatinho dormindo em uma caixa",
        imagem: "https://placecats.com/whiskers/500/300"
    },
    {
        id: 4,
        descricao: "Gatos olhando pela janela",
        imagem: "https://placecats.com/ginger/600/300"
    },
    {
        id: 5,
        descricao: "Gata preguiçosa tomando sol",
        imagem: "https://placecats.com/luna/300/200"
    }
];

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Servidor escutando...');
});

app.get('/posts', (req, res) => {
    res.status(200).json(posts);
});

//Criando funçao para entra no arrey e fazer uma busca de post por ID
function BuscarPostPorID(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id)
    })
}

app.get('/posts/:id', (req, res) => {
    const index = BuscarPostPorID(req.params.id)
    res.status(200).json(posts[index]);
});
