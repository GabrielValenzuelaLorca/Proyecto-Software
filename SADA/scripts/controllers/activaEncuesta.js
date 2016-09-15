(function(){

    angular
        .module("ngEncuesta")
        .controller("testCtrl", ListController);

    ListController.$inject = ['quizMetrics'];

    function ListController(quizMetrics){

        this.quizMetrics = quizMetrics;
        this.Data = "Probando Angular";
        this.activarEncuesta = activarEncuesta;


        function activarEncuesta() {
            quizMetrics.changeState(true);
        }
    }

    //variables...


})();