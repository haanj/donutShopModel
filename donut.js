//DonutShop Object
function DonutShop(shopName, minCust, maxCust, avgDonuts) {
  this.shopName = shopName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgDonuts = avgDonuts;
  this.donuts = [1, 2];
  this.hours = 11;
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


// clears sales and generates new sales
DonutShop.prototype.generateSales = function() {
  this.donuts = [];
  for (i = 1; i <= this.hours; i++){
    var sales = this.hourlySales();
    this.donuts.push(sales);
  }
}



// Initializes array of existing donut shops
var allShops = [];
var deletedShops = [];

// Generates Sales for allShops
function generateAllSales(){
    allShops.forEach(function(shop){
    shop.generateSales();
  });
}

function initialTable(){
  var original = localStorage.getItem('originalShops');
  if (original) {
    resetTable();
  } else {
      var downtown = new DonutShop("Downtown", 8, 43, 4.5);
      var capitolHill = new DonutShop("Capitol Hill", 4, 37, 2);
      var southLakeUnion = new DonutShop("South Lake Union", 9, 23, 6.33);
      var wedgewood = new DonutShop("Wedgewood", 2, 28, 1.25);
      var ballard = new DonutShop("Ballard", 8, 56, 3.75);
      allShops = [downtown, capitolHill, southLakeUnion, wedgewood, ballard];
      generateAllSales();
      buildTable();

      // save this to local
      var encoded = JSON.stringify(allShops);
      localStorage.setItem('originalShops', encoded);
    }
 }


function resetTable(){
  // pulls originalShops
  var data = localStorage.getItem('originalShops');
  var hydrated = JSON.parse(data);


  allShops = [];

  hydrated.forEach(function(shop){
    var newStore = new DonutShop(shop.shopName, shop.minCust, shop.maxCust, shop.avgDonuts);
    newStore.donuts = shop.donuts;
    allShops.push(newStore);
  })

  buildTable();
}

// Calculates and append sales data to table
function buildTable(){
  document.getElementById("shops").innerHTML = "";

  var counter = 0;
  allShops.forEach(function(shop){
    var table = document.getElementById("shops");
    var newRow = document.createElement("tr");


    // adds delete button
    var newTableData = document.createElement("td");
    newTableData.innerHTML = "<button class='deleteButton' id='del"+counter+"'>x</button>";
    newRow.appendChild(newTableData);
    counter++;

    // prints location title to table


    var name = document.createElement("td");
    name.textContent = shop.shopName;
    newRow.appendChild(name);

    // pulls and prints hourly sales
    shop.donuts.forEach(function(hour){
      var salesTest = document.createElement("td");
      var sales = hour.toFixed(1);
      salesTest.textContent = sales;
      newRow.appendChild(salesTest);
    })
      /*
      for (i = 0; i < 11; i++) {
        var salesTest = document.createElement("td");
        var sales = shop.hourlySales();
        shop.donuts.push(sales.toFixed(1))
        salesTest.textContent = sales.toFixed(1);

        newRow.appendChild(salesTest);
      }
      */
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
  addDeleteListeners();
}


//--- event Listening ---

// Rebuilds the page, recalculating sales
var recalcButton = document.getElementById('recalculate');
recalcButton.addEventListener('click', function(){
  generateAllSales();
  buildTable();
});

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetTable);

// Saves upon pressing button
var saveButton = document.getElementById('save');
saveButton.addEventListener('click', function(event){
  var encoded = JSON.stringify(allShops);
  localStorage.setItem('savedShops', encoded);
});

// Recalls upon pressing button
var recallButton = document.getElementById('recall');
recallButton.addEventListener('click', function(event){
  var data = localStorage.getItem('savedShops');
  var hydrated = JSON.parse(data);

  allShops = [];

  hydrated.forEach(function(shop){
    var newStore = new DonutShop(shop.shopName, shop.minCust, shop.maxCust, shop.avgDonuts);
    newStore.donuts = shop.donuts;
    allShops.push(newStore);
  })

  buildTable();
});


// Adds a user-inputted location, rebuilds the page
var submitButton = document.getElementById('newLocation');
submitButton.addEventListener('submit', function(event){

    event.preventDefault();
    var newName = event.target.locationName.value;
    var newMinCust = Number(event.target.minCust.value);
    var newMaxCust = Number(event.target.maxCust.value);
    var newAvgDonuts = Number(event.target.avgDonuts.value);

    var newStore = new DonutShop(newName, newMinCust, newMaxCust, newAvgDonuts);
    newStore.generateSales();
    event.target.locationName.value = "";
    event.target.minCust.value = "";
    event.target.maxCust.value = "";
    event.target.avgDonuts.value = "";

    allShops.push(newStore);

    buildTable();

});



// Deletes selected row
function addDeleteListeners() {
  var deleteButton = document.getElementsByClassName('deleteButton');
  for(var i=0;i<deleteButton.length;i++){
    deleteButton[i].addEventListener('click', function(){
      var button = Number(this.id.slice(3));
      deletedShops.push(allShops[button]);
      allShops.splice(button, 1);
      buildTable();
    });
  }
}

// initial table build on page load
initialTable();
buildTable();


