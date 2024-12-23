import { builder, Builder } from "@builder.io/react";
import dynamic from "next/dynamic";

import CardComponent from "./components/CardComponent";
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
  name: 'CardComponent',
  inputs: [
    {
      name: 'borderRadius',
      type: 'number',
      defaultValue: 0,
      helperText: 'Set the border radius of the card.',
      required: true,
    },
    {
      name: 'showBorder',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Show or hide the border of the card.',
      required: true,
    },
    {
      name: 'darkMode',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Enable dark mode for the card.',
      required: true,
    },
  ],
});