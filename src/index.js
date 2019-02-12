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
    directive() {
      return null;
    },
    compile(node) {
      return null;
    },
    bootstrap(node) {
      return null;
    }
  };
  window.smallAngular = smallAngular;
})();

