export default {
  swagger: '2.0',
  info: {
    title: 'Maxxidata Challenge API',
  },
  host: 'http://localhost:3333',
  basePath: '/',
  paths: {
    '/tipo': {
      get: {
        summary: 'Retorna todos os tipos cadastrados',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '3123-3dsada-dasda-sadasf',
                },
                descricao: {
                  type: 'string',
                  example: 'Programador',
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Cadastra um novo tipo',
        parameters: [
          {
            in: 'body',
            name: 'tipo',
            required: true,
            exaple: 'Programador',
            description: 'Descrição do novo tipo',
            schema: {
              type: 'object',
              required: ['descricao'],
              properties: {
                descricao: {
                  type: 'string',
                },
              },
            },
          },
        ],
        requestBody: {
          required: true,

          content: {
            'aplication/json': {
              schema: {
                type: 'object',
                properties: {
                  descricao: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'OK',
          },
        },
      },
    },
    '/tipo/{id}': {
      delete: {
        summary: 'Apaga algum tipo',
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'string',
            description: 'ID do tipo',
          },
        ],
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    '/profissional': {
      get: {
        summary: 'Retorna todos os profissionais cadastrados',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '3123-3dsada-dasda-sadasf',
                },
                nome: {
                  type: 'string',
                  example: 'João',
                },
                email: {
                  type: 'string',
                  example: 'joao@email.com',
                },
                telefone: {
                  type: 'string',
                  example: '(31)123451234',
                },
                tipoDeProfissao: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      example: 'fdsd-vdfvdf-dfvdfvd-dfvdf',
                    },
                    descricao: {
                      type: 'string',
                      example: 'Programador',
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Cadastra um novo tipo',
        parameters: [
          {
            in: 'body',
            name: 'Profissional',
            required: true,
            description: 'Descrição do novo tipo',
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '3123-3dsada-dasda-sadasf',
                },
                nome: {
                  type: 'string',
                  example: 'João',
                },
                email: {
                  type: 'string',
                  example: 'joao@email.com',
                },
                telefone: {
                  type: 'string',
                  example: '(31)123451234',
                },
                tipoDeProfissao: {
                  type: 'string',
                  example: 'fdsfsd-fdsfsd-sdsdfs-e2ddsa',
                },
              },
            },
          },
        ],
        requestBody: {
          required: true,

          content: {
            'aplication/json': {
              schema: {
                type: 'object',
                properties: {
                  descricao: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'OK',
          },
        },
      },
    },
    '/profissional/{id}': {
      delete: {
        summary: 'Apaga algum profissional',
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            type: 'string',
            description: 'ID do profissional',
          },
        ],
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
  },
};
