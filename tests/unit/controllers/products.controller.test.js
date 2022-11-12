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
    afterEach(sinon.restore);

    it('usando getAll veja se retorna uma lista completa de produtos', async function () {
      const res = {};

      const req = {};

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getProducts').resolves({ type: null, message: products });

      await productsController.getProducts(req, res);

      expect(res.status).to.have.been.calledWith(httpStatusCode.OK);
      expect(res.json).to.have.been.calledWith(products);
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
    });
  })

  describe('testando a função createProduct', function () {
    afterEach(sinon.restore);

    it('usando createProduct passando o campo name com menos de 5 caracter retorna um erro',
      async function () {
      const res = {};

      const req = {
        body: {
          name: 'agua'
        }
      };

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'createProduct').resolves({
        type: 'UNPROCESSABLE_ENTITY',
        message: '"name" length must be at least 5 characters long'
      });

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(httpStatusCode.UNPROCESSABLE_ENTITY);
        expect(res.json).to.have.been.calledWith(
          { message: '"name" length must be at least 5 characters long' }
        );
      });
    
    it('usando createProduct passando o campo name com 5 ou mais caracter cria um novo produto',
      async function () {
        const newProductID = 55;

        const res = {};

        const req = {
          body: {
            name: 'coca-cola'
          }
        };

        res.status = sinon.stub().returns(res);

        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'createProduct').resolves({
          type: null,
          message: newProductID
        });

        await productsController.createProduct(req, res);

        expect(res.status).to.have.been.calledWith(httpStatusCode.Created);
        expect(res.json).to.have.been.calledWith(
          { id: 55, name: 'coca-cola'  }
        );
      });
  })
});