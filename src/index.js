(function() {
  const directives = [];
  const watchers = [];
  const rootScope = window;

  rootScope.$watch = (name, watcher) => {
    watchers.push({ name, watcher });
  };

  rootScope.$apply = () => {
    watchers.forEach(({ watcher }) => watcher());
  };

  const smallAngular = {
    directive(name, func) {
      directives.push({ name, func });
    },
    compile(node) {
      directives.forEach(elem => {
        for (let i = 0; i < node.attributes.length; i++) {
          const { name } = node.attributes[i];

          if (name === elem.name) {
            elem.func(rootScope, node, null);
          }
        }
      });
    },
    bootstrap(node) {
      const baseNode = node || document.querySelector('[ng-app]');
      const childNodes = baseNode.querySelectorAll('*');
      this.compile(baseNode);
      childNodes.forEach(this.compile);
    }
  };
  smallAngular.directive('ng-show', function(rootScope, el) {
    const data = el.getAttribute('ng-show');

    el.style.display = rootScope.eval(data) ? 'block' : 'none';
    rootScope.$watch(data, () => {
      el.style.display = rootScope.eval(data) ? 'block' : 'none';
    });
  });
  smallAngular.directive('ng-hide', function(rootScope, el) {
    const data = el.getAttribute('ng-hide');

    el.style.display = rootScope.eval(data) ? 'none' : 'block';
    rootScope.$watch(data, () => {
      el.style.display = rootScope.eval(data) ? 'none' : 'block';
    });
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
  smallAngular.directive('ng-init', function(rootScope, el) {
    const data = el.getAttribute('ng-init');
    rootScope.eval(data);
  });

  window.smallAngular = smallAngular;
})();

smallAngular.bootstrap();

