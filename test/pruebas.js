/*var expect  = require('chai').expect;
var request = require('request');

it('Conexión con el servidor', function(done) {
    request('http://localhost:9090' , function(error, response, body) {
        expect(body).to.equal('Grupo 3');
        done();
    });
});
*/
'use strict';
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect  = require('chai').expect;
var request = require('request');
var should = chai.should();

chai.use(chaiHttp);



describe('Test group', function() {
    var host = "http://35.196.238.102:9090";
    /*
    it('Conexión con el servidor', function(done) {
        request(host , function(error, response, body) {
            expect(body).to.equal('Grupo 3');
            done();
        });
    });*/

    it('Prueba de Servicio: TrasladarPaciente', function(done) {
        chai
            .request(host)
            .post("/TrasladarPaciente")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({dpi: '22',Origen:1,Destion:2})
            .end(function(error, response, body) {
              expect(error).to.be.null;
              expect(response).to.have.status(200);
              done();
            });
    });

    it('Prueba de Servicio: DespachoReceta', function(done) {
        chai
            .request(host)
            .post("/DespachoReceta")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({Receta: 1})
            .end(function(error, response, body) {
              expect(error).to.be.null;
              expect(response).to.have.status(200);
              done();
            });
    });

    it('Prueba de Servicio: Consulta Existencia Medicamento', function(done) {
        chai
            .request(host)
            .post("/ConsultaExistencia")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({Codigo: 1})
            .end(function(error, response, body) {
              expect(error).to.be.null;
              expect(response).to.have.status(200);
              done();
            });
    });

    it('Prueba de Servicio: Reporte de Morbilidad', function(done) {
        chai
            .request(host)
            .post("/ReporteMorbilidad")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({})
            .end(function(error, response, body) {
              expect(error).to.be.null;
              expect(response).to.have.status(200);
              done();
            });
    });




    it('Prueba de Servicio: Traslado de Medicamento', function(done) {
        chai
            .request(host)
            .post("/TrasladoMedicamento")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({"Origen":"1","Destino":"2","Medicamentos":[{"Codigo":"1","Cantidad":"2"}]})
            .end(function(error, response, body) {
              expect(error).to.be.null;
              expect(response).to.have.status(200);
              done();
            });
    });

    it('Prueba de Servicio: Historial de Paciente', function(done) {
        chai
            .request(host)
            .post("/HistorialPaciente")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({DPI:2114955650101})
            .end(function(error, response, body) {
              expect(error).to.be.null;
              expect(response).to.have.status(200);
              done();
            });
    });

});
