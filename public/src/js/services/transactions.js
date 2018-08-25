'use strict';

angular.module('insight.transactions')
  .factory('Transaction',
    function($resource) {
    return $resource(window.apiPrefix + '/tx/:txId', {
      txId: '@txId'
    }, {
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
  .factory('TransactionsAsset',
    function($resource) {
    return $resource('http://139.99.149.154:8080/api/gettransaction?txid=:txId', {
      txId: '@txId'
    }, {
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
  .factory('TransactionsByBlock',
    function($resource) {
    return $resource(window.apiPrefix + '/txs', {
      block: '@block'
    });
  })
  .factory('TransactionsByAddress',
    function($resource) {
    return $resource(window.apiPrefix + '/txs', {
      address: '@address'
    });
  })
  .factory('Transactions',
    function($resource) {
      return $resource(window.apiPrefix + '/txs');
  });
