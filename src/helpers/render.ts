import Component from "@/components/Component";
// eslint-disable-next-line import/no-extraneous-dependencies
import { getQueriesForElement, BoundFunctions } from "testing-library__dom";

type BF = BoundFunctions<typeof import("@testing-library/dom/types/queries")>;
type Utils<P, S> = {
  container: HTMLElement;
  component: Component<P, S>;
  cleanup(): void;
};
export type RenderReturn<P, S> = Utils<P, S> & BF;

function render<P2, S2>(
  CustomElement: new (props: P2) => Component<P2, S2>,
  props: P2
): RenderReturn<P2, S2> {
  const div = document.createElement("div");
  const customElement = new CustomElement(props);
  div.append(customElement);
  document.body.append(div);

  const cleanup = () => {
    document.body.removeChild(div);
  };

  const boundFunctions = getQueriesForElement(div);
  const utils = {
    container: div,
    component: customElement,
    cleanup,
  };

  return {
    ...utils,
    ...boundFunctions,
  };
}

export default render;
