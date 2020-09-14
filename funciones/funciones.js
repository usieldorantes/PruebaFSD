$(document).ready(function(){
	llenarCurso();
	llenarCompletada();
});
function llenarCompletada(){
	$.ajax({
type: 'ajax',
method: 'get',
url: 'http://localhost/apirest-backEnd/index2.php',
contentType:'application/json; charset=utf-8',
async: false,
dataType: 'json',
success : function(datos){
console.log("Bien->"+JSON.stringify(datos));
var cuerpo;
for (var i = 0; i<datos.length; i++) {
	cuerpo +='<tr>'+
	'<td>'+datos[i].nombre+'</td>'+
	'<td>'+datos[i].descripcion+'</td>'+
	'<td>'+datos[i].fecha+'</td>'+
	'<td>'+datos[i].minutos+' min'+'</td>'+
	'<td>'+datos[i].minutosT+' min'+'</td>'+
	'<td>'+datos[i].minutosF+' min'+'</td>'+
	'<td>'+'<a href="javascript:;" class="btn btn-outline-success btn-sm " data="'+datos[i].id+'"><i class="fa fa-fw fa-refresh"></i>'+datos[i].estatus+'</a>'+
'</td>'+
	'</tr>';

}
$('#cuerpoT').html(cuerpo);
},
error: function(){
console.log("Error");
	}
	});//Cierra Ajax
}//Cierra funcion llenar
function llenarCurso(){
	$.ajax({
type: 'ajax',
method: 'get',
url: 'http://localhost/apirest-backEnd/',
contentType:'application/json; charset=utf-8',
async: false,
dataType: 'json',
success : function(datos){
console.log("Bien->"+JSON.stringify(datos));

for (var i = 0; i<datos.length; i++) {
var	cuerpo = '<div class="card p-4 mt-4 border-primary">'+
        '<span class="badge badge-pill badge-danger ml-2">'+
          '<h6>'+datos[i].estatus+'</h6>'+
              '</span>'+
          '<div class="card-title text-center">'+
          '<h3>'+datos[i].nombre+'</h3>'+
            '<p>'+datos[i].descripcion+'</p>'+
            '<div class="d-flex flex-row-reverse" >'
+'<a href="javascript:;" class="btn btn-outline-danger btn-sm " data="'+datos[i].id+'"><i class="fa fa-fw fa-refresh"></i>Eliminar</a>'
+'<a href="javascript:;" class="btn btn-outline-secondary btn-sm mr-4" data="'+datos[i].id+'"><i class="fa fa-fw fa-remove"></i>Editar</a>'+
             '</div>'+
               '</div>'+
                 '<div class="badge badge-primary">'+
                  '<h6>'+datos[i].fecha+'</h6>'+
                 '</div>'+
                  '<div class="text-center">'+'<span>'+"Tu tiempo es de: "+datos[i].minutos+' min '+'</span>'+'<h6 id="tiempo">'+' Te sobran: '+(datos[i].minutos-datos[i].minutosT)+' min '+'</h6>'+'</div>'+
                  '<div class="text-center">'+'<span id="countTimers"></span><span id="timer"></span>'+'</div>'+
                  '<div id="countdown">'+'</div>'+
                   '<div class="d-flex flex-row-reverse" >'+
                    '<a href="javascript:;" id="btnCancelar" class="btn btn-outline-dark btn-sm " data="'+datos[i].id+'"><i class="fa fa-fw fa-remove"></i>Posponer</a>'
+'<a href="javascript:;" id="btnIniciar" style="visibility:visible; display:block;" class="btn btn-outline-primary btn-sm mr-4" data="'+datos[i].id+'"><i class="fa fa-fw fa-remove"></i>Iniciar</a>'+
 '<a href="javascript:;" id="btnPausar" style="visibility:hidden; display:none;" class="btn btn-outline-warning btn-sm "><i class="fa fa-fw fa-remove"></i>Detener</a>'+
 '<a href="javascript:;" id="btnContinuar" style="visibility:hidden; display:none;" class="btn btn-outline-warning btn-sm "><i class="fa fa-fw fa-remove"></i>Continuar</a>'+
 '<a href="javascript:;" id="btnReiniciar" style="visibility:hidden; display:none;" data="'+datos[i].id+'" class="btn btn-outline-info btn-sm "><i class="fa fa-fw fa-remove"></i>Reiniciar</a>'+
  '<a href="javascript:;" id="btnFinalizar" style="visibility:hidden; display:none;" data="'+datos[i].id+'" class="btn btn-primary btn-sm "><i class="fa fa-fw fa-remove"></i>Finalizar</a>'+
 '</div>'+'</div>';
}
$('#cuerpo').html(cuerpo);
},
error: function(){
console.log("Error");
	}
	});//Cierra Ajax
}//Cierra funcion llenar

