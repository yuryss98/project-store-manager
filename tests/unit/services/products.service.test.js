const { expect } = require('chai');
const sinon = require('sinon');

const products = require('../models/mock/products.mock');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

describe('Testando a camada Service', function () {
  const product = { id: 1, name: 'Martelo de Thor' };

  describe('testando as funções getAll e getById', function () {
    afterEach(sinon.restore);

    it('usando getAll veja se retorna uma lista completa de produtos', async function () {
      sinon.stub(productsModel, 'findAll').resolves(products);

      const result = await productsService.getProducts();

      expect(result.message).to.deep.equal(products);
    });

    it(`usando getById veja se retorna um produto existente para um id existente
        e se passando o id de um produto inexistente retorna o erro
        "Product not found`, async function () {
      sinon.stub(productsModel, 'findById')
        .onFirstCall()
        .resolves(products[0])
        .onSecondCall()
        .resolves(undefined)

      const productExists = 1;
      const productNotExists = 99999;

      let result = await productsService.getProductById(productExists);

      expect(result.message).to.deep.equal(products[0]);

      result = await productsService.getProductById(productNotExists);

      expect(result.message).to.deep.equal('Product not found');
    });
  });

  describe('testando a função createdProduct', function () {
    beforeEach(() => {
      sinon.stub(productsModel, 'insert').resolves(55);
    });

    afterEach(sinon.restore);

    it('testando se ela retorna um erro por campos invalidos', async function () {
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
    });

    it('testando se retorna um type null e um message com id do novo produto', async function () {
      const result = await productsService.createProduct('coca-cola');

      expect(result.type).to.equal(null)
      expect(result.message).to.deep.equal(55)
    });
  });

  describe('testando a função updateProduct', function () {
    beforeEach(() => {
      sinon.stub(productsModel, 'update').resolves();
    });

    afterEach(sinon.restore);

    const extingsProduct = 1;
    const idNotExists = 99999;
    const name = 'Martelo do batman';

    it('testando se retorna o erro "Product not found" por passar um id errado', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined)

      const result = await productsService.updateProduct(idNotExists, name);

      expect(result.type).to.deep.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });

    it('testando se retorna o erro ""name" is required", por nao passar o campo name',
      async function () {
        sinon.stub(productsModel, 'findById').resolves(product);

        const result = await productsService.updateProduct(extingsProduct);

        expect(result.type).to.deep.equal('BAD_REQUEST');
        expect(result.message).to.deep.equal('"name" is required');
      });
    
    it('testando se de fato atualiza o produto', async function () {
      sinon.stub(productsModel, 'findById').resolves(product);

      const result = await productsService.updateProduct(extingsProduct, name);

      expect(result.type).to.deep.equal(null);
      expect(result.message).to.deep.equal('');
    });
  });

  describe('testando a função deleteProduct', function () {
    beforeEach(() => {
      sinon.stub(productsModel, 'deleteProduct').resolves();
    });

    afterEach(sinon.restore);

    const extingsProduct = 1;
    const idNotExists = 99999;

    it('testando se retorna o erro "Product not found" por passar um id errado', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined)

      const result = await productsService.deleteProduct(idNotExists);

      expect(result.type).to.deep.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });

    it('testando se de fato deleta o produto', async function () {
      sinon.stub(productsModel, 'findById').resolves(product)
      const result = await productsService.deleteProduct(extingsProduct);

      expect(result.type).to.deep.equal(null);
      expect(result.message).to.deep.equal('');
    });
  });

  describe('testando a função getProductsByQuery', function () {
    afterEach(sinon.restore);

    it('testando se retorna apenas 1 produto', async function () {
      sinon.stub(productsModel, 'findByName').resolves([products[0]])

      const name = '%MAR%';

      const result = await productsService.getProductsByQuery(name);

      expect(result.type).to.deep.equal(null);
      expect(result.message).to.deep.equal([products[0]]);
    });

    it('testando se de retorna todos os produtos quando não passa um nome', async function () {
      sinon.stub(productsModel, 'findByName').resolves([products])

      const result = await productsService.getProductsByQuery('');

      expect(result.type).to.deep.equal(null);
      expect(result.message).to.deep.equal(products);
    });
  });
});