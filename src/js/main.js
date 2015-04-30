//Use CommonJS style via browserify to load other modules
require("./lib/social");
require("./lib/ads");
require("angular");

var app = angular.module("teacher-pay", []);

var barMeasures = ["yr1-ba", "yr8-ba90", "yr15-ma45"];
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

var seattle = salaryData.filter(function(district) { return district.title == "Seattle" })[0];

app.controller("SalaryController", ["$scope", function($scope) {
  $scope.districts = salaryData.map(function(district) {
    barMeasures.forEach(function(point) {
      if (district[point+"-sum"]) {
        district[point+"-bar"] = district[point+"-sum"] / max * 100;
      }
    })
    return district;
  });

  $scope.payPoint = "yr8-ba90";

  $scope.featuredDistrict = seattle;

  $scope.setDistrict = function(district) {
    $scope.featuredDistrict = district;
  };
}]);