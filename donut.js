//DonutShop Object
function DonutShop(shopName, minCust, maxCust, avgDonuts) {
  this.shopName = shopName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgDonuts = avgDonuts;
  this.salesReportTimes =
    [
      "7:00",
      "8:00",
      "9:00",
      "10:00",
      "11:00",
      "12:00",
      "1:00",
      "2:00",
      "3:00",
      "4:00",
      "5:00",
      "6:00"
    ];

  var totalSales = 0;

  //returns random customers between min and max
  this.custGeneration = function() {
    var customers = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
    console.log(customers + " customers this hour");
    return customers;
  }

  //calculates hourly sales using custGeneration()
  this.hourlySales = function() {
    var customers = this.custGeneration();
    var hourlyDonuts = (customers * this.avgDonuts);
    console.log(hourlyDonuts + " donuts sold this hour");
    return hourlyDonuts;
  }

  //adds sales to total donut sales
  this.addTotal = function(moreSales) {
    console.log(totalSales);
    totalSales = totalSales + moreSales;
    console.log(totalSales + " donuts sold this day");
  }

  //returns total sales
  this.dailySales = function() {
    console.log(totalSales + " donuts sold today");
    return totalSales;
  }

  //Clears total sales
  this.clearSales = function() {
    totalSales = 0;
  }

}

var downtown = new DonutShop("Downtown", 8, 43, 4.5);
var capitolHill = new DonutShop("Capitol Hill", 4, 37, 2);
var southLakeUnion = new DonutShop("South Lake Union", 9, 23, 6.33);
var wedgewood = new DonutShop("Wedgewood", 2, 28, 1.25);
var ballard = new DonutShop("Ballard", 8, 56, 3.75);

var allShops = [downtown, capitolHill, southLakeUnion, wedgewood, ballard];


// Script to calculate and append sales data to table

function buildTable(){
  document.getElementById("shops").innerHTML = "";

  allShops.forEach(function(shop){
    shop.clearSales(); // resets daily sales

    // prints location title to table
    var table = document.getElementById("shops");
    var newRow = document.createElement("tr");

    var name = document.createElement("td");
    name.textContent = shop.shopName;
    newRow.appendChild(name);

    // generates and prints hourly sales
      for (i = 0; i < 11; i++) {
        var salesTest = document.createElement("td");
        var sales = shop.hourlySales();
        salesTest.textContent = sales.toFixed(1);
        shop.addTotal(sales);

        newRow.appendChild(salesTest);
        table.appendChild(newRow);
      }

    // prints total sales for location

    var salesTotal = document.createElement("td");
    salesTotal.textContent = shop.dailySales().toFixed(1);

    newRow.appendChild(salesTotal);
    table.appendChild(newRow);
  });
}

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', buildTable);



buildTable();
