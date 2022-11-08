var ciudades = [];

function getCitiesFromLocalStorage() {
    let cities = localStorage.getItem("Miarreglo");
    if (cities) {
        cities = JSON.parse(cities);
    } else {
        cities = [];
    }
    return cities;
}
function Borrar(){
    localStorage.removeItem("Miarreglo");
}

async function agregarciudad() {

    var informacion = document.getElementById("ciudad").value;
    var arreglo = getCitiesFromLocalStorage();
    let API =`https://api.openweathermap.org/data/2.5/weather?q=${informacion}&appid=448f793568eae0815f59491141fa7039&units=metric&lang=es`;
    try {
        Resultado = await fetch(API);
        objetojson = await Resultado.json();    
    }catch(error) {
        alert("Error");
    }finally{
        if(informacion == 0 || objetojson.name == undefined){
            let elecion="Error";
                Mostrarmensaje(elecion)
        }else{
            if(informacion != 0){
                var num = arreglo.indexOf(informacion);
                
                if(num == -1){
                    arreglo.push(informacion);
                    localStorage.setItem("Miarreglo",JSON.stringify(arreglo));
                    var arreglo = localStorage.getItem("Miarreglo");
                    let elecion="Correcta";
                    Mostrarmensaje(elecion)
                    arreglo = JSON.parse(arreglo);
                }else{
                    
                    let elecion="Advertencia";
                    Mostrarmensaje(elecion)
                }
            }
        }        
    }   
}


   function Mostrarmensaje(elecion){
    opcion.innerHTML = ""
    let crearelemento = document.createElement("p");
    if(elecion == "Correcta"){
        crearelemento.setAttribute("class","Correcta");
        var opcioncorrecta = document.createTextNode("Ciudad agregada con exito");
    }else{
        if(elecion == "Error"){
            crearelemento.setAttribute("class","Error");
            var opcioncorrecta = document.createTextNode("La ciudad ingresada no se encuentraen la API o se produjo un error al consultar");
        }
        else{
            crearelemento.setAttribute("class","Advertencia");
            var opcioncorrecta = document.createTextNode("La ciudad ya se encuentra almacenada");
        }
    }
    crearelemento.appendChild(opcioncorrecta);
    opcion.appendChild(crearelemento);
   }

   function Mostrarselect(){
    
    var arreglo = localStorage.getItem("Miarreglo");
    arreglo = JSON.parse(arreglo);

    i = 0
    j = arreglo.length;
    
    while(i < j){       
        let opcion = document.createElement("option");
        let texto = document.createTextNode(arreglo[i]);
        opcion.appendChild(texto);
        Selecionable.appendChild(opcion);
    
        i++
    }


   }

   async function mostrarclima(){
    document.getElementById("card").style.display="none";
    let Info_ciudad = document.getElementById("Selecionable").value;
    let API =`https://api.openweathermap.org/data/2.5/weather?q=${Info_ciudad}&appid=448f793568eae0815f59491141fa7039&units=metric&lang=es`;
    document.getElementById("contenedor_carga").style.display="block";
    try {
        Resultado = await fetch(API);
        objetojson = await Resultado.json();
        console.log(objetojson);

    
        
    }catch(error) {
        alert("Error");  
    }finally {
        if(Info_ciudad == 0){
            document.getElementById("card").style.display="block";
            document.getElementById("contenedor_carga").style.display = "None";
            document.getElementById("Ciudad").innerHTML = "Ingrese una ciudad";
        }else{
            setTimeout(()=>{
            document.getElementById("contenedor_carga").style.display = "None";
            document.getElementById("card").style.display="block";
            document.getElementById("Ciudad").innerHTML = objetojson.name;
            document.getElementById("Temperatura").innerHTML =` Temperatura: ${objetojson.main.temp}º`;
            document.getElementById("SensacionTermica").innerHTML =` Sensacion Termica: ${objetojson.main.feels_like}º`;
            document.getElementById("Humedad").innerHTML = `Humedad: ${objetojson.main.humidity}%`;
            document.getElementById("Velocidad_viento").innerHTML = `Velocidad del Viento: ${(objetojson.wind.speed*3.6).toFixed(1)}Km/h`;
            document.getElementById("Presion").innerHTML = `Presion: ${objetojson.main.pressure} P`;},3000);
        }
        
    }
}


