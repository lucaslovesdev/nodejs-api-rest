const json  = require('body-parser')
const moment = require('moment')
const conexao = require("../infraestrutura/conexao")

class Tarefa {
    adiciona(tarefa, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(tarefa.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = tarefa.titulo.lenght >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser amior igual a data atual'
            },

            {
                nome: 'titulo',
                valido: clienteEhValido,
                mensagen: 'Titulo deve ter pelo menos 5 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        } else {
            const tarefaDatada = {...tarefa, dataCriacao, data}
            const sql = 'INSERT INTO Tarefas SET ?'
    
            conexao.query(sql, tarefaDatada, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(tarefa)
                }    
            })           
        }

        
    }

    lista(res){
        const sql = 'SELECT * FROM Tarefas'

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM Tarefas WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const tarefa = resultados[0]
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(tarefa)
            }
        })
    }

    altera(id, valores, res) {
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        const sql = 'UPDATE Tarefas SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res){
        const sql = 'DELETE FROM Tarefas WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else{
                res.status(200).json({id})
            }
        })
    }

}

module.exports = new Tarefa