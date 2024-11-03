
module.exports = {
    development: {
      username: 'fundacion',
      password: 'admin',
      database: 'fundacion',
      host: 'localhost',
      dialect: 'postgres', // Cambia esto según tu base de datos
    },
    test: {
      username: 'eccargo-test',
      password: 'Pool113*',
      database: 'eccargo-test_task',
      host: 'postgresql-eccargo-test.alwaysdata.net',
      dialect: 'postgres', // Cambia esto según tu base de datos
    },
    production: {
      username: 'eccargo-test',
      password: 'Pool113*',
      database: 'eccargo-test_task',
      host: 'postgresql-eccargo-test.alwaysdata.net',
      dialect: 'postgres', // Cambia esto según tu base de datos
    },
  };