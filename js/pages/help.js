function verificar(){ // boton envia
    var email = document.getElementById("email").value;
    if(email.includes("@") && email.includes(".com")){
       document.getElementById("boton_error").style.display="none";
    }else{
        document.getElementById("boton_error").style.display="block";
    }
}
function limpiar(){
    document.getElementById("boton_error").style.display="none";
    let form = document.getElementById("formulario");
    form.reset();
}