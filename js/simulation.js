/*
	A chaque itration, il faut icrementer le nombre totale de personnes ( statistiques ) ainsi que le nombre totale de doublons et triplets
	Il faut aussi mettre a jour le BarGraph.

	MAYBE : Ajout d'un bouton arret ?
*/

var test = document.getElementById("test");

var probMois = [319297, 299235, 335786, 308809, 334437, 336251, 347934, 362798, 350711, 347354, 330832, 335111];
probMois = normalizeArray(probMois);
var repartition = getCumulativeDistributionFunction(probMois);


var birthSimulated = 0;
var yearSimulated = 0;
var nbOfBirthToSimulate = 0;
var nbOfYearsToSimulated = 0;

var resultMonth = initializeArray(probMois.length, 0);
var resultDay = initializeArray(360, 0);
var resultStat = initializeArray(5,0);

var myInterval;

// Variable pour les résultats totaux
var totalBirth;
var totalPairs;
var lastPairs;

initialiseBarGraph();
initialiseGraph();


function initialiseSimulation()
{
	nbOfBirthToSimulate = document.getElementById("Personnes").value;
	nbOfYearsToSimulated = document.getElementById("Iterations").value;

	// disable button
	document.getElementById("buttonStart").disabled = true;

	// Réinitialise les résultats totaux
	totalBirth = 0;
	resultStat = initializeArray(5,0);
	totalPairs = 0;
	lastPairs = 0;

	// Initialise le BarGraph
	dataGraph[0] = { pairs: "Pas de paires", frequence: 0};
  	dataGraph[1] = { pairs: "Au moins une paire", frequence: 0};

  	document.getElementById("svg-heatmap").innerHTML = "<h3>Occurence de pairs dans la simulation</h3><p>% d'occurence</p>";
  	initialiseBarGraph();
	initialiseGraph();

	startSimulation();
}

function startSimulation()
{
	yearSimulated = 0;

	startYearIteration();
}

function endSimulation()
{
	// Enable button
	document.getElementById("buttonStart").disabled = false;
	modifyGraph(dataGraph);
}

function startYearIteration()
{
	resultMonth = initializeArray(probMois.length, 0);

	resultDay = initializeArray(360, 0);
	// Initialise le heatMap
	resetHeatMap();

	birthSimulated = 0;
	myInterval = window.setInterval(generateRandom, 10);
}

function endYearIteration()
{
	window.clearInterval(myInterval);
	updateResults();
	yearSimulated++;	
	updateBarGraph();

	//Show heatMap
	setheatMap(parser(listToheatMap(resultDay)));

	if(yearSimulated >= nbOfYearsToSimulated)
	{
		endSimulation();
	}
	else
	{
		setTimeout(startYearIteration, document.getElementById("Temps").value);
	}
}

function updateResults(){
	totalBirth += parseInt(nbOfBirthToSimulate);	
	document.getElementById("nbPersonnes").value = totalBirth;
	document.getElementById("nbDoublons").value = resultStat[1];
	document.getElementById("nbTriplets").value = resultStat[2];
}

function updateBarGraph(){

	// Calcule le nombre de pairs obtenue dans une

	totalPairs = resultStat[1] + resultStat[2] + resultStat[3] + resultStat[4] - lastPairs;
	lastPairs += totalPairs;

	// Update de la fréquence des evenements
	if(totalPairs == 0 && yearSimulated >= 1){
		dataGraph[0].frequence = ((dataGraph[0].frequence * (yearSimulated-1)) + 1)/yearSimulated;
		dataGraph[1].frequence = (dataGraph[1].frequence * (yearSimulated-1)) / yearSimulated;
	}
	else if( yearSimulated >= 1){
		dataGraph[0].frequence = (dataGraph[0].frequence * (yearSimulated-1))/yearSimulated;
		dataGraph[1].frequence = ((dataGraph[1].frequence * (yearSimulated-1)) + 1) / yearSimulated;
	}

	// Debugging purpose
	//console.log(totalPairs);
	//dataGraph.forEach(function(d){console.log(d);});
}



