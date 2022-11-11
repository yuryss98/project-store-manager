const { expect } = require('chai');
const sinon = require('sinon');

const products = require('./mock/products.mock');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

describe('Testando a camada Model', function() {
  describe('testando as funções findAll e findById', function () {
    it('veja se retorna uma lista completa de produtos', async function () {
      sinon.stub(connection, 'execute').resolves([products]);

      const result = await productsModel.findAll();

      expect(result).to.deep.equal(products);

      sinon.restore();
    });

    it('usando o /:id veja se retorna um produto existente', async function () {
      sinon.stub(connection, 'execute').resolves([[products[0]]]);

      const result = await productsModel.findById(1);

      expect(result).to.deep.equal(products[0]);

      sinon.restore();
    });
  })

  describe('testando as funções insert', function () {
    it('veja se retorna um id de um novo produto', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 55 }]);

      const result = await productsModel.insert('coca-cola');

      expect(result).to.deep.equal(55);

      sinon.restore();
    })
  })
});