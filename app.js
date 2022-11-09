const cors = require('cors');
const {
    response
} = require('express');
const express = require('express')

const {
    getAluno,
    getAlunosPorCurso,
    getFiltrarAlunosPorStatus,
    getDisciplinas,
} = require('./modules/alunos.js')

const {
    getCursos,
    listCursos
} = require('./modules/cursos')

const app = express();

app.use(express.json()) // body-parser
app.use(cors()) // use cors  

app.get('/cursos', async (req, res) => {
    const response = listCursos();

    return res.status(200).json(response)
})

app.get('/curso/:siglaCurso', async function (request, response) {
    //recebe a variavel nome por QueryString (indicada quando precisamos fazer filtros)

    const siglaCurso = request.params.siglaCurso

    //chama a funcao e encaminha a palavra chave 

    const curso = getCursos(siglaCurso)


    if (curso) {
        response.status(200)
        response.json(curso)
    } else {
        response.status(404)
    }

})



app.get('/cursoAlunos/:siglaCurso', async function (request, response) {


    //recebe a variavel nome por QueryString (indicada quando precisamos fazer filtros)

    const siglaAlunosCurso = request.params.siglaCurso

    //chama a funcao e encaminha a palavra chave 

    const alunos = getAlunosPorCurso(siglaAlunosCurso)

    if (alunos) {
        response.status(200)
        return response.json(alunos)
    } else {
        response.status(404)
    }

})

app.get('/aluno/:numeroAluno', async function (request, response) {
    //recebe a variavel nome por QueryString (indicada quando precisamos fazer filtros)

    const matriculaAluno = request.params.numeroAluno

    //chama a funcao e encaminha a palavra chave 

    const aluno = getAluno(matriculaAluno)

    if (aluno) {
        response.status(200)
        response.json(aluno)
    } else {
        response.status(404)
    }
})

app.get('/alunos/:curso/:status', async (req, res) => {
    const {
        curso,
        status
    } = req.params

    // chegar indefinido 
    if (!curso || !status) {
        return res.status(400).json({
            error: true,
            message: ['bad request, missing the params']
        })
    }

    const response = getFiltrarAlunosPorStatus(status, curso)

    // chega a se existe uma resposta valida da funcao acima
    if (response.length === 0) {
        return res.status(400).json({
            error: true,
            message: ['not found stundets']
        })
    }

    return res.status(200).json({
        error: false,
        response
    });
})


app.get('/listaAlunos/:numeroMatricula', async function (request, response) {
    //recebe a variavel nome por QueryString (indicada quando precisamos fazer filtros)

    const numeroMatricula = request.params.numeroMatricula

    //chama a funcao e encaminha a palavra chave 

    const listDisciplinas= getDisciplinas(numeroMatricula)

    if (listDisciplinas) {
        response.status(200)
        response.json(listDisciplinas)
    } else {
        response.status(404)
    }
})
// init server

app.listen(5050, () => {
    console.log('aguardando servidor')
})