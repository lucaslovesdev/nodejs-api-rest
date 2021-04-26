class Tabelas {
    init(conexao){
       this.conexao = conexao

       this.criarUsuarios()

       this.criarTarefas()
    }

    criarUsuarios() {
        const sql = 'CREATE TABLE IF NOT EXISTS Usuarios (id int NOT NULL AUTO_INCREMENT, nome varchar(50) NOT NULL, email varchar(50) NOT NULL, senha varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'

        this.conexao.query(sql, (erro) => {
            if(erro){
                console.log(erro)
            } else {
                console.log('Tabela Usuarios criada com sucesso')
            }
        })
    }

    criarTarefas(){
        const sql = 'CREATE TABLE IF NOT EXISTS Tarefas (id int NOT NULL AUTO_INCREMENT, titulo varchar(50) NOT NULL, descricao varchar(100) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar (20) NOT NULL, PRIMARY KEY(id))'
        this.conexao.query(sql, (erro) => {
            if(erro){
                console.log(erro)
            }else{
                console.log('Tabela tarefas criada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas