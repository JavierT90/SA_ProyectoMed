const diagnostico   = require('./diagnostico');
const medicamento   = require('./medicamento');
const paciente      = require('./paciente');
const catalogos     = require('./catalogos');

module.exports = function(app, db) {
  diagnostico(app, db);
  medicamento(app, db);
  paciente(app, db);
  catalogos(app, db);
  // Other route groups could go here, in the future
};
