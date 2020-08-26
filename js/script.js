/**function getFutureValue() {
	console.log("Hola");
}**/

// DOM manipulation
$(document).ready(function() {


	// Variables para colores
	var gray = 'rgb(134, 141, 145)'
	var blue = 'rgb(3, 165, 252)'

	//Variables utilizadas para guardar 
	var futureValue = 0;
	var presentValue = 0;
	var interestRate = 0;
	var compundingPeriods = 0;
	var years = 0;

	var interestValue = 0;
	var interestPercentage = 0;
	var presentValuePercentage = 0;

	//Lists Used to storage data to graphic later
	let stackedChartsYears = [];
	let stackedCharts = [];
	let colorPresentAmount = [];
	let colorInterest = [];
	let presentValuedata = [];
	let interesPerYear = [];

	// Generamos la grafica de pie
	var ctxP = document.getElementById('myPieChart').getContext('2d');
	var myPieChart = new Chart(ctxP, {
    	type: 'pie',
    	data: {labels: [],
            datasets: [{
                label: '',
                backgroundColor:[ blue, gray],
                borderColor: 'rgb(57, 119, 153)',
                data: []
        }]},
    	options: {}
	});

	// Generamos la grafica de barras
	var ctxB = document.getElementById('myBarChart').getContext('2d');
	var myBarChart = new Chart(ctxB, {
    	type: 'bar',
    	data: {
    		labels: [],
            datasets: [{
                label: '',
                backgroundColor: [],
                data: []
            	},
            	{
                label: '',
                backgroundColor: [],
                data: []
            	}
            ]
        },
    	options: {
    		scales: {
    			xAxes: [{ stacked: true }],
    			yAxes: [{ stacked: true }]
  			}
    	}
	});

	// Funcion llamada al presionar el boton submit de la forma, Inicia los calculos
	$("#calculadora").submit(function(e) {
		document.getElementById("charts").style.visibility = "visible";

		// Tomamos el valor de los campos correspondientes y lo asignamos a las variables
		presentValue = document.getElementById("principal-valor").value;
		interestRate = document.getElementById("interes-valor").value;
		compundingPeriods = document.querySelector('#listaValores').value;
		years = document.getElementById("periodo-valor").value;

		// Hacemos unos ajustes a los valores para utilizarlos en las formulas
		interestRate = interestRate / 100;
		interestRate = interestRate / compundingPeriods;
		interestRate = (+1 + +interestRate);
		years = years * compundingPeriods;

		// Ciclo for para generar y guardar los datos para la grafica de barras
		for(i=1;i<=years;i++){
			stackedChartsYears[i - +1] = i + "° Año";
			colorPresentAmount[i - +1] = blue;
			colorInterest[i - +1] = gray;
			presentValuedata[i - +1] = parseFloat(presentValue).toFixed(2);
			stackedCharts[i] = 1;

			//Generamos el interes año con año
			futureValue = presentValue * (Math.pow(interestRate,i));
			interesPerYear[i - +1] = parseFloat(+futureValue - +presentValue).toFixed(2);
		}

		//Ciclo for para eliminar datos restantes de calculos pasados
		iterator = stackedChartsYears.length
		for(i=+years + +1;i<=iterator;i++){
			stackedChartsYears.pop()
		}
		
		// Hacemos los calculos de acuerdo a la formula y guardamos el valor total al final del periodo de años
		futureValue = presentValue * (Math.pow(interestRate,years))
		
		// Obtenemos porcentajes para utilizarlos en la grafica de pie
		interestValue = +futureValue - +presentValue;
		interestPercentage = (+interestValue * 100) / futureValue;
		presentValuePercentage = (+presentValue * 100) / futureValue;
		

		// Cambiamos el valor de la etiqueta y mostramos el monto total
		document.getElementById("valor-futuro").innerHTML = parseFloat(futureValue).toFixed(2);

		myPieChart.data.labels = [('Monto Principal: ' + parseFloat(presentValuePercentage).toFixed(2)), ('Monto Intereses: ' + parseFloat(interestPercentage).toFixed(2))]
		myPieChart.data.datasets[0].data = [parseFloat(presentValuePercentage).toFixed(2), parseFloat(interestPercentage).toFixed(2)]
		myPieChart.update()

		myBarChart.clear()
		myBarChart.data.labels = stackedChartsYears
		myBarChart.data.datasets[0].label = 'Monto principal'
		myBarChart.data.datasets[0].backgroundColor = colorPresentAmount
		myBarChart.data.datasets[0].data = presentValuedata

		myBarChart.data.datasets[1].label = 'Intereses'
		myBarChart.data.datasets[1].backgroundColor = colorInterest
		myBarChart.data.datasets[1].data = interesPerYear
		myBarChart.update()

		e.preventDefault();
	});
});