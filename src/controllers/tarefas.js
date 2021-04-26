const tarefas = require('../models/tarefas')
const Tarefa = require('../models/tarefas')

module.exports = app => {
    app.get('/tarefas', (req, res) => {
        Tarefa.lista(res)        
    })


    app.get('/tarefas/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Tarefa.buscaPorId(id, res)
    })

    app.post('/tarefas',(req, res) => {
        const tarefa = req.body

        Tarefa.adiciona(tarefa, res)
    })

    app.patch('/tarefas/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Tarefa.altera(id, valores, res)
    })

    app.delete('/tarefas/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Tarefa.deleta(id, res)
    })

}