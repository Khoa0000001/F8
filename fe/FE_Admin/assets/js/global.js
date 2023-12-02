const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// var current_url = 'https://localhost:44333';
var current_url = 'https://localhost:44308/api';
let accessToken = JSON.parse(localStorage.getItem('token')).accessToken;
console.log(accessToken);
