var document = { 'createElementNS': function() { return {} }};
var window = this;
importScripts('../../scripts/pdfmake.min.js', '../../scripts/vfs_fonts.js');
importScripts('../logos.js');

(function(){
  'use strict';

  onmessage = function(evt) {
    let data = JSON.parse(evt.data);
    pdf();
  }

  function pdf() {
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
                {text: 'Cuestionario para la Detección de \n Necesidades de Capacitación', style: 'subheader'},
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
                    text: 'Sector Empresarial/Gubernamental',
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
                    text: 'Nombre de la Empresa:\n\n',
                    colSpan: 2,
                    fontSize: 10
                  },
                  {
                  }
                ],
                [
                  {
                    text: 'Dirección: \n\n',
                    fontSize: 10
                  },
                  {
                    text: 'Teléfono: \n\n',
                    fontSize: 10
                  }
                ],
                [
                  {
                    text: 'Correo Electrónico: \n\n',
                    fontSize: 10
                  },
                  {
                    text: 'Número de Empleados: \n\n',
                    fontSize: 10
                  }
                ],
                [
                  {
                    text: 'Nombre del responsable área de capacitaión: \n\n',
                    fontSize: 10
                  },
                  {
                    text: 'Puesto: \n\n',
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
            text: '1. ¿Los empleados reciben curso de inducción a la empresa y al puesto de trabajo a desempeñar?',
            style: 'questions'
          },
          {
            color: 'blue',
            markerColor: 'red',
            style: 'answers',
            ol: [
              'Si',
              'No',
            ]
          },
          {
            text: '2. ¿La empresa maneja un plan anual de capacitación?',
            style: 'questions'
          },
          {
            color: 'blue',
            markerColor: 'red',
            style: 'answers',
            ol: [
              'Si',
              'No',
            ]
          },
          {
            text: '3. ¿Cuándo fue la última vez que su capital humano fue capacitado mediante un curso?',
            style: 'questions'
          },
          {
            color: 'blue',
            markerColor: 'red',
            style: 'answers',
            ol: [
              'Hace más de 1 año.',
              'Hace menos de 1 año.',
              'Hace no más de 6 meses.',
              'No ha recibido.'
            ]
          },
          {
            text: '4. ¿Qué cursos ha tomado su capital humano?',
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
            text: '5. ¿Cuál fue el último curso que recibieron y qué tema?',
            style: 'questions'
          },
          {
            style: 'tableanswers',
            table: {
              heights: 35,
              widths: [200, 40, 200],
              body: [
                [
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
              ]
            }
          },
          {
            text: '6. Qué tan de acuerdo está usted con la siguiente afirmación? el último curso nos dio los resultados esperados',
            style: 'questions',
            pageBreak: 'before'
          },
          {
            color: 'blue',
            markerColor: 'red',
            style: 'answers',
            ol: [
              'Completamente de acuerdo',
              'De acuerdo',
              'En desacuerdo',
              'Completamente en desacuerdo'
            ]
          },
          {
            text: '7. ¿En qué cursos está usted interesado actualmente?',
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
            text: '7.1 ¿Por qué?',
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
            text: '8 ¿De cuántas horas al día dispone para capacitación de su capital humano y en que horario?',
            style: 'questions'
          },
          {
            style: 'tableanswers',
            table: {
              heights: 35,
              widths: [100, 40, 100],
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
          },
          {
            text: '9  ¿En relación último grado de estudios de su capital humano, dígame por favor que porcentaje cuenta con? (mencionar cada nivel de estudios)',
            style: 'questions'
          },
          {
            style: 'tableanswers',
            table: {
              heights: 35,
              widths: [70,8,70,8,70,8,70,8,70],
              body: [
                [
                  {
                    text: 'Primaria: %',
                    border: [false, false, false, true], // left, top, left, bottom
                    fontSize: 8,
                  },
                  {
                    text: '',
                    border: [false, false, false, false], // left, top, left, bottom
                    fontSize: 8,
                  },
                  {
                    text: 'Secundaria: %',
                    border: [false, false, false, true], // left, top, left, bottom
                    fontSize: 8,
                  },
                  {
                    text: '',
                    border: [false, false, false, false], // left, top, left, bottom
                    fontSize: 8,
                  },
                  {
                    text: 'Bachillerato: %',
                    border: [false, false, false, true], // left, top, left, bottom
                    fontSize: 8,
                  },
                  {
                    text: '',
                    border: [false, false, false, false], // left, top, left, bottom
                    fontSize: 8,
                  },
                  {
                    text: 'Licenciatura: %',
                    border: [false, false, false, true], // left, top, left, bottom
                    fontSize: 8,
                  },
                  {
                    text: '',
                    border: [false, false, false, false], // left, top, left, bottom
                    fontSize: 8,
                  },
                  {
                    text: 'Posgrado: %',
                    border: [false, false, false, true], // left, top, left, bottom
                    fontSize: 8,
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
          headerimg: {
            alignment: 'left',
            margin: [0, 5, 0, 30], // r,t,l,b
            opacity: 1.0
          },
          subheaderimg: {
            alignment: 'right',
            margin: [0, 5, 0, 30],
            opacity: 1.0
          },
          subheader: {
            fontSize:8,
            bold: true,
            alignment: 'center',
          },
          loationanddate: {
            alignment: 'right',
            fontSize: 14
          },
          present: {
            alignment: 'left',
            bold: true,
            fontSize: 16
          },
          vinculadores: {
            alignment: 'right',
            bold:true,
          },
          contentText: {
            fontSize: 12,
            margin: [0, 12],
            alignment: 'justified'
          },
          piePagina: {
            fontSize: 6,
            italics: true,
            bold: false
          },
          tableExample: {
			    margin: [0, 10, 0, 15] //right,top,left,bottom
		      },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
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
          answers: {
            margin: [25, 10, 9, 0],// margen left, top, right, bottom
            fontSize: 10
          },
          tableanswers: {
            margin: [25, 10, 9, 0],// margen left, top, right, bottom
            fontSize: 10
          },
          sample: {
            alignment: 'right',
            margin: [0, 15, 10, 0], // r,t,l,b
          },
          header: {
            fontSize: 9,
            bold: true,
            alignment: 'center',
            margin: [-5, 15, 10, 0]
          },
        },
        images: {
          logoprincipal: LOGOPRINCIPAL,
          footerlogo: LOGOICATECH,
          logochiapas: LOGOCHIAPAS,
        }
      }

      pdfMake.createPdf( dd ).getBase64( function( base64 ) {
        postMessage( { fileName: 'DNC_Empresarial_y_Gubernamental.pdf', base64: base64 } );
      });
    } catch (e) {
      console.error(e);
      throw {error: e};
    }
  }

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
