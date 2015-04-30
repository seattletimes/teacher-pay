//Use CommonJS style via browserify to load other modules
require("./lib/social");
require("./lib/ads");
require("angular");

var app = angular.module("teacher-pay", []);

var seattle = salaryData.filter(function(district) { return district.title == "Seattle" });
var barMeasures = ["yr1-ba", "yr8-ba90", "yr15-ma45"];

app.controller("SalaryController", ["$scope", function($scope) {
  $scope.districts = salaryData.map(function(district) {
    barMeasures.forEach(function(point) {
      if (district["base-"+point] && district["tri-"+point]) {
        district["base-"+point] = district["base-"+point] * 1;
        district["tri-"+point] = district["tri-"+point] * 1;
        var sum = (district["base-"+point] + district["tri-"+point]);

        district[point+"-bar"] = sum / 1000;
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