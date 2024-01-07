const getUsername = document.querySelector("#user") as HTMLInputElement
const formSubmit = document.querySelector('#form') as HTMLFormElement
const container = document.querySelector('.container') as HTMLElement


interface UserData{
    id: number;
    login: string;
    avatar_url: string;
    location: string;
    url : string;
}

async function userFetcher<T>(url :string , options? : RequestInit) : Promise<T>{
    
    const response = await fetch(url , options);

    if(!response.ok){
        throw new Error
    }

    const data = await response.json()
    return data

}


function showCard(user : UserData):void{

}


function getUserData(url : string ){
    userFetcher<UserData[]>(url , {})
    .then(data =>{
        data.map(user =>{
            showCard(user)
        })
    })
}

getUserData('https://api.github.com/users')