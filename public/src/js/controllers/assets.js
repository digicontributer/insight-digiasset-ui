'use strict';

angular.module('insight.assets').controller('AssetsController',
  function($scope, $rootScope, $routeParams, $location, Global, assetInfo, assetInfoWithTxes, assetMetadata ) {

    $scope.metadataExpanded = false;

    $scope.init = function() {
      assetInfo.get({ assetId: $routeParams.assetId, txid: encodeURIComponent($routeParams.txId + ':' + $routeParams.index) }, function(resp){
        $scope.asset = resp;
        $scope.totalSupply = 0;
        var divisors = Math.pow(10, $scope.asset.divisibility);
        $scope.totalSupply = parseFloat($scope.totalSupply);
        $scope.totalSupply += $scope.asset.totalSupply / divisors;
        $scope.totalSupply = $scope.totalSupply.toFixed($scope.asset.divisibility)
        assetInfoWithTxes.get({ assetId: $routeParams.assetId }, function(data) {
          $scope.holders = data.holders;
          $scope.issuances = data.issuances.map(function(issuance) {
            var totalAsset = 0;
            issuance.vout.forEach(function(vout) {
              vout.assets.forEach(function (asset) {
                var divisor = Math.pow(10, asset.divisibility);
                totalAsset = parseFloat(totalAsset);
                totalAsset+= asset.amount / divisor;
                totalAsset = totalAsset.toFixed(asset.divisibility); 
              });         
            });
            return {
              txid: issuance.txid,
              totalSent: issuance.totalsent,
              totalAssetSent: totalAsset
            };
          });
          $scope.transfers = data.transfers;
          assetMetadata.get({ assetId: $routeParams.assetId, txid: $routeParams.txId + ':' + $routeParams.index }, function(metadata) {
            $scope.metadata = metadata.metadataOfIssuence.data;
            $scope.metaUserData = $scope.metadata.userData;
            $scope.urls = $scope.metadata.urls;
            $scope.torrentLink;
            var assetTorrent;
            var found = false;
            for (var i = 0 ; i < data.issuances.length && !found ; i++) {
              if (data.issuances[i].txid == metadata.issuanceTxid) {
                found = true;
                assetTorrent = data.issuances[i].ccdata[0].torrentHash;
              }
            }
            if (assetTorrent) {
              $scope.torrentLink = 'magnet:?xt=urn:btih:'+ assetTorrent + '&tr=udp%3a%2f%2fopen.demonii.com%3a1337&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a80&tr=udp%3a%2f%2ftracker.publicbt.com%3a80&tr=udp%3a%2f%2ftracker.webtorrent.io%3a80&tr=udp%3a%2f%2ftracker.coppersurfer.tk%3a6969&tr=udp%3a%2f%2ftracker.leechers-paradise.org%3a6969&tr=http://182.176.139.129:6969/announce&tr=udp://public.popcorn-tracker.org:6969/announce';
            }  
          });
        });
      });
    }

    $scope.expandMetadata = function() {
      $scope.metadataExpanded = !$scope.metadataExpanded;
    }

    $scope.params = $routeParams;

});
