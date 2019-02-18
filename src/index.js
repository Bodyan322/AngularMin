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
  smallAngular.directive('ng-model', function(rootScope, el) {
    const data = el.getAttribute('ng-model');
    el.addEventListener('input', function() {
      rootScope[data] = el.value;
      rootScope.$apply();
    });
    rootScope.$watch(data, () => {
      el.value = rootScope.eval(data);
    });
  });
  smallAngular.directive('ng-bind', function(rootScope, el) {
    const data = el.getAttribute('ng-bind');
    el.innerHTML = rootScope[data];
    rootScope.$watch(data, () => {
      el.innerHTML = rootScope[data];
    });
  });
  smallAngular.directive('ng-init', function(rootScope, el) {
    const data = el.getAttribute('ng-init');
    rootScope.eval(data);
  });
  smallAngular.directive('ng-click', function(rootScope, el) {
    el.addEventListener('click', function() {
      const data = el.getAttribute('ng-click');
      rootScope.eval(data);
      rootScope.$apply();
    });
  });
  smallAngular.directive('ng-make-short', function(rootScope, el) {
    const strLen = el.getAttribute('length') || 5;
    el.innerHTML = `${el.innerHTML.slice(0, strLen)}...`;
    rootScope.$watch(() => ({}), () => {
      el.innerText = `${el.innerText.slice(0, strLen)}...`;
    });
    rootScope.$apply();
  });
  smallAngular.directive('ng-random-color', function(rootScope, el) {
    const colored = () => Math.floor(Math.random() * 255);

    el.addEventListener('click', function() {
      const backgroundColor = `rgb(${colored()}, ${colored()}, ${colored()})`;

      el.style.background = backgroundColor;
    });
  });
  smallAngular.directive('ng-repeat', function(rootScope, el) {
    const data = el.getAttribute('ng-repeat');
    const collectionName = data.split(' ')[2];
    const parentEl = el.parentNode;

    rootScope.$watch(collectionName, () => {
      const collect = Array.from(rootScope[collectionName]);
      const sameEl = Array.from(document.querySelectorAll(`[ng-repeat="${data}"]`));

      collect.forEach(item => {
        const clonedEl = el.cloneNode(false);

        clonedEl.innerHTML = item;
        parentEl.appendChild(clonedEl);
      });

      for (const el of sameEl) {
        el.remove();
      }
    });

    rootScope.$apply();
  });

  window.smallAngular = smallAngular;
})();

smallAngular.bootstrap();

