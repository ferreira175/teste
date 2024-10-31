// falso banco de dados 
var clientes = []

// guarda o cliente que está sendo alterado
var clienteAlterado = null

function mostrarModal() {
    const modal = document.getElementById("modal")
    modal.style.display = "block"
}

function adicionar() {
    clienteAlterado = null // marca que está adicionando
    limparFormulario()
    mostrarModal()
}
function alterar(cpf) {
    // busca o cliente que será alterado
    for (let i = 0; i < clientes.length; i++) {
        let cliente = clientes[i]
        if (cliente.cpf == cpf) {
            document.getElementById("nome").value = cliente.nome
            document.getElementById("cpf").value = cliente.cpf
            document.getElementById("peso").value = cliente.peso
            document.getElementById("altura").value = cliente.altura
            document.getElementById("dataNascimento").value = cliente.dataNascimento
            document.getElementById("sapato").value = cliente.sapato

             clienteAlterado = cliente // guarda o clioente que vai ser alterado


            mostrarModal()
        }
    }



}
function excluir(cpf) {
    if (confirm("deseja realmente excluir esse body builder?")) {
        // busca o cliente e exclui se encontrar
        for (let i = 0; i < clientes.length; i++) {
            let cliente = clientes[i]
            if (cliente.cpf == cpf) {
                clientes.splice(i, 1)
                alert("excluído com sucesso")

                atualizarLista()
            }
        }

    }
}
function ocultarModal() {
    const modal = document.getElementById("modal")
    modal.style.display = "none"
}
function salvar() {
    let nome = document.getElementById("nome").value
    let cpf = document.getElementById("cpf").value
    let peso = document.getElementById("peso").value
    let altura = document.getElementById("altura").value
    let dataNascimento = document.getElementById("dataNascimento").value
    let sapato = document.getElementById("sapato").value

    // objeto json
    let novoBuilder = {
        nome: nome,
        cpf: cpf,
        peso: peso,
        altura: altura,
        dataNascimento: dataNascimento,
        sapato: sapato
    }


    // se o cliente alterado igual a null, então está adicionando um novo cliente
    if (clienteAlterado == null) {
        // adiciona um body builder 
        clientes.push(novoBuilder)
        alert("Cadastrado com sucesso")
    }else{ //senão esta sendo alterado
        clienteAlterado.nome = nome
        clienteAlterado.peso = peso
        clienteAlterado.altura = altura
        clienteAlterado.dataNascimento = dataNascimento 
        clienteAlterado.sapato = sapato
        alert('Alterado com sucesso')


    }
    ocultarModal()

    limparFormulario()

    atualizarLista()
    return false

}
function limparFormulario() {
    document.getElementById("nome").value = " "
    document.getElementById("cpf").value = " "
    document.getElementById("peso").value = " "
    document.getElementById("altura").value = " "
    document.getElementById("dataNascimento").value = " "
    document.getElementById("sapato").value = " "

}
function atualizarLista() {
    let tbody = document.getElementsByTagName("tbody")[0]
    tbody.innerHTML = " "
    for (let i = 0; i < clientes.length; i++) {
        let cliente = clientes[i]

        let linhaTabela = document.createElement("tr")
        linhaTabela.innerHTML = ` 
        <td>${cliente.cpf}</td>
                <td>${cliente.nome}</td>
                <td>${cliente.peso}</td>
                <td>${cliente.altura}</td>
                <td>${cliente.dataNascimento}</td>
                <td>${cliente.sapato}</td>
                <td>
                    <button onclick="alterar('${cliente.cpf}')">Alterar</button>
                    <button onclick="excluir('${cliente.cpf}')">Excluir</button>
                </td>
      `
        tbody.appendChild(linhaTabela)
    }
}