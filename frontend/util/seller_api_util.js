var ServerActions = require('../actions/server_actions');

var SellerApiUtil = {
  fetchSellers: function() {
    $.ajax({
        method: 'GET',
        url: '/api/stores',
        success: function(stores) {
          ServerActions.setSellers(stores);
        }
      });
  },

  getSellerById: function(sellerId) {
    $.ajax({
        method: 'GET',
        url: '/api/stores/' + sellerId,
        success: function(store) {
          ServerActions.addSeller(store);
        }
      });
  },

  create: function(storeParams, successCallback) {
    console.log(storeParams);
    $.ajax({
        method: 'POST',
        url: '/api/stores',
        data: {store: storeParams},
        success: function(store) {
          successCallback();
          ServerActions.addSeller(store);
        }
      });
  },

  destroy: function() {

  },

  primarySearch: function(searchParams) {
    $.ajax({
        method: 'GET',
        url: '/api/search/stores',
        data: {search_params: searchParams},
        success: function(data) {
          ServerActions.setSellers(data);
        }
      });
  }
};

module.exports = SellerApiUtil;
