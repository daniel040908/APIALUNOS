// importa biblioteca
const express = require("express"); //framework web
const { isArrayBuffer } = require("util/types");
// cria a aplicação express
const app = express();
app.use(express.json());
const PORT = 3000

const ALUNOS = [{
        id: 1,
        nome: "Vitor Lima",
        cor: "Branco",
        idade: 26
    },
    {
        id: 2,
        nome: "João",
        cor: "Preto",
        idade: 17
    },

    {
        id: 3,
        nome: "Henry sem ducha",
        cor: "Verde",
        idade: 19
    }
]




app.get("/", (req, res) => {
    res.json({
        msg: "Hello word"
    })

})

app.get("/alunos/:id", (req, res) => {
    const id = Number(req.params.id)

    const aluno = ALUNOS.filter(aluno => aluno.id === id)

    if (aluno.length > 0) {
        res.status(200).json(aluno)
    } else {
        res.status(404).json({ msg: "Aluno não encontrado" })
    }

})

app.get("/alunos/cor/:cor", (req, res) => {
    const cor = req.params.cor.toLowerCase();
    console.log(`Cor recebida: ${cor}`);
    const alunosFiltrados = ALUNOS.filter(
        (aluno) => aluno.cor.toLowerCase() === cor
    );
    if (alunosFiltrados.length > 0) {
        res.status(200).json(alunosFiltrados);

    } else {
        res.status(404).json({ msg: "Nenhum aluno encontrado com essa cor" })
    }
})

app.get("/alunos", (req, res) => {
    res.json(ALUNOS);
})

app.post("/alunos", (req, res) => {
    const { nome, cor, idade } = req.body;
    if (!nome || !cor || !idade) {
        return res.status(400).json({
            mensagem: "Nome, cor e idade são obrigatórios"
        })
    }


    const id = ALUNOS.length > 0 ? ALUNOS[ALUNOS.length - 1].id + 1 : 1

    const novoAluno = {
        id,
        nome,
        cor,
        idade
    }


    console.log(novoAluno)
    ALUNOS.push(novoAluno)
    res.status(201).json({ mensagem: "Aluno criado com sucesso" })
})


app.listen(PORT, () => {
    console.log(`Servidor rodando em http: //localhost:${PORT}`);
})