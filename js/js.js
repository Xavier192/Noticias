var arrayImagenes=new Array();
var contador=0;
var noticiasCargadas=1;
var contadorAbstracte=0;
var switchScroll=true;
var intervalo;
var cargarSiguiente=true;
var cargarCarrusel=true;


$(document).ready(function(){
	arrayImagenes[0] = new Image();
	arrayImagenes[0].src='img/banner.jpg';
	arrayImagenes[1] = new Image();
	arrayImagenes[1].src='img/banner2.jpg';
	arrayImagenes[2]=new Image();
	arrayImagenes[2].src='img/banner3.jpg';
    
  
  desactivarScroll();
  media();
});


function media(){
  var x = window.matchMedia("(max-width: 700px)");
  cambiarImagenLogo(x);
  x.addListener(cambiarImagenLogo);	
}

function cambiarImagenLogo(x){
	if (x.matches) {
       $("#logo").attr("src","img/logo2.png");
    } else {
        $("#logo").attr("src","img/logo_def.png");
    }
}

function desactivarScroll(){
	var contadorScroll=0;	
	$("#activar").click(function(){
		contadorScroll++;
		if(contadorScroll%2==0){
			switchScroll=true;
		}
	    else{
			switchScroll=false;
		}
	});
}

function actualizarContador (){
	setInterval(function (){ponerImagen()},7000);
}

function ponerImagen(){
	var contadorReal=contador%3;
	contador++;
	
	$("#banner").fadeToggle("slow");
	$("#banner").attr("src",arrayImagenes[contadorReal].src);
	
}




	


function fadeOut(){

cargarCarrusel=false;
}
function fadeIn(){
$("#banner").fadeIn();
setTimeout();
cargarCarrusel=true;
}

$(window).scroll(function(){
if(switchScroll){
	cogerInformacion();
}
else{
	$("#botonCargar").click(function(){
		if(cargarSiguiente){
			cargar();
		}
	});
}	
});

function cogerInformacion(){
	if ($(window).scrollTop() + $(window).height() + 10 >= $(document).height() && cargarSiguiente) {
		cargar();	 
	}

	
	
	
}

function cargar(){
		if(noticiasCargadas<4){
		$("#gifCarga").css("display","block");
		cargarSiguiente=false;
		$.getJSON("https://rawgit.com/Xavier192/Noticias/master/json/data"+noticiasCargadas+".json",function(jsonObject){
			if(contadorAbstracte%2==0){
				añadirNoticias(jsonObject);	
			}
			else{
				añadirNoticiasUnicas(jsonObject);
			}
			contadorAbstracte++;
			noticiasCargadas++;
			cargarSiguiente=true;
			$("#gifCarga").css("display","none");
			 if(noticiasCargadas>=4){
		 $('#botonCargar').text("No hay mas noticias");
		 $('#botonCargar').css({'background-color':'#0B3B39','color':'white'});
		}
		});
	}
	
}


function añadirNoticias(json){
	
	$("#contenedor").append('<div class="row" id="'+noticiasCargadas+'">'+'</div>');
	$.each (json,function (i,item){
	$("#"+noticiasCargadas).append('<div class="col-sm-6">'+'<br><br><br>'+'<figure>'+
    '<img src="'+item.imagen+'" alt="Imagen no encontrada" class="img-responsive center-block"/>'+'<figcaption>'+'<h2>'+'<b>'+item.titulo+'</b>'+
    '</h2>'+'<p>'+item.descripcion+'</p>'+'<span>'+'<i>'+item.fecha+'</i>'+'</span>'+'</figcaption>'+
    '</figure>'+'</div>');
	})	

	
};

function añadirNoticiasUnicas(json){
   $.each (json,function (i,item){
	$("#contenedor").append('<div class="row">'+'<div class="col-sm-12">'+'<br><br><br>'+'<figure>'+
    '<img src="'+item.imagen+'" alt="Imagen no encontrada" class="img-responsive center-block"/>'+'<figcaption>'+'<h2>'+'<b>'+item.titulo+'</b>'+
    '</h2>'+'<p>'+item.descripcion+'</p>'+'<span>'+'<i>'+item.fecha+'</i>'+'</span>'+'</figcaption>'+
    '</figure>'+'</div>'+'</div>');	
	})
};


