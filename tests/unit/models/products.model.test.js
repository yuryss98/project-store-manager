const { expect } = require('chai');
const sinon = require('sinon');

const products = require('./mock/products.mock');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

describe('Testando a camada Model', function() {
  describe('testando as funções findAll e findById', function () {
    afterEach(sinon.restore);

    it('veja se retorna uma lista completa de produtos', async function () {
      sinon.stub(connection, 'execute').resolves([products]);

      const result = await productsModel.findAll();

      expect(result).to.deep.equal(products);
    });

    it('usando o /:id veja se retorna um produto existente', async function () {
      sinon.stub(connection, 'execute').resolves([[products[0]]]);

      const result = await productsModel.findById(1);

      expect(result).to.deep.equal(products[0]);
    });
  })

  describe('testando a funções insert, update', function () {
    afterEach(sinon.restore)

    it('usando a função insert veja se retorna um id de um novo produto', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 55 }]);

      const result = await productsModel.insert('coca-cola');

      expect(result).to.deep.equal(55);
    });

    it('usando a função update veja se retorna apenas 1 linha afetada', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const result = await productsModel.update(1, 'Martelo do batman');

      expect(result).to.deep.equal(1);
    });
  });

  describe('testando a função deleteProduct', function () {
    afterEach(sinon.restore)

    it('testando se deleta um produto de fato', async function () {
      sinon.stub(connection, 'execute').resolves();

      const existingProduct = 1;

      const result = await productsModel.deleteProduct(existingProduct);

      expect(result).to.deep.equal();
    });
  });
});