//DonutShop Object
function DonutShop(minCust, maxCust, avgDonuts) {
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgDonuts = avgDonuts;

  var totalSales = 0;
  var salesReportTimes =
    [
      "7:00-7:59",
      "8:00-8:59",
      "9:00-9:59",
      "10:00-10:59",
      "11:00-11:59",
      "12:00-12:59",
      "1:00-1:59",
      "2:00-2:59",
      "3:00-3:59",
      "4:00-4:59",
      "5:00-5:59"
    ];

  //returns random customers between min and max
  this.custGeneration = function() {
    var customers = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
    console.log(customers + " customers this hour");
    return customers;
  }

  //calculates hourly sales using custGeneration()
  this.hourlySales = function() {
    var customers = this.custGeneration();
    console.log(customers * this.avgDonuts + " donuts sold this hour");
    return customers * this.avgDonuts;
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

var downtown = new DonutShop(8, 43, 4.5);
var capitolHill = new DonutShop(4, 37, 2);
var southLakeUnion = new DonutShop(9, 23, 6.33);
var wedgewood = new DonutShop(2, 28, 1.25);
var ballard = new DonutShop(8, 56, 3.75);
