const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesService } = require('../../../src/services');
const newProduct = require('../mocks/newSale.mock');
const { salesController } = require('../../../src/controllers');
const httpStatusCode = require('../../../src/utils/httpStatusCode');

chai.use(sinonChai);

const { expect } = chai;

describe('testes da camanda sale.controller', function () {
  describe('testando a função createSales', function () {
    afterEach(sinon.restore)

    it('testando se retorna o erro de ""productId" is required"', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'createSales').resolves(
        { type: 'BAD_REQUEST', message: '"productId" is required' }
      );

      await salesController.createSales(req, res);

      expect(res.status).to.have.been.calledWith(httpStatusCode.BAD_REQUEST);
      expect(res.json).to.have.been.calledWith({
        message: '"productId" is required'
      });
    });

    it('testando se retorna o erro de ""quantity is required"', async function () {
      const req = { body: { productId: 1}};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'createSales').resolves(
        { type: 'BAD_REQUEST', message: '"quantity" is required' }
      );

      await salesController.createSales(req, res);

      expect(res.status).to.have.been.calledWith(httpStatusCode.BAD_REQUEST);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" is required'
      });
    });

    it('testando se retorna o erro de valor minimo 1', async function () {
      const req = { body: { productId: 1, quantity: 0 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'createSales').resolves(
        { type: 'UNPROCESSABLE_ENTITY', message: '"productId" must be greater than or equal to 1' }
      );

      await salesController.createSales(req, res);

      expect(res.status).to.have.been.calledWith(httpStatusCode.UNPROCESSABLE_ENTITY);
      expect(res.json).to.have.been.calledWith({
        message: '"productId" must be greater than or equal to 1'
      });
    });

    it('testando se retorna o status 201 e a nova venda', async function () {
      const newProductArray = [
        {
          productId: 1,
          quantity: 1
        },
        {
          productId: 2,
          quantity: 5
        }
      ] 
      const req = {
        body: { newProductArray }
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'createSales').resolves(
        { type: null, message: newProduct }
      );

      await salesController.createSales(req, res);

      expect(res.status).to.have.been.calledWith(httpStatusCode.CREATED);
      expect(res.json).to.have.been.calledWith(newProduct);
    });
  });
});