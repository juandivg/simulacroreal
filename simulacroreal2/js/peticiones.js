import {mostrarRutas, watch} from "./mostrarrutas.js";
import { bandera, RutasUpdate, PuntosUpdate} from "./main.js";
const headers = new Headers ({'Content-Type': 'application/json'});
const URL="http://localhost:3000"

export async function getRuta(){
    let data = await (await fetch(`${URL}/Rutas`)).json();
        mostrarRutas(data);
    
}
export async function Ruta(id){
    let data = await (await fetch(`${URL}/Rutas/${id}`)).json();
    RutasUpdate(data)
}
export async function getPunto(data){
    let puntos= await (await fetch(`${URL}/Puntos?RutaId=${data}`)).json();
        if(bandera==1){
            watch(puntos);
        }
        else if(bandera==2){
            PuntosUpdate(puntos);
        }
}
export async function postRuta(data){
    let config = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }
    let rutas = await (await fetch(`${URL}/Rutas`,config)).json();
    console.log(rutas)
}
export async function postPunto(data){
    let config = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }
    let puntos = await (await fetch(`${URL}/Puntos`,config)).json();
}
export async function putRuta(data, id){
    let config = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    }
    let rutas= await(await fetch(`${URL}/Rutas/${id}`, config)).json();
}
export async function putPunto(data, id){
    let config = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    }
    let puntos= await(await fetch(`${URL}/Puntos/${id}`, config)).json();
}
export async function DeleteRuta(tr,id){
    let data = Object.fromEntries(new FormData(tr.target));
    let config = {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(data)
    }
    let del=await(await fetch(`${URL}/Rutas/${id}`, config)).json();

}