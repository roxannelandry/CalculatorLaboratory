/**
 * Created by Maxime on 2015-09-24.
 */
var str = "12/5*9+9.4*2".replace(/[^-()\d/*+.]/g, '');

var f = [];
Math.factorial = function(n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    if (f[n] > 0) {
        return f[n];
    }
    return f[n] = Math.factorial(n-1) * n;
};

// Classe Calculator
// Toutes les m�thodes sauf `equals` retournent `this`, ce qui permet de chainer les appels
// Ex:
// var calculator = new Calculator()
// calculator.add(2).add(3).subtract(2).equals()
// Retourne : 2
// 2 + 3 - 2 = 2
var Calculator = function () {
    var memory;

    var equation = '';

    // Ajouter seulement une valeur � l'�quation
    // Sera utile pour lorsque cette classe sera connect�e au UI
    this.value = function(value) {
        if(typeof value !== 'undefined'){
            equation += parseFloat(value);
        }
        return this;
    };
    this.decimal = function(value) {
        equation += ".";
    }

    // R�initialiser l'�quation
    this.clear = function() {
        equation = '';
        return this;
    };

    this.add = function(value) {
        equation += '+';
        if(typeof value !== 'undefined'){
            equation += parseFloat(value);
        }
        return this;
    };

    this.subtract = function (value) {
        equation += '-';
        if(typeof value !== 'undefined'){
            equation += parseFloat(value);
        }
        return this;
    };

    this.multiply = function (value) {
        equation += '*';
        if(typeof value !== 'undefined'){
            equation += parseFloat(value);
        }
        return this;
    };

    this.divide = function (value) {
        equation += '/';
        if(typeof value !== 'undefined'){
            if (value == 0) {
                throw "Division par z�ro!!!";
            }
            equation += parseFloat(value);
        }
        return this;
    };

    this.sin = function(value) {
        equation += 'Math.sin(' + parseFloat(value) + ')';
        return this;
    };

    this.cos = function(value) {
        equation += 'Math.cos(' + parseFloat(value) + ')';
        return this;
    };

    this.tan = function(value) {
        equation += 'Math.tan(' + parseFloat(value) + ')';
        return this;
    };

    this.setMemory = function(memoryValue) {
        memory = memoryValue;
    };

    this.getMemory = function() {
        return memory;
    };

    this.factorial = function(value) {
        if(typeof value === 'undefined'){
            equation = 'Math.factorial(' + this.equals() + ')'
        } else {
            equation += 'Math.factorial(' + parseFloat(value) + ')'
        }
        return this;
    };

    this.equals = function () {
        // Il faut �tre tr�s prudent avec eval !!! Eval pourrait permettre d'injecter du code malicieux et l'ex�cuter
        // C'est pourquoi toutes nos variables 'value' sont pass�es dans 'parseFloat'
        console.log('Evaluating :', equation);
        var equationSolution = eval(equation);
        if(equationSolution == "Infinity"){
            var divisionZero = "WHAT???"
            return divisionZero;
        }
        equation = '';
        var resultTrunc = equationSolution.toPrecision(10);
        if(resultTrunc % 1 == 0){
            resultTrunc = Math.round(resultTrunc);
        }
        return resultTrunc;
    };



    this.getEquation = function () {
        return equation;
    }
};


$(document).ready (function(){
    var calculatrice = new Calculator();

    $("#C").click(function(){
       calculatrice.clear();
        $(".affichage").html(0);
    });

    $("#0").click(function(){
        calculatrice.value(0);
        $(".affichage").html(calculatrice.getEquation);
    });

    $("#1").click(function(){
        calculatrice.value(1);
        $(".affichage").html(calculatrice.getEquation);
    });

    $("#2").click(function(){
        calculatrice.value(2);
        $(".affichage").html(calculatrice.getEquation);
    });

    $("#3").click(function(){
        calculatrice.value(3);
        $(".affichage").html(calculatrice.getEquation);
    });

    $("#4").click(function(){
        calculatrice.value(4);
        $(".affichage").html(calculatrice.getEquation);
    });

    $("#5").click(function(){
        calculatrice.value(5);
        $(".affichage").html(calculatrice.getEquation);

    });

    $("#6").click(function(){
        calculatrice.value(6);
        $(".affichage").html(calculatrice.getEquation);

    });

    $("#7").click(function(){
        calculatrice.value(7);
        $(".affichage").html(calculatrice.getEquation);

    });

    $("#8").click(function(){
        calculatrice.value(8);
        $(".affichage").html(calculatrice.getEquation);

    });

    $("#9").click(function(){
        calculatrice.value(9);
        $(".affichage").html(calculatrice.getEquation);
    });

    $("#virgule").click(function(){
        calculatrice.decimal('.');
        $(".affichage").html(calculatrice.getEquation);
    });

    $("#additionne").click(function(){
        calculatrice.add();
        $(".affichage").html(calculatrice.getEquation);
    });

    $("#soustrait").click(function(){
        calculatrice.subtract();
        $(".affichage").html(calculatrice.getEquation);
    });

    $("#multiplie").click(function(){
        calculatrice.multiply();
        $(".affichage").html(calculatrice.getEquation);
    });

    $("#divise").click(function(){
        calculatrice.divide();
        $(".affichage").html(calculatrice.getEquation);
    });

    $("#factorial").click(function(){
        $(".affichage").html(calculatrice.getEquation());
        $(".affichage").html(calculatrice.factorial());
    });

    $("#egale").click(function(){
        var resultat = calculatrice.equals();
        $(".affichage").html(resultat);
        calculatrice.value(resultat);
    });

    $("#Sin").click(function(){
        var valeur = calculatrice.equals();
        var reponse = calculatrice.sin(valeur);
        $(".affichage").html(reponse);
    });

    $("#Cos").click(function(){
        var valeur = calculatrice.equals();
        var reponse = calculatrice.cos(valeur);
        $(".affichage").html(reponse);
    });

    $("#Tan").click(function(){
        var valeur = calculatrice.equals();
        var reponse = calculatrice.tan(valeur);
        $(".affichage").html(reponse);
    });

    var memoire = false;
    $("#m").click(function(){
        if(memoire){
            calculatrice.value(calculatrice.getMemory());
            $(".affichage").html(calculatrice.getEquation);
            memoire = false;
        }
        else{
            var resultat = calculatrice.equals();
            calculatrice.setMemory(resultat);
            $(".affichage").html(resultat);
            memoire = true;
        }

    });

});
function geoloclisation() {
    if (navigator.geolocation) {
        var timeoutVal = 10 * 1000 * 1000;
        navigator.geolocation.getCurrentPosition(
            displayPosition,
            displayError,
            {enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0}
        );
    }
    else {
        alert("Geolocation is not supported by this browser");
    }
}
function displayPosition(position) {
    document.getElementById("position").innerHTML = "Latitude: " + position.coords.latitude + "&nbsp Longitude: " + position.coords.longitude;
}
function displayError(error) {
    var errors = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
    };
    alert("Error: " + errors[error.code]);
}
