function getCitiesFromLocalStorage() {
    let cities = localStorage.getItem("Miarreglo"); //usammos para obtener el lo que tenemos guardado en el localStorage, 
    if (cities) {
        cities = JSON.parse(cities); // si existe lo convertimos en objetos
    } else {
        cities = []; // si no hay nada lo declaramos arreglo vacio
    }
    return cities; // return para devolver la variable cities
}
function Borrar(){
    localStorage.removeItem("Miarreglo"); //boton borrar, borramos localstorage mi arreglo
}

async function agregarciudad() {  //asyn llama a al API, 

    var informacion = document.getElementById("ciudad").value;  //obtenemos el valor  del id que tenemos en input 
    var arreglo = getCitiesFromLocalStorage(); // llamamos a la funcion donde creamos el arreglo SERIA EL CITIES  
    let API =`https://api.openweathermap.org/data/2.5/weather?q=${informacion}&appid=448f793568eae0815f59491141fa7039&units=metric&lang=es`; // link de la api y la variable informacion que obtenemos del input
    try {                                                                                                                                                           
        Resultado = await fetch(API); // trae la informacion que guardamos en la api
        objetojson = await Resultado.json();    // para poder leer la informacion extraida de la api
    }catch(error) {
        alert("Error");  // si hay error en la api sale el alert
    }finally{//se ejecuta siempre
        if(informacion == 0 || objetojson.name == undefined){ //si no se le agrega nada vale 0 y sino el nombre de la ciudad no existe muestra mensaje de error
            let elecion="Error"; //
                Mostrarmensaje(elecion)
        }else{
            if(informacion != 0){ 
                var num = arreglo.indexOf(informacion);  // buscamos si el valor se encuentra o no. en caso de que no se encuentre es -1
                
                if(num == -1){
                    arreglo.push(informacion);
                    localStorage.setItem("Miarreglo",JSON.stringify(arreglo));
                    var arreglo = localStorage.getItem("Miarreglo");
                    let elecion="Correcta";
                    Mostrarmensaje(elecion)
                    arreglo = JSON.parse(arreglo); // esta de mas
                }else{
                    
                    let elecion="Advertencia";
                    Mostrarmensaje(elecion)
                }
            }
        }        
    }   
}


   function Mostrarmensaje(elecion){ //funcion mostrar mensaje ELECCION ES EL PARAMETRO QUE LLAMAMOS PARA QUE FUNCIONE EL IF
    opcion.innerHTML = "" // borra el mensaje anterior
    let crearelemento = document.createElement("p"); // se crea un elemento en que se muestra un p
    if(elecion == "Correcta"){ // si eleccion es correcta, al elemento p se le pone la clase correcta
        crearelemento.setAttribute("class","Correcta");
        var opcioncorrecta = document.createTextNode("Ciudad agregada con exito"); // se le agrega el texto ciudad agrega con exito
    }else{
        if(elecion == "Error"){ // lo mismo
            crearelemento.setAttribute("class","Error");
            var opcioncorrecta = document.createTextNode("La ciudad ingresada no se encuentraen la API o se produjo un error al consultar");
        }
        else{
            crearelemento.setAttribute("class","Advertencia");
            var opcioncorrecta = document.createTextNode("La ciudad ya se encuentra almacenada");
        }
    }
    crearelemento.appendChild(opcioncorrecta); // con el appenchild agregamos al elemento p el texto creado
    opcion.appendChild(crearelemento);  // el opcion es el ID del div donde realizamos esto 
   }