let btnGravaDados = document.getElementById('btnGrava');
let Dados = document.getElementsByClassName('mov');
let arrayEntradas = [[]];
let arrayDespFixas = [[]];
let arrayDespVariaveis = [[]];
let tipo = [[]];

// Função para calcular a porcentagem
function valorPorc(valores, tipo) {
    // Calcula o valor total de todos os valores
    let valorTotal = tipo.reduce((soma, item) => soma + parseFloat(item[2] || 0), 0);
    valorTotal += parseFloat(valores);
    let porc = ((valores / valorTotal) * 100).toFixed(2);  // Calcula a porcentagem
    return porc.toString() + "%";
}

// Função para atualizar todas as porcentagens
function atualizarPorcentagens() {
    let tabela = document.getElementById('tabelaDados').getElementsByTagName('tbody')[0];
    let linhas = tabela.rows;

    // Recalcula as porcentagens para todas as linhas
    for (let i = 0; i < linhas.length; i++) {
        let valor = parseFloat(linhas[i].cells[2].textContent);  // Obtém o valor da coluna Valor
        let todasLinhas = [];
        for (let j = 0; j < linhas.length; j++) {
            todasLinhas.push([linhas[j].cells[2].textContent]);
        }
        let porc = valorPorc(valor, todasLinhas);  // Calcula a porcentagem para cada linha
        linhas[i].cells[3].textContent = porc;  // Atualiza a célula de porcentagem
    }
}

// Função para gravar dados
function gravaDados(tipo, tab) {
    let id = tipo.length;
    let valores = parseFloat(Dados[3].value); // Certifique-se de acessar o valor corretamente

    let entraDados = [
        new Date().toLocaleDateString('pt-BR'), // Data atual
        Dados[1].value, // Descrição
        valores, // Valor
        valorPorc(valores, tipo) // Porcentagem calculada
    ];

    tipo.push(entraDados); // Adiciona os dados ao tipo
    console.log(`Dados adicionados com ID ${id}:`, entraDados);
    console.log("Estado atual de 'tipo':", tipo);
    console.log(tab.id);

    // Acessa a tabela correta pelo ID
    let tabela = document.getElementById(tab.id);
    if (!tabela) {
        console.error('Tabela com ID ' + tab + ' não encontrada!');
        return;
    }

    let tbody = tabela.getElementsByClassName('tbDados')[0];
    if (!tbody) {
        console.error('Não foi possível encontrar <tbody> na tabela com ID ' + tab);
        return;
    }

    // Cria uma nova linha na tabela
    let novaLinha = tbody.insertRow();

    // Preenche as células da nova linha com os dados
    novaLinha.innerHTML = `
        <tr class="tbData">
            <td class="tbData">${entraDados[0]}</td>
            <td class="tbDesc">${entraDados[1]}</td>
            <td class="tbValor">R$ ${entraDados[2].toFixed(2)}</td>
            <td class="tbPorc">${entraDados[3]}</td>
            <td class="tbMenu">
                <button class="edit"><span class="icon-pencil"></span></button>
                <button class="close"><span class="icon-close"></span></button>
            </td>
        </tr>
    `;

    console.log(novaLinha);

    // Atualiza as porcentagens para todas as linhas
    atualizarPorcentagens();
}

// Evento para gravar os dados
btnGravaDados.addEventListener('click', () => {
        // Verifica se o tipo de movimentação foi selecionado
    if (!Dados[2].value) {
        alert('Selecione um tipo de Movimentação!');
    }
    else if(!Dados[0].value){
        alert('Selecione uma Data!');
    }
    else if(!Dados[1].value){
        alert('Insira uma descrição!');
    }
    else if(!Dados[3].value){
        alert('Insira o valor da movimentação!');
    }
    else {
        // Se for 'entrada', grava no arrayEntradas
        if (Dados[2].value === 'entrada') {
            gravaDados(arrayEntradas, dadosEnt);
        }
        // Se for 'fixas', mostra um alerta
        else if (Dados[2].value === 'fixas') {
            gravaDados(arrayDespFixas, dadosFix);
        }
        // Se for 'dsVariavel', mostra um alerta
        else if (Dados[2].value === 'dsVariavel') {
            gravaDados(arrayDespVariaveis, dadosVar);
        }
    }
});
