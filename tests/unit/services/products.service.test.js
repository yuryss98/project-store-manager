const { expect } = require('chai');
const sinon = require('sinon');

const products = require('../models/mock/products.mock');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services')

describe('Testando a camada Service', function () {
  describe('testando as funções getAll e getById', function () {
    it('usando getAll veja se retorna uma lista completa de produtos', async function () {
      sinon.stub(productsModel, 'findAll').resolves(products);

      const result = await productsService.getProducts();

      expect(result.message).to.deep.equal(products);

      sinon.restore();
    });

    it('usando getById veja se retorna um produto existente', async function () {
      sinon.stub(productsModel, 'findById').resolves(products[0]);

      const result = await productsService.getProductById(1);

      expect(result.message).to.deep.equal(products[0]);

      sinon.restore();
    });

    it('usando getById veja se retorna um produto inexistente', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);

      const result = await productsService.getProductById(999999);

      expect(result.message).to.deep.equal('Product not found');

      sinon.restore();
    });
  })
});