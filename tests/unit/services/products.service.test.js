const { expect } = require('chai');
const sinon = require('sinon');

const products = require('../models/mock/products.mock');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

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

  describe('testando as funções createdProduct', function () {
    it('testando se ela retorna um erro por campos invalidos', async function () {
      sinon.stub(productsModel, 'insert').resolves([{ insertId: 55 }]);

      let result = await productsService.createProduct();

      expect(result).to.deep.equal(
        {
          type: 'BAD_REQUEST',
          message: '"name" is required'
        }
      );

      result = await productsService.createProduct('agua');

      expect(result).to.deep.equal(
        {
          type: 'UNPROCESSABLE_ENTITY',
          message: '"name" length must be at least 5 characters long'
        }
      );

      sinon.restore();
    });

    it('testando se retorna um type null e um message com id do novo produto', async function () {
      sinon.stub(productsModel, 'insert').resolves(55);

      const result = await productsService.createProduct('coca-cola');

      expect(result.type).to.equal(null)
      expect(result.message).to.deep.equal(55)

      sinon.restore();
    });
  });

});