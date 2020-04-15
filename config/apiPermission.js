/**
 * API Permission configuration
 * (sails.config.apiPermission)
 */

module.exports.apiPermission = {

  /***************************************************************************
   *                                                                         *
   * Any API permission config this Sails app should use during development. *
   *                                                                         *
   ***************************************************************************/

   config : [
    {
      id : 1,
      secret: '381/ca26dfcbddb-613c1b376c19f5b525=',
      apiKey : '889a68d7-c7e8-4625-9ed3-d49a6e356209',
      permissions : {
        'allowQueryAllOrders': true,
        'allowCrossOriginAccess': true,
        'allowModifyCart' : true,
        'allowResetAllOrder' : true,
        'allowCartOperation' : true,
        'allowModifyInventory' : true,
        'allowOrderPlace' : true,
        'allowGetOrderByUser' : true,
        'allowModifyShopping' : true,
        'allowGetShopping' : true,
        'allowCreateUser' : true,
        'allowGetUser' : true,
        'allowAddRemoveItemFromCart' : true,
        'allowGenerateDemoOrder' : true,
        'allowOrderReport' : true,
        'allowUpdateUserPermission' : true,
        'allowDeleteGroupRoutes' : true
      }
    },
    {
      id : 2,
      secret: '4d878_5a2d7e42d0a-1674b359e89b03ba=',
      apiKey : 'c0d5a688-660d-42b2-b6b6-ba3019fd02c9',
      permissions : {
        'hasDashboardPermissions': true,
        'allowQueryAllOrders': false,
        'allowModifyCart' : true,
        'allowResetAllOrder' : false,
        'allowCartOperation' : true,
        'allowModifyInventory' : true,
        'allowOrderPlace' : true,
        'allowGetOrderByUser' : true,
        'allowModifyShopping' : true,
        'allowGetShopping' : true,
        'allowCreateUser' : true,
        'allowGetUser' : true,
        'allowAddRemoveItemFromCart' : true,
        'allowGenerateDemoOrder' : false
      }
    },
    {
      id : 3,
      secret: 'adceb6f3/6c39ba3e-5475a027a8030301=',
      apiKey : '3e8535a5-054d-4012-8883-1c0f83592aa4',
      permissions : {
        'hasDashboardPermissions': true,
        'allowQueryAllOrders': false,
        'allowModifyCart' : true,
        'allowResetAllOrder' : false,
        'allowCartOperation' : true,
        'allowModifyInventory' : true,
        'allowOrderPlace' : true,
        'allowGetOrderByUser' : true,
        'allowModifyShopping' : true,
        'allowGetShopping' : true,
        'allowCreateUser' : true,
        'allowGetUser' : true,
        'allowAddRemoveItemFromCart' : true,
        'allowGenerateDemoOrder' : false
      }
    },
    {
      id : 4,
      secret: 'ec7-d400b3574d-6fabdb9cd9_70b1040bf=',
      apiKey : '3178ec3e-b5df-4946-9757-e37ae00f5a9f',
      permissions : {
        'hasDashboardPermissions': true,
        'allowQueryAllOrders': false,
        'allowModifyCart' : true,
        'allowResetAllOrder' : false,
        'allowCartOperation' : true,
        'allowModifyInventory' : true,
        'allowOrderPlace' : true,
        'allowGetOrderByUser' : true,
        'allowModifyShopping' : true,
        'allowGetShopping' : true,
        'allowCreateUser' : true,
        'allowGetUser' : true,
        'allowAddRemoveItemFromCart' : true,
        'allowGenerateDemoOrder' : false
      }
    },
    {
      id : 4,
      secret: '1234567890_UNIT_TESTS_0987654321',
      apiKey: '889a68d7-c7e8-4625-9ed3-d49a6e356209',
      permissions : {
        'hasDashboardPermissions': true,
        'allowQueryAllOrders': true,
        'allowModifyCart' : true,
        'allowResetAllOrder' : true,
        'allowCartOperation' : true,
        'allowModifyInventory' : true,
        'allowOrderPlace' : true,
        'allowGetOrderByUser' : true,
        'allowModifyShopping' : true,
        'allowGetShopping' : true,
        'allowCreateUser' : true,
        'allowGetUser' : true,
        'allowAddRemoveItemFromCart' : true,
        'allowGenerateDemoOrder' : true,
        'allowUpdateUserPermission' : true,
        'allowDeleteGroupRoutes' : true
      }
    },
    {
      id : 5,
      secret: 'fd8-e400b3574e-7fabdb9cd0_80b1040bf=',
      apiKey : 'db2d240b-f958-441c-a9b8-fee4bcdaf596',
      permissions : {
        'allowQueryAllOrders': true,
        'allowCrossOriginAccess': true,
        'allowModifyCart' : true,
        'allowResetAllOrder' : true,
        'allowCartOperation' : true,
        'allowModifyInventory' : true,
        'allowOrderPlace' : true,
        'allowGetOrderByUser' : true,
        'allowModifyShopping' : true,
        'allowGetShopping' : true,
        'allowCreateUser' : true,
        'allowGetUser' : true,
        'allowAddRemoveItemFromCart' : true,
        'allowGenerateDemoOrder' : true,
        'allowOrderReport' : true
      }
    },
    {
      id : 6,
      secret: 'ge9-f511c4685f-8fbcec0de1_91c2151ce=',
      apiKey : '9a38c58b-6986-4fcd-bea7-d56e62c8a517',
      permissions : {
        'allowQueryAllOrders': true,
        'allowCrossOriginAccess': true,
        'allowModifyCart' : true,
        'allowResetAllOrder' : true,
        'allowCartOperation' : true,
        'allowModifyInventory' : true,
        'allowOrderPlace' : true,
        'allowGetOrderByUser' : true,
        'allowModifyShopping' : true,
        'allowGetShopping' : true,
        'allowCreateUser' : true,
        'allowGetUser' : true,
        'allowAddRemoveItemFromCart' : true,
        'allowGenerateDemoOrder' : true,
        'allowOrderReport' : true
      }
    }
  ],

  store: [
    {
      id : 1,
      apiKey : '889a68d7-c7e8-4625-9ed3-d49a6e356209',
      storeName : 'test1'
    },
    {
      id : 2,
      apiKey : 'c0d5a688-660d-42b2-b6b6-ba3019fd02c9',
      storeName : 'test2'
    },
    {
      id : 3,
      apiKey : '3e8535a5-054d-4012-8883-1c0f83592aa4',
      storeName : 'test3'
    },
    {
      id : 4,
      apiKey : '3178ec3e-b5df-4946-9757-e37ae00f5a9f',
      storeName : 'test4'
    },
    {
      id : 5,
      apiKey : 'db2d240b-f958-441c-a9b8-fee4bcdaf596',
      storeName : 'test5'
    },
    {
      id : 6,
      apiKey : '9a38c58b-6986-4fcd-bea7-d56e62c8a517',
      storeName : 'mealteam'
    }
  ],

  // skip routes which is not required key header params in query string
  skipRoutes : [
    '/neighborhood',
    '/detectionpredictions',
    '/images',
    '/cameras',
    '/camerasettings',
    '/inspectionstations',
    '/datasets',
    '/labeljobs',
    '/boundingboxlabels',
    '/models',
    '/predictedgrades',
    '/groundtruthgrades',
    '/inspectionresults',
    '/operators',
    '/curatedorder',
    '/simbatch',
    '/simruns',
    '/simrunsets',
    '/metadata',
    '/productscan',
    '/annotationlabels',
    '/supplier',
    '/shelflife',
    '/itemsources',
    '/stockorderitem',
    '/stockorder',
    '/adminuser',
    '/admin/login',
    '/admin/permission',
    '/version',
    '/deliveriestemperature',
    '/delivery/postmatesDeliveryStatusWebhooks',
    '/defectgrade',
    '/defectprogressions',
    '/labelguides',
    '/progressionmodels',
    '/basicgradeoptions',
    '/register',
    '/login',
    '/temporarystoragelocations',
    '/subscribeinductionmessages',
    '/inductionmessageinfo',
    '/sendAcknowledgeForMessage',
    '/flushRedisCache',
    '/flushRedisCache',
    '/validatemessage',
    '/sendacknowledgement'
  ]

};
