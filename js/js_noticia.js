var arrayImagenes=new Array();
var contador=1;
var intervalo;
$(document).ready(function(){
	arrayImagenes[0] = new Image();
	arrayImagenes[0].src='img/banner.jpg';
	arrayImagenes[1] = new Image();
	arrayImagenes[1].src='img/banner2.jpg';
	arrayImagenes[2]=new Image();
	arrayImagenes[2].src='img/banner3.jpg';
   media(); 
  intervalo=setInterval(function (){control()},7000);
  
});

function actualizarContador (){
	var contadorReal=contador%arrayImagenes.length;
	ponerImagen(contadorReal);
	contador++;
}



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

function control(){
	fadeOut();
	setTimeout(function(){actualizarContador()},300);
	fadeIn();
}
function ponerImagen(contador){
$("#banner").attr("src",arrayImagenes[contador].src);	
}

function fadeOut(){
$("#banner").fadeOut(300);
}
function fadeIn(){
$("#banner").fadeIn(300);
}