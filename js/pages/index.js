function Mostrarselect(){
    
    var arreglo = localStorage.getItem("Miarreglo"); // obtenemos la informacion guardada en el local storgae mi arreglo
    arreglo = JSON.parse(arreglo); // lo crea a objeto

    i = 0 
    j = arreglo.length; // mide la longitud del arreglo, la cantidad de ciudades ingresadas
    
    while(i < j){       // este bucle lo creamos para ver cuantas veces se tiene que ejecutar
        let opcion = document.createElement("option"); // sirve para crear los elemnots option que hace falta
        let texto = document.createTextNode(arreglo[i]); // creamos el texto que vamos a usar, en este caso es el nombre de la ciudad
        opcion.appendChild(texto); //une opcion con texto
        Selecionable.appendChild(opcion); // seleccionable es el ID del select. se agregan al select
    
        i++ //itera
    }


   }

   async function mostrarclima(){ //esto se ejecuta en el boton de consultar
    document.getElementById("card").style.display="none"; //llamamos al elemento del div, le damos un display none para que desaparezca 
    let Info_ciudad = document.getElementById("Selecionable").value; //sacamos la informacion del dato que elegimos y la guardamos en info_ciudad
    let API =`https://api.openweathermap.org/data/2.5/weather?q=${Info_ciudad}&appid=448f793568eae0815f59491141fa7039&units=metric&lang=es`; //cambia la ciudad que seleccionamos
    document.getElementById("contenedor_carga").style.display="block"; //con esto llama al simbolito de carga y se le da el display block para que se muestre
    try {
        Resultado = await fetch(API); //lama a ala api
        objetojson = await Resultado.json();// para que se pueda leer// que sea objeto
        

    
        
    }catch(error) {
        alert("Error");  
    }finally {
        if(Info_ciudad == 0){//cuando no se agrega nada
            document.getElementById("card").style.display="block"; //se agrega el div (card) 
            document.getElementById("contenedor_carga").style.display = "None"; //se borra el simbolo de carga
            document.getElementById("Ciudad").innerHTML = "Ingrese una ciudad"; //se muestra un cuadrito vacio que dice ingrese ciudad
        }else{
            setTimeout(()=>{//tiempo que tarda en ejecutarse las instrucciones 
            document.getElementById("contenedor_carga").style.display = "None"; //se borra se borra simbolo de carga
            document.getElementById("card").style.display="block"; // se agrega el div
            document.getElementById("Ciudad").innerHTML = objetojson.name;//nombre
            document.getElementById("Temperatura").innerHTML =` Temperatura: ${objetojson.main.temp}º`
            document.getElementById("SensacionTermica").innerHTML =` Sensacion Termica: ${objetojson.main.feels_like}º`;
            document.getElementById("Humedad").innerHTML = `Humedad: ${objetojson.main.humidity}%`;
            document.getElementById("Velocidad_viento").innerHTML = `Velocidad del Viento: ${(objetojson.wind.speed*3.6).toFixed(1)}Km/h`;
            document.getElementById("Presion").innerHTML = `Presion: ${objetojson.main.pressure} P`;},3000);
        }
        
    }
}