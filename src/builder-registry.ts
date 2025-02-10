import { builder, Builder } from "@builder.io/react";
import dynamic from "next/dynamic";
import "@builder.io/widgets";
import CardComponent from "./components/CardComponent";
import Accordion from "./components/Accordion";
import AuthorHero from "./components/AuthorHero";

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

const fetchFunction = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    
    // Check if response is OK (status code 2xx)
    if (!response.ok) {
      throw new Error(`Failed to fetch, status: ${response.status}`);
    }

    // Parse the JSON data
    const data = await response.json();

    // Limit to the first 10 items and transform to match enum options
    return data.slice(0, 10).map(item => ({
      label: item.title, // Provide a human-readable label
      value: item.id.toString(), // Value should be a string to match input type
    }));
  } catch (error) {
    console.error('Error fetching data for dynamic enum:', error);
    return []; // Return an empty array in case of error
  }
};


Builder.registerComponent("YourComponent", {
  name: 'DynamicListComponent',
  inputs: [
    {
      name: 'dynamicEnum',
      type: 'string',
      enum: [], // Start with an empty enum that will be populated
      defaultValue: fetchFunction(),
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


Builder.registerComponent(AuthorHero, {
  name: "AuthorHero",
  friendlyName: "Author Hero",
  models: ["page"],
  image: "https://cdn.builder.io/api/v1/image/assets%2Fdb60bf3db7fa4db7be81ef05b72bd720%2F4ff2ca2462554ad08a21df8f686671fd",
  screenshot: "https://cdn.builder.io/api/v1/image/assets%2Fdb60bf3db7fa4db7be81ef05b72bd720%2F4ff2ca2462554ad08a21df8f686671fd",
  inputs: [
    {
      name: "authors",
      type: "list", 
      subFields: [
        {
          name: "authorName",
          type: "string",
          helpText: "Please only enter up to 50 characters",
          required: true,
          friendlyName: "Author Name",
        },
        {
          name: "image",
          friendlyName: "Author Avatar Image",
          type: "file",
          allowedFileTypes: ["jpeg", "jpg", "png", "svg", "webp"],
          required: true,
        },
        {
          name: "imageAltText",
          type: "string",
          friendlyName: "Author Avatar Image Alt",
          required: true,
        },
        {
          name: "jobTitle",
          type: "string",
          required: true,
          friendlyName: "Author Job Title",
          helpText: "Please only enter up to 100 characters",
        },
        {
          name: "authorIntro",
          type: "longText",
          required: false,
          friendlyName: "Author Quick Intro (150 Words Only)",
          helpText: "Please only enter up to 150 characters",
        },
      ],
    },
  ],
});

Builder.registerAction({
  name: "Enviar Evento",
  inputs: [
    {
      name: "eventName",
      type: "string",
      required: true,
      helperText: "Nombre del evento",
    },
    {
      name: "eventData",
      type: "json",
      required: false,
      helperText: "Datos dinámicos a enviar",
    },
  ],
  action: async (options) => {
    console.log("🚀 Ejecutando acción:", options);

    const apiUrl = "https://mi-backend.com/api/eventos";

    const payload = {
      event: options.eventName,
      data: options.eventData || {},
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log("✅ Evento enviado con éxito:", payload);
    } catch (error) {
      console.error("❌ Error enviando el evento:", error);
    }
  },
});
