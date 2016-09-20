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
                pregunta:'Aprendo mejor cuando...',
                respuestas:[
                    {
                        answer: "...escucho y observo cuidadosamente"
                    },
                    {
                        answer: "...confío en el pensamiento lógico"
                    },
                    {
                        answer: "...confío en mi intuición y sentimientos"
                    },
                    {
                        answer: "...trabajo duro para lograr hacer las cosas"
                    }
                ],
                selected:[null,null,null,null],
                ok:null
            },
        {//P3
            pregunta:'Cuando estoy aprendiendo...',
            respuestas:[
                {
                    answer: "...tiendo a usar el razonamiento"
                },
                {
                    answer: "...soy responsable con lo que hago"
                },
                {
                    answer: "...soy callado y reservado"
                },
                {
                    answer: "...tengo fuertes sensaciones y reacciones"
                }
            ],
            selected:[null,null,null,null],
            ok:null
        },
        {//P4
            pregunta:'Yo aprendo...',
            respuestas:[
                {
                    answer: "...sintiendo"
                },
                {
                    answer: "...haciendo"
                },
                {
                    answer: "...observando"
                },
                {
                    answer: "...pensando"
                }
            ],
            selected:[null,null,null,null],
            ok:null
        },
        {//P5
            pregunta:'Cuando aprendo...',
            respuestas:[
                {
                    answer: "...estoy abierto a nuevas experiencias"
                },
                {
                    answer: "...observo todos los aspectos del asunto"
                },
                {
                    answer: "...me gusta analizar las cosas, descomponerlas en sus partes"
                },
                {
                    answer: "...me gusta probar e intentar hacer las cosas"
                }
            ],
            selected:[null,null,null,null],
            ok:null
        },
        {//P6
            pregunta:'Cuando estoy aprendiendo...',
            respuestas:[
                {
                    answer: "...soy una persona observadora"
                },
                {
                    answer: "...soy una persona activa"
                },
                {
                    answer: "...soy una persona intuitiva"
                },
                {
                    answer: "...soy una persona lógica"
                }
            ],
            selected:[null,null,null,null],
            ok:null
        },
        {//P7
            pregunta:'Yo aprendo mejor de...',
            respuestas:[
                {
                    answer: "...la observación"
                },
                {
                    answer: "...la relación con otras personas"
                },
                {
                    answer: "...las teorías racionales"
                },
                {
                    answer: "...la oportunidad de probar y practicar"
                }
            ],
            selected:[null,null,null,null],
            ok:null
        },
        {//P8
            pregunta:'Cuando aprendo...',
            respuestas:[
                {
                    answer: "...me gusta ver los resultados de mi trabajo"
                },
                {
                    answer: "...me gustan las ideas y las teorías"
                },
                {
                    answer: "...me tomo mi tiempo antes de actuar"
                },
                {
                    answer: "...me siento personalmente involucrado en las cosas"
                }
            ],
            selected:[null,null,null,null],
            ok:null
        },
        {//P9
            pregunta:'Aprendo mejor cuando...',
            respuestas:[
                {
                    answer: "...confío en mis observaciones"
                },
                {
                    answer: "...confío en mis sentimientos"
                },
                {
                    answer: "...puedo probar por mi cuenta"
                },
                {
                    answer: "...confío en mis ideas"
                }
            ],
            selected:[null,null,null,null],
            ok:null
        },
        {//P10
            pregunta:'Cuando estoy aprendiendo...',
            respuestas:[
                {
                    answer: "...soy una persona reservada"
                },
                {
                    answer: "...soy una persona receptiva"
                },
                {
                    answer: "...soy una persona responsable"
                },
                {
                    answer: "...soy una persona racional"
                }
            ],
            selected:[null,null,null,null],
            ok:null
        },
        {//P11
            pregunta:'Cuando aprendo...',
            respuestas:[
                {
                    answer: "...me involucro"
                },
                {
                    answer: "...me gusta observar"
                },
                {
                    answer: "...evalúo las cosas"
                },
                {
                    answer: "...me gusta ser activo"
                }
            ],
            selected:[null,null,null,null],
            ok:null
        },
        {//P12
            pregunta:'Aprendo mejor cuando...',
            respuestas:[
                {
                    answer: "...analizo ideas"
                },
                {
                    answer: "...soy receptivo y abierto"
                },
                {
                    answer: "...soy cuidadoso"
                },
                {
                    answer: "...soy práctico"
                }
            ],
            selected:[null,null,null,null],
            ok:null
        }
        ];
})();
