import { Component } from "@/components/Component";
import { directive, Part, NodePart } from "lit-html";
import { logError } from "./logger";

/**
 * This render factory is intended to be used to create a lit-html directive to
 * handle the `Component`s defined in this test task. This factory will manage
 * the DOM node associated with a `Component` to make sure it's properly updated
 * and avoid unnecessary re-renders.
 *
 * Docs for lit-html directives [here](https://lit-html.polymer-project.org/guide/creating-directives).
 */
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

// eslint-disable-next-line import/prefer-default-export
export const renderDirective = directive(renderFactory);
