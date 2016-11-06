var cols = 'Testing';

(function(){

    angular.module("ngApp").controller("ngRamos", ramosController);

    function ramosController($window){
        this.cols = $window.cols;
        this.print = 'Hola mundo'
    }

})();
