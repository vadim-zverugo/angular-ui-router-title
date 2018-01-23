'use strict';

angular.module('angular-ui-router-title', []).directive('uiRouterTitle', ['$transitions', '$interpolate', function($transitions, $interpolate) {
  return {
    restrict: 'A',
    scope: false,
    link: function ($scope, el, attr) {
      $transitions.onSuccess({}, function(transition) {
        var title = attr.uiRouterTitle; // default title.
        var toState = transition.to();

        if (toState && toState.data && toState.data.pageTitle) {
          title = toState.data.pageTitle;
        }

        var resolveTokens = transition.getResolveTokens();
        var resolves = {};
        for (var i = 0; i < resolveTokens.length; i++) {
          var resolveToken = resolveTokens[i];
          resolves[resolveToken] = transition.injector().get(resolveToken);
        }

        title = $interpolate(title)(resolves);

        el.text(title);
      });
    }
  };
}]);
