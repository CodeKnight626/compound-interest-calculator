/**function getFutureValue() {
	console.log("Hola");
}**/

// DOM manipulation
$(document).ready(function() {
	function getFutureValue() {
		console.log("Hola");
		document.getElementById("valor-futuro").innerHTML = "popo";
	}

	$("#calculadora").submit(function(e) {
		var futureValue = 0;
		var presentValue = 0;
		var interestRate = 0;
		var compundingPeriods = 0;
		var years = 0
		document.getElementById("valor-futuro").innerHTML = "popo";
		presentValue = document.getElementById("principal-valor").value;
		interestRate = document.getElementById("interes-valor").value;
		compundingPeriods = document.querySelector('#listaValores').value;
		years = document.getElementById("periodo-valor").value;

		interestRate = interestRate / 100
		interestRate = interestRate / compundingPeriods
		interestRate = (+1 + +interestRate)
		years = years * compundingPeriods
		
		futureValue = presentValue * (Math.pow(interestRate,years))
		document.getElementById("valor-futuro").innerHTML = parseFloat(futureValue).toFixed(2);;


		e.preventDefault();
	});
	
});