var document = { 'createElementNS': function() { return {} }};
var window = this;
importScripts('../../scripts/pdfmake.min.js', '../../scripts/vfs_fonts.js');
importScripts('../logos.js');

/**
 * use strict
 */
(function() {
    'use strict';

    onmessage = function(evt) {
        let data = JSON.parse(evt.data);
        pdf(data);
    }

    function pdf(data) {
        try {
            var dd = {
                header: {
                    margin: [18, 20, 0, 0],
                    columns: [
                        {
                            image: 'logoprincipal',
                            opacity: 0.5,
                            fit: [100, 100],
                            margin: [20, -5, 0, 0] // left, top, right, bottom
                        },
                        {
                            stack: [
                                'Dirección Técnica Académica \n Departamento de Gestión Académica',
                                { text: 'Cuestionario para la Detección de \n Necesidades de Capacitación', style: 'subheader'},
                            ],
                            style: 'header'
                        },
                        {
                            image: 'logochiapas',
                            opacity: 0.5,
                            fit: [100, 100],
                            style: 'sample'
                        }
                    ]
                },
                content: [
                    {
                        style: 'tableExample',
                        table: {
                            headerRows: 1,
                            widths: [170, 170, 170],
                            body: [
                                [{text: '', style: 'tableHeader'}, {text: '', style: 'tableHeader'}, {text: '', style: 'tableHeader'}],
                                ['', '', '']
                            ]
                        },
                        layout: 'headerLineOnly'
                    },
                    {
                        style: 'tableDates',
                        table: {
                            widths: [140, 100, 80],
                            body: [
                                [
                                    {
                                        text: 'Sector Social',
                                        fillColor: '#eeeeee',
                                        border: [false, false, false, false], // left, top, left, bottom
                                        fontSize: 9
                                    },
                                    {
                                        text: 'Fecha de Elaboración: ',
                                        border: [false, false, false, false], // left, top, left, bottom
                                        fontSize: 9
                                    },
                                    {
                                        text: formatDate(new Date()),
                                        border: [false, false, false, true], // left, top, left, bottom
                                        fontSize: 9
                                    }
                                ],
                                [
                                    {
                                        text: '',
                                        border: [false, false, false, false], // left, top, left, bottom
                                        fontSize: 9
                                    },
                                    {
                                        text: 'Unidad de Capacitación: ',
                                        border: [false, false, false, false], // left, top, left, bottom
                                        fontSize: 9
                                    },
                                    {
                                        text: '',
                                        border: [false, false, false, true], // left, top, left, bottom
                                    }
                                ],
                                [
                                    {
                                        text: '',
                                        border: [false, false, false, false], // left, top, left, bottom
                                        fontSize: 9
                                    },
                                    {
                                        text: 'Acción Móvil: ',
                                        border: [false, false, false, false], // left, top, left, bottom
                                        fontSize: 9
                                    },
                                    {
                                        text: '',
                                        border: [false, false, false, true], // left, top, left, bottom
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        style: 'tableData',
                        color: '#444',
                        table: {
                            heights: 35,
                            widths: [220, 220],
                            body: [
                                [
                                    {
                                        text: 'Nombre:\n' + data.detalle.institucion,
                                        colSpan: 2,
                                        fontSize: 10
                                    },
                                    {

                                    }
                                ],
                                [
                                    {
                                        text: 'Dirección: \n' + data.detalle.direccion,
                                        fontSize: 10
                                    },
                                    {
                                        text: 'Municipio: \n\n',
                                        fontSize: 10
                                    }
                                ],
                                [
                                    {
                                        text: 'Colonia: \n' + data.detalle.direccion,
                                        fontSize: 10
                                    },
                                    {
                                        text: 'Teléfono: \n' + data.detalle.telefonoEnlace,
                                        fontSize: 10
                                    }
                                ],
                                [
                                    {
                                        text: 'Correo electrónico: \n' + data.detalle.correoEnlace,
                                        fontSize: 10
                                    },
                                    {
                                        text: 'Edad: \n\n',
                                        fontSize: 10
                                    }
                                ]
                            ]
                        },
                        hLineWidth: function (i, node) {
                            return (i === 0 || i === node.table.body.length) ? 2 : 1;
                        },
                        vLineWidth: function (i, node) {
                            return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                        }
                    },
                    {
                        text: [
                            'Objetivo: Detectar necesidades de Capacitación a través de un cuestionario, que permita recabar \n',
                            'información confiable y verídica, para identificar al personal que será capacitado. \n',
                        ],
                        style: 'objetivoclass'
                    },
                    {
                        text: '1. ¿Dígame por favor usted ha recibido algún curso de capacitación para desempeñar algún trabajo?',
                        style: 'questions'
                    },
                    {
                        style: 'tableanswers',
                        table: {
                            heights: 35,
                            widths: [440],
                            body: [
                                [
                                    {
                                        text: '',
                                        border: [false, false, false, false], // left, top, left, bottom
                                        fontSize: 9,
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        text: '2. ¿Cuando fue la última vez que recibió un curso?',
                        style: 'questions'
                    },
                    {
                        style: 'tableanswers',
                        table: {
                            heights: 35,
                            widths: [440],
                            body: [
                                [
                                    {
                                        text: '',
                                        border: [false, false, false, false], // left, top, left, bottom
                                        fontSize: 9,
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        text: '3. ¿Qué cursos ha recibido?',
                        style: 'questions'
                    },
                    {
                       style: 'tableanswers',
                       table: {
                           heights: 35,
                           widths: [440],
                           body: [
                               [
                                   {
                                       text: '',
                                       border: [false, false, false, false], // left, top, left, bottom
                                       fontSize: 9,
                                   }
                               ]
                           ]
                       }
                    },
                    {
                        text: '4. ¿Cuál fuel el último curso que recibieron y qué tema?',
                        style: 'questions'
                    },
                    {
                        style: 'tableanswers',
                        table: {
                            heights: 35,
                            widths: [200, 40, 200],
                            body: [
                                {
                                    text: 'Curso: ',
                                    border: [false, false, false, true], // left, top, left, bottom
                                    fontSize: 9,
                                },
                                {
                                    text: '',
                                    border: [false, false, false, false], // left, top, left, bottom
                                    fontSize: 9,
                                },
                                {
                                    text: 'Tema: ',
                                    border: [false, false, false, true], // left, top, left, bottom
                                    fontSize: 9,
                                }
                            ]
                        }
                    },
                    {
                        text: '¿Qué tan de acuerdo está usted con la siguiente afirmación? el último curso me dio	los resultados esperados.',
                        style: 'questions'
                    },
                    {
                        style: 'tableanswers',
                        table: {
                            heights: 35,
                            widths: [440],
                            body: [
                                [
                                    {
                                        text: '',
                                        border: [false, false, false, false], // left, top, left, bottom
                                        fontSize: 9,
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        text: '¿En qué cursos está usted interesado actualmente',
                        style: 'questions',
                    },
                    {
                        style: 'tableanswers',
                        table: {
                            heights: 35,
                            widths: [440],
                            body: [
                                [
                                    {
                                        text: '',
                                        border: [false, false, false, false], // left, top, left, bottom
                                        fontSize: 9,
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        text: '¿Por qué?',
                        style: 'questions',
                    },
                    {
                        style: 'tableanswers',
                        table: {
                            heights: 35,
                            widths: [440],
                            body: [
                                [
                                    {
                                        text: '',
                                        border: [false, false, false, false], // left, top, left, bottom
                                        fontSize: 9,
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        text: '7. ¿De cuántas horas al día dispone para capacitarse y en que horario?',
                        style: 'questions',
                    },
                    {
                        style: 'tableanswers',
                        table: {
                            heights: 35,
                            widths: [200, 40, 200],
                            body: [
                                [
                                    {
                                        text: 'Horas: ',
                                        border: [false, false, false, true], // left, top, left, bottom
                                        fontSize: 9,
                                    },
                                    {
                                        text: '',
                                        border: [false, false, false, false], // left, top, left, bottom
                                        fontSize: 9,
                                    },
                                    {
                                        text: 'Horario: ',
                                        border: [false, false, false, true], // left, top, left, bottom
                                        fontSize: 9,
                                    }
                                ]
                            ]
                        }
                    }
                ],
                pageSize: 'A4',
                compress: true,
                pageOrientation: 'portrait',
                pageMargins: [40, 80, 40, 40],
                footer: function(currentPage, pageCount) {
                    return { style: 'piePagina', text: 'Página ' + currentPage.toString() + ' de ' + pageCount, alignment: 'center', image: 'footerlogo' };
                },
                styles: {
                    header: {
                        fontSize: 9,
                        bold: true,
                        alignment: 'center',
                        margin: [-5, 15, 10, 0]
                    },
                    sample: {
                        alignment: 'right',
                        margin: [0, 15, 10, 0], // r,t,l,b
                    },
                    tableExample: {
                        margin: [0, 10, 0, 15] //right,top,left,bottom
                    },
                    tableDates: {
                        margin: [170, -12, 10, 0], // margen left, top, right, bottom
                    },
                    tableData: {
                        margin: [25, 25, 10, 0],// margen left, top, right, bottom
                    },
                    objetivoclass: {
                        margin: [25, 15, 9, 0],// margen left, top, right, bottom
                        fontSize: 10
                    },
                    questions: {
                        margin: [25, 10, 9, 0],// margen left, top, right, bottom
                        fontSize: 10
                    },
                    tableanswers: {
                        margin: [25, 10, 9, 0],// margen left, top, right, bottom
                        fontSize: 10
                    },
                    answers: {
                        margin: [25, 10, 9, 0],// margen left, top, right, bottom
                        fontSize: 10
                    }
                },
                images: {
                    logoprincipal: LOGOPRINCIPAL,
                    footerlogo: LOGOICATECH,
                    logochiapas: LOGOCHIAPAS,
                }
            }
            pdfMake.createPdf(dd).getBase64( function( base64 ) {
                postMessage( { fileName: 'DNC_Social.pdf', base64: base64 } );
            });
        } catch (error) {
            console.error(error);
            throw {error: error};
        }
    }

    // funcion obtener el tiempo
    function formatDate(date) {
        var monthNames = [
            "Enero", "Febrero", "Marzo",
            "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre",
            "Noviembre", "Diciembre"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }
})();
