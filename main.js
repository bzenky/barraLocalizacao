//header - geo
const alterar = document.querySelector('#alterar')
const local = document.querySelector('.geolocation')
const header = document.querySelector('.local')
const modal = document.querySelector('.modal')
const fechar = document.querySelector('#fechar')
const cep = document.querySelector('.cep')
const buscar = document.querySelector('#buscar')
const geo = document.querySelector('#geo')
const textoP = document.querySelector('.textoP')
const card = document.querySelector('.card')
let cont = 0

//Pedido de Geolocalização
function askLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
    
  } else {
    x.innerHTML="Geolocalização não é suportada nesse browser.";
  }
}

askLocation()

// Geolocalização caso aceite de askLocation
function showPosition() {
  fetch('https://ipapi.co/json/')
  .then(function(response) {
    response.json().then(jsonData => {
      textoP.innerText = 'Identificamos que você está em '
      local.innerText = jsonData.city + ' - ' + jsonData.region_code
    });
  })
  .catch(function(error) {
    alert('Erro!')
  });
  cont++
  }

  function showError() {
    alterar.click()
  }

// Botão Alterar/Fechar - Modal
alterar.addEventListener('click', () => {
  modal.classList.add('active')
})

modal.addEventListener('click', (e) => {
  console.log(e.target.id)
  if (e.target.id == 'modal') {
    modal.classList.remove('active')
  }
})

window.addEventListener('keydown', (e) => {
  if (e.key == 'Escape') {
    modal.classList.remove('active')
  }
})

fechar.addEventListener('click', () => {
  if (cont < 1) {
    textoP.innerText = 'Por favor insira o CEP ou permita a localização'
    local.innerText = ''
    modal.classList.remove('active')
  } else {
  modal.classList.remove('active')
  }
})

// API CEP
function buscaCEP() {
  cepBusca = cep.value

  if (cepBusca.length == 8) {
  fetch('https://viacep.com.br/ws/' + cepBusca + '/json/')
    .then(function(response) {
      response.json().then(jsonData => {
        if (jsonData.erro == true) {
          cep.value = 'Digite um CEP válido !'
          cep.classList.add('erro')

          setTimeout(() => {
            cep.value = ''
            cep.classList.remove('erro')
          }, 1700)
        } else {
        textoP.innerText = 'Identificamos que você está em '
        local.innerText = jsonData.localidade + ' - ' + jsonData.uf
        modal.classList.remove('active')
        cep.value = ''
        cont++
        }
      });
    })
    .catch(function(error) {
      alert('Erro!')
    });
  } else {
    cep.value = 'Digite um CEP válido !'
    cep.classList.add('erro')

    setTimeout(() => {
      cep.value = ''
      cep.classList.remove('erro')
    }, 1700)
  }
}
buscar.addEventListener('click', buscaCEP)

//