const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesService } = require('../../../src/services');
const { sales } = require('../mocks/newSale.mock');
const { salesModel } = require('../../../src/models');
const valideteProductExists = require('../../../src/services/validations/valideteProductExists');
const connection = require('../../../src/models/connection');

chai.use(sinonChai);

const { expect } = chai;

describe('testes da camada sales.model', function () {
  afterEach(sinon.restore)

  it('usando a função insertSalesDate, retorne um ID', async function() {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

    const result = await salesModel.insertSalesDate();
    
    expect(result).to.equal(3);
  });

  it('usando a função insertSalesProduct, retorne affectedRows = 1', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await salesModel.insertSalesProduct(2, { productId: 1, quantity: 15 });

    expect(result).to.equal(1);
  });

  it('usando a função findAll, retorna a lista de vendas ', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);

    const result = await salesModel.findAll();

    expect(result).to.deep.equal(sales);
  });

  it('usando a função findById, pesquisa as vendas pelo Id', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);

    const result = await salesModel.findById(1);

    expect(result).to.deep.equal(sales);
  });
});