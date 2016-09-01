var legalbase = angular.module('legalbase', ['ngMaterial']);

legalbase.controller('mainController', ['$scope', function ($scope) {


  $scope.pages = [{ title: 'One', elements: []}];
  $scope.types = ['input', 'textarea', 'radio-group', 'file-upload'];


  $scope.addPage = function (title) {
    $scope.pages.push({ title: title, elements: []});
  };

  $scope.removePage = function (tab) {
    var index = $scope.pages.indexOf(tab);
    $scope.pages.splice(index, 1);
  };

  $scope.addElement = function (page, type) {
    $scope.selectedType = undefined;
    page.elements.push({
      type: type
    });

  };

  $scope.removeElement = function (page, element) {
    var index = page.elements.indexOf(element);
    page.elements.splice(index, 1);
  };


  $scope.addOption = function (element, option) {
    element.values = element.values || [];
    var index =element.values.indexOf(option);
    if(index == -1){
      element.values.push(option);
    }
  };

  $scope.removeOption = function (element, option) {
    var index = element.values.indexOf(option);
    element.values.splice(index, 1);
  };

  $scope.export = function () {
    var yaml = {
      pages: [],
      elements: []
    };

    _.map($scope.pages, function(page){
      var elementsId = _.map(page.elements, function(element){
        element.id = 'element' + yaml.elements.length;
        yaml.elements.push(element);
        return element.id;
      })
      yaml.pages.push({
        title: page.title,
        elements: elementsId
      })
    });

    $('<a></a>', {
      "download": 'export.yaml',
      "id": 'exportTmp',
      "href": "data:text;charset=utf-8," + encodeURIComponent(jsyaml.dump(yaml))
    }).appendTo("body")[0].click();

    $('#exportTmp').remove();
  };

}])
