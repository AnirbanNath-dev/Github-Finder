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
    const { avatar_url, login, html_url, followers, following } = user;
    container.insertAdjacentHTML('beforeend', (`<div class='card cursor-pointer hover:-translate-y-4 transition-all duration-500 hover:scale-105'>
        <img class="h-36 rounded-lg" src= "${avatar_url}" alt="${login}"/>
        <div class="card-footer">
            
            <a href="${html_url}" target="_blank" class="text-white"> ${login} </a>
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
                container.insertAdjacentHTML("beforeend", (`<div class='card cursor-pointer flex'>
                    <img class="h-36 rounded-lg" src= "${user.avatar_url}" alt="${user.login}"/>
                    <div class="card-footer">
                        <div class="flex flex-col gap-4">
                        <a href="${user.html_url}" target="_blank" class="text-white"> Username : ${user.login} </a>
                        <span>Followers : ${user.followers}</span>
                        </div>
                    </div>
                    </div>
                    `));
            });
        }
        catch (error) {
        }
    }
});
