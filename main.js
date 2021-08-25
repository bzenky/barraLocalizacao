//header - geo
const alterar = document.querySelector('#alterar')
const local = document.querySelector('.geolocation')
const header = document.querySelector('.local')
const modal = document.querySelector('.modal')
const fechar = document.querySelector('#fechar')
const cep = document.querySelector('.cep')
const buscar = document.querySelector('#buscar')
const geo = document.querySelector('#geo')

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
    local.innerText = jsonData.city + ' - ' + jsonData.region_code
  });
})
.catch(function(error) {
  alert('Erro!')
});
}

function showError() {
  alterar.click()
}

// Botão Alterar - Modal
alterar.addEventListener('click', () => {
  modal.classList.add('active')
})

fechar.addEventListener('click', () => {
  modal.classList.remove('active')
})

// API CEP
function buscaCEP() {
  cepBusca = cep.value

  if (cepBusca.length == 8) {
  fetch('https://viacep.com.br/ws/' + cepBusca + '/json/')
    .then(function(response) {
      response.json().then(jsonData => {
        if (jsonData.erro = true) {
          cep.value = 'Digite um CEP válido !'
          cep.classList.add('erro')

          setTimeout(() => {
            cep.value = ''
            cep.classList.remove('erro')
          }, 1700)
        } else {
        local.innerText = jsonData.localidade + ' - ' + jsonData.uf
        modal.classList.remove('active')
        cep.value = ''
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




fetch('https://viacep.com.br/ws/' + cepBusca + '/json/')
.then(function(response) {
  response.json().then(jsonData => {
    local.innerText = jsonData.localidade + ' - ' + jsonData.uf
  });
})
.catch(function(error) {
  alert('Erro!')
});