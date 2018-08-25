'use strict';

angular.module('insight.assets')
  .factory('assetInfo',
    function($resource) {
    return $resource('http://139.99.149.154:8080/api/getassetinfo?assetId=:assetId&utxo=:txid', {}, {
      get: {
        method: 'GET',
        interceptor: {
          response: function (res) {
            return res.data;
          },
          responseError: function (res) {
            if (res.status === 404) {
              return res;
            }
          }
        }
      }
    });
  })
  .factory('assetInfoWithTxes',
    function($resource) {
      return $resource('http://139.99.149.154:8080/api/getassetinfowithtransactions?assetId=:assetId', {}, {
        get: {
          method: 'GET',
          interceptor: {
            response: function (res) {
              return res.data;
            },
            responseError: function (res) {
              if (res.status === 404) {
                return res;
              }
            }
          }
        }
      });
    })
    .factory('assetMetadata',
    function($resource) {
      return $resource('http://localhost:8080/v2/assetmetadata/:assetId/:txid', {}, {
        get: {
          method: 'GET',
          interceptor: {
            response: function (res) {
              return res.data;
            },
            responseError: function (res) {
              if (res.status === 404) {
                return res;
              }
            }
          }
        }
      });
    })
    .factory('getAddressInfo', 
    function($resource) {
      return $resource('http://139.99.149.154:8080/api/getaddressinfo?address=:addr', {}, {
        get: {
          method: 'GET',
          interceptor: {
            response: function (res) {
              return res.data;
            },
            responseError: function (res) {
              if (res.status === 404) {
                return res;
              }
            }
          }
        }
      });    
    })
    .factory('assetTransactionsByAddress', 
    function($resource) {
      return $resource('http://139.99.149.154:8080/api/getaddressinfowithtransactions?address=:addr', {}, {
        get: {
          method: 'GET',
          interceptor: {
            response: function (res) {
              return res.data;
            },
            responseError: function (res) {
              if (res.status === 404) {
                return res;
              }
            }
          }
        }
      });    
    })
    .factory('getBlockWithAssetTransactions', 
    function($resource) {
      return $resource('http://139.99.149.154:8080/api/getblockwithtransactions?height_or_hash=:hash', {}, {
        get: {
          method: 'GET',
          interceptor: {
            response: function (res) {
              return res.data;
            },
            responseError: function (res) {
              if (res.status === 404) {
                return res;
              }
            }
          }
        }
      });    
    });

 