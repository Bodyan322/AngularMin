(function() {
  const directives = [];
  const smallAngular = {
    directive(name, func) {
      directives.push({ name, func });
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
    bootstrap(node) {
      const baseNode = node || document.querySelector('[ng-app]');
      const childNodes = baseNode.querySelectorAll('*');
      this.compile(baseNode);
      childNodes.forEach(elem => this.compile(elem));
    }
  };
  smallAngular.directive('ng-app', function(el) {
    return null;
  });
  smallAngular.directive('ng-show', function(el) {
    return null;
  });
  smallAngular.directive('ng-model', function(el) {
    return null;
  });
  smallAngular.directive('ng-make-short', function(el) {
    return null;
  });
  smallAngular.directive('ng-bind', function(el) {
    return null;
  });
  smallAngular.directive('ng-init', function(el) {
    return null;
  });

  window.smallAngular = smallAngular;
})();

smallAngular.bootstrap();

