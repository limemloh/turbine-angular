import {runComponent} from "@funkia/turbine";
import {producerBehavior, isBehavior} from "@funkia/hareactive";

export function turbineToAngular(scope, turbineComponent, depInjection = []) {
  return [...depInjection, (...injected) => {
    return {
      scope,
      link: function(tScope, tElement, tAttrs) {
        const attrs = Object.keys(scope).reduce((obj, key) => {
          if (scope[key][0] === "@") {
            obj[key] = behaviorFromScope(tScope, key);
          }
          return obj;
        }, {});
        const output = runComponent(tElement[0], turbineComponent(attrs, ...injected));
        let initial = true;
        Object.keys(output).forEach(key => {
          const a = output[key];
          if (isBehavior(a)) {
            a.observe(
              v => {
                tScope.$parent[key] = v; 
                if (!(initial || key in scope)) {
                  tScope.$apply()
                }
              },
              () => {throw "Turbine-Angular does not support pulling behaviors"},
              () => undefined
            );
          } else {
            tScope.$parent[key] = v;
          }
        });
        initial = false;
      }
    };
  }];
}

function behaviorFromScope(scope, variable) {
  return producerBehavior((push) => scope.$watch(variable, v => push(v)), scope[variable])
}