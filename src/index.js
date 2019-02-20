/* eslint-disable no-eval*/
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

    el.style.display = eval(data) ? 'block' : 'none';
    rootScope.$watch(() => eval(el.getAttribute('ng-show')), () => {
      el.style.display = eval(data) ? 'block' : 'none';
    });
  });
  smallAngular.directive('ng-hide', function(rootScope, el) {
    const data = el.getAttribute('ng-hide');

    el.style.display = eval(data) ? 'none' : 'block';
    rootScope.$watch(() => eval(el.getAttribute('ng-hide')), () => {
      el.style.display = eval(data) ? 'none' : 'block';
    });
  });
  smallAngular.directive('ng-model', function(rootScope, el) {
    const data = el.getAttribute('ng-model');
    el.addEventListener('input', function() {
      rootScope[data] = el.value;
      rootScope.$apply();
    });
    rootScope.$watch(data, () => {
      el.value = eval(data);
    });
  });
  smallAngular.directive('ng-bind', function(rootScope, el) {
    const data = el.getAttribute('ng-bind');
    el.innerHTML = rootScope[data];
    rootScope.$watch(() => el.getAttribute('ng-bind'), () => {
      el.innerHTML = rootScope[data];
    });
  });
  smallAngular.directive('ng-init', function(rootScope, el) {
    const data = el.getAttribute('ng-init');
    eval(data);
  });
  smallAngular.directive('ng-click', function(rootScope, el) {
    el.addEventListener('click', function() {
      const data = el.getAttribute('ng-click');
      eval(data);
      rootScope.$apply();
    });
  });
  smallAngular.directive('ng-make-short', function(rootScope, el) {
    const strLen = el.getAttribute('length') || 5;
    el.innerText = `${el.innerText.slice(0, strLen)}...`;
    rootScope.$watch(() => el.getAttribute('length'), () => {
      el.innerText = `${el.innerText.slice(0, strLen)}...`;
    });
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
    const [, , collectionName] = data.split(' ');
    const parentEl = el.parentNode;
    const repeatFunc = () => {
      const collect = eval(collectionName);
      const sameEl = document.querySelectorAll(`[ng-repeat="${data}"]`);

      for (const item of collect) {
        const clonedEl = el.cloneNode(false);

        clonedEl.innerHTML = item;
        parentEl.appendChild(clonedEl);
      }

      for (const el of sameEl) {
        el.remove();
      }
    };
    repeatFunc();
    rootScope.$watch(collectionName, () => {
      repeatFunc();
    });
  });

  window.smallAngular = smallAngular;
})();

smallAngular.bootstrap();

