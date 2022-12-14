const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesService } = require('../../../src/services');
const { newSale, sales, updateSales, updatedSale } = require('../mocks/newSale.mock');
const { salesController } = require('../../../src/controllers');
const httpStatusCode = require('../../../src/utils/httpStatusCode');

chai.use(sinonChai);

const { expect } = chai;

describe('testes da camanda sale.controller', function () {
  describe('testando a função createSales', function () {
    afterEach(sinon.restore);

    it('testando se retorna o erro de ""productId" is required"', async function () {
      const req = {
        params: {
          id: 1
        },
        body: [{}]
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.createSales(req, res);

      expect(res.status).to.have.been.calledWith(httpStatusCode.BAD_REQUEST);
      expect(res.json).to.have.been.calledWith({
        message: '"productId" is required'
      });
    });

    it('testando se retorna o erro de ""quantity is required"', async function () {
      const req = {
        params: {
          id: 1
        },
        body: [
          {
            productId: 1
          }
        ]
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.createSales(req, res);

      expect(res.status).to.have.been.calledWith(httpStatusCode.BAD_REQUEST);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" is required'
      });
    });

    it('testando se retorna o erro de valor minimo 1', async function () {
      const req = {
        params: {
          id: 1
        },
        body: [
          {
            productId: 0,
            quantity: 1
          }
        ]
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

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
        { type: null, message: newSale }
      );

      await salesController.createSales(req, res);

      expect(res.status).to.have.been.calledWith(httpStatusCode.CREATED);
      expect(res.json).to.have.been.calledWith(newSale);
    });
  });

  describe('testando as funções getAll e getById', () => {
    afterEach(sinon.restore);

    it('usando getAll, retorna todas as vendas', async function() {
      const res = {};

      const req = {};

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getSales').resolves({ type: null, message: sales });

      await salesController.getSales(req, res);

      expect(res.status).to.have.been.calledWith(httpStatusCode.OK);
      expect(res.json).to.have.been.calledWith(sales);
    });

    it('usando getSalesById, retorna um erro de sale not found', async function () {
      const res = {};

      const req = {
        params: 999999
      };

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getSalesById')
        .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

      await salesController.getSalesById(req, res);

      expect(res.status).to.have.been.calledWith(httpStatusCode.NOT_FOUND);
    });

    it('usando getSalesById, retorna as vendas com ID correto', async function () {
      const saleId = 1

      const res = {};

      const req = {
        params: saleId
      };

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getSalesById')
        .resolves({ type: null, message: sales });

      await salesController.getSalesById(req, res);

      expect(res.status).to.have.been.calledWith(httpStatusCode.OK);
      expect(res.json).to.have.been.calledWith(sales);
    });
  });

  describe('testando a função deleteSale', function () {
    afterEach(sinon.restore)

    it('testando se retorna o erro "Product not found" por passar um id errado', async function () {
      const productNotExists = 999999;
      const res = {};
      const req = {
        params: {
          id: productNotExists
        },
      };

      res.status = sinon.stub().returns(res);

      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'deleteSale')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(httpStatusCode.NOT_FOUND);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('testando se de fato deleta a venda', async function () {
      const existingProduct = 1;
      const res = {};

      const req = {
        params: {
          id: existingProduct
        },
      };

      res.status = sinon.stub().returns(res);

      res.end = sinon.stub().returns();

      sinon.stub(salesService, 'deleteSale')
        .resolves({ type: null, message: '' });

      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(httpStatusCode.NO_CONTENT);
    });
  });

  describe('testando a funcao, updateSale', function () {
    afterEach(sinon.restore)

    it('testando se retorna o erro de ""productId" is required"', async function () {
      const req = {
        params: {
          id: 1
        },
        body: [{}]
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(httpStatusCode.BAD_REQUEST);
      expect(res.json).to.have.been.calledWith({
        message: '"productId" is required'
      });
    });

    it('testando se retorna o erro de ""quantity is required"', async function () {
      const req = {
        params: {
          id: 1
        },
        body: [
          {
            productId: 1
          }
        ]
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(httpStatusCode.BAD_REQUEST);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" is required'
      });
    });

    it('testando se retorna o erro de valor minimo 1', async function () {
      const req = {
        params: {
          id: 1
        },
        body: [
          {
            productId: 0,
            quantity: 1
          }
        ]
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(httpStatusCode.UNPROCESSABLE_ENTITY);
      expect(res.json).to.have.been.calledWith({
        message: '"productId" must be greater than or equal to 1'
      });
    });

    it('testando se de fato atualiza a venda', async function () {
      const req = {
        params: {
          id: 1
        },
        body: updateSales
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'updateSale').resolves(
        { type: null, message: updatedSale }
      );

      await salesController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(httpStatusCode.OK);
      expect(res.json).to.have.been.calledWith(updatedSale);
    });
  });
});