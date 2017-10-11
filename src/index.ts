import { runComponent, Component, toComponent } from "@funkia/turbine";
import { producerBehavior, isBehavior } from "@funkia/hareactive";


export type TurbineComponentFn<A> = (...a: any[]) => Component<A>;
/**
 * Convert a Turbine component into a angular directive description.
 * @param attr Like the scope property in angular directive. Will be passed as args to the turbineComponentFn.
 * @param turbineComponentFn A function returning a Turbine component.
 * @param depInjection Angular services which will be args to turbineComponentFn.
 */
export function turbineToAngular<A>(
  scope: Record<string, string>, turbineComponentFn: TurbineComponentFn<A>, depInjection: string[] = []) {
  return [...depInjection, (...injected: any[]) => {
    return {
      scope,
      link: function (tScope: any, tElement: any, tAttrs: any) {
        const attrs = Object.keys(scope).reduce((obj, key) => {
          if (scope[key][0] === "@") {
            obj[key] = behaviorFromScope(tScope, key);
          }
          return obj;
        }, <any>{});
        const output: any = runComponent(tElement[0], turbineComponentFn(attrs, ...injected));
        let initial = true;
        Object.keys(output).forEach(key => {
          const a: any = output[key];
          if (isBehavior(a)) {
            a.observe(
              (v: any) => {
                tScope.$parent[key] = v;
                if (!(initial || key in scope)) {
                  tScope.$apply()
                }
              },
              () => { throw "Turbine-Angular does not support pulling behaviors" },
              () => undefined
            );
          } else {
            tScope.$parent[key] = a;
          }
        });
        initial = false;
      }
    };
  }];
}

function behaviorFromScope(scope: any, variable: any) {
  return producerBehavior((push) => scope.$watch(variable, (v: any) => push(v)), scope[variable])
}