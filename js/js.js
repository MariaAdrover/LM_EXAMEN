var xhttp = new XMLHttpRequest();

var url = "https://cdn.jsdelivr.net/gh/MariaAdrover/LM_EXAMEN/formulari.xml";
var urlJavi = 'https://rawgit.com/shamshir/Prueba/master/questions.xml';

var xmlDoc = null;
var preguntaXML;
var preguntaHTML;

var respuestas0 = [];
var respuestas1 = [];
var respuestas2 = [];
var respuestas3 = [];
var respuestas4 = [];
var respuestas5 = [];
var respuestas6 = [];
var respuestas7 = [];
var respuestas8 = [];
var respuestas9 = [];

// Peticion?
xhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
  gestionarXml(this);
 }
};

xhttp.open("GET", url, true); //localhost no ha de funcionar
xhttp.send();



function gestionarXml(dadesXml){
var xmlDoc = dadesXml.responseXML;

	
	preguntaXML = xmlDoc.getElementsByTagName("question");
	preguntaHTML = document.getElementsByClassName('pregunta');
	
	var tituloHTML = document.getElementsByClassName("title");
	var tituloXML = xmlDoc.getElementsByTagName("title");	
	var i;
	var j;
	var numOpciones;
	var numRespuestas;
		
	for (i = 0; i < preguntaXML.length; i++) {
		tituloHTML[i].innerHTML = tituloXML[i].innerHTML;
		numOpciones = preguntaXML[i].getElementsByTagName('option').length;
		numRespuestas = preguntaXML[i].getElementsByTagName('answer').length;
		
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
		
		if (xmlDoc.getElementsByTagName('type')[i].innerHTML == 'radio') {
			var optionXML = [];
			
			optionXML = leerOptions (numOpciones, i);
			llenarRadio (optionXML, i);
		}
		
		for (j = 0; j < numRespuestas; j++) {
			//eval('respuestas' + i + '[' + j + '] = preguntaXML[i].getElementsByTagName('answer')[j].innerHTML');
			window['respuestas' + i][j] = preguntaXML[i].getElementsByTagName('answer')[j].innerHTML;
			
		}
		
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

	for (i = 0; i < optionXML.length; i++) {
		var input = document.createElement("input");
		var label = document.createElement("label");

		label.innerHTML = optionXML[i];
		label.setAttribute("for", "p" + pos + "_" + i);
		input.type = "checkbox";
		input.value = i + 1;
		input.name = "p" + pos + "_" + i;
		input.id = "p" + pos + "_" + i;
		
		preguntaHTML[pos].appendChild(input);
		preguntaHTML[pos].appendChild(label);
		preguntaHTML[pos].appendChild(document.createElement("br"));
	}	
}

function llenarRadio (optionXML, pos) {
	
	for (i = 0; i < optionXML.length; i++) {
		var input = document.createElement ('input');
		var label = document.createElement ('label');
		
		label.innerHTML = optionXML [i];
		label.setAttribute('for', "p" + pos + "_" + i);
		input.type = 'radio';
		input.value = i + 1;
		input.name = 'p' + pos;
		input.id = "p" + pos + "_" + i;
		
		preguntaHTML[pos].appendChild(input);
		preguntaHTML[pos].appendChild(label);		
		preguntaHTML[pos].appendChild(document.createElement("br"));
	}
	
}

function llenarSelect (optionXML, pos) {
	var select = preguntaHTML[pos].getElementsByTagName('select')[0];
	
	for (i = 0; i < optionXML.length; i++) {
		var option = document.createElement("option");
		option.text = optionXML[i];		
		// option.innerHTML = optionXML[i]; Es lo mismo...
		option.value = i + 1;		
		select.options.add(option);		
	}
}




/*

var xmlDoc = null;
var url = "https://cdn.jsdelivr.net/gh/MariaAdrover/LM_EXAMEN/formulari.xml";
var xhttp = new XMLHttpRequest();
var urlJavi = 'https://rawgit.com/shamshir/Prueba/master/questions.xml';

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
		
		if (xmlDoc.getElementsByTagName('type')[i].innerHTML == 'radio') {
			var optionXML = [];
			
			optionXML = leerOptions (numOpciones, i);
			llenarRadio (optionXML, i);
		}
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

	for (i = 0; i < optionXML.length; i++) {
		var input = document.createElement("input");
		var label = document.createElement("label");

		label.innerHTML = optionXML[i];
		label.setAttribute("for", "p" + pos + "_" + i);
		input.type = "checkbox";
		input.value = i + 1;
		input.name = "p" + pos + "_" + i;
		input.id = "p" + pos + "_" + i;
		
		preguntaHTML[pos].appendChild(input);
		preguntaHTML[pos].appendChild(label);
		preguntaHTML[pos].appendChild(document.createElement("br"));
	}	
}

function llenarRadio (optionXML, pos) {
	
	for (i = 0; i < optionXML.length; i++) {
		var input = document.createElement ('input');
		var label = document.createElement ('label');
		
		label.innerHTML = optionXML [i];
		label.setAttribute('for', "p" + pos + "_" + i);
		input.type = 'radio';
		input.value = i + 1;
		input.name = 'p' + pos;
		input.id = "p" + pos + "_" + i;
		
		preguntaHTML[pos].appendChild(input);
		preguntaHTML[pos].appendChild(label);		
		preguntaHTML[pos].appendChild(document.createElement("br"));
	}
	
}

function llenarSelect (optionXML, pos) {
	var select = preguntaHTML[pos].getElementsByTagName('select')[0];
	
	for (i = 0; i < optionXML.length; i++) {
		var option = document.createElement("option");
		option.text = optionXML[i];		
		// option.innerHTML = optionXML[i]; Es lo mismo...
		option.value = i + 1;		
		select.options.add(option);		
	}
}
*/

