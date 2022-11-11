const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productsService } = require('../../../src/services');
const products = require('../models/mock/products.mock');
const { productsController } = require('../../../src/controllers');
const httpStatusCode = require('../../../src/utils/httpStatusCode');

chai.use(sinonChai);

const { expect } = chai;

describe('Testando a camada Controller', function () {
  describe('testando as funções getAll e getById', function () {
    it('usando getAll veja se retorna uma lista completa de produtos', async function () {
      const res = {};

      const req = {};

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getProducts').resolves({ type: null, message: products });

      await productsController.getProducts(req, res);

      expect(res.status).to.have.been.calledWith(httpStatusCode.OK);
      expect(res.json).to.have.been.calledWith(products);

      sinon.restore();
    });

    it('usando getById veja se retorna um produto existente', async function () {
      const res = {};

      const req = {
        params: 1
      };

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getProductById').resolves({ type: null, message: products[0] });

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(httpStatusCode.OK);
      expect(res.json).to.have.been.calledWith(products[0]);

      sinon.restore();
    });

    it('usando getById veja se retorna "Product not found"', async function () {
      const res = {};

      const req = {
        params: 999999
      };

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getProductById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(httpStatusCode.NotFound);

      sinon.restore();
    });
  })
});