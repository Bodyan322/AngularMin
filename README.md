<h1 align='center'>Implementation of Angular</h1>
1.Install npm modules -> `npm i`;
2. Open your page in browser -> `npm start`.

## Describe
In "index.js" you can find object smallAngular implementation and its methods:

* `Directive` - create new directive;
* `Compile` - check directives on DOM nodes and run them;
* `Bootstrap` - initialize work our project. It is looking for `ng-app` tag and run app;

## Directives
* `ng-init`  -  initialize start params;
* `ng-click` -  add event 'click' on node;
* `ng-show`  -  show information, it depends from condition 'true' or 'false';
* `ng-hide`  -  hide information, it depends from condition 'true' or 'false';
* `ng-model` -  get information from input and show it where assign `ng-bind`;
* `ng-bind`  -  bind parameters to a specific node;
* `ng-repeat` - goes over iterate object;

## Custom Directives
* `make-short`    -  make text shorter;
* `random-color`  -  add random color to variables nodes;