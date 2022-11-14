const newSale = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
};

const sales = [
  {
    "saleId": 1,
    "date": "2022-11-14T17:37:06.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-11-14T17:37:06.000Z",
    "productId": 2,
    "quantity": 10
  }
];

const salesWithoutId = [
  {
    "date": "2022-11-14T17:37:06.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2022-11-14T17:37:06.000Z",
    "productId": 2,
    "quantity": 10
  }
];

module.exports = {
  newSale,
  sales,
  salesWithoutId,
};