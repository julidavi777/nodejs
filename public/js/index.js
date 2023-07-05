import {login} from './login'
import '@babel/polyfill'
import { displayMap } from './mapbox';
import { clearConfigCache } from 'prettier';

//DOM ELEMENTS 
const mapBox = document.getElementById('map'); 
const loginForm = document.getElementById('loginForm')

//DELEGATION 
if(mapBox){
    const locations = JSON.parse(mapBox.dataset.locations); 
    displayMap(locations); 
}
if(loginForm){
    loginForm.addEventListerner('submit', e =>{
        e.preventDefault(); 
        const email = document.getElementById('email').value;
        const password= document.getElementById('password').value;
        login(email, password); 
    })
}
 

console.log('hola')