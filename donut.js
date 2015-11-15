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
    var hourlyDonuts = (customers * this.avgDonuts).toFixed(1);
    console.log(hourlyDonuts + " donuts sold this hour");

    return hourlyDonuts;
  }

  //adds sales to total donut sales
  this.addTotal = function(moreSales) {
    console.log(totalSales);
    totalSales += moreSales;
    console.log(totalSales + " donuts sold this day");
  }

  //returns total sales
  this.dailySales = function() {
    console.log(totalSales + " donuts sold today");
    return totalSales;
  }

}

var downtown = new DonutShop("Downtown", 8, 43, 4.5);
var capitolHill = new DonutShop("Capitol Hill", 4, 37, 2);
var southLakeUnion = new DonutShop("South Lake Union", 9, 23, 6.33);
var wedgewood = new DonutShop("Wedgewood", 2, 28, 1.25);
var ballard = new DonutShop("Ballard", 8, 56, 3.75);

var allShops = [downtown, capitolHill, southLakeUnion, wedgewood, ballard];


// Script to calculate and append sales data to table

allShops.forEach(function(shop){
  var table = document.getElementById("shops");
  var newRow = document.createElement("tr");

  var name = document.createElement("td");
  name.textContent = shop.shopName;
  newRow.appendChild(name);

    for (i = 0; i < 11; i++) {
      var salesTest = document.createElement("td");
      salesTest.textContent = shop.hourlySales();

      newRow.appendChild(salesTest);
      table.appendChild(newRow);
    }

});
