const x = "✖";
const o = "〇";
let estadoJuego = "P1";
const modal = document.querySelector("dialog");
const textoModal = modal.querySelector("h2");

const cuadrados =Array.from (document.querySelectorAll(".cuadrado"));

cuadrados.forEach((cuadrado, i )=> {
    cuadrado.addEventListener("click", ()=>{
        if (estadoJuego === "PAUSA") return;
        if(cuadrado.textContent !== "") return;
        cuadrado.innerText = estadoJuego === "P1" ? x : o;       
        const posicionGanadora = revisar();
        if(typeof posicionGanadora === "object"){
            ganar(posicionGanadora);
            return
        };
        if(posicionGanadora ==="Empate"){
        mostrarModal("EMPATE!");
        }
        estadoJuego = estadoJuego === "P1" ? "P2" : "P1";
    })   
})

modal.querySelector("button").addEventListener("click",() =>{
    cuadrados.forEach(cuadrado => { 
        cuadrado.textContent ="";
        cuadrado.classList.toggle("ganador", false);
        modal.close();
        estadoJuego = "P1"
    });
})
 
function revisar(){
    const tablero = cuadrados.map(cuadrado => cuadrado.textContent); 
   

// Revisar horizontales 
    for (let i= 0; i <= 9; i+=3) {
        if(tablero[i] && tablero[i] === tablero[i+1] && tablero[i] === tablero[i+2]){
            return [i,i+1,i+2];
        }    
    }

//Revisar verticales
    for (let i= 0; i <= 3; i++) {
        if(tablero[i] && tablero[i] === tablero [i+3] && tablero[i] === tablero [i+6]){
            return [i,i+3,i+6];
        }    
    }

//Revisar diagonales
    if(tablero[0] && tablero[0] === tablero [4] && tablero[0] === tablero [8]){
        return [0,4,8];
    } 

    if(tablero[2] && tablero[2] === tablero [4] && tablero[2] === tablero [6]){
        return [2,4,6];
    } 

    if(tablero.includes("")) return false;
    return "Empate";
}
    function ganar(posicionGanadora){     
        posicionGanadora.forEach(posicion =>{
            cuadrados[posicion].classList.toggle("ganador",true);           
        })
        mostrarModal("EL GANADOR ES EL JUGADOR : " + (estadoJuego === "P1" ? "2" : "1"));
        estadoJuego = "PAUSA";
    }  

    function mostrarModal(texto){
        textoModal.innerText = texto;
        modal.showModal();
        estadoJuego = "PAUSA";
    }   