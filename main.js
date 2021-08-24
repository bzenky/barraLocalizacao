//header - geo
const continuar = document.querySelector('#cont')
const alterar = document.querySelector('#alterar')
const local = document.querySelector('.geolocation')
const header = document.querySelector('.local')

fetch('https://ipapi.co/json/')
.then(function(response) {
  response.json().then(jsonData => {
    local.innerText = jsonData.city
  });
})
.catch(function(error) {
  alert('Erro!')
});

continuar.addEventListener('click', () => {
  header.classList.add('fechar')
})


