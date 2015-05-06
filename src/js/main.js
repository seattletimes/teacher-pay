//Use CommonJS style via browserify to load other modules
require("./lib/social");
require("./lib/ads");
require("angular");

var app = angular.module("teacher-pay", []);

require("./flip")(app); //mix in our directive

var barMeasures = ["low", "middle", "high"];
var max = 0;

salaryData.map(function(district) {
  barMeasures.forEach(function(point) {
    if (district["base-"+point] && district["tri-"+point]) {
      district["base-"+point] = district["base-"+point] * 1;
      district["tri-"+point] = district["tri-"+point] * 1;
      district[point+"-sum"] = (district["base-"+point] + district["tri-"+point]);

      if (district[point+"-sum"] > max) { max = district[point+"-sum"] }
    }
  })
  return district;
});
salaryData.map(function(district) {
  barMeasures.forEach(function(point) {
    if (district["base-"+point] && district["tri-"+point]) {
      district["base-"+point+"-bar"] = district["base-"+point] / max * 100;
      district["tri-"+point+"-bar"] = district["tri-"+point] / max * 100;
    }
  })
  return district;
});

var seattle = salaryData.filter(function(district) { return district.title == "Seattle" })[0];

app.controller("SalaryController", ["$scope", "$timeout", function($scope, $timeout) {
  $scope.payPoint = "high";
  $scope.featuredDistrict = seattle;
  $scope.dialogue = false;
  $scope.districts = salaryData;
  $scope.ordering = "sum-high";

  // $scope.sortDistricts = function() {
    $scope.districts.sort(function(a,b) {
      return (b["sum-"+$scope.payPoint] * 1) - (a["sum-"+$scope.payPoint] * 1);
    });
  // };

  $scope.setDistrict = function(district) {
    $scope.featuredDistrict = district;
    $scope.dialogue = true;
  };

  $scope.ordering = function(item) {
    return -item["sum-" + $scope.payPoint];
  }

  $scope.setPayPoint = function(point) {
    $scope.payPoint = point;
  };

  // $scope.sortDistricts();
}]);
