// add cards in body

const main = document.getElementsByTagName("main");
const saltyList = document.querySelector('#salgadosLista');
const sweetList = document.querySelector('#docesLista');
const drinkList = document.querySelector('#bebidasLista');
let lefID = 0;
let rightID = 0;

let card = [
    {titulo: 'Pastel de carne', price: '8.00', image: './assets/pastel_de_carne.jpg', section: 'salgados'},
    {titulo: 'Pastel de chocolate', price: '11.99', image: './assets/pastel_de_chocolate.jpg', section: 'doces'},
    {titulo: 'Coca-cola', price: '3.99', image: './assets/coca.png', section: 'bebidas'},
    {titulo: 'pastel de queijo', price: '8.00', image: './assets/pastel_de_carne.jpg', section: 'salgados'}
];

function createCard(index){ 

    return cardElementBody = `<div class="card text-bg-dark text-end">
    <img src=${card[index].image} class="card-img" alt="...">
    <div class="card-img-overlay p-0">
        <div class="price-container blur">
            <h5 class="content-container-price">R$ ${card[index].price}</h5>
            <h5 class="content-container-title">${card[index].titulo}</h5>
        </div>
    </div>
    <div class="container-button py-2">
    <div class="row">
        <div id = "l${lefID++}" onclick="decreaseCounter(this)" class="col text-center button-left opacity-75">-</div>
        <div class="col-3 text-center pt-2 counter">0</div>
        <div id ="r${rightID++}" onclick="addCounter(this)" class="col text-center button-right opacity-75">+</div>
    </div>
    </div>
    </div>`

};

window.addEventListener("DOMContentLoaded", () => {
    for(i=0; i < card.length; i++){
        if(card[i].section == 'salgados'){

            saltyList.innerHTML += createCard(i)

        }else if(card[i].section == 'doces'){

            sweetList.innerHTML += createCard(i)

        }else if(card[i].section == 'bebidas'){

            drinkList.innerHTML += createCard(i)
        }
    }
});

//butons + and -

function addCounter(element){

    let counter = element.parentElement.childNodes[3].firstChild.nodeValue
    let title = element.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[3].textContent;
    let image = element.parentNode.parentNode.parentNode.childNodes[1].attributes[0].textContent;
    let price = element.parentElement.parentElement.parentElement.childNodes[3].childNodes[1].childNodes[1].textContent
    let id = element.id;

    counter++
    
    element.parentElement.childNodes[3].innerHTML = counter.toString();

    addCardModalBody({title: title, counter: counter, image: image, id: id, price: price})
    updateModalCard('add', counter, id)
    totalPrice(id, price, 'sum')
}

function decreaseCounter(element){
       
    let counter = element.parentElement.childNodes[3].firstChild.nodeValue
    let id = element.parentElement.childNodes[5].id;
    let price = element.parentElement.parentElement.parentElement.childNodes[3].childNodes[1].childNodes[1].textContent


    console.log(id)
    console.log(counter)

    if(counter != 0){
        counter--
        console.log(counter)
        element.parentElement.childNodes[3].innerHTML = counter.toString();
        
        if(counter == 0){
                console.log('counter 0!')
                removeModalCard(id)
            }
    }

    updateModalCard('decrease', counter, id)
    totalPrice(id, price, 'decrease')
}

//API CEP

let inputCep = document.getElementById('cep')
let inputLog = document.getElementById('logradouro')
let inputNum = document.getElementById('numero')
let inputDistrict = document.getElementById('bairro')

function claerCep(){

    inputLog.value = "";
    inputLog.innerHTML = "";
    inputDistrict.value = "";
    inputDistrict.innerHTML = "";
}

inputCep.addEventListener('keyup', () => {

    let url = `https://viacep.com.br/ws/${inputCep.value}/json/`

    if(inputCep.value.length === 8){
        
        fetch(url).then((res)=>{
            console.log(url)       
            res.json().then((json)=>{

                inputLog.value = json.logradouro;
                inputDistrict.value = json.bairro;
            })
        })

    }else{
       claerCep()
    }
})

//body modal

let bodyModal = document.querySelector("#cards-modal-body")
let sendButton = document.getElementById('inputAddress')

function addCardModalBody(object){//{title: titulo, counter: contador}

    if(object.counter == 1){
        bodyModal.innerHTML += `<div id="modal-card-${object.id}" class="container row justify-content-center">
        <div class="cardModal">
        <div class="imgModal" style="background-image: url(${object.image})"></div>
        <h5 class="titleCard"><strong>${object.title}</strong></h5>
        <ul>
            <li id="units-${object.id}">Unidades: ${object.counter}</li>
            <li>Preço:${object.price}</li>
        </ul>
        </div>
        </div>`
    }
}

function updateModalCard(key, counter, obsjectID){

    if(key == 'add' && counter > 1){

        let id = document.getElementById('units-' + obsjectID)
        console.log(id)
        id.innerHTML = 'Unidades:' + counter

    }else if(key == 'decrease' && counter > 0){

        let id = document.getElementById('units-' + obsjectID)
        console.log(id)
        id.innerHTML = 'Unidades:' + counter
    }
}

function removeModalCard(id){
    //let parentElement = document.getElementById('cards-modal-body');
    let removingChild = document.getElementById('units-' + id).parentNode.parentNode.parentNode

    bodyModal.removeChild(removingChild)
}

function totalPrice(id, str_price, key){

    let priceTag = document.getElementById('total-price'); // total modal conteudo
    let price = parseFloat(str_price.slice(3)); // preço no card
    let priceContent = priceTag.textContent;

    console.log(priceContent)
    console.log(price)

    if(id){
        
        if(key == 'sum'){

            let num = parseFloat(priceContent.slice(9)) // preco no modal
            let total = num + price
        
            console.log(num)
            console.log(total)

            priceTag.innerHTML = "Total R$ " + total.toFixed(2)
        }else if(key == 'decrease'){

            let num = parseFloat(priceContent.slice(9)) // preco no modal
            let total = num - price
        
            console.log(num)
            console.log(total)

            priceTag.innerHTML = "Total R$ " + total.toFixed(2)
        }
    }
}

//radioBox

function getRadioBox(element){

    let totalPay = document.getElementById('totalPay')

    if(element.id == 'dinheiro'){

        totalPay.innerHTML = `
        <p style="font-size: 13px; margin-bottom: 10px">Precisamos garantir o seu troco. Por favor, informe o total que irá pagar ao receber o pedido:</p>
        <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">R$</span>
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
      </div>`
    }else if(element.id == 'card'){
        totalPay.innerHTML = ``
    }
    
}

sendButton.addEventListener('click', () => {
    
    let successAlert = document.getElementById('success')
    successAlert.style.display = 'block'
    sendButton.disabled = true

    setTimeout(() => {
        successAlert.style.display = 'none'
    }, 3000)
       

    
})
