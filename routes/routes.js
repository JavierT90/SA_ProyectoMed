/*var appRouter = function (app) {
  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API");
  });
}

module.exports = appRouter;
*/

const diagnostico   = require('./diagnostico');
const medicamento   = require('./medicamento');
const paciente      = require('./paciente');

module.exports = function(app, db) {
  diagnostico(app, db);
  medicamento(app, db);
  paciente(app, db);
  // Other route groups could go here, in the future
};