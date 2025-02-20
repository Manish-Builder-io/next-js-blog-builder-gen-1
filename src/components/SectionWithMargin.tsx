"use client";
import { BuilderBlocks, BuilderElement } from "@builder.io/react";
import * as React from "react";

interface ISectionWithMarginProps {
  childComp: BuilderElement[];
  builderBlock: {
    id: string;
  };
}

const SectionWithMargin: React.FunctionComponent<ISectionWithMarginProps> = (
  props
) => {
  return (
    <section className={"flex justify-center items-center"}>
      <div className={"max-w-desktop w-full my-0 mx-10 sm:mx-5"}>
        <BuilderBlocks
          parentElementId={props.builderBlock.id}
          child
          blocks={props.childComp}
          dataPath="component.options.childComp"
        />
      </div>
    </section>
  );
};

export default SectionWithMargin;