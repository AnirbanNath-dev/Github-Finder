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

    const {avatar_url , login , url , location } = user

    container.insertAdjacentHTML('beforeend', (
        `<div class='card'>
        <img src= "${avatar_url}" alt="${login}"/>
        <hr/>
        <div class="card-footer">
            
            <a href="${url}"> Github </a>
        </div>
        </div>
        `
        
    ))
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


formSubmit.addEventListener('submit' , async (e)=>{
    e.preventDefault()
    const search = getUsername.value
    container.innerText = ""

    if(search.trim().length !=0){
        try {
            
            const url = `https://api.github.com/users/${search}`
            
            
            await userFetcher<UserData>(url , {})
            .then(user =>{
                showCard(user)
            })
            
        
        } catch (error) {
            
        }
    }else{



    }
    
    
})