$('#cuerpo').on('click','.btn-outline-info',function(){
	var id = $(this).attr("data");
	console.log("id->"+id);
	var json={"id":id}
		$.ajax({
type: 'ajax',
method: 'get',
url: 'http://localhost/apirest-backEnd/?id='+id,
data: JSON.stringify(json),
contentType:'application/json; charset=utf-8',
dataType: 'json',
success : function(datos){
	var idT=datos.id;
	var mF=datos.minutos;
	var mT=0;
	var json={"id":idT,"minutosT":mT,"minutosF":mF}
			$.ajax({
type: 'ajax',
method: 'put',
url: 'http://localhost/apirest-backEnd/index3.php',
data: JSON.stringify(json),
contentType:'application/json; charset=utf-8',
dataType: 'json',
success : function(datos){
window.location.reload();
},
error: function(){
console.log("Error");
	}
	});
},
	error: function(){
console.log("Error");
	}
	});
});

$('#cuerpo').on('click','.btn-primary',function(){
	var id = $(this).attr("data");
 var completado='completado';
var json={"id":id,"estatus":completado}
			$.ajax({
type: 'ajax',
method: 'put',
url: 'http://localhost/apirest-backEnd/index2.php',
data: JSON.stringify(json),
contentType:'application/json; charset=utf-8',
dataType: 'json',
success : function(datos){
console.log("Bien->"+JSON.stringify(datos));
    window.location.reload();
},
error: function(){
console.log("Error");
	}
	});
});

$('#cuerpo').on('click','.btn-outline-dark',function(){
	var id = $(this).attr("data");
 var pendiente='pendiente';
var json={"id":id,"estatus":pendiente}
			$.ajax({
type: 'ajax',
method: 'put',
url: 'http://localhost/apirest-backEnd/index2.php',
data: JSON.stringify(json),
contentType:'application/json; charset=utf-8',
dataType: 'json',
success : function(datos){
console.log("Bien->"+JSON.stringify(datos));
    window.location.reload();
},
error: function(){
console.log("Error");
	}
	});
});

$('#cuerpoT').on('click','.btn-outline-success',function(){
	var id = $(this).attr("data");
	console.log("id->"+id);
	var json={"id":id}
		$.ajax({
type: 'ajax',
method: 'get',
url: 'http://localhost/apirest-backEnd/?id='+id,
data: JSON.stringify(json),
contentType:'application/json; charset=utf-8',
dataType: 'json',
success : function(datos){
console.log("Encontrados->"+JSON.stringify(datos));
if (datos.estatus=='completado') {
	alert('Esta tarea ya está completada');
}else if (datos.estatus=='pendiente') {
$.ajax({
type: 'ajax',
method: 'get',
url: 'http://localhost/apirest-backEnd/',
contentType:'application/json; charset=utf-8',
async: false,
dataType: 'json',
success : function(datos){
console.log("Bien->"+JSON.stringify(datos));
if (datos != '') {
alert('hay una tarea en curso');
}else{
var curso='en curso';
var json={"id":id,"estatus":curso}
			$.ajax({
type: 'ajax',
method: 'put',
url: 'http://localhost/apirest-backEnd/index2.php',
data: JSON.stringify(json),
contentType:'application/json; charset=utf-8',
dataType: 'json',
success : function(datos){
console.log("Bien->"+JSON.stringify(datos));
    llenarCompletada();
    llenarCurso();
	$('.alert-success').html("Tarea en curso").fadeIn().delay(4000).fadeOut('snow')
},
error: function(){
console.log("Error");
	}
	});	
}

},
error: function(){
console.log("Error");
	}
	});//Cierra Ajax
}
},
error: function(){
console.log("Error");
	}
	});
});


