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

var preguntaXML;
var preguntaHTML;


xhttp.onreadystatechange = function() {

	if (this.readyState == 4 && this.status == 200) {
		xmlDoc = this.responseXML;
	}
}

xhttp.open("GET", url, false);
xhttp.send();

window.onload = function(){
	preguntaXML = xmlDoc.getElementsByTagName("question");
	preguntaHTML = document.getElementsByClassName('pregunta');
	
	gestionarXml();
}

function gestionarXml() {	
	var tituloHTML = document.getElementsByClassName("title");
	var tituloXML = xmlDoc.getElementsByTagName("title");	
	var i;
	var j;
	var numOpciones;
		
	for (i = 0; i < preguntaXML.length; i++) {
		tituloHTML[i].innerHTML = tituloXML[i].innerHTML;
		numOpciones = preguntaXML[i].getElementsByTagName('option').length;
		
		if (xmlDoc.getElementsByTagName('type')[i].innerHTML == 'select' || xmlDoc.getElementsByTagName('type')[i].innerHTML == 'multiple'){						
			var optionXML = [];
			
			optionXML = leerOptions (numOpciones, i);
			llenarSelect (optionXML, i);
		}
		
		if (xmlDoc.getElementsByTagName('type')[i].innerHTML == 'checkbox') {			
			var optionXML = [];
			
			optionXML = leerOptions (numOpciones, i);
			llenarCheckbox (optionXML, i);
		}
		
		/* O es mejor...
		if (i==2 || i==3){
			
		}...*/		
	}	
}

function leerOptions (numOpciones, i) {
	var optionXML = [];
	
	for (j=0; j<numOpciones; j++) { 
		optionXML[j] =  preguntaXML[i].getElementsByTagName("option")[j].innerHTML;
	}
	
	return optionXML;	
}

function llenarCheckbox (optionXML, pos) {
	
	// Es necesario poner los div?

	for (i = 0; i < optionXML.length; i++) {
		var input = document.createElement("input");
		var label = document.createElement("label");

		label.innerHTML = optionXML[i];
		label.setAttribute("for", "p" + pos + "_" + i);
		input.type = "checkbox";
		input.name = "p" + pos;
		input.id = "p" + pos + "_" + i; 
		preguntaHTML[pos].appendChild(input);
		preguntaHTML[pos].appendChild(label);
		preguntaHTML[pos].appendChild(document.createElement("br"));
	}	
}

function llenarRadio () {
	
}

function llenarSelect (optionXML, pos) {
	var select = preguntaHTML[pos].getElementsByTagName('select')[0];
	
	for (i = 0; i < optionXML.length; i++) {
		var option = document.createElement("option");
		option.text = optionXML[i];
		option.value = i+1;		
		select.options.add(option);		
	}
}
 

