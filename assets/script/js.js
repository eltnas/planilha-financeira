let enData = document.getElementById('movdata');
let enNome = document.getElementById('movNome');
let enTipo = document.getElementById('tipo');
let enValor = document.getElementById('movValor');
let btnGrava = document.getElementById('btnGrava')
let btnLimpa = document.getElementById('btnLimpa')

btnGrava.addEventListener('click', ()=>{
    let tipoEntrada = enTipo.options[enTipo.selectedIndex].value;

    if (tipoEntrada === 'entrada'){
        alert("Tipo de entrada: "+ tipoEntrada)
    }
    if (tipoEntrada === 'fixas'){
        alert("Tipo de entrada: "+ tipoEntrada)
    }
    if (tipoEntrada === 'dsVariavel'){
        alert("Tipo de entrada: "+ tipoEntrada)
    }
    if (tipoEntrada === ''){
        alert("Selecione um tipo de Movimentação")
    }

})
