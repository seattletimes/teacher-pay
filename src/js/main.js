//Use CommonJS style via browserify to load other modules
require("./lib/social");
require("./lib/ads");
require("angular");

var app = angular.module("teacher-pay", []);

var middle = "yr8-ba90";
var max = Math.max.apply(null, salaryData.map(function(district) {
  return district["sum-"+middle] ? district["sum-"+middle] * 1 : 0;
}));

salaryData.forEach(function(district) {
  if (district["base-"+middle] && district["tri-"+middle]) {
    district["base-"+middle+"-bar"] = district["base-"+middle] / max * 100;
    district["tri-"+middle+"-bar"] = district["tri-"+middle] / max * 100;
  }
});

var seattle = salaryData.filter(function(district) { return district.title == "Seattle" })[0];

app.controller("SalaryController", ["$scope", function($scope) {
  $scope.districts = salaryData.sort(function(a,b) {
    return (b["sum-"+middle] * 1) - (a["sum-"+middle] * 1);
  });

  $scope.featuredDistrict = seattle;

  $scope.dialogue = false;

  $scope.setDistrict = function(district) {
    $scope.featuredDistrict = district;
    $scope.dialogue = true;
  };
}]);