$('#btnGuardar').click(function(){
	
	var nombre = $('#nombre').val();
	var descripcion = $('#descripcion').val();
	var minutos = $('#minutos').val();
	
	console.log("nombre->"+nombre);
	console.log("descripcion->"+descripcion);
	console.log("minutos->"+minutos);
	
	if (nombre=='') {
		alert('Falta nombre');
	}
	else if (descripcion=='') {
	alert('Falta descripcion');	
	}
	else if (minutos>120) {
	alert('no puede sobrepasar las 2 horas');	
	}else{
		
		var json={"nombre":nombre,"descripcion":descripcion,"minutos":minutos,"minutosF":minutos}
			$.ajax({
type: 'ajax',
method: 'post',
url: 'http://localhost/apirest-backEnd/',
data: JSON.stringify(json),
contentType:'application/json; charset=utf-8',
dataType: 'json',
success : function(datos){
console.log("Bien->"+JSON.stringify(datos));
	llenarCompletada();
	limpiar();
	$('.alert-success').html("Se guardo el registro").fadeIn().delay(4000).fadeOut('snow')
},
error: function(){
console.log("Error");
	}
	});
	}
});

function limpiar(){
	$('#id').val('');
$('#nombre').val('');
$('#descripcion').val('');
$('#minutos').val('');
}

$('#cuerpo').on('click','.btn-outline-danger',function(){
	var id = $(this).attr("data");
	console.log("Id->"+id);
	if (id=='') {
		alert('Falta id');
	}else{
		if(window.confirm('Estás seguro de elimarlo?')){
		var json={"id":id}
			$.ajax({
type: 'ajax',
method: 'delete',
url: 'http://localhost/apirest-backEnd/?id='+id,
data: JSON.stringify(json),
contentType:'application/json; charset=utf-8',
dataType: 'json',
success : function(datos){
console.log("Bien->"+JSON.stringify(datos));
	$('.alert-danger').html("Se elimino el registro").fadeIn().delay(4000).fadeOut('snow');
		window.location.reload();
},
error: function(){
console.log("Error");
	}
	});
		}
	}
});

$('#cuerpo').on('click','.btn-outline-primary',function(){
	     document.getElementById('btnFinalizar').style.visibility='visible';
         document.getElementById('btnFinalizar').style.display='block';
         document.getElementById('btnPausar').style.visibility='visible';
         document.getElementById('btnPausar').style.display='block';
         document.getElementById('btnReiniciar').style.visibility='visible';
         document.getElementById('btnReiniciar').style.display='block';
         document.getElementById('btnIniciar').style.visibility='hidden';
         document.getElementById('btnIniciar').style.display='none';
         document.getElementById('tiempo').style.visibility='hidden';
         document.getElementById('tiempo').style.display='none';

	var id = $(this).attr("data");
	console.log("id->"+id);
	var json={"id":id}
		$.ajax({
type: 'ajax',
method: 'get',
url: 'http://localhost/apirest-backEnd/?id='+id,
data: JSON.stringify(json),
contentType:'application/json; charset=utf-8',
dataType: 'json',
success : function(datos){
console.log("Encontrados->"+JSON.stringify(datos));
var timersCount = (parseInt(datos.minutos)-parseInt(datos.minutosT))+1;
var pause = false; //is timer paused
countTimers();
function countTimers() {
timersCount--;
if (timersCount==0) {
document.getElementById('countdown').innerHTML = 'Se agotó el tiempo';
var completado='completado';
            var id= datos.id;
var json={"id":id,"estatus":completado}
            $.ajax({
type: 'ajax',
method: 'put',
url: 'http://localhost/apirest-backEnd/index2.php',
data: JSON.stringify(json),
contentType:'application/json; charset=utf-8',
dataType: 'json',
success : function(datos){
console.log("Bien->"+JSON.stringify(datos));
    window.location.reload();
},
error: function(){
console.log("Error");
    }
    });
}else{
var count = 6;
var counter = setInterval(timer, 1000);
var minutosFaltantes=(parseInt(timersCount))-1;
var minutosTranscurridos=(parseInt(datos.minutos - timersCount))+1;
var id = datos.id;
var json={"id":id,"minutosT":minutosTranscurridos,"minutosF":minutosFaltantes}
			$.ajax({
type: 'ajax',
method: 'put',
url: 'http://localhost/apirest-backEnd/index3.php',
data: JSON.stringify(json),
contentType:'application/json; charset=utf-8',
dataType: 'json',
success : function(datos){
console.log('tiempo guardado');
},
error: function(){
console.log("Error");
	}
	});
}
function timer() {
if (!pause) { //do something if not paused
count = count - 1;
if (count < 0) {
clearInterval(counter);
setTimeout(countTimers, 1000); //start count from 26 again
return;
}
document.getElementById("timer").innerHTML = count + ' seg';
}
}

document.getElementById("countTimers").innerHTML = timersCount + ' min y ';
}

document.getElementById("btnPausar").addEventListener("click", function () {
pause = true;
         document.getElementById('btnContinuar').style.visibility='visible';
         document.getElementById('btnContinuar').style.display='block';
         document.getElementById('btnPausar').style.visibility='hidden';
         document.getElementById('btnPausar').style.display='none';
});

document.getElementById("btnContinuar").addEventListener("click", function () {
pause = false;
         document.getElementById('btnPausar').style.visibility='visible';
         document.getElementById('btnPausar').style.display='block';
         document.getElementById('btnContinuar').style.visibility='hidden';
         document.getElementById('btnContinuar').style.display='none';
});
},
error: function(){
console.log("Error");
	}
	});
});

