let produtos = [];

let pessoas = [
    {
    nome: '',
    email: ''
}
];

let i = 1; /*Variável atrelada ao Array de Pessoas*/
let x = 0; /*Variável atrelada a função inserir*/
let botao_inserir = document.getElementById('botao_inserir');
let botao_salvar = document.getElementById('botao_salvar');
let botao_cancelar = document.getElementById('botao_cancelar');
let meu_campo = document.getElementById('meu_campo').value;

/*Consumindo a API*/
function pegaDados(){

    let nome = '';
    let email = '';

    fetch('https://randomuser.me/api/', {})
    .then((response) => {
        return response.json(); 
    }).then((data) => {
        let nome2 = data.results[0].name.first + ' ' + data.results[0].name.last;
        let email2 = data.results[0].email;
        nome = nome2;
        email = email2;
        console.log(nome)
        console.log(email)

        meu_campo = nome;
        meu_email = email;

        pessoas.push({email, nome});

    }).catch((err) => {
        console.log('Deu ruim aqui', err);
    });
    
    
}

function inserir(){
    console.log('valor de i: ', i);
    console.log(pessoas)
    pegaDados();
    /*Aqui consumo a API*/
    let nome = '';
    let email = '';

    fetch('https://randomuser.me/api/', {})
    .then((response) => {
        return response.json(); 
    }).then((data) => {
        let nome2 = data.results[0].name.first + ' ' + data.results[0].name.last;
        let email2 = data.results[0].email;
        nome = nome2;
        email = email2;
    }).catch((err) => {
        console.log('Deu ruim aqui', err);
    });
    /*Aqui consumo a API*/

    /*Habilita o botão de deletar todos os itens quando o primeiro item é inserido*/
    let deleteButton =  document.getElementById('deleteButton');
    deleteButton.style.display = 'inline-block';

    /*Verifica se o input está vazio e pede para o usuário digitar um produto*/
    if (document.getElementById("produto").value == ''){
        alert('Insira um produto!');
    }

    /*Caso tenha um produto digitado ele insere na lista*/
    if (!document.getElementById("produto").value == ''){
        
        /*Insere o produto no Array produtos*/
        let produto = document.getElementById("produto").value;
        produtos.push(produto);
        console.log(produtos);

        

        /*Insere o produto no HTML*/
        let item = document.getElementById('item');

        
        item.innerHTML += `
            <div class="item-inserido" id="item-inserido">
                <p class="titulo-item" id="tituloitem">${produtos[x]}</p>
                <div class="dados id="dados">
                    <p class="nome" id="nome">${pessoas[i].nome}</p>
                    <p class="email" id="email">${pessoas[i].email}</p>
                </div>
                <div class="botoes">
                    <button class="icone-editar" onclick="editar('${produtos[x]}');">
                        <i class="far fa-edit"></i>
                    </button>
                    <button class="icone-excluir" onclick="excluir('${produtos[x]}');">
                        <i class="far fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
        document.getElementById("produto").value = '';
        x++;
        i++;
    }
}

function excluir(nome_produto){
    
    let indice = produtos.indexOf(nome_produto); /*Retorna o índice do produto clicado*/
    
    /*Exclui do array o produto pelo indice*/
    produtos.splice(indice, 1);

    console.log('Excluiu ', nome_produto);
    console.log(produtos);
    console.log(indice);

    /*Exclui do array de pessoas a pessoa pelo indice*/
    let indice2 = indice + 1;
    pessoas.splice(indice2, 1);

    /*Limpa a lista do HTML*/
    let item = document.getElementById('item');
    item.innerHTML = '';
    x = 0;
    /*Imprime novamente todos os itens do array*/
    i=1;
    while(x < produtos.length){
    
    item.innerHTML += `
        <div class="item-inserido" id="item-inserido">
            <p class="titulo-item" id="tituloitem">${produtos[x]}</p>
            <div class="dados id="dados">
                    <p class="nome" id="nome">${pessoas[i].nome}</p>
                    <p class="email" id="email">${pessoas[i].email}</p>
                </div>
            <div class="botoes">
                <button class="icone-editar" onclick="editar('${produtos[x]}');">
                    <i class="far fa-edit"></i>
                </button>
                <button class="icone-excluir" onclick="excluir('${produtos[x]}');">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
    `;
    x++;
    i++;

    }
    
}

function cancelar(){
    botao_inserir.style.display = 'block';
    botao_salvar.style.display = 'none';
    botao_cancelar.style.display = 'none';

    let produto = document.getElementById('produto');
    produto.value = ''; 
}

function editar(nome_produto){

    botao_inserir.style.display = 'none';
    botao_salvar.style.display = 'block';
    botao_cancelar.style.display = 'block';

    /*Foca no campo Input para que o usuário digite um novo valor */
    document.getElementById("produto").focus();
    let produto = document.getElementById('produto');
    produto.value = nome_produto; 

    let indice = produtos.indexOf(nome_produto); /*Retorna o índice do produto clicado*/
    let campo_escondido = document.getElementById('campo_escondido').value;
    campo_escondido = indice;

    bruto = nome_produto;

}

function salvar(){
    
    let ind = produtos.indexOf(bruto);
    let campo_escondido = document.getElementById('campo_escondido').value;
    let NovoProduto = document.getElementById('produto').value;

    console.log('pegou ', bruto, 'e o indice é ', ind);

    
    /*Exclui do array o produto pelo indice e adiciona NovoProduto na mesma posição*/
    produtos.splice(ind, 1, NovoProduto)


    /*Limpa a lista do HTML*/
    let item = document.getElementById('item');
    item.innerHTML = '';

    /*Imprime novamente todo o vetor na tela*/
    x = 0;
    i = 1;
    while(x < produtos.length){
    item.innerHTML += `
        <div class="item-inserido" id="item-inserido">
            <p class="titulo-item" id="tituloitem">${produtos[x]}</p>
            <div class="dados id="dados">
                    <p class="nome" id="nome">${pessoas[i].nome}</p>
                    <p class="email" id="email">${pessoas[i].email}</p>
                </div>
            <div class="botoes">
                <button class="icone-editar" onclick="editar('${produtos[x]}');">
                    <i class="far fa-edit"></i>
                </button>
                <button class="icone-excluir" onclick="excluir('${produtos[x]}');">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
    `;
    x++;
    i++;
    }

    /*Adiciona o novo valor no índice desejado
    produtos.forEach(function (nome_produto, indice, produtos){
        console.log('Adicionou');
    }
    */
    botao_inserir.style.display = 'block';
    botao_salvar.style.display = 'none';
    botao_cancelar.style.display = 'none';

    let produto = document.getElementById('produto');
    produto.value = ''; 

}

function deleteAll(){
    for (x=0; x = produtos.length; x++){
        produtos.pop(x);
    }
    console.log('Excluiu tudo');

    /*Limpando o Array de Pessoas*/
    for (n=0; n < pessoas.length; n++){
        /*pessoas.pop(n);*/
        pessoas.splice(1, n); /* Exlui o indice 1 n vezes */
        i = 1;

    }

    /*Limpa a Lista*/
    let item = document.getElementById('item');
    item.innerHTML = '';
}