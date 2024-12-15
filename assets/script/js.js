// Função para calcular as porcentagens
function calcularPorcentagens(tabela) {
    let linhas = tabela.querySelectorAll("tbody tr");
    let total = 0;

    // Calcula o total dos valores
    linhas.forEach(linha => {
        let valor = parseFloat(linha.querySelector(".tbValor").textContent) || 0;
        total += valor;
    });

    // Atualiza a porcentagem para cada linha
    linhas.forEach(linha => {
        let valor = parseFloat(linha.querySelector(".tbValor").textContent) || 0;
        let porcentagem = total > 0 ? ((valor / total) * 100).toFixed(2) : 0;
        linha.querySelector(".tbPorc").textContent = `${porcentagem}%`;
    });
}

// Função para adicionar os dados
function gravaDados() {
    // Obtendo os dados do formulário
    let data = document.getElementById("movdata").value;
    let descricao = document.getElementById("movNome").value;
    let tipo = document.getElementById("tipo").value;
    let valor = parseFloat(document.getElementById("movValor").value) || 0;

    if (!data || !descricao || !tipo || valor <= 0) {
        alert("Por favor, preencha todos os campos corretamente!");
        return;
    }

    // Determina a tabela de destino
    let tabelaDestino;
    if (tipo === "entrada") {
        tabelaDestino = document.getElementById("dadosEnt");
    } else if (tipo === "fixas") {
        tabelaDestino = document.getElementById("dadosFix");
    } else if (tipo === "dsVariavel") {
        tabelaDestino = document.getElementById("dadosVar");
    }

    // Criação de uma nova linha
    let novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `
        <td class="tbData">${data}</td>
        <td class="tbDesc">${descricao}</td>
        <td class="tbValor">${valor.toFixed(2)}</td>
        <td class="tbPorc">0%</td>
        <td class="tbMenu">
            <button class="close" onclick="removerLinha(this)"><span class="icon-close"></span></button>
            <button class="edit" onclick="editarLinha(this)"><span class="icon-close"></span></button>
            
        </td>
    `;

    // Adiciona a linha à tabela correspondente
    tabelaDestino.querySelector("tbody").appendChild(novaLinha);

    // Atualiza as porcentagens
    calcularPorcentagens(tabelaDestino);

    // Limpa os campos do formulário
    limpaDados();
}

// Função para limpar os campos do formulário
function limpaDados() {
    document.getElementById("movdata").value = "";
    document.getElementById("movNome").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("movValor").value = "";
}

// Função para remover uma linha
function removerLinha(botao) {
    let linha = botao.closest("tr");
    let tabela = linha.closest("table");
    linha.remove();

    // Atualiza as porcentagens após a remoção
    calcularPorcentagens(tabela);
}

// Função para editar linha
function editarLinha(botao) {
    // Obter a linha onde o botão foi clicado
    let linha = botao.closest("tr");

    // Verificar se a linha está em modo de edição
    if (linha.hasAttribute("data-editing")) {
        // Salvar os novos valores e sair do modo de edição
        let inputs = linha.querySelectorAll("input");
        inputs.forEach(input => {
            let td = input.closest("td");
            td.textContent = input.value;
        });

        // Remover o atributo de edição
        linha.removeAttribute("data-editing");

        // Alterar o ícone do botão para "Editar"
        botao.innerHTML = '<span class="icon-pencil"></span>';

        // Atualizar as porcentagens
        let tabela = linha.closest("table");
        calcularPorcentagens(tabela);
    } else {
        // Entrar no modo de edição
        let colunasEditaveis = ["tbData", "tbDesc", "tbValor"]; // Colunas editáveis
        linha.setAttribute("data-editing", "true");

        colunasEditaveis.forEach(classe => {
            let td = linha.querySelector(`.${classe}`);
            if (td) {
                let valorAtual = td.textContent;
                td.innerHTML = `<input type="text" value="${valorAtual}" />`;
            }
        });

        // Alterar o ícone do botão para "Salvar"
        botao.innerHTML = '<span class="icon-check"></span>';
    }
}

