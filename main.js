//header - geo
const alterar = document.querySelector('#alterar')
const local = document.querySelector('.geolocation')
const header = document.querySelector('.local')
const modal = document.querySelector('.modal')
const fechar = document.querySelector('#fechar')
const cep = document.querySelector('.cep')
const buscar = document.querySelector('#buscar')

fetch('https://ipapi.co/json/')
.then(function(response) {
  response.json().then(jsonData => {
    local.innerText = jsonData.city
  });
})
.catch(function(error) {
  alert('Erro!')
});


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

  fetch('https://viacep.com.br/ws/' + cepBusca + '/json/')
    .then(function(response) {
      response.json().then(jsonData => {
        local.innerText = jsonData.localidade
      });
    })
    .catch(function(error) {
      alert('Erro!')
    });
    
  modal.classList.remove('active')
  cep.value = ''
}

buscar.addEventListener('click', buscaCEP)




