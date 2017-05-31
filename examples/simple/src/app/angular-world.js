import angular from "angular";

export function app () {
  return {
    template: require('./angular-world.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

export class AppCtrl {
  constructor() {
    this.name = ""
  }
}