const swaggerAutogen = require("swagger-autogen")();

output = "./swagger_doc.json";
endpoints = ["./src/app.js"];

const doc = {
  info: {
    version: "1.0",
    title: "Library CRUD",
    description: "API REST para gerenciamento de biblioteca",
  },
};

swaggerAutogen(output, endpoints, doc);
