
// Valeur de depart pour le calendrier
var timestampStart = new Date(2014,0,1,5,0,11,0)/1000;

// Valeur de timestamp pour une journee
var oneDay = (new Date(2014,0,2,5,0,11,0)/1000)- timestampStart;

// Array des timestamp et valeurs pour le heatmap
var datas = new Array();

// Initialisation de toutes les valeurs a 0
for (var i = 0; i < 365; i++) {
  datas[i]= {date: timestampStart + (i*oneDay), value: 0};
};

// retourne une array sur la forme : data[timestamp] = valeur;
var parser = function(data) {
  var stats = {};
  for (var d in data) {
    stats[data[d].date] = data[d].value;
  }
  return stats;
};


// Premiere ligne du heatmap---------------------------------------------------------------------------------------------------//
var heatMapHigher = new CalHeatMap();
heatMapHigher.init({

  // Data par defaut
  data: datas,
  afterLoadData: parser,
  // Layout par mois
  domain: "month", 
  // Sous-domaine par jour
  subDomain: "x_day", 

  // Seting pour legende
  legend: [ 2, 3],
  range: 6,
  // Color of legend
  legendColors: {
    empty: "#C9C9C9",
    min: "#0000FF",
    max: "#FFFF00"
  },

  displayLegend: false,
  tooltip: false,

  // Start Date
  start: new Date(2014, 0, 1, 1),
});

// Seconde ligne du heatmap---------------------------------------------------------------------------------------------------//
var heatMaplower = new CalHeatMap();
heatMaplower.init({

  // Data par defaut
  data: datas,
  afterLoadData: parser,
  // Layout par mois
  domain: "month", 
  // Sous-domaine par jour
  subDomain: "x_day", 

  // Seting pour legende
  legend: [ 2, 3],
  range: 6,
  // Color of legend
  legendColors: {
    empty: "#C9C9C9",
    min: "#0000FF",
    max: "#FFFF00"
  },

  legendTitleFormat: {
    lower: "0 Personnes",
    inner: "{down} Personnes avec la meme date",
    upper: "Plus de {max} Personnes avec la meme date"
  },
  tooltip: false,

  // Start Date
  start: new Date(2014, 6, 1, 1),
});

//--------------------------------------------------------------------------------------------------------------------------------------------------//
/*

// Add one to the value of the data at a specific index
function incrementData (data, index) {
  data[index] = {date: data[index]["date"], value: data[index]["value"]+1};
  return data;
}

var newData = {};
var randomNumber = 0;


for (var i = 0; i < 50; i++) {

  randomNumber = Math.floor((Math.random() * 366));
  newData = parser(incrementData(datas, randomNumber));
  setTimeout(setData(heatMaplower,newData), 3000 );
  setData(heatMapHigher,newData);
};

// setTimeout est non blocante, alors la boucle ne fait que repasser sur elle meme

var i = 0;                     //  set your counter to 1

function myLoop () {           //  create a loop function
   setTimeout(function () {    
      
    randomNumber = Math.floor((Math.random() * 366));
    newData = parser(incrementData(datas, randomNumber));
    setData(heatMaplower,newData);
    setData(heatMapHigher,newData);

      i++;                     //  increment the counter
      if (i < 500) {            //  if the counter < 50, call the loop function
         myLoop();             //  ..  again which will trigger another 
      }                        //  ..  setTimeout()
   }, 500)
}

myLoop();                      //  start the loop

*/