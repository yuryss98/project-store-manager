const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesService } = require('../../../src/services');
const { newSale, sales } = require('../mocks/newSale.mock');
const { salesModel } = require('../../../src/models');
const valideteProductExists = require('../../../src/services/validations/valideteProductExists');

chai.use(sinonChai);

const { expect } = chai;

describe('testes da camanda sale.service', function () {
  describe('testando a função createSales', function () {
    afterEach(sinon.restore)

    it('testando se retorna o erro de ""productId" is required"', async function () {
      const result = await salesService.createSales([{}]);

      expect(result.type).to.deep.equal('BAD_REQUEST');
      expect(result.message).to.deep.equal('"productId" is required')
    });

    it('testando se retorna o erro de ""quantity" is required"', async function () {
      const result = await salesService.createSales([{ productId: 1 }]);

      expect(result.type).to.deep.equal('BAD_REQUEST');
      expect(result.message).to.deep.equal('"quantity" is required')
    });

    it('testando se retorna o erro de valor minimo 1', async function () {
      const result = await salesService.createSales([{ productId: 1, quantity: 0 }]);

      expect(result.type).to.deep.equal('UNPROCESSABLE_ENTITY');
      expect(result.message).to.deep.equal('"quantity" must be greater than or equal to 1')
    });

    it('testando se retorna o erro por produto inexistente', async function () {
      sinon.stub(valideteProductExists, 'validateProductExists').resolves(
        { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }
      );

      const result = await salesService.createSales([{ productId: 999, quantity: 5 }]);

      expect(result.type).to.deep.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found')
    });

    it('testando se de fato cria uma nova venda', async function () {
      sinon.stub(valideteProductExists, 'validateProductExists').resolves(
        { type: null, message: '' }
      );

      const newSaleId = 3

      sinon.stub(salesModel, 'insertSalesDate').resolves(newSaleId);
      sinon.stub(salesModel, 'insertSalesProduct').resolves();

      const result = await salesService.createSales(
        [
          {
            "productId": 1,
            "quantity": 1
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ]
      );

      expect(result.type).to.deep.equal(null);
      expect(result.message).to.deep.equal(newSale)
    });
  });

  describe('testando as funções getSales, e getSalesById', function () {
    afterEach(sinon.restore)

    it('usando getSales, retorna todas as vendas', async function () {
      sinon.stub(salesModel, 'findAll').resolves(sales);

      const result = await salesService.getSales();

      expect(result.message).to.deep.equal(sales);
    });

    it(`usando getSalesById, com id correto retorna as vendas
        e com id errado retorna o erro de Sale not found`, async function () {
      sinon.stub(salesModel, 'findById')
        .onFirstCall()
        .resolves(sales)
        .onSecondCall()
        .resolves([])

      const productExists = 1;
      const productNotExists = 99999;

      let result = await salesService.getSalesById(productExists);

      expect(result.message).to.deep.equal(sales);

      result = await salesService.getSalesById(productNotExists);

      expect(result.message).to.deep.equal('Sale not found');
    });
  });
});