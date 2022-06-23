/*
const socket = io.connect();

const btn = document.getElementById("load")
btn.addEventListener("click",(ev)=>{
    ev.preventDefault();
    const id = document.getElementById('id').value;
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;

    socket.emit('add',{id,title,price,thumbnail})

    socket.on('show', data =>{
        fetch('/api/products/user')
            .then(r => r.text())
            .then(html=> {
                console.log(html);
                const listProd = document.getElementById("products");
                listProd.innerHTML = html
            })
            .catch(e => alert(e))
    
    })
} )
*/