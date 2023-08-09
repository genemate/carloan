/* For credit amount*/
var slider = document.getElementById("myRange");
var outputSumma = document.getElementById("summa");
var outputParcentage = document.getElementById("par");
var interestRate = document.getElementById("interest_rate");
var interestRate2 = document.getElementById("interest_rate2");
var month = document.getElementById("month");

/* For grace period*/
var period = document.getElementById("myPeriod");
var outputPeriod = document.getElementById("period");

let par = 27.9;

window.addEventListener('load', function() {
    slider.style.background = 'linear-gradient(to right, #970103 0%, #970103 ' + 10 + '%, #eee ' + 10 + '%, #eee 100%)';
    period.style.background = 'linear-gradient(to right, #970103 0%, #970103 ' + 33 + '%, #eee ' + 33 + '%, #eee 100%)';
})

slider.oninput = function() {
    outputSumma.innerHTML = numberWithCommas(this.value);

    var value = (this.value-this.min)/(this.max-this.min)*100;
    this.style.background = 'linear-gradient(to right, #970103 0%, #970103 ' + value + '%, #eee ' + value + '%, #eee 100%)';

    calcLoan();
    outputParcentage.innerHTML = numberWithCommas(totalPar);
  }

period.oninput = function() {
    outputPeriod.innerHTML = numberWithCommas(this.value);

    var value = (this.value-this.min)/(this.max-this.min)*100
    this.style.background = 'linear-gradient(to right, #970103 0%, #970103 ' + value + '%, #eee ' + value + '%, #eee 100%)';

    if (this.value === '36'){
        par = 31.9
    }else if (this.value === '24'){
        par = 29.9
    }else {
        par = 27.9
    }

    interestRate.innerHTML = par + ' %'

    calcLoan();
    outputParcentage.innerHTML = numberWithCommas(totalPar);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var close = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    document.getElementById("myTable").innerHTML=calcLoan();
    modal.style.display = "block";

    month.innerHTML = period.value + ' месяцев'
    interestRate2.innerHTML = par + ' %'
}

var totalPar = 0;
var totalPayment = 0;

function calcLoan() {

    totalPar = 0;
    totalPayment = 0;

    var text = "";
    var months = period.value;
    var pMonths = months;
    //var mPayment = 0;
    var loan = slider.value;
    var date = new Date();
    var date2 = new Date();

    for(var i = 1;i<=period.value;i++) {
        let mPyment = slider.value / pMonths;
        let monthDifference = moment(new Date(date.setMonth(new Date().getMonth() + i - 1))).daysInMonth()
        let curPar = Math.round(loan * ((par/100)/365) * monthDifference);
        let newDate = moment(date2).add(i, 'M');

        text += "<tr>\n" +
            "<td class='tnumber'><h5>" + i + "</h5></td>\n" +
            "<td><h5>" + moment(newDate).format("DD.MM.YYYY") + "</h5></td>" +
            "<td class='tloan'><h5>" + numberWithCommas(loan) + "</h5></td>\n" +
            "<td class='tparcentage'><h5>" + numberWithCommas(Math.round(mPyment)) + "</h5></td>\n" +
            "<td><h5>" + numberWithCommas(curPar) + "</h5></td>\n" +
            "<td><h5>" + numberWithCommas(Math.round(curPar+mPyment)) + "</h5></td>\n" +
            "</tr>"
        loan = Math.round(loan - mPyment);

        totalPar += curPar;
        totalPayment = Number(totalPar) + Number(slider.value);

    }
    text += "<tr>\n" +
        "<td class='tnumber'><h4></h4></td>\n" +
        "<td class='tnumber'><h4></h4></td>\n" +
        "<td class='tloan'><h4>0</h4></td>\n" +
        "<td class='tparcentage'><h4>" + numberWithCommas(slider.value) + "</h4></td>\n" +
        "<td><h4>" + numberWithCommas(totalPar) + "</h4></td>\n" +
        "<td><h4>" + numberWithCommas(totalPayment) + "</h4></td>\n" +
        "</tr>";

    return text;
}

close.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
