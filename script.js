var totalFINAL = [];
var totalFINAL2 = [];

function addProduto() {
    inProduto = document.getElementById('inProduto');
    inValor = document.getElementById('inValor');

    produto = inProduto.value;
    valor = Number(inValor.value);

    totalFINAL.push(valor);
    var tbProdutos = document.getElementById('tbProdutos');

    //chama de funcoes
    inserirLinha(tbProdutos, produto, valor);
    gravarProduto(produto, valor);

    inProduto.value = '';
    inValor.value = '';
    inProduto.focus();
  
    mostrarBTN();
    totalGastos();
}

btnAdd.addEventListener('click', addProduto);

function gravarProduto(produto, valor) {
 

    if (localStorage.getItem('produtosTitulo')) {
        var produtosTitulo = localStorage.getItem('produtosTitulo') + ';' + produto;
        var valorTitulo = localStorage.getItem('valorTitulo') + ';' + valor;


        localStorage.setItem('produtosTitulo', produtosTitulo);
        localStorage.setItem('valorTitulo', valorTitulo);
    } else {
        //a primeira insercao salva sem delimitador
        localStorage.setItem('produtosTitulo', produto);
        localStorage.setItem('valorTitulo', valor);
    }

};

function recuperarProduto() {
    if (localStorage.getItem('produtosTitulo')) {
        //obtem o conteudo e converte em elementos do vetor

        var produto = localStorage.getItem('produtosTitulo').split(';');
        var valor = localStorage.getItem('valorTitulo').split(';');

        //cria ref aos elementos

        var tbProdutos = document.getElementById('tbProdutos');

        //percorre os elementos do vetor e os insere na table
        for (var i = 0; i < produto.length; i++) {
            inserirLinha(tbProdutos, produto[i], Number(valor[i]));
            numero = Number(valor[i]);
            totalFINAL.push(numero);

        }
    }

    mostrarBTN()
}

recuperarProduto();

function inserirLinha(tabela, produto, valor) {
    var linha = tabela.insertRow(-1); //add linha na table
    var col1 = linha.insertCell(0);
    var col2 = linha.insertCell(1);
    var col3 = linha.insertCell(2);

    col1.textContent = produto;
    col2.textContent = valor;


    

    
    col3.innerHTML = '<input type="checkbox">' + ' ' + '<button class="btn btn-outline-success" onclick="removerElemento(event.target)">Apagar</button>';


};

function removerElemento(elementoClicado) {
    var tbProdutos = document.getElementById('tbProdutos');
    var ckExcluir = tbProdutos.getElementsByTagName('input');



    elementoClicado.closest("tr").remove();
    document.getElementById('tbProdutos');


    localStorage.removeItem('produtosTitulo');
    localStorage.removeItem('valorTitulo');

    numero = 0;
    for (i = 1; i < ckExcluir.length; i++) {

        //obtem o conteudo da table(coluna 0 produto coluna 1 valor)
        var produto = tbProdutos.rows[i].cells[0].textContent;
        var valor = tbProdutos.rows[i].cells[1].textContent;


        gravarProduto(produto, valor)

    }


    mostrarBTN()


    if (localStorage.getItem('produtosTitulo')) {

 
        var ckExcluir = document.getElementsByTagName('input');
        //obtem o conteudo e converte em elementos do vetor

        var produto = localStorage.getItem('produtosTitulo').split(';');
        var valor = localStorage.getItem('valorTitulo').split(';');

        //add o valor no array total transformando ele em number
        total = [];

            for (i=0; i< valor.length; i++) {
                total.push(parseInt(valor[i]));
            }
    
            //pega os valores já como number e os concatena no total
            finalResult = 0;
            for(i=0; i<total.length; i++) {
                finalResult += total[i];
            }
           
    
            col2.innerHTML = finalResult;

            console.log(finalResult)


        


    }
    }


    var ckTodos = document.getElementById('ckTodos');

    //exec func anonima quando houver toca de status
    ckTodos.addEventListener('change', function () {
        //cria ref a table e aos campos input
        var ckExcluir = document.getElementsByTagName('input');
    
        var status = ckTodos.checked;
    
        for (var i = 1; i < ckExcluir.length; i++) {
            ckExcluir[i].checked = status;
        }
    });
    
    function removerProdutos() {
        var tbProdutos = document.getElementById('tbProdutos');
        var ckExcluir = tbProdutos.getElementsByTagName('input');
    
    
        var temSelecionado = false;
        //percorre os campos input type checkbox da table exceto todos no titulo
        for (var i = 1; i < ckExcluir.length; i++) {
            if (ckExcluir[i].checked) {
                temSelecionado = true;
                break;
            }
        }
    
    
        //se nao tem selecionado
        if (!temSelecionado) {
            alert('Não há itens selecionados para exclusão');
        }
    
        if (confirm('Confirma a exclusão dos itens selecionados?')) {
            localStorage.removeItem('produtosTitulo');
            localStorage.removeItem('valorTitulo');
    
            //primeiro grava no storage os itens nao selecionados
    
            for (i = 1; i < ckExcluir.length; i++) {
                if (!ckExcluir[i].checked) {
                    //obtem o conteudo da table(coluna 0 produto coluna 1 valor)
                    var produto = tbProdutos.rows[i].cells[0].textContent;
                    var valor = tbProdutos.rows[i].cells[1].textContent;
    
    
                    gravarProduto(produto, valor)
                }
            }
    
    
            //remove as linhas selecionadas do fim p o inicio
            for (i = ckExcluir.length - 1; i > 0; i--) {
                if (ckExcluir[i].checked) {
                    var excluirValor = tbProdutos.rows[i].cells[1].textContent;
                    tbProdutos.deleteRow(i);
    
    
    
    
                    indice = totalFINAL.indexOf(excluirValor);
                    totalFINAL.splice(indice, 1);
    
                }
            }
    
            ckExcluir[0].checked = false; //desmarca o marcartodos
        }
    
    
        mostrarBTN()
    
    }
    
    btnExcluir.addEventListener('click', removerProdutos)

    function mostrarBTN() {
        var btn = document.getElementById('btnExcluir');
        var tbProdutos = document.getElementById('tbProdutos');
        var ckExcluir = tbProdutos.getElementsByTagName('input');
    
    
        contadore = 0;
    
        for (i = 0; i <= ckExcluir.length; i++) {
            contadore++;
        };
    
    
        if (contadore >= 3) {
            btn.classList.remove('btnExcluir1')
            btn.classList.add('btnExcluir2')
    
        } else {
            btn.classList.remove('btnExcluir2')
            btn.classList.add('btnExcluir1')
        }
        console.log(contadore)
    
    }
    

    
document.getElementById('tbTotal');
var linha = tbTotal.insertRow(0); //add linha na table
var col1 = linha.insertCell(0);
var col2 = linha.insertCell(1);
var col3 = linha.insertCell(2);


var contadora = 0;

for (i = 0; i < totalFINAL.length; i++) {
    contadora += totalFINAL[i];

}

col1.textContent = 'Total: ';
//col2.textContent = totalFINAL[0];


function totalGastos(finalResult) {

    resposta = 0;

    for(i=0;i<totalFINAL.length; i++) {
        resposta+= totalFINAL[i];
    }

    col2.innerHTML = resposta;



}

totalGastos()