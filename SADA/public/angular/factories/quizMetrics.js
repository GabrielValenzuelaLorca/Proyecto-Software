/**
 * Created by rodri on 11-09-2016.
 */
(function () {

    angular
        .module('ngApp')
        .factory('quizMetrics',QuizMetrics);

    function QuizMetrics() {
        var quizObj ={
            encuestaActiva : false,
            changeState:changeState
        };

        return quizObj;

        function changeState(state) {
            quizObj.encuestaActiva = state;
        }
    }

})();
