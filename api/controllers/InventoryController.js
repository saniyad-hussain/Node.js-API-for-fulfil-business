/**
 * InventoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const fs = require('fs');
const parse = require('csv-parse');
const {Parser} = require('json2csv');
const moment = require('moment');
const asyncLoop = require('node-async-loop');


module.exports = {
  /**
   *
   * @param {Req} req
   * @param {Res} res
   * @GET location_id required
   * @GET is_graded_item required
   * @GET product_id required
   * @GET factory_inventory_id required
   * @GET sku
   * @GET price
   * @GET sale_price
   * @GET long_description
   * @GET short_description
   * @GET category_id
   * @GET brand
   * @GET thumb
   * @GET image
   * @GET grade_id
   * @GET is_reserved
   * @GET note
   * @GET price_override
   * @GET weight_override
   * @returns {Object}
   */
  addItem: async function(req, res) {

    const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowModifyInventory');
    if (!allowQueryAllOrders) {
      return res.status(500).json({
        message : 'You are not authorized to access this resource.'
      });
    }

    if (!req.param('product_id')) {
      return res.sendStatus(500);
    }
    if (!req.param('location_id')) {
      return res.sendStatus(500);
    }
    if (!req.param('is_graded_item')) {
      return res.sendStatus(500);
    }
    if (!req.param('factory_inventory_id')) {
      return res.sendStatus(500);
    }
    const productId = req.param('product_id');
    if (isNaN(productId)) {
      return res.sendStatus(500);
    }
    let result = await Product.find({
      where: {
        'id': productId,
        'api_key' : req.key
      },
      limit: 10
    });
    if (result.length < 1) {
      // Item is not in product table
      const productParam = await sails.helpers.validateCreationParams(
        Product,
        req.allParams()
      );
      productParam.api_key = req.key;

      const newProduct = await Product.create(productParam).fetch();
      result = newProduct;
    }
    const invInputs = await sails.helpers.validateCreationParams(Inventory,
        req.allParams());
    invInputs.product_id = result.id || result[0].id;
    invInputs.api_key = req.key;
    const newInventory = await Inventory.create(invInputs).fetch();
    res.json(newInventory);
  },

  /**
   * IMPORTANT: If live users are using the site, THIS MUST BE DELETED ASAP
   * this was only intended to be a quick tool to reset the inventory for demos
   * @param {Req} req
   * @param {Res} res
   * @returns {Object}
   */
  resetForDemo: async function(req, res) {

    const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowResetAllOrder');
    if (!allowQueryAllOrders) {
      return res.status(500).json({
        message : 'You are not authorized to access this resource.'
      });
    }

    if (req.param('password') !== 'pineapple') {
      res.sendStatus(401);
      return;
    }
    const sql = 'update inventory set is_reserved = 0, reservation_expires =' +
        ' NULL, reservation_cart_id = NULL where api_key = $1';
    const result = await Inventory.getDatastore().sendNativeQuery(sql, [req.key]);
    if (result.affectedRows > 0) {
        res.sendStatus(200);
    } else {
      res.sendStatus(500);
      await sails.helpers.logger('error', 'reset for demo failed');
    }
  },

  /**
   * This endpoint is designed to be called by addToCart. When you add an item
   * to your cart, it will first check to see if we have inventory available to
   * sell. If so, we will place a reservation which will expire in one hour
   * the expiration can be updated. If the reservation is not updated for 1 hour
   * the item may be added to someone elses cart. A cart is not required.
   * Theoretically it is possible that the OSC or grading system could remove
   * a specific item from inventory for a set duration of time by reserving it.
   * @GET product_id
   * @GET cart_id (optional)
   * @param {Req} req
   * @param {Res} res
   * @returns {Object}
   */
  attemptReserveEndpoint: async function(req, res) {

    const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowModifyInventory');
    if (!allowQueryAllOrders) {
      return res.status(500).json({
        message : 'You are not authorized to access this resource.'
      });
    }

    module.exports.attemptReserve(req, res).then(json => {
      res.json(json);
    }).catch(err => {
      res.status(500).json(err);
    });
  },

  /**
   * Reserved inventory items
   * @GET product_id
   * @param {Req} req
   * @returns {Object}
   */
  attemptReserve: async function(req) {
    return new Promise((resolve, reject) => {
      if (!req.param('product_id')) {
        const error = {};
        error.msg = 'The product_id parameter is required';
        return reject(error);
      }
      const productId = req.param('product_id');
      Inventory.find({
        where: {
          'product_id': productId,
          'is_reserved': 0,
          'api_key' : req.key
        },
        limit: 1
      }).then(async available => {
        if (available.length) {
          const expires = new Date().setHours(new Date().getHours() + 1);

          const result = await Inventory.reserveInventory(
            available[0].id,
            expires,
            req.param('cart_id'),
            req.key
          );

          if (result === 1) {
            available[0].is_reserved = true;
            available[0].reservation_expires = expires;
          }

          return resolve(available[0]);

        } else {
          const error = {};
          error.msg = 'No inventory able to be reserved';
          return reject(error);
        }
      });
    });
  },

  /**
   * @GET cart_id
   * @param {Req} req
   * @param {Res} res
   * @returns {Object}
   */
  releaseReservationByCartId: async function(req, res) {

    const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowModifyInventory');
    if (!allowQueryAllOrders) {
      return res.status(500).json({
        message : 'You are not authorized to access this resource.'
      });
    }

    if (!req.param('cart_id')) {
      return res.sendStatus(500);
    }

    const result = await Inventory.releaseReservationByCart(req.param('cart_id'), req.key);
    res.sendStatus(result > 0 ? 200 : 500);
  },

  /**
   * @GET inventory_id
   * @param {Req} req
   * @param {Res} res
   * @returns {Object}
   */
  releaseReservationByInventoryId: async function(req, res) {

    const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowModifyInventory');
    if (!allowQueryAllOrders) {
      return res.status(500).json({
        message : 'You are not authorized to access this resource.'
      });
    }

    if (!req.param('inventory_id')) {
      return res.sendStatus(500);
    }

    const result = await Inventory.releaseReservationByInventory(
      req.param('inventory_id'),
      req.key
    );
    res.sendStatus(result > 0 ? 200 : 500);
  },

  /**
   *
   * @param {Req} req
   * @param {Res} res
   * @returns {Array}
   */
  getAvailableItems: async function(req, res) {

    const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowQueryAllOrders');
    if (!allowQueryAllOrders) {
      return res.status(500).json({
        message : 'You are not authorized to access this resource.'
      });
    }

    const limit = req.param('limit');

    const data = await Inventory.getAvailableInventory(limit, req.key);
    const output = [];
    const names = {};
    for (const i in data) {
      const row = data[i];
      if (row['is_selectable_meat'] === 0 || row['is_selectable_meat'] === 1) {
        row['is_selectable_meat'] = !!row['is_selectable_meat'];
      }
      if (row['is_selectable_produce'] === 0 ||
          row['is_selectable_produce'] === 1) {
        row['is_selectable_produce'] = !!row['is_selectable_produce'];
      }
      if (names[row.name] !== 1) {
        output.push(row);
        names[row.name] = 1;
      }
    }
    res.json(output);
  },

  /**
   * Upload bulk data to database from csv file
   * @get file csv file stream
   * @get type type should be replace or append
   * @param {Req} req
   * @param {Res} res
   * @returns {Object}
   */
  inventoryUpload : async (req, res) => {

    const type = req.param('type');

    if(!type) {
      return res.status(500).json({
        message : 'Type is required'
      });
    }

    const table = req.param('table');

    if(!table) {
      return res.status(500).json({
        message : 'Table name is required'
      });
    }

    // Sails file upload to get actual file source from
    // form-data file request params
    req.file('file').upload((err, files) => {

      if (err) {
        return res.serverError(err);
      }

      if(!files[0]) {
        return res.status(500).json({
          message : 'File is missing'
        });
      }

      // Read file contents
      fs.readFile(files[0].fd, 'utf8', (err, data) => {

        if (err) {
          return res.serverError(err);
        }

        let Model = Product;
        if (table === 'product') {
          Model = Product;
        } else if (table === 'inventory') {
          Model = Inventory;
        } else if (table === 'metadata') {
          Model = Metadata;
        } else if (table === 'supplierdelivery') {
          Model = SupplierDelivery;
        } else if (table === 'variants') {
          Model = Variants;
        }

        const output = [];
        let _firstRow = {};
        const parser = parse(data, {
          cast: (value) => {
            if (value === 'NULL' || value === null || value === 'null') {
              return null;
            } else if (value === 'TRUE' || value === 'true' || value ==='True') {
              return true;
            } else if (value === 'FALSE' || value === 'false' || value ==='False') {
              return false;
            } else {
              // Consider string if number contain 0 on first position
              // and should't contain "." on second position
              if(value.indexOf(0) === 0 && value.indexOf('.') >= 1) {
                return value;
              } else {
                if (isNaN(value)) {
                  return value;
                } else {
                  return value ? parseFloat(value) : null;
                }
              }
            }
          },
          delimiter: ',',
          columns : true,
          skip_lines_with_error: true,
          trim : true
        });

        // Get record stream
        parser.on('readable', () => {
          let record;
          let count = 0;
          while (record = parser.read()) {
            if(count === 0) {
              _firstRow = Object.assign({}, record);
            }
            if (Model.attributes.hasOwnProperty('api_key')) {
              record.api_key = req.key;
            }
            output.push(record);
            count++;
          }
        });

        parser.on('error', (err) => {
          return res.serverError(err);
        });

        // Get skiped record here if those contain invalid format
        parser.on('skip', () => {
          sails.helpers.logger('error', 'record is skipped');
        });

        parser.on('end', () => {

          if(output.length === 0) {
            return res.send({message : 'Error : File is empty, file should have at lease one row for upload !'});
          }

          let errorFileList = [];

          /**
           * Validate column name either is exists or not
           * @param {Object} modal modal Object
           * @returns {Array} return finally array with exists true or false based on fields
           */
          const validateColumns = (modal) => {
            const firstRow = output[0];
            const requiredFields = [];
            for(const attr in modal.attributes) {
              if(modal.attributes[attr].required && attr !== 'api_key') {
                 requiredFields.push({
                   isExist : false,
                   field : attr.toLowerCase()
                 });
              }
            }
            for(const item in firstRow) {
              const index = _.findIndex(requiredFields, {'field' : item.toLowerCase()});
              if(index !== -1 && requiredFields[index]) {
                requiredFields[index].isExist = true;
              }
            }
            const checkMandatory = _.filter(requiredFields, {isExist : false});
            const errorList = [];
            if(checkMandatory.length > 0) {
              checkMandatory.forEach(field => {
                  errorList.push({
                    type : 'mandatory_column',
                    item : field.field,
                    error : `${field.field } is mandatory column and its not detected in file.`
                  });
              });
            }

            if(_firstRow.hasOwnProperty('api_key')) {
              errorList.push({
                type : 'invalid_column',
                item : 'api_key',
                error : `api_key column is not required.`
              });
            }

            return errorList;
          };

          errorFileList = [...errorFileList, ...validateColumns(Model)];

          /**
           * Validate modal fields and return error list
           * @param {Object} modal name that needs to validate
           * @returns {Array} return validated field array
           */
          const validateField = (modal) => {
            const errorList = [];
            const fieldDatatypes = {
              string: {
                supportedTypes : ['object', 'string', 'number']
              },
              number: {
                supportedTypes : ['object', 'number']
              },
              boolean: {
                supportedTypes : ['object', 'boolean', 'number'],
                length : 1,
                values : [0, 1, true, false, null]
              }
            };

            output.forEach((row, index) => {
              let column = 0;
              for(const item in row) {
                // if modal field is exists or not
                if(modal.attributes[item]) {
                  const modalDatatype = modal.attributes[item].type;
                  const modalIsRequired = modal.attributes[item].required;
                  const itemDatatype = typeof row[item];
                  const value = row[item];
                  if(fieldDatatypes[modalDatatype]) {

                    if(type === 'replace') {
                      if(item === 'id' && !value) {
                        errorList.push({
                          type : 'column_notnull',
                          row : index,
                          column,
                          item,
                          value,
                          error : `${item} column shouldn't be null`+
                            ` (in row ${index} and column ${column})`
                        });
                      }
                    }

                    if(fieldDatatypes[modalDatatype].supportedTypes.indexOf(itemDatatype) === -1) {
                      errorList.push({
                        type : 'datatype_mismatch',
                        row : index,
                        column,
                        item,
                        value,
                        error : `datatype is not matched , expected should be ${modalDatatype}`+
                          ` (in row ${index} and column ${column})`
                      });
                    }
                    // For boolean case
                    if(modalDatatype === 'boolean' && fieldDatatypes[modalDatatype].length) {

                      if(value !== null && fieldDatatypes[modalDatatype].length !== value.length &&
                          fieldDatatypes[modalDatatype].values.indexOf(value) === -1) {
                        errorList.push({
                          type : 'datatype_mismatch',
                          row : index,
                          column,
                          item,
                          value,
                          error : `datatype is not matched , expected should be ${modalDatatype}` +
                          ` (in row ${index} and column ${column})`
                        });
                      }
                    }
                    // for number negative case
                    if(modalDatatype === 'number') {
                      if(Model.notNegativeConstraintColumns) {
                        if(Model.notNegativeConstraintColumns.indexOf(item) !== -1) {
                          if(Number.parseFloat(value) < 0) {
                            errorList.push({
                              type : 'number_negative',
                              row : index,
                              column,
                              item,
                              value,
                              error : `negative value is not allowed for ${item}` +
                                ` (in row ${index} and column ${column})`
                            });
                          }
                        }
                      }
                    }

                    if(modalIsRequired) {
                      if(row[item] === null || row[item] === '') {
                        errorList.push({
                          type : 'column_value_required',
                          row : index,
                          column,
                          item,
                          value,
                          error : `${item} should be required
                          (in row ${index} and column ${column})`
                        });
                      }
                    }
                  }
                }
                column++;
              }
            });
            return errorList;
          };

          errorFileList = [...errorFileList, ...validateField(Model)];

          if(errorFileList.length > 0) {
            return res.send({message : 'Uploaded successfully', errors : errorFileList});
          }

          const dateFields = [];
          for(const attr in Model.attributes) {
            if(Model.attributes[attr]
                && Model.attributes[attr].autoMigrations
                    && Model.attributes[attr].autoMigrations.columnType === 'datetime') {
              dateFields.push(attr);
            }
          }

          const bulkData = [];
          asyncLoop(output, async (item, next) => {
            try {

              const row = item;

              if(type === 'append') {
                delete row.id;
              }

              // Replace date format to specific so mysql can accept it
              dateFields.forEach(dateField => {
                if(item[dateField]) {
                  item[dateField] = moment(item[dateField]).format('YYYY-MM-DD HH:MM:SS');
                }
              });

              const modelParam = await sails.helpers.validateCreationParams(
                Model,
                row
              );

              bulkData.push(modelParam);

              return next();

            } catch (err) {
              return next(err);
            }

          }, async (err) => {

            if(err) {
              return res.serverError(err);
            }

            try {

              // For replace - delete the given record and insert new one
              if(type === 'replace') {
                const rowIds = _.map(bulkData, i => i.id);
                const where = Model.attributes.hasOwnProperty('api_key') ?
                  {id: {in : rowIds}, api_key : req.key} : {id: {in : rowIds}};
                await Model.destroy(where);
              }

              await Model.createEach(bulkData);
              res.send({message : 'File uploaded successfully !', data : output});
            } catch (e) {
              res.serverError(e);
            }

          });

        });

      });

    });
  },

  /**
   * Generate and download csv file from given modal rows
   * @param {Req} req
   * @param {Res} res
   * @returns {File} return csv file stream
   */
  inventoryDownload : async (req, res) => {
    const table = req.param('table');

    if(!table) {
      return res.status(500).json({
        message : 'Table name is required'
      });
    }

    let Model = Product;
    switch (table) {
      case 'product':
        Model = Product;
        break;
      case 'inventory':
        Model = Inventory;
        break;
      case 'metadata':
        Model = Metadata;
        break;
      case 'supplierdelivery':
        Model = SupplierDelivery;
        break;
      case 'variants':
        Model = Variants;
        break;
      default:
        Model = null;
    }

    if(!Model) {
      return res.status(500).json({
        message : 'Table is required'
      });
    }

    /**
     * Get all filed accept two from given modal
     * @param {Object} modal modal object
     * @returns {Array} return array of fields
     */
    const getField = (modal) => {
      const field = [];
        for(const attr in modal.attributes) {
          if (table === 'supplierdelivery') {
            if(['createdat', 'updatedat', 'delivery_status', 'api_key']
            .indexOf(attr.toLowerCase()) === -1
            ) {
            field.push(attr.toLowerCase());
          }
          } else {
            if(['createdat', 'updatedat', 'api_key']
              .indexOf(attr.toLowerCase()) === -1
            ) {
              field.push(attr.toLowerCase());
            }
          }
        }
        return field;
    };

    const where = Model.attributes.hasOwnProperty('api_key') ?
      {api_key : req.key} : {};

    const data = await Model.find(where);

    const fields = getField(Model);
    const opts = {fields};

    const parser = new Parser(opts);
    const csv = parser.parse(data);
    res.attachment('test.csv');
    res.end(csv, 'UTF-8');

  },

  /**
   * Get available inventory items
   * @param {Req} req
   * @param {Res} res
   * @returns {Array} return available inventory rows
   */
  getInventory: async (req, res) => {

    const sellableRows = await Productgrade.getSellableProductgrades();
    const sellableIds = sellableRows.map((row) => row.id);

    Inventory.find({}, async (err, inventories) => {
      if (err) {
        return res.status(500).json({message: 'Something went wrong'});
      }
      const resultInventories = inventories.filter((inventory) => {
        return sellableIds.includes(inventory.productgrade_id);
      });
      return res.status(200).send(resultInventories);
    });
  }
};
