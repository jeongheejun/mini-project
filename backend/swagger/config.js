export const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'mini-project',
        version: '1.0.0',
      },
      host: 'localhost:4000',
      basePath: '/'
    },
    apis: ['./swagger/*.swagger.js'], // files containing annotations as above
  };