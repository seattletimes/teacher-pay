//Use CommonJS style via browserify to load other modules
require("./lib/social");
require("./lib/ads");
require("angular");
require("component-responsive-frame/child");

var app = angular.module("teacher-pay", []);

require("./flip")(app); //mix in our directive

var barMeasures = ["low", "middle", "high"];
var max = 0;

salaryData.map(function(district) {
  barMeasures.forEach(function(point) {
    if (district["base-"+point] && district["tri-"+point]) {
      district["fte-students"] = district["fte-students"] * 1;
      district["fte-teachers"] = district["fte-teachers"] * 1;
      district["base-"+point] = district["base-"+point] * 1;
      district["tri-"+point] = district["tri-"+point] * 1;
      district["sum-"+point] = district["sum-"+point] * 1;

      if (district["sum-"+point] > max) { max = district["sum-"+point] }
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
  $scope.payPoint = "middle";
  $scope.featuredDistrict = seattle;
  $scope.dialogue = false;
  $scope.districts = salaryData;

  $scope.districts.sort(function(a,b) {
    return (b["sum-"+$scope.payPoint] * 1) - (a["sum-"+$scope.payPoint] * 1);
  });

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
}]);
