const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesService } = require('../../../src/services');
const {
  newSale,
  sales,
  salesWithoutId,
  updateSales,
  updatedSale
} = require('../mocks/newSale.mock');
const { salesModel, productsModel } = require('../../../src/models');
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
      sinon.stub(productsModel, 'findById').resolves(undefined);

      const result = await salesService.createSales([{ productId: 999, quantity: 5 }]);

      expect(result.type).to.deep.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found')
    });

    it('testando se de fato cria uma nova venda', async function () {
      sinon.stub(productsModel, 'findById').resolves({ id: 1, name: 'Martelo de Thor' });

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

  describe('testando a função deleteSale', function () {
    beforeEach(() => {
      sinon.stub(salesModel, 'deleteSale').resolves();
    });

    afterEach(sinon.restore);

    const extingsProduct = 1;
    const idNotExists = 99999;

    it('testando se retorna o erro "Sale not found" por passar um id errado', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);

      const result = await salesService.deleteSale(idNotExists);

      expect(result.type).to.deep.equal('SALE_NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    });

    it('testando se de fato deleta o produto', async function () {
      sinon.stub(salesModel, 'findById').resolves(salesWithoutId);

      const result = await salesService.deleteSale(extingsProduct);

      expect(result.type).to.deep.equal(null);
      expect(result.message).to.deep.equal('');
    });
  });

  describe('testando a função updateSale', function () {
    afterEach(sinon.restore);

    const extingsProduct = 1;
    const idNotExists = 99999;

    it('testando se retorna o erro "Sale not found" por passar um id errado', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);

      const result = await salesService.updateSale(idNotExists, updateSales);

      expect(result.type).to.deep.equal('SALE_NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    });

    it('testando se retorna o erro de campos invalidos', async function () {
      let result = await salesService.updateSale(extingsProduct, [{ productId: 1}]);

      expect(result).to.deep.equal(
        {
          type: 'BAD_REQUEST',
          message: '"quantity" is required'
        }
      );

      result = await salesService.updateSale(extingsProduct, [{ quantity: 1 }]);

      expect(result).to.deep.equal(
        {
          type: 'BAD_REQUEST',
          message: '"productId" is required'
        }
      );
    });

    it('testando se retorna o erro de "Product not found"', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined)

      const result = await salesService.updateSale(idNotExists, updateSales);

      expect(result.type).to.deep.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });

    it('testando se de fato atualiza a venda', async function () {
      sinon.stub(salesModel, 'update').resolves([{ affectedRows: 1 }]);

      const result = await salesService.updateSale(extingsProduct, updateSales);

      expect(result.type).to.deep.equal(null);
      expect(result.message).to.deep.equal(updatedSale);
    });
  });
});