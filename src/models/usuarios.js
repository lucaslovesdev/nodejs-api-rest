const moment = require('moment')

const conexao = require ('../infraestrutura/conexao')

class Usuario {
    adiciona(usuario, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(usuario.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const nomeEhValido = usuario.nome.lenght >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'nome',
                valido: nomeEhValido,
                mensagem: 'Nome deve ter pelo menos 5 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.lenght


        if(existemErros){
            res.status(400).json(erros)
        }else{
            const tarefaDatada = {...usuario, dataCriacao, data}
            const sql = 'INSERT INTO Usuarios SET ?'
    
            conexao.query(sql, tarefaDatada, (erro, resultados) =>{
                if(erro){
                    res.status(400).json(erro)
                }else {
                    res.status(201).json(usuario)
                }
            })
        }
    }

    lista(res) {
        const sql = 'SELECT * FROM Usuarios'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM Usuarios WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const usuario = resultados[0]
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(usuario)
            }
        })
    }

    altera(id, valores, res){
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE Usuarios SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Usuarios WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else{
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Usuario