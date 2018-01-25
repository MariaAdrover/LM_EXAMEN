var xhttp = new XMLHttpRequest();

var xmlDoc = null;

// Peticion?
xhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
  gestionarXml(this);
 }
};

xhttp.open("GET", "http://path.to/preguntes.xml", true); //localhost no ha de funcionar
xhttp.send();

window.onload = function(){
	gestionarXml();
}

function gestionarXml(dadesXml){
var xmlDoc = dadesXml.responseXML;
...
}
