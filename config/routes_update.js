/**
 * Route Mappings
 * (sails.config.routes)
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
module.exports.routes = {
  '/docs' : {
    view: 'pages/swagger/swagger',
    swagger: {
      tag: { name: 'dashboard' },
      summary: "",
      description: ""
    }
  },
  'GET /order/getdeliverylocationstatus': {
    controller: 'order',
    action: 'getDeliveryLocationStatus',
    swagger: {
      tag: { name: 'dashboard' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'orderId',
          'required': true
        }
      ]
    }
  },
  'GET /order/getestimateddeliverttime': {
    controller: 'order',
    action: 'getEstimatedDeliveryTime',
    swagger: {
      tag: { name: 'factory' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'delivery_address',
          'required': true
        },
        {
          'in': 'query',
          'name': 'delivery_city',
          'required': true
        },
        {
          'in': 'query',
          'name': 'delivery_state',
          'required': true
        }
      ]
    }
  },
  'GET /qualitycalculations': {
    controller: 'qualitycalculations',
    action: 'updateQualityCalculations',
    swagger: {
      tag: { name: 'factory' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'param',
          'name': 'category',
          'required': true
        }
      ]
    }
  },
  'GET /basicgradeoptions': {
    swagger: {
      tag: { name: 'factory' },
      summary: "",
      description: ""
    }
  },
  'POST /basicgradeoptions': {
    swagger: {
      tag: { name: 'demoapp' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'guide_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'button_text',
          'required': true
        },
        {
          'in': 'query',
          'name': 'numeric_code',
          'required': true
        },
        {
          'in': 'query',
          'name': 'hover_text',
          'required': true
        }
      ]
    }
  },
  'GET /progressionmodels': {
    swagger: {
      tag: { name: 'demoapp' },
      summary: "",
      description: ""
    }
  },
  'POST /progressionmodels': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'guide_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'base_cloud_url',
          'required': true
        },
        {
          'in': 'query',
          'name': 'filename',
          'required': true
        },
        {
          'in': 'query',
          'name': 'progression_version',
          'required': true
        },
        {
          'in': 'query',
          'name': 'date_added',
          'required': true
        }
      ]
    }
  },
  'GET /defectprogressions': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /defectprogressions': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'guide_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'defect_label',
          'required': true
        },
        {
          'in': 'query',
          'name': 'severity_score',
          'required': true
        },
        {
          'in': 'query',
          'name': 'filename',
          'required': true
        },
        {
          'in': 'query',
          'name': 'base_cloud_url',
          'required': true
        }
      ]
    }
  },
  'GET /labelguides': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /labelguides': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'group_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'task',
          'required': true
        },
        {
          'in': 'query',
          'name': 'version',
          'required': true
        }
      ]
    }
  },
  'GET /defectgrade': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /defectgrade': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'image_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'operator_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'defect_label',
          'required': true
        },
        {
          'in': 'query',
          'name': 'severity_score',
          'required': false
        },
        {
          'in': 'query',
          'name': 'x1',
          'required': false
        },
        {
          'in': 'query',
          'name': 'y1',
          'required': false
        },
        {
          'in': 'query',
          'name': 'x2',
          'required': false
        },
        {
          'in': 'query',
          'name': 'y2',
          'required': false
        },
        {
          'in': 'query',
          'name': 'job_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'guide_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'time_created',
          'required': true
        }
      ]
    }
  },
  'DELETE /defectgrade': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'GET /uptime/getLatencyData': {
    controller: 'uptime',
    action: 'getLatencyData',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /uptime': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /uptime': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'Machine',
          'required': true
        },
        {
          'in': 'query',
          'name': 'Type',
          'required': true
        },
        {
          'in': 'query',
          'name': 'UpTime',
          'required': false
        }
      ]
    }
  },
  'GET /permissiongrouproutes': {
    controller: 'admin',
    action: 'getPermittedRoutesById',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'groupId',
          'required': true
        }
      ]
    }
  },
  'POST /permissiongrouproutes': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'group',
          'required': true
        },
        {
          'in': 'query',
          'name': 'route_Id',
          'required': true
        }
      ]
    }
  },
  'DELETE /permissiongrouproutes': {
    controller: 'admin',
    action: 'deleteGroupRoutes',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'groupId',
          'required': true
        }
      ]
    }
  },
  'GET /approutes': {
    controller: 'admin',
    action: 'getAllRoutes',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'PATCH /adminuserpermission': {
    controller: 'admin',
    action: 'updateUserPermission',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'user_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'permission_group',
          'required': true
        }
      ]
    }
  },
  'GET /permissiongroup': {
    controller: 'admin',
    action: 'permissionGroups',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /permissiongroup': {
    swagger : {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'group',
          'required': true
        }
      ]
    }
  },
  'GET /admin/users' : {
    controller: 'admin',
    action: 'users',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /feedback': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'order_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'issue',
          'required': false
        },
        {
          'in': 'query',
          'name': 'api_key',
          'required': false
        }
      ]
    }
  },
  'POST /delivery/postmatesDeliveryStatusWebhooks' : {
    controller : 'delivery',
    action : 'getPostmatesDeliveryStatus',
    swagger : {}
  },
  'GET /deliveriestemperature': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /deliveriestemperature': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'box_id',
          'required': false
        },
        {
          'in': 'query',
          'name': 'date_harvested',
          'required': false
        },
        {
          'in': 'query',
          'name': 'temp_night_before_harvest',
          'required': false
        },
        {
          'in': 'query',
          'name': 'temp_at_time_of_harvest',
          'required': false
        },
        {
          'in': 'query',
          'name': 'time_in_warehouse',
          'required': true
        },
        {
          'in': 'query',
          'name': 'temp_in_warehouse',
          'required': false
        },
        {
          'in': 'query',
          'name': 'temp_delivery_truck',
          'required': false
        },
        {
          'in': 'query',
          'name': 'species',
          'required': false
        },
        {
          'in': 'query',
          'name': 'api_key',
          'required': false
        }
      ]
    }
  },
  'DELETE /deliveriestemperature': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /deliveriestemperature': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'box_id',
          'required': false
        },
        {
          'in': 'query',
          'name': 'date_harvested',
          'required': false
        },
        {
          'in': 'query',
          'name': 'temp_night_before_harvest',
          'required': false
        },
        {
          'in': 'query',
          'name': 'temp_at_time_of_harvest',
          'required': false
        },
        {
          'in': 'query',
          'name': 'time_in_warehouse',
          'required': false
        },
        {
          'in': 'query',
          'name': 'temp_in_warehouse',
          'required': false
        },
        {
          'in': 'query',
          'name': 'temp_delivery_truck',
          'required': false
        },
        {
          'in': 'query',
          'name': 'species',
          'required': false
        },
        {
          'in': 'query',
          'name': 'api_key',
          'required': false
        }
      ]
    }
  },
  '/portal' : {
    view: 'pages/portal_swagger/swagger',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /log/getAllLog': {
    controller: 'log',
    action: 'getAllLog',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'searchString',
          'required': true
        },
        {
          'in': 'query',
          'name': 'filterEnvironment',
          'required': false
        },
        {
          'in': 'query',
          'name': 'filterTypes',
          'required': false
        }
      ]
    }
  },
  'GET /deliveries/loadIncomingDeliveries': {
    controller: 'deliveries',
    action: 'loadIncomingDeliveries',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'purchaseOrder',
          'required': true
        }
      ]
    }
  },
  'GET /supplierdelivery': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /supplierdelivery': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'purchase_order',
          'required': true
        },
        {
          'in': 'query',
          'name': 'product_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'quantity_ordered',
          'required': true
        },
        {
          'in': 'query',
          'name': 'received_qty',
          'required': false
        },
        {
          'in': 'query',
          'name': 'expected_delivery_date',
          'required': true
        },
        {
          'in': 'query',
          'name': 'note',
          'required': false
        },
        {
          'in': 'query',
          'name': 'delivery_status',
          'required': false
        },
        {
          'in': 'query',
          'name': 'box_id',
          'required': false
        },
        {
          'in': 'query',
          'name': 'temporary_location_id',
          'required': false
        },
        {
          'in': 'query',
          'name': 'truck_cold_zone_temp',
          'required': false
        },
        {
          'in': 'query',
          'name': 'truck_freezer_zone_temp',
          'required': false
        },
        {
          'in': 'query',
          'name': 'truck_room_zone_temp',
          'required': false
        },
        {
          'in': 'query',
          'name': 'api_key',
          'required': false
        }
      ]
    }
  },
  'DELETE /supplierdelivery': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /supplierdelivery': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'purchase_order',
          'required': true
        },
        {
          'in': 'query',
          'name': 'product_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'quantity_ordered',
          'required': true
        },
        {
          'in': 'query',
          'name': 'expected_delivery_date',
          'required': true
        },
        {
          'in': 'query',
          'name': 'note',
          'required': true
        },
        {
          'in': 'query',
          'name': 'delivery_status',
          'required': false
        },
        {
          'in': 'query',
          'name': 'temporary_location_id',
          'required': false
        },
        {
          'in': 'query',
          'name': 'truck_cold_zone_temp',
          'required': false
        },
        {
          'in': 'query',
          'name': 'truck_freezer_zone_temp',
          'required': false
        },
        {
          'in': 'query',
          'name': 'truck_room_zone_temp',
          'required': false
        },
        {
          'in': 'query',
          'name': 'api_key',
          'required': false
        }
      ]
    }
  },
  'POST /supplierdelivery/updatetempinfo' : {
    controller : 'deliveries',
    action : 'updateTempInfo',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'order_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'truck_cold_zone_temp',
          'required': false
        },
        {
          'in': 'query',
          'name': 'truck_freezer_zone_temp',
          'required': false
        },
        {
          'in': 'query',
          'name': 'truck_room_zone_temp',
          'required': false
        },
      ]
    }
  },

  'GET /temporarystoragelocations' : {
    swagger : {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /temporarystoragelocations' : {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'room',
          'required': true
        },
        {
          'in': 'query',
          'name': 'bin',
          'required': true
        },
        {
          'in': 'query',
          'name': 'row',
          'required': true
        },
        {
          'in': 'query',
          'name': 'column',
          'required': true
        },
      ]
    }
  },
  'DELETE /temporarystoragelocations' : {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /temporarystoragelocations' : {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'room',
          'required': true
        },
        {
          'in': 'query',
          'name': 'bin',
          'required': true
        },
        {
          'in': 'query',
          'name': 'row',
          'required': true
        },
        {
          'in': 'query',
          'name': 'column',
          'required': true
        },
      ]
    }
  },

  'GET /version' : {
    controller: 'version',
    action: 'index',
    swagger : {
      tag: { name: '' },
      summary: "",
      description: "",
      excludeParameters: ['#/parameters/TokenHeaderParam']
    }
  },

  'GET /subscribeinductionmessages': {
    controller : 'induction',
    action : 'subscribeInductionMessages',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },

  'POST /inductionmessageinfo': {
    controller : 'induction',
    action : 'getMessageInfo',
    swagger : {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'message_id',
          'required': true
        }
      ]
    }
  },

  'POST /sendacknowledgeformessage': {
    controller : 'induction',
    action : 'sendAcknowledgeForMessage',
    swagger : {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'message_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'ask_type',
          'required': true
        }
      ]
    }
  },

  'POST /sendacknowledgement': {
    controller : 'induction',
    action : 'sendAcknowledgement',
    swagger : {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'message_id',
          'required': true
        }
      ]
    }
  },

  'POST /validatemessage': {
    controller : 'induction',
    action : 'sendValidateMessageRequest',
    swagger : {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'message_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'from',
          'required': true
        },
        {
          'in': 'query',
          'name': 'to',
          'required': true
        },
        {
          'in': 'query',
          'name': 'type',
          'required': true
        }
      ]
    }
  },

  'GET /flushRedisCache' : {
    controller : 'induction',
    action : 'flushRedisCache',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },

  'GET /experiments': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /experiments': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'trainer',
          'required': true
        },
        {
          'in': 'query',
          'name': 'time_started',
          'required': false
        },
        {
          'in': 'query',
          'name': 'time_finished',
          'required': false
        },
        {
          'in': 'query',
          'name': 'storage_base_url',
          'required': true
        },
        {
          'in': 'query',
          'name': 'dataset_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'notes'
        }
      ]
    }
  },
  'DELETE /experiments': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /experiments': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'trainer',
          'required': true
        },
        {
          'in': 'query',
          'name': 'time_started',
          'required': true
        },
        {
          'in': 'query',
          'name': 'time_finished',
          'required': true
        },
        {
          'in': 'query',
          'name': 'storage_base_url',
          'required': true
        },
        {
          'in': 'query',
          'name': 'dataset_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'notes'
        }
      ]
    }
  },

  'GET /modelgroups': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /modelgroups': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'group_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'product_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'group_name',
          'required': true
        }
      ]
    }
  },
  'DELETE /modelgroups': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /modelgroups': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'group_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'product_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'group_name',
          'required': true
        }
      ]
    }
  },

  'GET /productionmodels': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /productionmodels': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'product_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'model_id',
          'required': true
        }
      ]
    }
  },
  'DELETE /productionmodels': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /productionmodels': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'product_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'model_id',
          'required': true
        }
      ]
    }
  },

  'GET /supplier': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /supplier': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'name',
          'required': true
        },
        {
          'in': 'query',
          'name': 'active',
          'required': true
        }
      ]
    }
  },
  'DELETE /supplier': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /supplier': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'name',
          'required': true
        },
        {
          'in': 'query',
          'name': 'active',
          'required': true
        }
      ]
    }
  },
  'GET /shelflife': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /shelflife': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'product_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'lifespan',
          'required': true
        },
        {
          'in': 'query',
          'name': 'estimated_transit_time',
          'required': true
        }
      ]
    }
  },
  'DELETE /shelflife': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /shelflife': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'product_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'lifespan',
          'required': true
        },
        {
          'in': 'query',
          'name': 'estimated_transit_time',
          'required': true
        }
      ]
    }
  },
  'GET /itemsources': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /itemsources': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'supplier_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'product_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'price',
          'required': true
        },
        {
          'in': 'query',
          'name': 'active',
          'required': true
        }
      ]
    }
  },
  'DELETE /itemsources': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /itemsources': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'supplier_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'product_id ',
          'required': true
        },
        {
          'in': 'query',
          'name': 'price',
          'required': true
        },
        {
          'in': 'query',
          'name': 'active',
          'required': true
        }
      ]
    }
  },
  'GET /stockorderitem': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /stockorderitem': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'stock_order_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'note',
          'required': true
        }
      ]
    }
  },
  'DELETE /stockorderitem': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /stockorderitem': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'stock_order_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'note',
          'required': true
        }
      ]
    }
  },
  'GET /stockorder': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /stockorder': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'time_ordered',
          'required': true
        },
        {
          'in': 'query',
          'name': 'status',
          'required': true
        },
        {
          'in': 'query',
          'name': 'supplier_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'expected_delivery_time',
          'required': true
        }
      ]
    }
  },
  'DELETE /stockorder': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /stockorder': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'time_ordered',
          'required': true
        },
        {
          'in': 'query',
          'name': 'status',
          'required': true
        },
        {
          'in': 'query',
          'name': 'supplier_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'expected_delivery_time',
          'required': true
        }
      ]
    }
  },
  'GET /images/unGradedImages': {
    controller: 'images',
    action: 'unGradedImages',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /product/getAnnotationProducts': {
    controller: 'product',
    action: 'getAnnotationProducts',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /images/unlabelledImages': {
    controller: 'images',
    action: 'unlabelledImages',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'product_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'startDate',
          'required': true
        },
        {
          'in': 'query',
          'name': 'endDate',
          'required': true
        },
        {
          'in': 'query',
          'name': 'from',
          'required': true
        },
        {
          'in': 'query',
          'name': 'image_type',
          'required': true
        },
        {
          'in': 'query',
          'name': 'labelled',
          'required': true
        },
        {
          'in': 'query',
          'name': 'unlabelled',
          'required': true
        }
      ]
    }
  },
  'GET /annotationlabels': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /annotationlabels': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'group_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'label_name',
          'required': true
        },
        {
          'in': 'query',
          'name': 'version',
          'required': true
        }
      ]
    }
  },
  'DELETE /annotationlabels': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /annotationlabels': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'group_id',
          'required': false
        },
        {
          'in': 'query',
          'name': 'label_name',
          'required': false
        },
        {
          'in': 'query',
          'name': 'version',
          'required': false
        }
      ]
    }
  },
  '/bulkupload' : {
    view: 'pages/fileupload/fileupload',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /product/search': {
    controller: 'product',
    action: 'productSearch',
    internal : true,
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'name',
          'required': false
        },
        {
          'in': 'query',
          'name': 'fromPrice',
          'required': false
        },
        {
          'in': 'query',
          'name': 'toPrice',
          'required': false
        },
        {
          'in': 'query',
          'name': 'category',
          'required': false
        }
      ]
    }
  },
  'GET /productscan': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /productscan': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'upc',
          'required': true
        },
        {
          'in': 'query',
          'name': 'image',
          'required': true
        },
        {
          'in': 'query',
          'name': 'nutritional_facts',
          'required': true
        }
      ]
    }
  },
  'DELETE /productscan': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /productscan': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
          {
            'in': 'query',
            'name': 'upc',
            'required': true
          },
          {
            'in': 'query',
            'name': 'image',
            'required': true
          },
          {
            'in': 'query',
            'name': 'nutritional_facts',
            'required': true
          }
      ]
    }
  },
  'GET /featureflag/local': {
    controller: 'featureflag',
    action: 'local',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /featureflag': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /featureflag': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'flags',
          'required': true
        }
      ]
    }
  },
  'DELETE /featureflag': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /featureflag': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'flags',
          'required': false
        }
      ]
    }
  },
  'GET /detectionpredictions': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /detectionpredictions': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'image_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'label',
          'required': true
        },
        {
          'in': 'query',
          'name': 'confidence',
          'required': true
        },
        {
          'in': 'query',
          'name': 'x1',
          'required': false
        },
        {
          'in': 'query',
          'name': 'y1',
          'required': false
        },
        {
          'in': 'query',
          'name': 'x2',
          'required': false
        },
        {
          'in': 'query',
          'name': 'y2',
          'required': false
        },
        {
          'in': 'query',
          'name': 'model_id',
          'required': true
        }
      ]
    }
  },
  'DELETE /detectionpredictions': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /detectionpredictions': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'image_id',
          'required': false
        },
        {
          'in': 'query',
          'name': 'label',
          'required': false
        },
        {
          'in': 'query',
          'name': 'confidence',
          'required': false
        },
        {
          'in': 'query',
          'name': 'x1',
          'required': false
        },
        {
          'in': 'query',
          'name': 'y1',
          'required': false
        },
        {
          'in': 'query',
          'name': 'x2',
          'required': false
        },
        {
          'in': 'query',
          'name': 'y2',
          'required': false
        },
        {
          'in': 'query',
          'name': 'model_id',
          'required': false
        }
      ]
    }
  },
  'GET /images': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /images': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'inventory_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'time_captured',
          'required': true
        },
        {
          'in': 'query',
          'name': 'camera_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'item_image_number',
          'required': true
        },
        {
          'in': 'query',
          'name': 'filename',
          'required': true
        },
        {
          'in': 'query',
          'name': 'base_cloud_url',
          'required': true
        },
        {
          'in': 'query',
          'name': 'image_type',
          'required': true
        }
      ]
    }
  },
  'DELETE /images': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /images': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'inventory_id',
          'required': false
        },
        {
          'in': 'query',
          'name': 'time_captured',
          'required': false
        },
        {
          'in': 'query',
          'name': 'camera_id',
          'required': false
        },
        {
          'in': 'query',
          'name': 'item_image_number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'filename',
          'required': false
        },
        {
          'in': 'query',
          'name': 'base_cloud_url',
          'required': false
        },
        {
          'in': 'query',
          'name': 'image_type',
          'required': false
        }
      ]
    }
  },
  'GET /cameras': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /cameras': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'camera_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'inspection_station',
          'required': true
        },
        {
          'in': 'query',
          'name': 'camera_type',
          'required': true
        },
        {
          'in': 'query',
          'name': 'position',
          'required': true
        }
      ]
    }
  },
  'DELETE /cameras': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /cameras': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'camera_id',
          'required': false
        },
        {
          'in': 'query',
          'name': 'inspection_station',
          'required': false
        },
        {
          'in': 'query',
          'name': 'camera_type',
          'required': false
        },
        {
          'in': 'query',
          'name': 'position',
          'required': false
        }
      ]
    }
  },
  'GET /camerasettings': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /camerasettings': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'upc',
          'required': false
        },
        {
          'in': 'query',
          'name': 'camera_id',
          'required': false
        },
        {
          'in': 'query',
          'name': 'setting_name',
          'required': false
        },
        {
          'in': 'query',
          'name': 'setting_value',
          'required': false
        }
      ]
    }
  },
  'DELETE /camerasettings': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /camerasettings': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'upc',
          'required': false
        },
        {
          'in': 'query',
          'name': 'camera_id',
          'required': false
        },
        {
          'in': 'query',
          'name': 'setting_name',
          'required': false
        },
        {
          'in': 'query',
          'name': 'setting_value',
          'required': false
        }
      ]
    }
  },
  'GET /inspectionstations': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /inspectionstations': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'location',
          'required': true
        },
        {
          'in': 'query',
          'name': 'version',
          'required': true
        }
      ]
    }
  },
  'DELETE /inspectionstations': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /inspectionstations': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'location',
          'required': false
        },
        {
          'in': 'query',
          'name': 'version',
          'required': false
        }
      ]
    }
  },
  'GET /datasets': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /datasets': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'dataset_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'label_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'image_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'set_type',
          'required': true
        },
        {
          'in': 'query',
          'name': 'group_id'
        },
        {
          'in': 'query',
          'name': 'label_version'
        }
      ]
    }
  },
  'DELETE /datasets': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /datasets': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'dataset_id',
          'required': false
        },
        {
          'in': 'query',
          'name': 'label_id',
          'required': false
        },
        {
          'in': 'query',
          'name': 'image_id',
          'required': false
        },
        {
          'in': 'query',
          'name': 'set_type',
          'required': false
        },
        {
          'in': 'query',
          'name': 'group_id'
        },
        {
          'in': 'query',
          'name': 'label_version'
        }
      ]
    }
  },
  'GET /labeljobs': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /labeljobs': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'job_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'precision',
          'required': false
        },
        {
          'in': 'query',
          'name': 'recall',
          'required': false
        },
        {
          'in': 'query',
          'name': 'test_dataset',
          'required': true
        },
        {
          'in': 'query',
          'name': 'class',
          'required': false
        }
      ]
    }
  },
  'DELETE /labeljobs': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /labeljobs': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'job_id',
          'required': false
        },
        {
          'in': 'query',
          'name': 'precision',
          'required': false
        },
        {
          'in': 'query',
          'name': 'recall',
          'required': false
        },
        {
          'in': 'query',
          'name': 'test_dataset',
          'required': false
        },
        {
          'in': 'query',
          'name': 'class',
          'required': false
        }
      ]
    }
  },
  'GET /boundingboxlabels': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /boundingboxlabels': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'image_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'label',
          'required': true
        },
        {
          'in': 'query',
          'name': 'x1',
          'required': true
        },
        {
          'in': 'query',
          'name': 'y1',
          'required': true
        },
        {
          'in': 'query',
          'name': 'x2',
          'required': true
        },
        {
          'in': 'query',
          'name': 'y2',
          'required': true
        },
        {
          'in': 'query',
          'name': 'version',
          'required': true
        },
        {
          'in': 'query',
          'name': 'date_created',
          'required': true
        },
        {
          'in': 'query',
          'name': 'source',
          'required': true
        },
        {
          'in': 'query',
          'name': 'labeler',
          'required': true
        },
        {
          'in': 'query',
          'name': 'job_id',
          'required': true
        }
      ]
    }
  },
  'DELETE /boundingboxlabels': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /boundingboxlabels': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'image_id',
          'required': false
        },
        {
          'in': 'query',
          'name': 'label',
          'required': false
        },
        {
          'in': 'query',
          'name': 'x1',
          'required': false
        },
        {
          'in': 'query',
          'name': 'y1',
          'required': false
        },
        {
          'in': 'query',
          'name': 'x2',
          'required': false
        },
        {
          'in': 'query',
          'name': 'y2',
          'required': false
        },
        {
          'in': 'query',
          'name': 'version',
          'required': false
        },
        {
          'in': 'query',
          'name': 'date_created',
          'required': false
        },
        {
          'in': 'query',
          'name': 'source',
          'required': false
        },
        {
          'in': 'query',
          'name': 'labeler',
          'required': false
        },
        {
          'in': 'query',
          'name': 'job_id',
          'required': false
        }
      ]
    }
  },
  'GET /models': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /models': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'group_id'
        },
        {
          'in': 'query',
          'name': 'framework',
          'required': true
        },
        {
          'in': 'query',
          'name': 'model_url'
        },
        {
          'in': 'query',
          'name': 'version',
          'required': true
        },
        {
          'in': 'query',
          'name': 'experiment_id'
        },
        {
          'in': 'query',
          'name': 'model_type'
        },
        {
          'in': 'query',
          'name': 'notes'
        }
      ]
    }
  },
  'DELETE /models': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /models': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'upc',
          'required': false
        },
        {
          'in': 'query',
          'name': 'framework',
          'required': false
        },
        {
          'in': 'query',
          'name': 'model_filename',
          'required': false
        },
        {
          'in': 'query',
          'name': 'weights_filename',
          'required': false
        },
        {
          'in': 'query',
          'name': 'classes_filename',
          'required': false
        },
        {
          'in': 'query',
          'name': 'base_cloud_url',
          'required': false
        },
        {
          'in': 'query',
          'name': 'version',
          'required': false
        },
        {
          'in': 'query',
          'name': 'dataset_id',
          'required': false
        },
        {
          'in': 'query',
          'name': 'description',
          'required': false
        },
        {
          'in': 'query',
          'name': 'group_id'
        },
        {
          'in': 'query',
          'name': 'model_url'
        },
        {
          'in': 'query',
          'name': 'experiment_id'
        },
        {
          'in': 'query',
          'name': 'model_type'
        },
        {
          'in': 'query',
          'name': 'notes'
        }
      ]
    }
  },
  'GET /predictedgrades': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /predictedgrades': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'model_id_detection',
          'required': true
        },
        {
          'in': 'query',
          'name': 'model_id_grading',
          'required': true
        },
        {
          'in': 'query',
          'name': 'item_uuid',
          'required': true
        },
        {
          'in': 'query',
          'name': 'grade',
          'required': true
        },
        {
          'in': 'query',
          'name': 'primary_predicted_defects',
          'required': false
        }
      ]
    }
  },
  'DELETE /predictedgrades': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /predictedgrades': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'model_id_detection',
          'required': false
        },
        {
          'in': 'query',
          'name': 'model_id_grading',
          'required': false
        },
        {
          'in': 'query',
          'name': 'item_uuid',
          'required': false
        },
        {
          'in': 'query',
          'name': 'grade',
          'required': false
        },
        {
          'in': 'query',
          'name': 'primary_predicted_defects',
          'required': false
        }
      ]
    }
  },
  'GET /groundtruthgrades': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /groundtruthgrades': {
    controller: 'groundtruthgrades',
    action: 'createGroundTruthGrades',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'operator_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'inventory_id',
          'required': false
        },
        {
          'in': 'query',
          'name': 'time_graded',
          'required': true
        },
        {
          'in': 'query',
          'name': 'grade',
          'required': true
        },
        {
          'in': 'query',
          'name': 'method',
          'required': false
        },
        {
          'in': 'query',
          'name': 'guide_version',
          'required': false
        },
        {
          'in': 'query',
          'name': 'uncertain',
          'required': false
        }
      ]
    }
  },
  'GET /inspectionresults': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /inspectionresults': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'inventory_id',
          'required': false
        },
        {
          'in': 'query',
          'name': 'uuid',
          'required': false
        },
        {
          'in': 'query',
          'name': 'inspection_station',
          'required': false
        },
        {
          'in': 'query',
          'name': 'time_inspected',
          'required': false
        },
        {
          'in': 'query',
          'name': 'size_width',
          'required': false
        },
        {
          'in': 'query',
          'name': 'size_height',
          'required': false
        },
        {
          'in': 'query',
          'name': 'inspected',
          'required': false
        },
        {
          'in': 'query',
          'name': 'uploaded',
          'required': false
        },
        {
          'in': 'query',
          'name': 'operator_id',
          'required': false
        }
      ]
    }
  },
  'DELETE /inspectionresults': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /inspectionresults': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'inventory_id',
          'required': false
        },
        {
          'in': 'query',
          'name': 'uuid',
          'required': false
        },
        {
          'in': 'query',
          'name': 'inspection_station',
          'required': false
        },
        {
          'in': 'query',
          'name': 'time_inspected',
          'required': false
        },
        {
          'in': 'query',
          'name': 'size_width',
          'required': false
        },
        {
          'in': 'query',
          'name': 'size_height',
          'required': false
        },
        {
          'in': 'query',
          'name': 'inspected',
          'required': false
        },
        {
          'in': 'query',
          'name': 'uploaded',
          'required': false
        },
        {
          'in': 'query',
          'name': 'operator_id',
          'required': false
        }
      ]
    }
  },
  'GET /operators': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /operators': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'first_name',
          'required': true
        },
        {
          'in': 'query',
          'name': 'last_name',
          'required': true
        },
        {
          'in': 'query',
          'name': 'email',
          'required': false
        },
        {
          'in': 'query',
          'name': 'password',
          'required': true
        }
      ]
    }
  },
  'DELETE /operators': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PATCH /operators': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'first_name',
          'required': false
        },
        {
          'in': 'query',
          'name': 'last_name',
          'required': false
        },
        {
          'in': 'query',
          'name': 'email',
          'required': false
        },
        {
          'in': 'query',
          'name': 'password',
          'required': false
        }
      ]
    }
  },
  'GET /curatedorder': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /curatedorder': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'order_title',
          'required': false
        },
        {
          'in': 'query',
          'name': 'order_items',
          'required': false
        }
      ]
    }
  },
  'DELETE /curatedorder': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'POST /log/logInsert': {
    controller: 'log',
    action: 'logInsert',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'error_message',
          'required': true
        },
        {
          'in': 'query',
          'name': 'environment',
          'required': true
        },
        {
          'in': 'query',
          'name': 'types',
          'required': true
        },
        {
          'in': 'query',
          'name': 'logName',
          'required': true
        }
      ]
    }
  },
  'GET /cart':{
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /cart/create': {
    controller: 'cart',
    action: 'createCart',
    internal: true,
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'userKey',
          'required': true
        }
      ]
    }
  },
  'PATCH /cart': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'userKey',
          'required': true
        }
      ]
    }
  },
  'GET /cart/get': {
    controller: 'cart',
    action: 'getCart',
    internal: true,
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id'
        },
        {
          'in': 'query',
          'name': 'userKey'
        }
      ]
    }
  },
  'GET /cart/hasUnselectedSelectables': {
    controller: 'cart',
    action: 'doesCartRequireSelections',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'cart_id',
          'required': true
        }
      ]
    }
  },
  'POST /cart': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'userKey',
          'required': true
        }
      ]
    }
  },
  'POST /cart/addItem': {
    controller: 'cart',
    action: 'addToCart',
    internal: true,
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'product_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'cart_id',
          'required': true
        }
      ]
    }
  },
  'POST /cart/addInventoryItem': {
    controller: 'cart',
    action: 'addToCartByInventoryId',
    internal: true,
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'cart_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'inventory_id',
          'required': true
        }
      ]
    }
  },
  'DELETE /cart': {
    controller: 'cart',
    action: 'removeFromCart',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'product_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'cart_id',
          'required': true
        }
      ]
    }
  },

  'DELETE /cart/all': {
    controller: 'cart',
    action: 'removeAllFromCart',
    internal: true,
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'product_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'cart_id',
          'required': true
        }
      ]
    }
  },
  'GET /cartitem': { swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /cartitem': {
    internal: true,
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'product_id',
          'type': 'number',
          'required': true
        },
        {
          'in': 'query',
          'name': 'quantity',
          'type': 'number',
          'required': true
        },
        {
          'in': 'query',
          'name': 'cart_id',
          'type': 'number',
          'required': true
        },
        {
          'in': 'query',
          'name': 'is_virtual',
          'type': 'boolean',
          'required': false
        }
      ]
    }
  },
  'PATCH /cartitem': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'product_id',
          'type': 'number',
          'required': true
        },
        {
          'in': 'query',
          'name': 'quantity',
          'type': 'number',
          'required': true
        },
        {
          'in': 'query',
          'name': 'cart_id',
          'type': 'number',
          'required': true
        },
        {
          'in': 'query',
          'name': 'is_virtual',
          'type': 'boolean',
          'required': false
        }
      ]
    }
  },
  'DELETE /cartitem': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'PUT /cartitem': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /category': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /grocerydb': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /inventory': {
    controller: 'Inventory',
    action: 'getInventory',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /inventory/reset': {
    controller: 'inventory',
    action: 'resetForDemo',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /inventory/addItem': {
    controller: 'inventory',
    action: 'addItem',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'product_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'location_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'is_graded_item',
          'required': true
        },
        {
          'in': 'query',
          'name': 'factory_inventory_id',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'is_reserved',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'reservation_expires',
          'type': 'date',
          'required': false
        },
        {
          'in': 'query',
          'name': 'grade_id',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'note',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'price_override',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'productgrade_id',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'weight_override',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'image_override',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'scan_data',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'environment',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'index',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'lane_id',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'slot_id',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'stack_id',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'vlm_id',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'width',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'height',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'length',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'order_id',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'productgrade_id',
          'type': 'number',
          'required': false
        }
      ]
    }
  },
  'GET /inventory/attemptReserve': {
    controller: 'inventory',
    action: 'attemptReserveEndpoint',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'product_id',
          'required': true
        }
      ]
    }
  },
  'GET /inventory/releaseReservationByCartId': {
    controller: 'inventory',
    action: 'releaseReservationByCartId',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'cart_id',
          'required': true
        }
      ]
    }
  },
  'GET /inventory/releaseReservationByInventoryId': {
    controller: 'inventory',
    action: 'releaseReservationByInventoryId',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'inventory_id',
          'required': true
        }
      ]
    }
  },
  'GET /inventory/getAll': {
    controller: 'inventory',
    action: 'getAvailableItems',
    internal: true,
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'PATCH /inventory': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'DELETE /inventory': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /inventory/reserve': {
    internal: true,
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'DELETE /inventory/reserve': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /locations': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /locations': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'name',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'lat',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'lon',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'type',
          'type': 'string',
          'required': true
        }
      ]
    }
  },
  'PATCH /locations': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'name',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'lat',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'lon',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'type',
          'type': 'string',
          'required': true
        }
      ]
    }
  },
  'DELETE /locations': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'GET /neighborhood': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /neighborhood': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'zipcode',
          'required': true
        }
      ]
    }
  },
  'PATCH /neighborhood': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'zipcode',
          'required': true
        }
      ]
    }
  },
  'DELETE /neighborhood': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'GET /order': {
    controller: 'order',
    action: 'getOrdersByUserToken',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'user_token',
          'required': true
        }
      ]
    }
  },
  'GET /order/getAllOrders': {
    controller: 'order',
    action: 'getAllOrders',
    internal: true,
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'from',
          'required': false
        },
        {
          'in': 'query',
          'name': 'limit',
          'required': false
        }
      ]
    }
  },
  'GET /order/generateDemoOrders': {
    controller: 'order',
    action: 'generateDemoOrders',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'min_items_per_order',
          'required': true
        },
        {
          'in': 'query',
          'name': 'max_items_per_order',
          'required': true
        },
        {
          'in': 'query',
          'name': 'num_orders',
          'required': true
        },
        {
          'in': 'query',
          'name': 'carrier',
          'required': false
        },
        {
          'in': 'query',
          'name': 'category',
          'required': false
        },
        {
          'in': 'query',
          'name': 'bay',
          'required': false
        }
      ]
    }
  },
  'POST /order': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'PATCH /order': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'DELETE /order': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /order/order/pickuppack': {
    controller: 'order',
    action: 'packOrder',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /order/pack': {
    controller: 'order',
    action: 'packOrderEndpoint',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'DELETE /order/pack': {
    controller: 'order',
    action: 'unpackOrder',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /order/pickup': {
    controller: 'order',
    action: 'getScheduledPickups',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /order/pickup': {
    controller: 'order',
    action: 'schedulePickup',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'DELETE /report/pickup': {
    controller: 'order',
    action: 'unschedulePickup',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /report/getreordercsv' : {
    controller : 'customerOrder',
    action : 'getReOrderCSV',
    swagger : {
      query: [{
        $ref: '#/parameters/KeyHeaderParam'
      }]
    }
  },
  'GET /report/getexpiredinventory' : {
    controller : 'customerOrder',
    action : 'getExpiredInventory',
    swagger : {
      query: [{
        $ref: '#/parameters/KeyHeaderParam'
      }]
    }
  },
  'GET /report/getStockToReorder' : {
    controller : 'customerOrder',
    action : 'getStockToReorderReport',
    swagger : {
      query: [{
        $ref: '#/parameters/KeyHeaderParam'
      }]
    }
  },
  'POST /order/createOrder': {
    controller: 'order',
    internal: true,
    action: 'createOrder',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'user_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'cart_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'order_total',
          'required': true
        },
        {
          'in': 'query',
          'name': 'card_number',
          'required': true
        },
        {
          'in': 'query',
          'name': 'expiration',
          'required': true
        },
        {
          'in': 'query',
          'name': 'csv',
          'required': true
        },
        {
          'in': 'query',
          'name': 'billing_name',
          'required': true
        },
        {
          'in': 'query',
          'name': 'billing_address',
          'required': true
        },
        {
          'in': 'query',
          'name': 'billing_city',
          'required': true
        },
        {
          'in': 'query',
          'name': 'billing_zipcode',
          'required': true
        },
        {
          'in': 'query',
          'name': 'billing_country',
          'required': true
        },
        {
          'in': 'query',
          'name': 'delivery_address',
          'required': true
        },
        {
          'in': 'query',
          'name': 'delivery_city',
          'required': true
        },
        {
          'in': 'query',
          'name': 'delivery_zipcode',
          'required': true
        },
        {
          'in': 'query',
          'name': 'delivery_time',
          'required': true
        },
        {
          'in': 'query',
          'name': 'note',
          'required': false
        },
        {
          'in': 'query',
          'name': 'delivery_apt',
          'required': true
        },
        {
          'in': 'query',
          'name': 'delivery_state',
          'required': true
        },
        {
          'in': 'query',
          'name': 'billing_state',
          'required': true
        },
        {
          'in': 'query',
          'name': 'delivery_country',
          'required': true
        },
        {
          'in': 'query',
          'name': 'delivery_name',
          'required': true
        },
        {
          'in': 'query',
          'name': 'billing_apartment',
          'required': true
        },
        {
          'in': 'query',
          'name': 'delivery_method',
          'required': true
        }
      ]
    }
  },
  'GET /paymenttype': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /paymenttype': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'card_number',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'expiration',
          'type': 'number',
          'required': true
        },
        {
          'in': 'query',
          'name': 'csv',
          'type': 'number',
          'required': true
        },
        {
          'in': 'query',
          'name': 'type',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'billing_first',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'billing_last',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'billing_address',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'label',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'is_default',
          'type': 'boolean',
          'defaultsTo': false
        }
      ]
    }
  },
  'PATCH /paymenttype': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'card_number',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'expiration',
          'type': 'number',
          'required': true
        },
        {
          'in': 'query',
          'name': 'csv',
          'type': 'number',
          'required': true
        },
        {
          'in': 'query',
          'name': 'type',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'billing_first',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'billing_last',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'billing_address',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'label',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'is_default',
          'type': 'boolean',
          'defaultsTo': false
        }
      ]
    }
  },
  'DELETE /paymenttype': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'GET /product': {
    internal: true,
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /product': {
    internal: true,
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'name',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'variant_id',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'sku',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'upc',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'price',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'sale_price',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'long_description',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'short_description',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'category_id',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'brand',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'thumb',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'image',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'label',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'alt_img_1',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'alt_img_2',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'alt_img_3',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'is_selectable_meat',
          'type': 'boolean',
          'required': false
        },
        {
          'in': 'query',
          'name': 'is_selectable_produce',
          'type': 'boolean',
          'required': false
        },
        {
          'in': 'query',
          'name': 'nominal_size',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'unit_type',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'min_qty',
          'type': 'string',
          'required': false
        },
      ]
    }
  },
  'PATCH /product': {
    internal: true,
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'name',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'variant_id',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'sku',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'upc',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'price',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'sale_price',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'long_description',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'short_description',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'category_id',
          'type': 'number',
          'required': false
        },
        {
          'in': 'query',
          'name': 'brand',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'thumb',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'image',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'label',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'alt_img_1',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'alt_img_2',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'alt_img_3',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'is_selectable_meat',
          'type': 'boolean',
          'required': false
        },
        {
          'in': 'query',
          'name': 'is_selectable_produce',
          'type': 'boolean',
          'required': false
        },
        {
          'in': 'query',
          'name': 'nominal_size',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'unit_type',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'min_qty',
          'type': 'string',
          'required': false
        }
      ]
    }
  },
  'DELETE /product': {
    internal: true,
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'GET /test': {
    controller:'test',
    action:'index',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /user/create': {
    controller:'user',
    action:'createUser',
    internal: true,
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /user/get': {
    controller: 'user',
    action: 'getUserByKey',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'userId'
        }
      ]
    }
  },
  'GET /shoppinglist': {
    controller: 'shoppinglist',
    action: 'getItems',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'user_token',
          'required': true
        }
      ]
    }
  },
  'POST /shoppinglist': {
    controller: 'shoppinglist',
    action: 'addItem',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'user_token',
          'required': true
        },
        {
          'in': 'query',
          'name': 'product_id',
          'required': true
        }
      ]
    }
  },
  'PATCH /shoppinglist': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'user_token',
          'required': true
        },
        {
          'in': 'query',
          'name': 'product_id',
          'required': true
        }
      ]
    }
  },
  'DELETE /shoppinglist': {
    controller: 'shoppinglist',
    action: 'deleteItem',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'user_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'product_id',
          'required': true
        }
      ]
    }
  },
  'GET /v2/variants': {
    controller:'variants',
    action:'getVariants',
    internal: true,
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'key',
          'required': true
        }
      ]
    }
  },
  'GET /variants': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /variants': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'group_name',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'show_price',
          'type': 'boolean',
          'required': false
        }
      ]
    }
  },
  'PATCH /variants': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'group_name',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'show_price',
          'type': 'boolean',
          'required': false
        }
      ]
    }
  },
  'DELETE /variants': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'GET /metadata/feed': {
    controller: 'metadata',
    action: 'feed',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /metadata': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
    }
  },
  'POST /metadata': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'name': 'product_id',
          'in': 'query',
          'type': 'number',
          'required': true
        },
        {
          'name': 'upc',
          'in': 'query',
          'type': 'string',
          'required': false
        },
        {
          'name': 'environment',
          'in': 'query',
          'type': 'string',
          'required': false
        },
        {
          'name': 'shape',
          'in': 'query',
          'type': 'string',
          'required': false
        },
        {
          'type': 'string',
          'name': 'packaging',
          'in': 'query',
          'required': false
        },
        {
          'type': 'number',
          'name': 'min_d1',
          'in': 'query',
          'required': false
        },
        {
          'type': 'number',
          'name': 'avg_d1',
          'in': 'query',
          'required': false
        },
        {
          'type': 'number',
          'name': 'max_d1',
          'in': 'query',
          'required': false
        },
        {
          'type': 'number',
          'name': 'min_d2',
          'in': 'query',
          'required': false
        },
        {
          'type': 'number',
          'name': 'avg_d2',
          'in': 'query',
          'required': false
        },
        {
          'type': 'number',
          'name': 'max_d2',
          'in': 'query',
          'required': false
        },
        {
          'type': 'number',
          'name': 'min_d3',
          'in': 'query',
          'required': false
        },
        {
          'type': 'number',
          'name': 'avg_d3',
          'in': 'query',
          'required': false
        },
        {
          'type': 'number',
          'name': 'max_d3',
          'in': 'query',
          'required': false
        },
        {
          'name': 'invalid_orientations',
          'in': 'query',
          'type': 'string',
          'required': false
        },
        {
          'name': 'raft',
          'in': 'query',
          'type': 'boolean',
          'required': false
        },
        {
          'type': 'number',
          'name': 'avg_mass',
          'in': 'query',
          'required': false
        },
        {
          'type': 'string',
          'name': 'material',
          'in': 'query',
          'required': false
        },
        {
          'type': 'number',
          'name': 'load_instructions',
          'in': 'query',
          'required': false
        },
        {
          'type': 'number',
          'in': 'query',
          'name': 'shelf_life',
          'required': false
        }
      ]
    }
  },
  'DELETE /metadata': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'product_id',
          'type': 'int',
          'required': true
        },
        {
          'in': 'query',
          'name': 'upc',
          'type': 'int',
          'required': false
        },
        {
          'in': 'query',
          'name': 'shape',
          'type': 'int',
          'required': false
        },
        {
          'in': 'query',
          'name': 'material',
          'type': 'int',
          'required': false
        }
      ]
    }
  },
  'PATCH /metadata': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'product_id',
          'type': 'int',
          'required': true
        },
        {
          'in': 'query',
          'name': 'upc',
          'type': 'int',
          'required': false
        },
        {
          'in': 'query',
          'name': 'shape',
          'type': 'int',
          'required': false
        },
        {
          'in': 'query',
          'name': 'material',
          'type': 'int',
          'required': false
        }
      ]
    }
  },
  'GET /auth/getToken': {
    controller: 'auth',
    action: 'getToken',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'secret',
          'required': true,
          'description': 'Can be passed as a header or GET param'
        }
      ]
    }
  },
  'POST /register': {
    controller: 'auth',
    action: 'register',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'user_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'email',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'password',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'first_name',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'last_name',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'shelf_life',
          'type': 'string',
          'required': false
        }
      ],
      excludeParameters: ['#/parameters/TokenHeaderParam']
    }
  },
  'POST /registerUserByProvider': {
    controller: 'auth',
    action: 'registerUserByProvider',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'user_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'email',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'first_name',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'last_name',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'provider',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'picture',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'providerUserId',
          'type': 'string',
          'required': true
        }
      ]
    }
  },
  'POST /login': {
    controller: 'auth',
    action: 'login',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'email',
          'type': 'string',
          'required': true
        },
        {
          'in': 'query',
          'name': 'password',
          'type': 'string',
          'required': true
        }
      ],
      excludeParameters: ['#/parameters/TokenHeaderParam']
    }
  },
  'GET /logout': {
    controller: 'auth',
    action: 'logout',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      excludeParameters: ['#/parameters/TokenHeaderParam']
    }
  },
  'GET /auth/facebook': {
    controller: 'auth',
    action: 'facebookAuth',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'user_id',
          'required': false
        }
      ],
      excludeParameters: ['#/parameters/TokenHeaderParam']
    }
  },
  'GET /auth/facebook/callback': {
    controller: 'auth',
    action: 'facebookCallback',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      excludeParameters: ['#/parameters/TokenHeaderParam']
    }
  },
  'GET /auth/google': {
    controller: 'auth',
    action: 'googleAuth',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'user_id',
          'required': true
        }
      ]
    }
  },
  'GET /auth/google/callback': {
    controller: 'auth',
    action: 'googleCallback',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      excludeParameters: ['#/parameters/TokenHeaderParam']
    }
  },
  'GET /coretiming' : {
    controller: 'coretiming',
    action: 'getAll',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /simbatch' : {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /simruns' : {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /simrunsets' : {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'GET /factorydata/corecommands' : {
    controller: 'factory',
    action: 'getCoreCommands',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'limit',
          'required': false
        }
      ]
    }
  },
  'POST /coretiming': {
    controller: 'coretiming',
    action: 'addCoretiming',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'command_no',
          'required': false
        },
        {
          'in': 'query',
          'name': 'parent_command_no',
          'required': false
        },
        {
          'in': 'query',
          'name': 'type',
          'required': false
        },
        {
          'in': 'query',
          'name': 'op',
          'required': false
        },
        {
          'in': 'query',
          'name': 'carousel',
          'required': false
        },
        {
          'in': 'query',
          'name': 'bay',
          'required': false
        },
        {
          'in': 'query',
          'name': 'address',
          'required': false
        },
        {
          'in': 'query',
          'name': 'rover',
          'required': false
        },
        {
          'in': 'query',
          'name': 'order_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'bag_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'start_time',
          'required': false
        },
        {
          'in': 'query',
          'name': 'finish_time',
          'required': false
        },
        {
          'in': 'query',
          'name': 'duration',
          'required': false
        },
        {
          'in': 'query',
          'name': 'distance',
          'required': false
        },
        {
          'in': 'query',
          'name': 'speed',
          'required': false
        },
        {
          'in': 'query',
          'name': 'acceleration',
          'required': false
        },
        {
          'in': 'query',
          'name': 'deceleration',
          'required': false
        }
      ]
    }
  },
  'PATCH /coretiming': {
    controller: 'coretiming',
    action: 'addCoretiming',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'command_no',
          'required': false
        },
        {
          'in': 'query',
          'name': 'parent_command_no',
          'required': false
        },
        {
          'in': 'query',
          'name': 'type',
          'required': false
        },
        {
          'in': 'query',
          'name': 'op',
          'required': false
        },
        {
          'in': 'query',
          'name': 'carousel',
          'required': false
        },
        {
          'in': 'query',
          'name': 'bay',
          'required': false
        },
        {
          'in': 'query',
          'name': 'address',
          'required': false
        },
        {
          'in': 'query',
          'name': 'rover',
          'required': false
        },
        {
          'in': 'query',
          'name': 'order_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'bag_id',
          'required': true
        },
        {
          'in': 'query',
          'name': 'start_time',
          'required': false
        },
        {
          'in': 'query',
          'name': 'finish_time',
          'required': false
        },
        {
          'in': 'query',
          'name': 'duration',
          'required': false
        },
        {
          'in': 'query',
          'name': 'distance',
          'required': false
        },
        {
          'in': 'query',
          'name': 'speed',
          'required': false
        },
        {
          'in': 'query',
          'name': 'acceleration',
          'required': false
        },
        {
          'in': 'query',
          'name': 'deceleration',
          'required': false
        }
      ]
    }
  },
  'DELETE /coretiming':{
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'GET /user':{
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'POST /user':{
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'email',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'first',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'last',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'phone',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'password',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'phone_verified',
          'type': 'boolean',
          'defaultsTo': false
        },
        {
          'in': 'query',
          'name': 'email_verified',
          'type': 'boolean',
          'defaultsTo': false
        },
        {
          'in': 'query',
          'name': 'picture',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'fb_id',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'google_id',
          'type': 'string',
          'required': false
        }
      ]
    }
  },
  'PATCH /user':{
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'email',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'first',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'last',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'phone',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'password',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'phone_verified',
          'type': 'boolean',
          'defaultsTo': false
        },
        {
          'in': 'query',
          'name': 'email_verified',
          'type': 'boolean',
          'defaultsTo': false
        },
        {
          'in': 'query',
          'name': 'picture',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'fb_id',
          'type': 'string',
          'required': false
        },
        {
          'in': 'query',
          'name': 'google_id',
          'type': 'string',
          'required': false
        }
      ]
    }
  },
  'DELETE /user':{
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'id',
          'required': true
        }
      ]
    }
  },
  'POST /upload/uploadObject': {
    controller: 'upload',
    action: 'uploadObject',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'image',
          'description' : 'send base 64 data which needs to store as image in bucket',
          'required': true
        },
        {
          'in': 'query',
          'name': 'file_name',
          'description' : 'file name which identified in bucket by name',
          'required': true
        },
        {
          'in': 'query',
          'name': 'file_type',
          'description' : 'file type for mime support in bucket',
          'required': true
        }
      ]
    }
  },
  'POST /inventory/uploadInventory': {
    controller: 'inventory',
    action: 'inventoryUpload',
    swagger: {
      consumes : 'multipart/form-data',
      parameters: [
        {
          'in': 'formData',
          'name': 'file',
          'description' : 'csv file which contains bulk data for specific table',
          'required': true,
          'type': 'file'
        },
        {
          'in': 'query',
          'name': 'table',
          'required': true
        },
        {
          'in': 'query',
          'name': 'type',
          'required': true
        }
      ]
    }
  },

  'GET /inventory/inventoryDownload': {
    controller: 'inventory',
    action: 'inventoryDownload',
    internal: true,
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'table',
          'required': true
        }
      ]
    }
  },

  'POST /admin/login' : {
    controller: 'admin',
    action: 'login',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: "",
      parameters: [
        {
          'in': 'query',
          'name': 'username',
          'required': true
        },
        {
          'in': 'query',
          'name': 'password',
          'required': true
        }
      ]
    }
  },

  'GET /admin/permission' : {
    controller: 'admin',
    action: 'permission',
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  }
};

module.exports.disabledRoutes = {

  // GET POST allowed
  'PUT /environmentmeasurements': {response: 'notFound'},
  'DELETE /environmentmeasurements': {response: 'notFound'},
  'PATCH /environmentmeasurements': {response: 'notFound'},

  // GET POST PUT allowed
  'DELETE /environments': {response: 'notFound'},
  'PATCH /environments': {response: 'notFound'},


  // GET POST PUT allowed
  'DELETE /freshinventorydata': {response: 'notFound'},
  'PATCH /freshinventorydata': {response: 'notFound'},


  // GET POST PUT allowed
  'DELETE /inventoryenvironmentdurations': {response: 'notFound'},
  'PATCH /inventoryenvironmentdurations': {response: 'notFound'},


  // All defaults disallowed
  'GET /feedback': {response: 'notFound'},
  'PATCH /feedback': {response: 'notFound'},
  'PUT /feedback': {response: 'notFound'},
  'DELETE /feedback': {response: 'notFound'},

  // All defaults disallowed
  'GET /cart': {response: 'notFound'},
  'POST /cart': {response: 'notFound'},
  'PATCH /cart': {response: 'notFound'},
  'PUT /cart': {response: 'notFound'},

  // All defaults disallowed
  'GET /adminuserpermission': {response: 'notFound'},
  'POST /adminuserpermission': {response: 'notFound'},
  'PUT /adminuserpermission': {response: 'notFound'},
  'DELETE /adminuserpermission': {response: 'notFound'},

  // All defaults disallowed
  'PATCH /permissiongroup': {response: 'notFound'},
  'PUT /permissiongroup': {response: 'notFound'},
  'DELETE /permissiongroup': {response: 'notFound'},

  // All defaults disallowed
  'PATCH /permissiongrouproutes': {response: 'notFound'},
  'PUT /permissiongrouproutes': {response: 'notFound'},

  // All defaults disallowed
  'POST /approutes': {response: 'notFound'},
  'PATCH /approutes': {response: 'notFound'},
  'PUT /approutes': {response: 'notFound'},
  'DELETE /approutes': {response: 'notFound'},

  // All defaults disallowed
  'GET /user': {response: 'notFound'},
  'POST /user': {response: 'notFound'},
  'PATCH /user': {response: 'notFound'},
  'PUT /user': {response: 'notFound'},
  'DELETE /user': {response: 'notFound'},

  // All defaults disallowed
  'PATCH /coretiming': {response: 'notFound'},
  'PUT /coretiming': {response: 'notFound'},
  'DELETE /coretiming': {response: 'notFound'},

  // GET allowed
  'POST /neighborhood': {response: 'notFound'},
  'PATCH /neighborhood': {response: 'notFound'},
  'PUT /neighborhood': {response: 'notFound'},
  'DELETE /neighborhood': {response: 'notFound'},

  // GET/POST allowed
  'PATCH /product': {response: 'notFound'},
  'PUT /product': {response: 'notFound'},
  'DELETE /product': {response: 'notFound'},

  // GET allowed
  'POST /locations': {response: 'notFound'},
  'PATCH /locations': {response: 'notFound'},
  'PUT /locations': {response: 'notFound'},
  'DELETE /locations': {response: 'notFound'},

  // GET DELETE POST allowed
  'PATCH /cartitem': {response: 'notFound'},
  'PUT /cartitem': {response: 'notFound'},

  // POST allowed
  'GET /paymenttype': {response: 'notFound'},
  'PATCH /paymenttype': {response: 'notFound'},
  'PUT /paymenttype': {response: 'notFound'},
  'DELETE /paymenttype': {response: 'notFound'},

  // GET POST DELETE PATCH allowed
  'PUT /order': {response: 'notFound'},

  'POST /inventory': {response: 'notFound'},

  'PUT /shoppinglist': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },
  'PATCH /shoppinglist': {
    swagger: {
      tag: { name: '' },
      summary: "",
      description: ""
    }
  },

  // GET allowed
  'PATCH /variants': {response: 'notFound'},
  'PUT /variants': {response: 'notFound'},
  'DELETE /variants': {response: 'notFound'},

  'PATCH /v2/variants': {response: 'notFound'},
  'PUT /v2/variants': {response: 'notFound'},
  'DELETE /v2/variants': {response: 'notFound'},

  'PATCH /productscan': {response: 'notFound'},
  'DELETE /productscan': {response: 'notFound'},

  'PATCH /groundtruthgrades': {response: 'notFound'},
  'DELETE /groundtruthgrades': {response: 'notFound'},

  // GET/POST allowed
  'PATCH /uptime': {response: 'notFound'},
  'PUT /uptime': {response: 'notFound'},
  'DELETE /uptime': {response: 'notFound'},

  // GET/POST allowed
  'PATCH /defectgrade': {response: 'notFound'},

  // GET/POST allowed
  'PATCH /labelguides': {response: 'notFound'},
  'DELETE /labelguides': {response: 'notFound'},

  // GET/POST allowed
  'PATCH /defectprogressions': {response: 'notFound'},
  'DELETE /defectprogressions': {response: 'notFound'},

  // GET/POST allowed
  'PATCH /progressionmodels': {response: 'notFound'},
  'DELETE /progressionmodels': {response: 'notFound'},

   // GET/POST allowed
   'PATCH /basicgradeoptions': {response: 'notFound'},
   'DELETE /basicgradeoptions': {response: 'notFound'},
};
