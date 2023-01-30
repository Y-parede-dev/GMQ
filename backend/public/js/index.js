const socket = io();
const player = {
    host:false,
    roomId:null,
    username:"",
    soketId:"",
    turn:false,
    win:false,
}
const usernameInput = document.getElementById('name')
const form = document.getElementById('form');
socket.emit('get rooms');
socket.on('list rooms', (rooms)=>{
    let html=''
    if(rooms.player.lenght !== 2){
        html+= `<li>
                    <p>

                    </p>
                    <p>
                    </p>
                </li>`

    }
})
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    console.log('form')
    player.username = usernameInput.value
    player.host = true
    player.turn = true
    player.soketId = socket.id
    console.log(player)
    socket.emit('userData', player)
})

