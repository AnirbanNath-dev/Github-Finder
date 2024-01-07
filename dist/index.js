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
    const { avatar_url, login, url, location } = user;
    container.insertAdjacentHTML('beforeend', (`<div class='card'>
        <img src= "${avatar_url}" alt="${login}"/>
        <hr/>
        <div class="card-footer">
            
            <a href="${url}"> Github </a>
        </div>
        </div>
        `));
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
formSubmit.addEventListener('submit', async (e) => {
    e.preventDefault();
    const search = getUsername.value;
    container.innerText = "";
    if (search.trim().length != 0) {
        try {
            const url = `https://api.github.com/users/${search}`;
            await userFetcher(url, {})
                .then(user => {
                showCard(user);
            });
        }
        catch (error) {
        }
    }
    else {
    }
});
