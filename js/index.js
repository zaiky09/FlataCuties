//URL json-server
const server = 'http://localhost:3000/characters';

//Event listener for loading of DOM
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

//Variables for db.json data
const characterTab = document.querySelector('#character-tab');
const characterId = document.querySelector('#identity');
const characterImg = document.querySelector('#Img');
const voteCount = document.querySelector('#total');
const voteForm = document.querySelector('#voting');

//creating fetchData variable to fetch
function fetchData() {
    fetch(server)
    .then((resp) => resp.json())
    .then((data) => {
        renderCharacters(data)
    })
}

//function to render characters
function renderCharacters (data) {
    data.forEach ((data) => {
        const voteTotal = document.createElement('totalV');
        voteTotal.innerText = data.vote;

        characterTab.appendChild(voteTotal);
        voteTotal.addEventListener("click", () => {
            characterId.textContent = data.vote;
            characterImg.setAttribute("src", data.Img);
            voteCount.textContent = data.total;
        });
    });
}
//function; vote update
voteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newVote = parseInt(event.target.vote.value);
    const voteCount = document.querySelector('#total');
    let presentv = parseInt(voteCount.textContent);
    let Votes = (presentv += newVote);
    voteCount.innerText = Votes;

    let voteUpdate = {
        vote: Votes,
    };

    fetch(server, {
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json; charset=UTF-8",
            Authorization : "",
        },
        method: "PATCH",
        body:JSON.stringify({
            vote: Votes,
        }),
    })
    .then((res) => res.json())
    .then((json) => console.log(json));
})

//adding changes to json data
const rstBtn =document.querySelector('#resetB')

rstBtn.addEventListener("click", (e) => {

    fetch(server)
    .then(res => res.json())
    .then(characters => {
        const characterIdentity = characters.find(character => character.name === characterName.textContent)

        //Using PATCH
        fetch(`${server}/${characterIdentity.id}` , {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                vote : '0'
            })
        })
        .then(res => res.json())
        .then(data => characterVotes.textContent = data.total)
    })
})