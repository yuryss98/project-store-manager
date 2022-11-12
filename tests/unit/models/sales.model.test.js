const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesService } = require('../../../src/services');
const newProduct = require('../mocks/newSale.mock');
const { salesModel } = require('../../../src/models');
const valideteProductExists = require('../../../src/services/validations/valideteProductExists');
const connection = require('../../../src/models/connection');

chai.use(sinonChai);

const { expect } = chai;

describe('testes da camada sales.model', function () {
  it('usando a função insertSalesDate, retorne um ID', async function() {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

    const result = await salesModel.insertSalesDate();
    
    expect(result).to.equal(3);
  });

  // it('usando a função insertSalesProduct, retorne um ID', async function () {
  //   sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

  //   const result = await salesModel.insertSalesProduct(5, { productId: 1, quantity: 15 });

  //   expect(result).to.equal(1);
  // });
});