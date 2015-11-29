//DonutShop Object
function DonutShop(shopName, minCust, maxCust, avgDonuts) {
  this.shopName = shopName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgDonuts = avgDonuts;
  this.donuts = [];
  }

//returns random customers between min and max
DonutShop.prototype.custGeneration = function() {
  var customers = Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  return customers;
};

//calculates hourly sales using custGeneration()
DonutShop.prototype.hourlySales = function() {
  var customers = this.custGeneration();
  var hourlyDonuts = (customers * this.avgDonuts);
  return hourlyDonuts;
};


//returns total sales
DonutShop.prototype.dailySales = function() {
  return this.donuts.reduce(function(total, num){
    return Number(total) + Number(num);
  });
};

//Clears total sales
DonutShop.prototype.clearSales = function() {
  this.donuts = [];
};


// Initializes array of existing donut shops
var allShops = [];

function initialTable(){
  var downtown = new DonutShop("Downtown", 8, 43, 4.5);
  var capitolHill = new DonutShop("Capitol Hill", 4, 37, 2);
  var southLakeUnion = new DonutShop("South Lake Union", 9, 23, 6.33);
  var wedgewood = new DonutShop("Wedgewood", 2, 28, 1.25);
  var ballard = new DonutShop("Ballard", 8, 56, 3.75);
  allShops = [downtown, capitolHill, southLakeUnion, wedgewood, ballard];
  buildTable();
}

// Calculates and append sales data to table
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
        shop.donuts.push(sales.toFixed(1))
        salesTest.textContent = sales.toFixed(1);

        newRow.appendChild(salesTest);
      }
    table.appendChild(newRow);

    // prints total sales for location
    var salesTotal = document.createElement("td");
    salesTotal.textContent = shop.dailySales().toFixed(1);

    newRow.appendChild(salesTotal);
    table.appendChild(newRow);
  });
  if (chart) {
    chart.destroy();
  }
  chart = buildGraph();
}


//--- event Listening ---

// Rebuilds the page, recalculating sales
var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', buildTable);

var rebuildButton = document.getElementById('rebuild');
rebuildButton.addEventListener('click', initialTable);

// Adds a user-inputted location, rebuilds the page
var submitButton = document.getElementById('newLocation');
submitButton.addEventListener('submit', function(event){

    event.preventDefault();
    var newName = event.target.locationName.value;
    var newMinCust = Number(event.target.minCust.value);
    var newMaxCust = Number(event.target.maxCust.value);
    var newAvgDonuts = Number(event.target.avgDonuts.value);

    var newStore = new DonutShop(newName, newMinCust, newMaxCust, newAvgDonuts);
    event.target.locationName.value = "";
    event.target.minCust.value = "";
    event.target.maxCust.value = "";
    event.target.avgDonuts.value = "";

    allShops.push(newStore);
    buildTable();

});


// initial table build on page load
initialTable();
