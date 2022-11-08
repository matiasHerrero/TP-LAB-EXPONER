function verificar(){
    var email = document.getElementById("email").value;
    if(email.includes("@") && email.includes(".com")){
        cartel=document.getElementById("boton_error").style.display="none";
    }else{
        cartel=document.getElementById("boton_error").style.display="block";
    }
}
function limpiar(){
    cartel=document.getElementById("boton_error").style.display="none";
    let form = document.getElementById("formulario");
    form.reset();
}