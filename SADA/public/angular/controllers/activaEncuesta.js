(function(){

    angular.module("ngApp").controller("testCtrl", ListController);

    ListController.$inject = ['quizMetrics'];

    function ListController(quizMetrics){

        this.quizMetrics = quizMetrics;
        this.activarEncuesta = activarEncuesta;

        function activarEncuesta(param) {
            quizMetrics.changeState(param);
        }
    }

})();
