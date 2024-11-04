module.exports = {
  development: {
    username: "fundacion",
    password: "admin",
    database: "fundacion",
    host: "localhost",
    dialect: "postgres", // Cambia esto según tu base de datos
  },
  test: {
    username: "monsenor",
    password: "Pool113*",
    database: "monsenor_db",
    host: "postgresql-monsenor.alwaysdata.net",
    dialect: "postgres", // Cambia esto según tu base de datos
  },
  production: {
    username: "eccargo-test",
    password: "Pool113*",
    database: "eccargo-test_task",
    host: "postgresql-eccargo-test.alwaysdata.net",
    dialect: "postgres", // Cambia esto según tu base de datos
  },
};
