(function() {
  const directives = [{}];

  const smallAngular = {
    directive() {
      // do smth
    },
    compile(node) {
      directives['ng-click'].forEach(cb => cb(node));
    },
    bootstrap(node) {
      node.queryselectorAll('*').forEach(el => {
        this.compile(el);
      });
    }
  };

  smallAngular.directive('ng-model', function(el) {
    // do smth
  });
  smallAngular.directive('ng-click', function(el) {
    // do smth
  });

  smallAngular.directive('ng-show', function(el) {
    // do smth
  });

  smallAngular.directive('ng-hide', function(el) {
    // do smth
  });
  window.smallAngular = smallAngular;
})();

window.smallAngular.directive('make_short', function(el) {
// do smth
});


// smallAngular.bootstrap(node) 
//   mount app to this node
//   or
//   find data attr ng-app - mount app to this node