$('#cuerpo').on('click','.btn-outline-secondary',function(){
	var id = $(this).attr("data");
	console.log("id->"+id);
	var json={"id":id}
		$.ajax({
type: 'ajax',
method: 'get',
url: 'http://localhost/apirest-backEnd/?id='+id,
data: JSON.stringify(json),
contentType:'application/json; charset=utf-8',
dataType: 'json',
success : function(datos){
console.log("Encontrados->"+JSON.stringify(datos));
$('#id').val(datos.id);
$('#nombre').val(datos.nombre);
$('#descripcion').val(datos.descripcion);
$('#minutos').val(datos.minutos);
         document.getElementById('btnEditar').style.visibility='visible';
         document.getElementById('btnEditar').style.display='block';
         document.getElementById('btnGuardar').style.visibility='hidden';
         document.getElementById('btnGuardar').style.display='none';
},
error: function(){
console.log("Error");
	}
	});
});


$('#btnEditar').click(function(){
	var id = $('#id').val();
	var nombre = $('#nombre').val();
	var descripcion = $('#descripcion').val();
	var minutos = $('#minutos').val();
	console.log("id->"+id);
	console.log("nombre->"+nombre);
	console.log("descripcion->"+descripcion);
	console.log("minutos->"+minutos);
	
	if (id=='') {
		alert('Falta id');
	}
	else if (nombre=='') {
	alert('Falta nombre');	
	}
	else if (descripcion=='') {
	alert('Falta descripcion');	
	}else{
		//$('#modalAgregar').modal('hide');
		//$('.alert-success').html("Se guardo el registro").fadeIn().delay(4000).fadeOut('snow')
		var json={"id":id,"nombre":nombre,"descripcion":descripcion,"minutos":minutos, "minutosF":minutos}
			$.ajax({
type: 'ajax',
method: 'put',
url: 'http://localhost/apirest-backEnd/',
data: JSON.stringify(json),
contentType:'application/json; charset=utf-8',
dataType: 'json',
success : function(datos){
console.log("Bien->"+JSON.stringify(datos));
llenarCurso();
	llenarCompletada();
limpiar();
  document.getElementById('btnGuardar').style.visibility='visible';
         document.getElementById('btnGuardar').style.display='block';
         document.getElementById('btnEditar').style.visibility='hidden';
         document.getElementById('btnEditar').style.display='none';
	$('.alert-info').html("Se edito con exito").fadeIn().delay(4000).fadeOut('snow')
},
error: function(){
console.log("Error");
	}
	});
	}
});
function mostrar() {
   let valor = document.getElementById('status').value; //obtenemos el valor del select
   if (valor == 'corto') {
   	$('#minutos').val(30);
    }
    if (valor == 'medio') {
   	$('#minutos').val(60);
    }
    if (valor == 'largo') {
   	$('#minutos').val(90);
    }
    if (valor == 'pre') {
   	$('#minutos').val('');
    }
}