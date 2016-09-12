/**
 * Created by rodri on 11-09-2016.
 */
(function () {

    angular
        .module('ngEncuesta')
        .controller('quizCtrl',QuizController);

    QuizController.$inject = ['quizMetrics','DataService'];

    function QuizController(quizMetrics,DataService) {

        this.quizMetrics = quizMetrics;
        this.DataService=DataService;
        this.setActiveQuestion=setActiveQuestion;
        this.selectAnswer=selectAnswer;
        this.Respondido = Respondido;
        this.finaliseAnswers = finaliseAnswers;

        this.activeQuestion = 0;
        this.error = false;
        this.finalise = false;

        var numResp = 0;

        function setActiveQuestion(index) {
            if(index == undefined){
                var breakOut = false;
                var quizLen = DataService.Preguntas.length-1;

                while(!breakOut){
                    this.activeQuestion = this.activeQuestion < quizLen ? ++this.activeQuestion:0;

                    if(this.activeQuestion == 0){
                        this.error = true;
                    }

                    if(DataService.Preguntas[this.activeQuestion].selected == null){
                        breakOut=true;
                    }
                }
            }
            else{
                this.activeQuestion = index;
            }

        }
        
        function Respondido() {

            var quizLen = DataService.Preguntas.length;

            if(DataService.Preguntas[this.activeQuestion].selected !== null){
                numResp++;
                if(numResp>=quizLen){
                    //Terminar quiz
                    for(var i = 0;i<quizLen;i++){
                        if(DataService.Preguntas[i].selected == null){
                            setActiveQuestion(i);
                            return;
                        }
                    }
                    this.error=false;
                    this.finalise=true;
                    return;
                }
            }
            this.setActiveQuestion();
        } 
        
        function selectAnswer(index) {
            DataService.Preguntas[this.activeQuestion].selected = index;
        }
        
        function finaliseAnswers() {
            /*this.finalise = false;
            numResp = 0;
            this.activeQuestion = 0;*/
        }
        
    }
    
})();
