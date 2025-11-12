// Simple OpenAPI builder to allow attaching docs programmatically
const baseSpec = {
  openapi: '3.1.0',
  info: { 
    title: 'Wellness API', 
    version: '1.0.0',
    description: 'A comprehensive API for managing wellness products with admin authentication',
    contact: {
      name: 'Wellness API Support',
      email: 'support@wellness.com'
    }
  },
  servers: [
    { 
      url: '/api',
      description: 'Production server'
    }
  ],
  paths: {},
  components: { 
    schemas: {}, 
    securitySchemes: {} 
  },
  tags: [
    {
      name: 'Health',
      description: 'Health check endpoints'
    },
    {
      name: 'Products',
      description: 'Product management endpoints'
    }
  ]
};

function attachDoc(path, method, doc) {
  if (!baseSpec.paths[path]) baseSpec.paths[path] = {};
  baseSpec.paths[path][method.toLowerCase()] = doc;
}

function addSchema(name, schema) {
  baseSpec.components.schemas[name] = schema;
}

function addSecurityScheme(name, scheme) {
  baseSpec.components.securitySchemes[name] = scheme;
}

function setGlobalSecurity(securityArray) {
  baseSpec.security = Array.isArray(securityArray) ? securityArray : undefined;
}

function getSpec() {
  return baseSpec;
}

module.exports = { attachDoc, addSchema, addSecurityScheme, setGlobalSecurity, getSpec };
