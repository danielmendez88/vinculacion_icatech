var document = { 'createElementNS': function() { return {} }};
var window = this;
importScripts('../../scripts/pdfmake.min.js', '../../scripts/vfs_fonts.js');
importScripts('../logos.js');

(function(){
  'use strict';

  onmessage = function(evt) {
    let data = JSON.parse(evt.data);
    pdf(data);
  }

  function pdf(data) {
    try {
      var dd = {
        header: {
          // margenes
          margin: [0, 20, 0, 0],
          columns: [
            {
              image: 'logoprincipal',
              opacity: 0.5,
              fit: [100, 100],
              margin: [40, -3, 0, 0], // left, top, right, bottom
            },
            {
              image: 'logochiapas',
              opacity: 0.5,
              fit: [100, 100],
              alignment: 'right',
              margin: [0, 20, 20, 0], // left, top, right, bottom
            }
          ]
        },
        content: [
          {
            stack: [
              'Unidad de Capacitación',
              {
                text: 'Oficio No. ICATECH/001/'
              },
              {
                text: 'Tuxtla Gutiérrez, Chis., ' + formatDate(new Date())
              }
            ],
            style: 'loationanddate',
          },
          {
            stack: [
              {
                text: 'PRESENTE:'
              }
            ],
            style: 'present',
            margin: [0, 10, 0, 15], // left, top, right, bottom
          },
          {
            stack: [
              { text: data.titular_agenda }
            ],
            style: 'vinculadores'
          },
          {
            text: [
              'Sirva la presente para envíarle un afectuoso saludo y éxito en sus actividades encomendadas.',
              'Me dirijo a usted con la finalidad de darle a conocer los diferentes cursos y capacitaciones que otorga',
              'el instituto de Capacitación y Vinculación Tecnología del Estado de Chiapas, ',
              'con el objetivo de ',
              'que conozca los beneficios que brinda el ICATECH, al finalizar ',
              'el curso se otorga una constancia con valor oficial, avaladas por la SEP y la STPS.\n\n\n',
              'No dudando de su amabilidad le reitero las gracias.\n\n',
              'Sin otro particular, reciba un cordial saludo.\n\n\n'
            ],
            style: 'contentText'
          },
          {
            stack: [
              { text: 'ATENTAMENTE:'}
            ],
            style: 'present',
            margin: [0, 25, 0, 15], // left, top, right, bottom
          },
          {
            stack: [
              {text: data.usuario + '\n\n'},
              {text: 'Vinculador del Icatech\n\n'},
              {text: 'Trabajador Activo del Instituto de Capacitación y Vinculación Tecnología del Estado de Chiapas.\n\n'},
              {text: (data.usuario_email == 'null') ? 'Correo Electrónico: No hay email' : 'Correo Electrónico: ' + data.usuario_email}
            ],
            margin: [0, 25, 0, 15], // left, top, right, bottom
          },
          {
            pageBreak: 'before',
            margin: [0, 35, 0, 15], // left, top, right, bottom
            stack: [
              {text: 'Anexo lista de Cursos/Capacitaciones otorgados en Icatech.\n\n', fontSize: 12},
              {text: 'PRESENTE:\n\n', fontSize: 13, bold: true},
              {text: 'PROPUESTA DE HOMOLOGACIÓN DE COSTOS DE CATALOGO DE CURSOS.', fontSize: 14, bold: true, alignment: 'center'}
            ]
          },
          {
            style: 'tableCurso',
            table: {
              headerRows: 1,
              widths: ['*', 'auto', 'auto', 75],
              body:
              [
                [
                  {text: 'Curso', style: 'tableHeader', alignment: 'center'},
                  {text: 'Duración', style: 'tableHeader', alignment: 'center'},
                  {text: 'Clasificación', style: 'tableHeader', alignment: 'center'},
                  {text:'Costo', style: 'tableHeader', alignment: 'center'},
                ]
                //Body -> Salidas estandar
              ]
            },
            layout: {
              fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
              }
            }
          }
        ],
        pageSize: 'LETTER',
        compress: true,
        pageOrientation: 'portrait',
        pageMargins: [40, 80, 40, 40],
        footer: function(currentPage, pageCount) {
          return { style: 'piePagina', text: 'Página ' + currentPage.toString() + ' de ' + pageCount, alignment: 'center' };
        },
        styles: {
          header: {
            alignment: 'left',
            margin: [0, 5, 0, 30], // r,t,l,b
            opacity: 1.0
          },
          subheader: {
            alignment: 'right',
            margin: [0, 5, 0, 30],
            opacity: 1.0
          },
          loationanddate: {
            alignment: 'right',
            fontSize: 14,
            margin: [0, 25, 0, 20], // left, top, right, bottom
          },
          present: {
            alignment: 'left',
            bold: true,
            fontSize: 16
          },
          vinculadores: {
            alignment: 'right',
            bold:true,
            margin: [0, 0, 0, 50], // left, top, right, bottom
          },
          contentText: {
            fontSize: 14,
            margin: [0, 12, 0, 25],
            alignment: 'justify',
            italics: true
          },
          piePagina: {
            fontSize: 6,
            italics: true,
            bold: false
          },
          tableCurso: {
            margin: [0, 30, 0, 15]
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          }
        },
        images: {
          logoprincipal: LOGOPRINCIPAL,
          footerlogo: LOGOICATECH,
          logochiapas: LOGOCHIAPAS,
        }
      };
        var suma_total_cursos = 0;
      for (let i in data.lista) {
        let cursos = data.lista[i];
        dd.content[7].table.body.push([
          {text: cursos.curso},
          {text: cursos.duracion + ' Horas'},
          {text: cursos.clasificacion},
          {text: '$ ' + cursos.costo}
        ]);
      }

      pdfMake.createPdf( dd ).getBase64( function( base64 ) {
        postMessage( { fileName: 'Catalogo_Cursos.pdf', base64: base64 } );
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
