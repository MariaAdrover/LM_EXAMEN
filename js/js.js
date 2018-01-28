/*var xhttp = new XMLHttpRequest();

// Peticion?
xhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
  gestionarXml(this);
 }
};

xhttp.open("GET", "https://rawgit.com/MariaAdrover/LM_EXAMEN/master/formulari.xml", true); //localhost no ha de funcionar
xhttp.send();

window.onload = function(){
	gestionarXml();
}

function gestionarXml(dadesXml){
var xmlDoc = dadesXml.responseXML;
document.getElementsByClassName('pregunta')[0].innerHTML = xmlDoc.getElementsByTagName('title')[0].innerHTML;
}*/

var xmlDoc = null;
var url = "https://rawgit.com/MariaAdrover/LM_EXAMEN/master/formulari.xml";
var xhttp = new XMLHttpRequest();


xhttp.onreadystatechange = function() {

	if (this.readyState == 4 && this.status == 200) {
		xmlDoc = this.responseXML;
	}
}

xhttp.open("GET", url, false);
xhttp.send();

window.onload = function(){
	gestionarXml();
}

function gestionarXml() {
	document.getElementById("preg1").innerHTML = xmlDoc.getElementsByTagName("title")[0].innerHTML;
 }
