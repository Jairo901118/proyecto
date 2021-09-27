var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

var _ElementoIMC = document.getElementById('calcular').innerHTML
document.getElementById('resultado').style.display = 'none';

var slideIndex = 0;
showSlides();
switch_sexo();


var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/*
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}*/



function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";

    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Calcular IMC";
    } else {
        document.getElementById("nextBtn").innerHTML = "Siguiente";
    }
    fixStepIndicator(n);
}

function nextPrev(n) {
    var x = document.getElementsByClassName("tab");
    if (n == 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
        IMC();
        return false;
    }
    showTab(currentTab);
}

function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    for (i = 0; i < y.length; i++) {
        if (y[i].value == "") {
            y[i].className += " invalid";
            valid = false;
        }
    }
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid;
}

function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
}



function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 5000); // Change image every 2 seconds
}



function switch_sexo() {
    let isChecked = document.getElementById("calcula_sexo").checked;;
    if (isChecked) {
        document.getElementById("lbSexoM").style.color = "#4FAEF2";//Blue
        document.getElementById("lbSexoF").style.color = "Black";
    } else {
        document.getElementById("lbSexoF").style.color = "#F35252";//Red
        document.getElementById("lbSexoM").style.color = "Black";
    }
}


function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

var Imc;
function IMC() {
    document.getElementById('calcular').style.display = 'none';
    document.getElementById('resultado').style.display = 'block';
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
}


function defineIMC(Imc, Name) {
    document.getElementById('hName').innerHTML = Name;
    let txt = "Recomendación: ";
    let txt2 = "";
    if (Imc <= 18.5) {
        txt += "";
        txt2 = "Bajo";
        //document.getElementById('hResultado').innerHTML = Name + ", Tu IMC = " + Imc + ", Bajo";
        //document.getElementById('pTxtResultado').innerHTML = txt;
    } else if (Imc > 18.5 && Imc <= 24.9) {
        txt += "";
        txt2 = "Normal";
        //document.getElementById('hResultado').innerHTML = "Tu IMC es " + Imc + ", Normal.";
        //document.getElementById('pTxtResultado').innerHTML = txt;
        //console.log("Normal");
    } else if (Imc > 24.9 && Imc <= 29.9) {
        txt += "";
        txt2 = "Sobrepeso";
        //document.getElementById('hResultado').innerHTML = "Tu IMC = " + Imc + ", Sobrepeso.";
        //document.getElementById('pTxtResultado').innerHTML = txt;
    } else if (Imc > 29.9 && Imc <= 34.9) {
        txt += "";
        txt2 = "Obesidad 1";
        //document.getElementById('hResultado').innerHTML = "Tu IMC = " + Imc + ", Obesidad 1";
        //document.getElementById('pTxtResultado').innerHTML = txt;
    } else if (Imc > 34.9 && Imc <= 39.9) {
        txt += "";
        txt2 = "Obesidad 2";
        //document.getElementById('hResultado').innerHTML = "Tu IMC = " + Imc + ", Obesidad 2";
        //document.getElementById('pTxtResultado').innerHTML = txt;
    } else if (Imc > 39.9 && Imc <= 50) {
        txt += "";
        txt2 = "Obesidad 3";
        //document.getElementById('hResultado').innerHTML = "Tu IMC = " + Imc + ", Obesidad 3";
        //document.getElementById('pTxtResultado').innerHTML = txt;
    } else if (Imc > 50) {
        txt += "";
        txt2 = "Obesidad 4";
        //document.getElementById('hResultado').innerHTML = "Tu IMC = " + Imc + ", Obesidad 4";
        //document.getElementById('pTxtResultado').innerHTML = txt;
    }
    document.getElementById('hResultado').innerHTML = "Tu IMC = " + Imc + ", " + txt2;
}


function drawChart() {
    let Name = document.getElementById('name').value;
    let Peso = document.getElementById("OutputPeso").value;
    let Estatura = document.getElementById("OutputEstatura").value;
    Estatura /= 100;


    Imc = Peso / Math.pow(Estatura, 2);
    Imc = roundToTwo(Imc);
    defineIMC(Imc, Name);
    //parseFloat(Math.round(278.6 * 100) / 100).toFixed(2);
    var datos = [];
    let Header = [{ label: 'IMC' }, { label: 'Tu IMC', style: '#232323' }, { role: 'style' }];
    datos.push(Header);

    let txt = '[' +
        '{"indice":"' + Name + '","vr":' + Imc + ',"style":"color: blue" },' +
        '{"indice":"Bajo","vr":18.5,"style":"color: gray" },' +
        '{"indice":"Normal","vr":24.9,"style":"color: #32FCE3" },' +
        '{"indice":"Sobrepeso","vr":29.9,"style":"color: #F1BC2E" },' +
        '{"indice":"Obesidad 1","vr":34.9,"style":"color: #FC6053" },' +
        '{"indice":"Obesidad 2","vr":39.9,"style":"color: #FE4434" },' +
        '{"indice":"Obesidad 3","vr":50,"style":"color: #FA2B19" },' +
        '{"indice":"Obesidad 4","vr":60,"style":"color: #FA1400" }' +
        ']';

    let arrDatos = JSON.parse(txt);
    arrDatos.sort(function (a, b) {
        return a.vr - b.vr;
    });

    arrDatos.forEach(function (valor, indice, array) {
        //console.log("'" + valor.indice + "','" + valor.vr + "','" + valor.style + "'");
        var temp = [];
        temp.push(valor.indice);
        temp.push(valor.vr);
        temp.push(valor.style);
        datos.push(temp);
    })


    var newData = [['Year', 'Sales', 'Expenses', 'Other'],
    ['2004', 1000, 400, 232],
    ['2005', 1170, 460, 421],
    ['2006', 660, 1120, 4324],
    ['2007', 1030, 540, 4234],
    ['2008', 1530, 50, 234]];
    console.log(newData);
    console.log(datos);

    var data = google.visualization.arrayToDataTable(datos);
    var options = {
        fontSize: 10,
        'width': 700,
        'height': 300,
        title: 'IMC = peso / altura al cuadrado',
        hAxis: { title: 'Indices', titleTextStyle: { color: '#333' } },
        isStacked: true,
        vAxis: { minValue: 0 }
    };

    var chart = new google.visualization.SteppedAreaChart(document.getElementById('chart_div'));
    chart.draw(data, options);

}


function newIMC() {
    document.getElementById('resultado').style.display = 'none';
    document.getElementById('calcular').innerHTML = "";
    document.getElementById('calcular').innerHTML = _ElementoIMC;
    document.getElementById('calcular').style.display = 'block';
}