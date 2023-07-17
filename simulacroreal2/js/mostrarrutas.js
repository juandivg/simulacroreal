import {cont, modalchild, closemodal, modal, contenedor, tabla} from "./selectores.js"
//import { getPunto} from "./peticiones.js";
//export let oldIdspuntos=[];
export function mostrarRutas(data){
    cont.innerHTML=""

   data.forEach(ruta => {
        let tr=document.createElement('tr')
        tr.setAttribute("id",`${ruta.id}`);
        tr.setAttribute("class","tr");
        tr.innerHTML=` <td class="text-center">${ruta.NomRuta}</td>        
                        <td class="text-center">${ruta.id}</td>
                        <td class="text-center" ><button class="text-center text-white bg-yellow-400 border rounded-md px-[20px]" data-accion="Ver">Ver</button></td>
                        <td class="text-center"><button class="text-center text-white bg-blue-400 border rounded-md px-[20px]" data-accion="Actualizar">Actualizar</button></td>
                        <td class="text-center"><button class="text-center text-white bg-green-400 border rounded-md px-[20px]" data-accion="Puntos">Actualizar Puntos</button></td>
                        <td class="text-center"><button class="text-center text-white bg-violet-400 border rounded-md px-[20px]" data-accion="Agregar">Agregar</button></td>
                        <td class="text-center"><button class="text-center text-white bg-red-400 border rounded-md px-[20px]" data-accion="Delete">Eliminar Puntos</button></td>
                        <td class="text-center"><button class="text-center text-white bg-red-600 border rounded-md px-[20px]" data-accion="Eliminar">Eliminar</button></td>`

        cont.appendChild(tr)
   });


}

 export function watch(puntos){
    modal.classList.remove("hidden")
    contenedor.classList.add("hidden")
    tabla.classList.add("hidden")
    modalchild.innerHTML="";
    puntos.forEach((point,index)=>{
        if(index+1<puntos.length){
            modalchild.innerHTML+=`<p>${point.NomPuntos}----></p>`
        }
        else{
            modalchild.innerHTML+=`<p>${point.NomPuntos}</p>`
        }
    })
    closemodal.addEventListener("click", (e)=>{
        modal.classList.add("hidden")
        contenedor.classList.remove("hidden")
        tabla.classList.remove("hidden")
    })
}




