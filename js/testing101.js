
// TODO : Desactiver le bouton jusqu'à la fin des itérations
// TODO : Bouton Stop
// TODO : Ajout de l<affichage des resultats

var test = document.getElementById("test");
test.textContent = "Test ready";

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

function spitBabyOutOfVagina()
{
	nbOfBirthToSimulate = document.getElementById("Personnes").value;
	nbOfYearsToSimulated = document.getElementById("Iterations").value;
	startSimulation();
}

function startSimulation()
{
	yearSimulated = 0;

	startYearIteration();
}

function endSimulation()
{

}

function startYearIteration()
{
	resultMonth = initializeArray(probMois.length, 0);

	resultDay = initializeArray(360, 0);
	// Initialise le heatMap
	resetHeatMap();

	resultStat = initializeArray(5,0);
	
	birthSimulated = 0;
	myInterval = window.setInterval(generateRandom, 10);
}

function endYearIteration()
{
	analyzeResult();
	window.clearInterval(myInterval);

	yearSimulated++;

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
	test.textContent = "Getting repartition";

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
	//printTest ("Value " + fDeRepartition.length);
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
	}

}

function analyzeResult()
{
	for(var i = 0; i < resultDay.length; i++)
	{
		resultStat[resultDay[i]]++;
	}
	PrintArray(resultStat);
}

function PrintArray(liste)
{
	/*
	var text = "";
	for(var i = 0; i < liste.length ; i++)
	{
		text += liste[i] + "\n\b";
	}
	printTest(text);
	*/
	//document.getElementById("nbPersonnes").value = resultStat[0];
	//document.getElementById("nbDoublons").value =  resultStat[1];
	//document.getElementById("nbTriplets").value =  resultStat[2];
}

function printTest(text)
{
	test.textContent = text;
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


resetHeatMap();

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