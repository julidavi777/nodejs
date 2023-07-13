import axios from 'axios'
const form = document.querySelector('.form')
form.addEventListener('submit', e=>{
  e.preventDefault(); 
  console.log('you click me ')
  let email = document.getElementById('email').value
  let password = document.getElementById('password').value
  console.log(email, password)
})