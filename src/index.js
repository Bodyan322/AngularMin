(function() {
  const directives = [{
    name: 'ng-model',
    functions: []
  },
  {
    name: 'ng-init',
    functions: []
  },
  {
    name: 'ng-app',
    functions: []
  },
  {
    name: 'ng-show',
    functions: []
  },
  {
    name: 'ng-make-short',
    functions: []
  },
  {
    name: 'ng-bind',
    functions: []
  }];

  const smallAngular = {
    directive(name, callback) {
      directives.push({ name, functions: callback });
    },
    compile(node) {
      return null;
    },
    bootstrap(node) {
      return null;
    }
  };

  smallAngular.directive('ng-app', function(el) {
    console.log('called directive ng-show on element', el);
  });
  smallAngular.directive('ng-show', function(el) {
    console.log('called directive ng-show on element', el);
  });
  smallAngular.directive('ng-model', function(el) {
    console.log('called directive ng-show on element', el);
  });
  smallAngular.directive('ng-make-short', function(el) {
    console.log('called directive ng-show on element', el);
  });
  smallAngular.directive('ng-bind', function(el) {
    console.log('called directive ng-show on element', el);
  });
  smallAngular.directive('ng-init', function(el) {
    console.log('called directive ng-show on element', el);
  });
  window.smallAngular = smallAngular;
})();
