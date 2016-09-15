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
        this.result = 0;


        function setActiveQuestion(index) {
            if(index == undefined){
                var breakOut = false;
                var quizLen = DataService.Preguntas.length-1;

                while(!breakOut){
                    this.activeQuestion = this.activeQuestion < quizLen ? ++this.activeQuestion:0;

                    if(this.activeQuestion == 0){
                        this.error = true;
                    }

                    for(var i in DataService.Preguntas[this.activeQuestion].selected) {
                        if(DataService.Preguntas[this.activeQuestion].selected[i]==null){
                            breakOut = true;
                        }
                    }
                }
            }
            else{
                this.activeQuestion = index;
            }
            this.print = "numresp: "+numResp + " / active: "+this.activeQuestion;
        }


        //Con parametro es por barra de progreso, sin parametro es por botón continuar
        function Respondido(param) {
            var quizLen = DataService.Preguntas.length;
            var notyet = false;

            //verifica si se respondieron las 4 alternativas de 1 pregunta
            for(var k in DataService.Preguntas[this.activeQuestion].selected ){
                if(DataService.Preguntas[this.activeQuestion].selected[k]==null){
                    notyet=true;
                }
            }

            if(notyet){
                if(DataService.Preguntas[this.activeQuestion].ok!=null){
                    DataService.Preguntas[this.activeQuestion].ok=null;
                    numResp--;
                }
            }

            //Si notyet es true, significa que no están respondidas las 4 preguntas aún.
            if (!notyet) {
                if(DataService.Preguntas[this.activeQuestion].ok==null){
                    DataService.Preguntas[this.activeQuestion].ok=1;
                    numResp++;
                }

                if (numResp >= quizLen && param==undefined) {//Solo se puede terminar apretando "Continuar"
                    //Terminar quiz
                    for (var i = 0; i < quizLen; i++) {
                        for (var j = 0; j < 4; j++) {
                            if (DataService.Preguntas[i].selected[j] == null) {
                                setActiveQuestion(i);
                                return;
                            }
                        }
                    }
                    this.error = false;
                    this.finalise = true;
                    return;
                }
            }


            if(param == undefined){
                this.setActiveQuestion();
            }else{
                this.setActiveQuestion(param);
            }
        } 
        
        function selectAnswer(index,val) {
            if(DataService.Preguntas[this.activeQuestion].selected[index] == val){
                DataService.Preguntas[this.activeQuestion].selected[index] = null;
            }else {
                DataService.Preguntas[this.activeQuestion].selected[index] = val;
            }
        }
        
        function finaliseAnswers() {//Hace el cálculo correspondiente para asignar perfil
            var quizLen = DataService.Preguntas.length;
            var CA = 0;
            var EC = 0;
            var EA = 0;
            var OR = 0;

            for(var i=0;i<quizLen;i++){
                for(var j=0;j<4;j++){
                    if(j==0){//EC
                        EC+=DataService.Preguntas[i].selected[j];
                    }
                    else if(j==1){//OR
                        OR+=DataService.Preguntas[i].selected[j];
                    }
                    else if(j==2){//CA
                        CA+=DataService.Preguntas[i].selected[j];
                    }
                    else{//EA
                        EA+=DataService.Preguntas[i].selected[j];
                    }
                }
            }
            //CA - 2
            //EC - 0

            //EA - 3
            //OR - 1

            var CA_EC = CA-EC;
            var EA_OR = EA-OR;

            if(CA_EC<=3){//Adaptador o divergente
                if(EA_OR<=5){
                    //Divergente
                    this.result=2;
                }
                else{
                    //Adaptador
                    this.result=1;
                }
            }
            else{//Convergente o asimilador
                if(EA_OR<=5){
                    //Asimilador
                    this.result=4;
                }
                else{
                    //Convergente
                    this.result=3;
                }
            }
        }
    }
})();
