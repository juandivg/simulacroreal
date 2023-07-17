import {postRuta, postPunto, getRuta, getPunto, Ruta, DeleteRuta, putRuta, putPunto} from "./peticiones.js";
import{formu, puntos, contenedor, btnList, tabla, cont, contenedorUpdate, formUpdate, contenedorUpdatePuntos, formUpdatePuntos, contenedorUpdateAgregar, formUpdateAgregar} from "./selectores.js"
//import {oldIdruta, oldIdspuntos} from "./mostrarrutas.js";
export let bandera;
let Idpuntos=[];
puntos.addEventListener("change", (e)=>{
    console.log(e.target.value);
    if(e.target.value<2){
        puntos.value=2
    }
})
btnList.addEventListener("click", (e)=>{
    cont.classList.toggle("hidden")
    getRuta();
})
formu.addEventListener("submit",(e)=>{
    e.preventDefault();
    let formu2=document.createElement("form")
    formu2.setAttribute('id', 'formu2')
    contenedor.classList.replace("h-[28vh]", "h-[92vh]")
    contenedor.classList.remove("mx-[25%]")
    contenedor.classList.replace("w-[50%]", "w-full")
    btnList.classList.add("hidden")
    tabla.classList.add("hidden")
    contenedor.replaceChild(formu2, formu)
    formu2.innerHTML=`<div class="flex flex-col w-full mb-[20px] h-[75vh]" id="content">
                            <label for="Idruta"> Ingrese el Id de la ruta</label>
                            <input class="flex w-full border border-black rounded-xl" type="number" id="Idruta" required>
                            <label for="Idruta"> Ingrese el nombre de la ruta</label>
                            <input class="flex w-full border border-black rounded-xl" type="text" id="Nameruta" required>
                            </div>
                            `;

    let content=document.querySelector('#content')
    console.log(content)
    for(let i=0;i<puntos.value;i++){
        let p=document.createElement("p")
        let p2=document.createElement("p")
        let inp=document.createElement("input")
        let inp2=document.createElement("input")
        inp.classList.add("border", "border-black", "rounded-xl")
        inp2.classList.add("border", "border-black", "rounded-xl")
        p.innerHTML=`Ingrese el Id del punto ${i+1}`
        p2.innerHTML=`Ingrese el nombre del punto ${i+1}`
        inp.setAttribute('type', "number")
        inp.setAttribute('id', `inp`)
        inp2.setAttribute('type', "text")
        inp2.setAttribute('id', `inp2`)
        content.append(p, inp, p2, inp2)
    }
    content.innerHTML+=`<button type="submit" class="bg-blue-600 w-[20%] m-auto text-white border rounded-xl">Enviar</button>`
    let Idruta=document.querySelector('#Idruta')
    let Nameruta=document.querySelector('#Nameruta')
    let PointsId=document.querySelectorAll('#inp')
    let PointsName=document.querySelectorAll('#inp2')


    formu2.addEventListener("submit", (e)=>{
        e.preventDefault();

        contenedor.classList.replace("h-[92vh]", "h-[28vh]")
        contenedor.classList.add("mx-[25%]")
        contenedor.classList.replace("w-full", "w-[50%]")
        btnList.classList.remove("hidden")
        tabla.classList.remove("hidden")
        contenedor.replaceChild(formu, formu2)

        let newRuta= {
            id: parseInt(Idruta.value),
            NomRuta: Nameruta.value
        }
        postRuta(newRuta)
        for(let i=0; i<puntos.value; i++){
            let newPunto={
                id: parseInt(PointsId[i].value),
                NomPuntos: PointsName[i].value,
                RutaId: parseInt(Idruta.value)
            }
            console.log(newPunto)

            postPunto(newPunto)
        }



    })

})
export function RutasUpdate(par){
    contenedorUpdate.classList.remove("hidden")
    formUpdate.innerHTML=`
        <label for="NamerutaUpdate"> Ingrese el nuevo nombre de la ruta</label>
        <input class="flex w-full border border-black rounded-xl" type="text" value="${par.NomRuta}" id="NamerutaUpdate" required>
        <button class="bg-green-400 text-white m-auto p-[10px]" type="submit">Actualizar ruta</button>`
        //getPunto(par.id);
        
}
export function PuntosUpdate(puntos){
    console.log(puntos);
    contenedorUpdatePuntos.classList.remove("hidden")

    puntos.forEach((punto,index)=>{
        Idpuntos.push(punto.id)
        formUpdatePuntos.innerHTML+=`
        <label for="NamepuntoUpdate"> Ingrese el nombre del punto ${index+1}</label>
        <input class="flex w-full border border-black rounded-xl" type="text" value="${punto.NomPuntos}" id="NamepuntoUpdate" required>`
    })
    
    formUpdatePuntos.innerHTML+=`<button class="bg-green-400 text-white m-auto p-[10px]" type="submit">Actualizar ruta</button>`

    
}
formUpdateAgregar.innerHTML=`<label for="AddpuntoId"> Ingrese el Id del punto</label>
<input class="flex w-full border border-black rounded-xl" type="number" id="AddpuntoId" required>
<label for="AddpuntoName"> Ingrese el Id del punto</label>
<input class="flex w-full border border-black rounded-xl" type="text" id="AddpuntoName" required>
<button class="bg-green-400 text-white m-auto p-[10px]" type="submit">Agregar Punto</button> `

cont.addEventListener("click", (e)=>{
    e.preventDefault();
    let tr = e.target.closest("tr");
    let id=tr.id;
    let accion = e.target.dataset.accion;
    if(accion==="Ver"){
        bandera=1;
        getPunto(id);
    }
    else if(accion==="Actualizar"){
        Ruta(id);
        formUpdate.addEventListener("submit", (e)=>{
            e.preventDefault
            let NamerutaUpdate=document.querySelector('#NamerutaUpdate')
            let data={
                id: id,
                NomRuta: NamerutaUpdate.value
            }
            console.log(data)
            putRuta(data, id)

        })    
    }
    else if(accion==="Puntos"){
        bandera=2;
        getPunto(id)
        formUpdatePuntos.addEventListener("submit",(e)=>{
            let NamepuntoUpdate=document.querySelectorAll('#NamepuntoUpdate')
            for(let i=0; i<Idpuntos.length; i++){
                let modifiedPunto={
                    id: parseInt(Idpuntos[i]),
                    NomPuntos: NamepuntoUpdate[i].value,
                    RutaId: id
                }
                putPunto(modifiedPunto,Idpuntos[i])
            }

        })
    }
    else if(accion==="Agregar"){
        contenedorUpdateAgregar.classList.remove("hidden");
        formUpdateAgregar.addEventListener("submit", (e)=>{
            let AddpuntoId=document.querySelector('#AddpuntoId')
            let AddpuntoName=document.querySelector('#AddpuntoName')
            let Addpunto={
                id: parseInt(AddpuntoId.value),
                NomPuntos: AddpuntoName.value,
                RutaId: id
            }
            postPunto(Addpunto)
        })
    }
    else if(accion==="Eliminar"){
        DeleteRuta(tr,id)
        tr.remove();
    }
})
