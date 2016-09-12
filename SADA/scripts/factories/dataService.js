/**
 * Created by rodri on 11-09-2016.
 */
(function () {

    angular
        .module('ngEncuesta')
        .factory("DataService",DataFactory);
    
    function DataFactory() {
        var dataObj = {
            Preguntas:Preguntas
        };

        return dataObj;
    }

    var Preguntas = [
            {//P1
                pregunta:'Pregunta 1',
                respuestas:[
                    {
                        answer: '1uno'
                    },
                    {
                        answer: '1dos'
                    },
                    {
                        answer: '1tres'
                    },
                    {
                        answer:'1cuatro'
                    }
                ],
                selected:null,
                correct:null
            },
            {//P2
                pregunta:'Pregunta 2',
                respuestas:[
                    {
                        answer: '2uno'
                    },
                    {
                        answer: '2dos'
                    },
                    {
                        answer: '2tres'
                    },
                    {
                        answer:'2cuatro'
                    }
                ],
                selected:null,
                correct:null
            },
        {//P3
            pregunta:'Pregunta 3',
            respuestas:[
                {
                    answer: '3uno'
                },
                {
                    answer: '3dos'
                },
                {
                    answer: '3tres'
                },
                {
                    answer:'3cuatro'
                }
            ],
            selected:null,
            correct:null
        }
        ];
})();