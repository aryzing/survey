import Component from "@/components/Component";
import { directive, Part, NodePart } from "lit-html";
import logError from "./logger";

const renderFactory = <P, S>(
  CustomElement: new (props: P) => Component<P, S>,
  props: P
) => (part: Part): void => {
  if (!(part instanceof NodePart)) {
    logError(
      "Expected `part` to be instance of `NodePart`. Components can only be rendered into `NodePart`s"
    );
    return;
  }

  if (part.value instanceof CustomElement) {
    part.value.setProps(props);
    return;
  }

  part.setValue(new CustomElement(props));
};

const renderDirective = directive(renderFactory);

export default renderDirective;
