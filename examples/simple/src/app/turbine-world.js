import "babel-polyfill";
import { runComponent, elements, element } from "@funkia/turbine";
const { div, input, span } = elements;
import { fgo } from "@funkia/jabz"

const img = element("img");
const h3 = element("h3");

export const turbineWorld = fgo(function* ({ name }, serviceExample) {
  yield img({ attrs: { src: "/img/funkia.png" } })
  yield h3("This is Turbine World")
  const { inputValue } = yield input();
  yield h3(name);
  return { inputValue };
});
