import angular from 'angular';
import {turbineToAngular} from "./../../../../src/turbine-angular";
import {turbineWorld} from "./turbine-world";
import {AppCtrl, app} from "./angular-world";

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .factory("serviceExample", () => ({ id: 42 }))

  // Angular World
  .directive('angularWorld', app)
  .controller('AppCtrl', AppCtrl)

  // Turbine World
  .directive("simple", turbineToAngular({name: "@name"}, turbineWorld, ["serviceExample"]));

export default MODULE_NAME;