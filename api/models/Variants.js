module.exports = {
  attributes: {
    group_name: {
      type: 'string',
      required: false,
      allowNull: true
    },
    show_price: {
      type: 'boolean',
      required: false,
      allowNull: true
    },
    is_sellable: {
      type: 'boolean',
      required: false,
      allowNull: true
    },
    api_key : {
      type : 'string',
      required : false,
      allowNull: true
    }
  }
};