function normalizeArray(tab){
	var sum = calculateArraySummation(tab);

	for(var i = 0; i < tab.length; i++)
	{
		tab[i] = tab[i]/sum;
	}
	return tab;
}

function calculateArraySummation(tab)
{
	var sum = 0;
	for(var i = 0; i < tab.length; i++)
	{
		sum += tab[i];
	}
	return sum;
}

function initializeArray(size, defaultValue)
{
	var tab = new Array();
	for(var i = 0; i < size; i++)
	{
		tab.push(defaultValue);
	}
	return tab;
}

function getCumulativeDistributionFunction(fDeMasse)
{
	var i = 0;

	var fRepartition = new Array(fDeMasse.length); 
	for (index = 0; index < fDeMasse.length; index++) 
	{
    	i += fDeMasse[index];
    	fRepartition[index] = i;
	}
	return fRepartition;
}

function getEventFromCumulativeDistributionFunction(value, fDeRepartition)
{
	var i = 0;
	if(fDeRepartition.length > 0)
	{
		while(value > fDeRepartition[i])
		{
			i++;
			if(i > fDeRepartition.length)
			{
				break;
			}
		}
	}
	return i;
}

function generateRandom()
{
	birthSimulated++;
	if(birthSimulated > nbOfBirthToSimulate)
	{
		endYearIteration();
	}
	else
	{
		var key = getEventFromCumulativeDistributionFunction(Math.random(), repartition);
		resultMonth[key]++;
		var randomDay = key*30 + Math.ceil(Math.random() * 30)-1;
		resultDay[randomDay]++;

		result = resultDay[randomDay];

		switch(result){

			case 1:
			resultStat[0]++;
			break;

			case 2:
			resultStat[0]--;
			resultStat[1]++;
			break;

			case 3:
			resultStat[1]--;
			resultStat[2]++;
			break;

			case 4:
			resultStat[2]--;
			resultStat[3]++;
			break;	

			case 3:
			resultStat[3]--;
			resultStat[4]++;
			break;	

			default:
			break;
		}


	}

}

// Function pour le heatmap

/* Variables deja dans heatmap.js
*
* timestampStart : timestamp du 1 Janvier 2014, 5:00:11:00
* oneDay : timestamp pour un jour
* heatMap : array de heatMap avec les timestamp et les valeurs
*/
// Valeur de depart pour le calendrier
var timestampStart = new Date(2014,0,1,5,0,11,0)/1000;

// Valeur de timestamp pour une journee
var oneDay = (new Date(2014,0,2,5,0,11,0)/1000)- timestampStart;

// Array des timestamp et valeurs pour le heatmap
var heatMap = new Array();

function resetHeatMap()
{
	// Initialisation de toutes les valeurs a 0
	for (var i = 0; i < 365; i++) {
	  heatMap[i]= {date: timestampStart + (i*oneDay), value: 0};
	};

	setheatMap(parser(heatMap));
}

/*
* Assigne un array d'information aux deux calendriers dans la vue
* heatMap = array("timestamp: ___" , "value:  ___")
*/
function setheatMap (heatMap) {
  heatMaplower.update(heatMap, false);
  heatMapHigher.update(heatMap, false
  	);
}

/*
* Transforme les informations de la liste obtenue pour les inserer 
* dans le array de heatMaps du heatmap.
*/
function listToheatMap(liste){
	for (var i = 0; i < liste.length; i++) {
		heatMap[i]["value"] = parseInt(liste[i]);
	};
	return heatMap;
}

/*
* retourne une array sur la forme : heatMap[timestamp] = valeur;
*/
var parser = function(heatMap) {
  var stats = {};
  for (var d in heatMap) {
    stats[heatMap[d].date] = heatMap[d].value;
  }
  return stats;
};

//heatMap[0]["value"] = 1;
//setheatMap(parser(heatMap));