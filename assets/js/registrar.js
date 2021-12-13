const url = 'http://129.151.107.2:8080/api/user';

let nombreUsuario;
let correo;
let clave;
let confirmarClave;
let mensaje = '';

$("#formularioRegistro").on("click", function (event) {
    event.preventDefault();
});

// Verificar datos del formulario
function verificar() {
    if (validarDatos()) { 
        registrarUsuario(); // registrar usuario
    } else {        
        mostrarMensaje(); //Mostrar alerta
    }
}

// Mostrar alertas en el formulario
function mostrarMensaje() {
    $('#alertaMensaje').removeClass("ocultar");
    $('#alertaMensaje').addClass("mostrar");

    $('#mensaje').html('<strong>' + mensaje + '</strong>');
}

// Validar formulario
function validarDatos() {

    nombreUsuario = $('#name').val();
    correo = $('#email').val();
    clave = $('#password').val();
    confirmarClave = $('#password2').val();

    // validar campos vacios
    if (nombreUsuario == '') {
        mensaje = 'Nombre es requerido ';
        return false;
    }
    if (correo == '') {
        mensaje = 'Correo es requerido';
        return false;
    }
    if (clave == '') {
        mensaje = 'Contraseña es requerida';
        return false;
    }
    if (confirmarClave == '') {
        mensaje = 'Confirmar contraseña';
        return false;
    }

    // Expresiones
    let nameV = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // 
    let correoV = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    let claveV = /^.{4,25}$/;
    // validar expresiones
    if (!nameV.test(nombreUsuario)) {
        mensaje = 'Confirmar contraseña requerido';
        return false;
    }
    if (!correoV.test(correo)) {
        mensaje = 'Correo incorrecto';
        return false;
    }
    if (!claveV.test(clave)) {
        mensaje = 'Contraseña entre 4 y 25 caracteres';
        return false;
    }
    // confirmación de contraseña
    if (clave != confirmarClave) {
        mensaje = 'La contraseña no coincide';
        return false;
    }

    return true;
}

// Agregar nuevo usuario
function registrarUsuario() {
    var dataForm = {
        name: $('#name').val(),
        email: $('#email').val(),
        password: $('#password').val()
    };

    var dataJson = JSON.stringify(dataForm);

    $.ajax({
        url: url + '/new',
        type: 'POST',
        data: dataJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {           
            window.location.href = "../../usuario/usuario.html";
            mensaje = 'Bienvenido '+response.name;
            mostrarMensaje();
            alert('Bienvenido '+response.name);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensaje = 'El correo ya registrado';
            mostrarMensaje();    
        }
    });

}
