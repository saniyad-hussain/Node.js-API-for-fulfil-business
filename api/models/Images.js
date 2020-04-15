/**
 * Images.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    inventory_id: {
      type: 'number',
      required: true
    },
    time_captured: {
      type: 'string',
      required: true
    },
    camera_id: {
      type: 'string',
      required: true
    },
    item_image_number: {
      type: 'number',
      required: true
    },
    filename: {
      type: 'string',
      required: true
    },
    base_cloud_url: {
      type: 'string',
      required: true
    },
    image_type: {
      type: 'string',
      required: true
    }
  },

  unlabelledImages: async (productId, condition, from) => {
    const SQL = `SELECT * from(SELECT
      images.*,(select count(id) from boundingboxlabels as bb WHERE images.id = bb.image_id)
      as total FROM inventory JOIN images ON inventory.id = images.inventory_id WHERE
      inventory.product_id = ${productId}) as data
      WHERE ${condition} order by id LIMIT ${from}, 100000`;
    const result = await sails.sendNativeQuery(SQL);
    return result.rows;
  },

  unGradedImages: async (
    condition,
    countConPid,
    countConDate,
    isGetGradedImages,
    pageNumber = 0,
    operator,
    randomize
  ) => {
    const imgs = [];
    const orderBy = randomize === 'true' ? ' order by rand() ' : '';
    const operatorCondition =
      operator && operator !== 'null'
        ? `(gr.operator_id != ${+operator}
            and gr.operator_id not in
              ( select
                  operator_id
                from operatorgrade
                where current_operator_id =  ${+operator}
              )
            and images.inventory_id in
              ( select
                  inventory_id
                from operatorgrade
                where current_operator_id = ${+operator}
              )
            )  or
            (gr.operator_id != ${+operator}
              and images.inventory_id not in
              ( select
                  inventory_id
                from operatorgrade
                where current_operator_id = ${+operator}
              )
            ) or `
        : '';
    const SQL = `SELECT distinct
        images.inventory_id,
        IFNULL(gr.grade,'') as grade,
        IFNULL(gr.id,'') as grId,
        IFNULL(uncertain,false) as uncertain,
        IFNULL(gr.operator_id,0) as operatorId
      from (select distinct inventory_id from images ${condition}) images
      ${isGetGradedImages ? '' : ' left '} JOIN  groundtruthgrades AS gr
      ON images.inventory_id = gr.inventory_id
      WHERE ${operatorCondition} gr.inventory_id IS
      ${isGetGradedImages ? ' not' : ''} NULL
      ${orderBy}
      LIMIT ${pageNumber}, 1
    `;
    const result = await sails.sendNativeQuery(SQL);

    if (result.rows[0] === undefined) {
      imgs.push({inventory_id: null, remainImages: 0, images: []});
    } else {
      const invId = result.rows[0].inventory_id;
      const {operatorId, uncertain, grId, grade} = result.rows[0];
      const SQL2 = `
      select *,
            '${grade}' AS grade,
            '${grId}' AS grId,
            ${uncertain} AS uncertain,
            '${operatorId}' AS operatorId
      from (
        SELECT
          images.*,
          case
            when position='top'
              then 1
            when position='front'
              then 2
            when position='back'
              then 3
          else 4
          end positionOrder
      from images
      join cameras
      on cameras.camera_id=images.camera_id
      where inventory_id = ${invId} ) as t
      order by image_type, positionOrder asc
      `;
      const result1 = await sails.sendNativeQuery(SQL2);
      const SQL3 = `SELECT COUNT(id) remainImages FROM images WHERE inventory_id in
        (select inv.id from inventory as inv
        LEFT JOIN groundtruthgrades AS gr ON inv.id = gr.inventory_id
        WHERE gr.inventory_id IS NULL ${countConPid}) ${countConDate}`;
      const result2 = await sails.sendNativeQuery(SQL3);
      imgs.push({
        inventory_id: invId,
        remainImages: result2.rows[0].remainImages,
        images: result1.rows
      });
    }
    return imgs;
  }
};
