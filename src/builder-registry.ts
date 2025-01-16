import { builder, Builder } from "@builder.io/react";
import dynamic from "next/dynamic";
import "@builder.io/widgets";
import CardComponent from "./components/CardComponent";
import Accordion from "./components/Accordion";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(
  dynamic(() => import("./components/Counter/Counter")),
  {
    name: "Counter",
    inputs: [
      {
        name: "initialCount",
        type: "number",
      },
    ],
  }
);

Builder.registerComponent(CardComponent, {
  name: "CardComponent",
  inputs: [
    {
      name: "borderRadius",
      type: "number",
      defaultValue: 0,
      helperText: "Set the border radius of the card.",
      required: true,
    },
    {
      name: "showBorder",
      type: "boolean",
      defaultValue: false,
      helperText: "Show or hide the border of the card.",
      required: true,
    },
    {
      name: "darkMode",
      type: "boolean",
      defaultValue: false,
      helperText: "Enable dark mode for the card.",
      required: true,
    },
  ],
});

Builder.registerComponent(Accordion, {
  name: "Accordion",
  inputs: [
    {
      name: "items",
      type: "list",
      subFields: [
        {
          name: "title",
          type: "text",
          defaultValue: "Default Title",
        },
        {
          name: "body",
          type: "richText",
        },
      ],
    },
  ],
});
// Builder.register('editor.settings', {
//   customInsertMenu: true,
//   designTokensOptional: true,
// });

// Builder.register('insertMenu', {
//   name: 'Basic',
//   items: [
//     { name: 'Box' },
//     { name: 'Text' },
//     { name: 'Image' },
//     { name: 'Embed' },
//     { name: 'Custom Code' },
//   ],
// });


