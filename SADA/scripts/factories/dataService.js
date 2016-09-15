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
                pregunta:'Cuando aprendo...',
                respuestas:[
                    {
                        answer: "...me gusta vivir sensaciones"
                    },
                    {
                        answer: "...me gusta pensar sobre ideas"
                    },
                    {
                        answer: "...me gusta estar haciendo cosas"
                    },
                    {
                        answer: "...me gusta observar y escuchar"
                    }
                ],
                selected:[null,null,null,null],
                ok:null
            },
            {//P2
                pregunta:'Pregunta 2',
                respuestas:[
                    {
                        answer: 2
                    },
                    {
                        answer: 2
                    },
                    {
                        answer: 2
                    },
                    {
                        answer: 2
                    }
                ],
                selected:[null,null,null,null],
                ok:null
            },
        {//P3
            pregunta:'Pregunta 3',
            respuestas:[
                {
                    answer: 3
                },
                {
                    answer: 3
                },
                {
                    answer: 3
                },
                {
                    answer: 3
                }
            ],
            selected:[null,null,null,null],
            ok:null
        }
        ];
})();