const url = 'http://129.151.107.2:8080/api/user';

let correo;
let clave;
let mensaje = '';

$("#formularioLogin").on("click", function (event) {
    event.preventDefault();
});

// Validar formulario de login
function verificar() {
    if (validarDatos()) {
        loginUsuario();// login usuario
    } else {  
        mostrarMensaje();//Mostrar mensaje de alerta        
    }
}


// Mostrar alertas en el formulario
function mostrarMensaje() {
    $('#alertaMensaje').removeClass("ocultar");
    $('#alertaMensaje').addClass("mostrar");

    $('#mensaje').html('<strong>' + mensaje + '</strong>');
}


// 
function validarDatos() {
    correo = $('#email').val();
    clave = $('#password').val();

    // validar empty data
    if (correo == '') {
        mensaje = 'Correo es requerido';
        return false;
    }
    if (clave == '') {
        mensaje = 'Contraseña es requerida';
        return false;
    }

    // validar expressions 
    let correoV = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!correoV.test(correo)) {
        mensaje = 'Correo incorrecto';
        return false;
    }
    return true;
}

// login de usuario
function loginUsuario() {

    $.ajax({
        url: url + '/' + correo + '/' + clave,
        type: 'GET',
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
            if (response.id != null) {
                window.location.href = "../../usuario/usuario.html";
            } else {
                mensaje = 'Incorrect username or clave.';
                mostrarMensaje();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error login');
        }
    });
}

// ------------------------------------------------------------------------------------------

function cargarDatos() {
    $.ajax({
        url: url + '/all',
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            var valor = '';
            for (i = 0; i < response.length; i++) {
                valor += '<tr>' +
                    '<td>' + response[i].id + '</td>' +
                    '<td>' + response[i].name + '</td>' +
                    '<td>' + response[i].email + '</td>' +
                    '<td>' + response[i].password + '</td>' +
                    '<td><button onclick="eliminar(' + response[i].id + ')" class="btn btn-danger">Borrar</button>' +
                    '<button onclick="detalles(' + response[i].id + ')" class="btn btn-warning">Detalles</button></td>' +
                    '</tr>';
            }
            $('#tbody').html(valor);
        }
    });
}