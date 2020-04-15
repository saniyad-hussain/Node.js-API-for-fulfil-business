module.exports = {
  attributes: {
    grp_id: {
    	type: 'number',
    	required: true
    },
    upc14 : {
    	type: 'number',
    	required: false
    },
    upc12 : {
    	type: 'number',
    	required: false
    },
    brand : {
    	type: 'string',
    	required: false,
      allowNull: true
    },
    name : {
    	type: 'string',
    	required: false,
      allowNull: true
    },
    status : {
    	type: 'string',
    	required: false,
      allowNull: true
    },
    length : {
    	type: 'string',
    	required: false,
      allowNull: true
    },
    height : {
    	type: 'string',
    	required: false,
      allowNull: true
    },
    width : {
    	type: 'string',
    	required: false,
      allowNull: true
    },
    unitsinpackage : {
    	type: 'string',
    	required: false,
      allowNull: true
    },
    packagetype : {
    	type: 'string',
    	required: false,
      allowNull: true
    },
    packagesize : {
    	type: 'string',
    	required: false,
      allowNull: true
    },
    netweight : {
    	type: 'string',
    	required: false,
      allowNull: true
    }
  }
};
