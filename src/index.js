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
  window.smallAngular = smallAngular;
})();

