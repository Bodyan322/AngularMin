(function() {
  const directives = [];
  const smallAngular = {
    directive(name, callback) {
      directives.push({ name, func: callback });
    },
    compile(node) {
      directives.forEach(elem => {
        for (let i = 0; i < node.attributes.length; i++) {
          if (node.attributes[i].name === elem.name) {
            elem.func(node, node.attributes[i].value);
          }
        }
      });
    },
    bootstrap(node = '[ng-app]') {
      const Nodes = document.querySelector(node);
      const childNodes = Nodes.querySelectorAll('*');

      childNodes.forEach(elem => this.compile(elem));
    }
  };

  smallAngular.directive('ng-app', function(el) {
    console.log('called directive ng-app on element', el);
  });
  smallAngular.directive('ng-show', function(el) {
    console.log('called directive ng-show on element', el);
  });
  smallAngular.directive('ng-model', function(el) {
    console.log('called directive ng-model on element', el);
  });
  smallAngular.directive('ng-make-short', function(el) {
    console.log('called directive ng-make-short on element', el);
  });
  smallAngular.directive('ng-bind', function(el) {
    console.log('called directive ng-bind on element', el);
  });
  smallAngular.directive('ng-init', function(el) {
    console.log('called directive ng-init on element', el);
  });
  window.smallAngular = smallAngular;
})();
