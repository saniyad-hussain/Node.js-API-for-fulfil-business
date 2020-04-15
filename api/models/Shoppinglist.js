module.exports = {
   attributes: {
     user_id: {
     	type: 'number',
     	required: true
    },
     product_id: {
     	type: 'number',
     	required: true
     },
     api_key : {
       type : 'string',
       required : false
     }
   }
};
