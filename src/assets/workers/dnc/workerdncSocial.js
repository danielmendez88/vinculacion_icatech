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
              body :
              [
                [
                  {
                    text: 'Nombre:\n\n',
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
                    text: 'Municipio: \n\n',
                    fontSize: 10
                  }
                ],
                [
                  {
                    text: 'Colonia: \n\n',
                    fontSize: 10
                  },
                  {
                    text: 'Teléfono: \n\n',
                    fontSize: 10
                  }
                ],
                [
                  {
                    text: 'Correo electrónico: \n\n',
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
            style: 'answers',
            text: ''
          },
          {
            text: '2. ¿Cuando fue la última vez que recibió un curso?',
            style: 'questions'
          },
          {
            style: 'answers',
            text: ''
          },
          {
            text: '3. ¿Qué cursos ha recibido?',
            style: 'questions'
          },
          {

          }
        ]
      }
    } catch (error) {
      console.error(error);
      throw {error: error};
    }
  }
})();
