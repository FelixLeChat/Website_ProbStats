// --------------------------------------------------------------
// PLOT
// --------------------------------------------------------------
function plot()
{
    // Obtention du canevas et du contexte
    var a_canvas = document.getElementById("plot");
    var context = a_canvas.getContext("2d");

    // efface le vieu canevas
    context.clearRect(0, 0, 200, 250);

    // obtension du nombre de division de l'axe des Y
    var YAxisDivisionsCount = document.getElementById('Personnes').value;
    console.log(YAxisDivisionsCount);

    // position de l'axe des x par rapport a la bordure gauche
    var y_axis_x_position = 25;

    // Position et inclinaison de l'axe dex X
    context.beginPath();
    context.moveTo(y_axis_x_position, 240);
    context.lineTo(490, 240); // ligne de l'axe
    context.lineWidth = 1;
    context.strokeStyle = '#000000';
    context.stroke();

    // fleche de l'axe des X
    context.beginPath();
    context.moveTo(490 - 10, 235);
    context.lineTo(490, 240);
    context.lineTo(490 - 10, 245);
    context.strokeStyle = '#000000';
    context.fillStyle = "#000000";
    context.stroke();

    // Position et inclinaison de l'axe dex Y
    context.beginPath();
    context.moveTo(y_axis_x_position, 10);
    context.lineTo(y_axis_x_position, 240);
    context.lineWidth = 1;
    context.strokeStyle = '#000000';
    context.stroke();

    // fleche de l'axe des X
    context.beginPath();
    context.moveTo(y_axis_x_position - 5, 20); // Left
    context.lineTo(y_axis_x_position, 10); //Middle
    context.lineTo(y_axis_x_position + 5, 20); // Right
    context.strokeStyle = '#000000';
    context.fillStyle = "#000000";
    context.stroke();

    var y = 0;

    // Grille horizontale principale
    var lineCount = 5;
    for (var i = 1; i <= lineCount; ++i)
    {
        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(y_axis_x_position + 1, 240 - i * 200 / lineCount);
        context.lineTo(490, 240 - i * 200 / lineCount);
        context.strokeStyle = '#AAAAAA';
        context.closePath();
        context.stroke();
    }

    // Grille horizontale secondaire
    for (var i = 1; i <= lineCount; ++i) {
        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(y_axis_x_position + 1, 240 - (i-0.5) * 200 / lineCount);
        context.lineTo(490, 240 - (i-0.5) * 200 / lineCount);
        context.strokeStyle = '#DDDDDD';
        context.closePath();
        context.stroke();
    }

    // Nombre de l'axe des Y
    for (var i = 0; i <= lineCount; ++i) {
        context.font = "10px Arial";
        context.strokeStyle = '#000000';
        context.fillText(i*20, y_axis_x_position - 19, 240 - i * 200 / lineCount + 3);
    }

    // Titre de l'axe des Y
    context.font = "11px Arial bold";
    context.fillStyle = 'blue';
    context.fillText("%", y_axis_x_position + -20, 26);
    context.strokeStyle = '#FF0000';




    var x = y_axis_x_position + 1;
    context.globalAlpha = 0.2;
    //-----------------------------------------------------------------------------
/*
    // Draw conf interval.
    for (var i = 0; i < window.points_to_plot.length; ++i) 
	{
        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(x++, 240 - (window.points_to_plot[i] + window.points_conf_interval[i]) * 200 / 4.0);
        context.lineTo(x, 240 - (window.points_to_plot[i] - window.points_conf_interval[i]) * 200 / 4.0);
        context.strokeStyle = '#AA0000';
        context.closePath();
        context.stroke();
    }

    context.globalAlpha = 1.0;
    //----------------------------------------------------------------------------
    // Ploting points.
    x = y_axis_x_position + 1;

    for (var i = 1; i < window.points_to_plot.length; ++i)
    {
        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(x++, 240 - window.points_to_plot[i-1] * 200 / 4.0);
        context.lineTo(x, 240 - window.points_to_plot[i] * 200 / 4.0);
        context.strokeStyle = '#000000';
        context.closePath();
        context.stroke();
    }

    // Draw PI axe.
    var pi_y_pos = 240 - Math.PI * 200.0 / 4.0;
    context.beginPath();
    context.moveTo(y_axis_x_position, pi_y_pos);
    context.lineTo(490, pi_y_pos);
    context.lineWidth = 1;
    context.strokeStyle = '#0000BB';
    context.stroke();*/
}



// dessine le canvas avec ces donnees
plot();