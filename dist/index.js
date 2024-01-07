"use strict";
const getUsername = document.querySelector("#user");
const formSubmit = document.querySelector('#form');
const container = document.querySelector('.container');
async function userFetcher(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error;
    }
    const data = await response.json();
    return data;
}
function showCard(user) {
}
function getUserData(url) {
    userFetcher(url, {})
        .then(data => {
        data.map(user => {
            showCard(user);
        });
    });
}
getUserData('https://api.github.com/users');
