window.addEventListener('load',()=>{
    const $zipcodeButton = document.getElementById('app__zipcode__button')
    $zipcodeButton.addEventListener('click',handleSubmit)
})

function handleSubmit(e) {
    e.preventDefault()
    const http = new XMLHttpRequest()
    const cepInput = document.getElementById('cep-input')
    const cepValue = cepInput.value

    http.open('GET','https://viacep.com.br/ws/'+cepValue+'/json/' )
    http.send()
    showElementByid('load')

    http.onload = () => {
        
        const data = JSON.parse(http.response)
        renderResponse('[data-cep]', data.cep)
        renderResponse('[data-logradouro]', data.logradouro)
        renderResponse('[data-bairro]', data.bairro)
        renderResponse('[data-uf]', data.uf)
        renderResponse('[data-localidade]', data.localidade)
        renderResponse('[data-ddd]', data.ddd)
        hideElementByid('load')
        showElementByid('adress')
        hideElementByid('error')
        console.log(resposta);
    }
    http.onerror = () => {
        hideElementByid('load')
        hideElementByid('adress')
        showElementByid('error')
    }
}

// new XMLHttpRequest()
// http.open(method,url)
// http.send()
// http.onerror = () => {}
// http.onload = () => {}

function renderResponse(tagSelector, value){
    const $cep = document.querySelector(tagSelector)
    $cep.innerHTML=value
}

function showElementByid(id){
    const element = document.getElementById(id)
    element.setAttribute('data-visible','true')
}


function hideElementByid(id){
    const element = document.getElementById(id)
    element.setAttribute('data-visible','false')
}

function handleError(){
    hideElementByid('load')
    showElementByid('error')
}