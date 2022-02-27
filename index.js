const allPlayers = () =>{
    document.getElementById('player-container').innerHTML = '';
    document.getElementById('spinner').style.display = 'block';

    const searchValue = document.getElementById("search-box").value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPlayer(data.player))


}
const displayPlayer = (players) => {
    if(players){
        document.getElementById('spinner').style.display = 'none';
    }
    for(const player of players){
        const parent = document.getElementById('player-container');
        
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card border p-5 mb-4">
        <div class="pro-pic">
            <img class="w-25" src="${player.strThumb}" alt="">
        </div>
        <h2>
           Name: ${player.strPlayer}
        </h2>
        <h3>
            Country: ${player.strNationality}
        </h3>
        <p>
        ${player.strDescriptionEN.slice(0,100)}
        </p>
        <div class="allbutton">
            <button class="delete btn btn-danger">delete</button>
            <button onclick= "details('${player.idPlayer}')" class="details btn btn-success">
                details
            </button>
        </div>
    </div>
        `;
        parent.appendChild(div);
    }
}
const details = (playerId) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.players[0]));
}
const displayDetails = (info) => {
    // console.log(info.strGender)
    if (info.strGender == 'Male' ){
        document.getElementById('male').style.display = "block";
        document.getElementById('female').style.display = "none";
    }else{
        document.getElementById('male').style.display = "none";
        document.getElementById('female').style.display = "block";
    }
    const detailParent = document.getElementById('detail-container')
    detailParent.innerHTML = `
    <div>
    <img src="" alt="">
    <h3>Name: ${info.strPlayer} </h3>
    </div>
    `
}