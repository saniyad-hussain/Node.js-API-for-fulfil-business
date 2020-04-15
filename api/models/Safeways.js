module.exports = {
  attributes: {
    upc: {
    	type: 'string',
    	required: true
    },
    price: {
    	type: 'string',
    	required: false
    },
    salesRank: {
    	type: 'number',
    	required: false
    },
    name: {
    	type: 'string',
    	required: true
    }
  }
};
