import { builder, Builder, withChildren } from "@builder.io/react";
import dynamic from "next/dynamic";
import "@builder.io/widgets";
import CardComponent from "./components/CardComponent";
import Accordion from "./components/Accordion";
import AuthorHero from "./components/AuthorHero";

import HeroSymbol from "./components/HeroSymbol";
import Testimonial from "./components/Testimonial";

import SectionWithMargin from "./components/SectionWithMargin";

import PBNavigationBar from "./components/PBNavigationBar";
import SimpleHeroWithCta from "./components/SimpleHeroWithCTA";

import CustomTabs from "./components/Tabs";

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
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");

    // Check if response is OK (status code 2xx)
    if (!response.ok) {
      throw new Error(`Failed to fetch, status: ${response.status}`);
    }

    // Parse the JSON data
    const data = await response.json();

    // Limit to the first 10 items and transform to match enum options
    return data.slice(0, 10).map((item) => ({
      label: item.title, // Provide a human-readable label
      value: item.id.toString(), // Value should be a string to match input type
    }));
  } catch (error) {
    console.error("Error fetching data for dynamic enum:", error);
    return []; // Return an empty array in case of error
  }
};

Builder.registerComponent("YourComponent", {
  name: "DynamicListComponent",
  inputs: [
    {
      name: "dynamicEnum",
      type: "string",
      enum: [], // Start with an empty enum that will be populated
      defaultValue: fetchFunction(),
    },
  ],
});

Builder.registerComponent(AuthorHero, {
  name: "AuthorHero",
  friendlyName: "Author Hero",
  models: ["page"],
  image:
    "https://cdn.builder.io/api/v1/image/assets%2Fdb60bf3db7fa4db7be81ef05b72bd720%2F4ff2ca2462554ad08a21df8f686671fd",
  screenshot:
    "https://cdn.builder.io/api/v1/image/assets%2Fdb60bf3db7fa4db7be81ef05b72bd720%2F4ff2ca2462554ad08a21df8f686671fd",
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

const HeroWithChildren = withChildren(HeroSymbol);

Builder.registerComponent(HeroWithChildren, {
  name: "Hero Locale Support",
  defaultChildren: [
    {
      "@type": "@builder.io/sdk:Element",
      component: {
        name: "Image",
        options: {
          src: "https://cdn.builder.io/api/v1/image/assets%2Fc782aff3c66f48acb425981b997feb10%2Fc651fbe3cdf34f40958aafe93cd4ffbd",
        },
      },
    },
  ],
  inputs: [
    {
      name: "title",
      type: "text",
      defaultValue: "Builder.io",
      localized: true,
      required: true,
    },
    {
      name: "description",
      type: "text",
      defaultValue: "The visual headless CMS",
      localized: true,
      required: true,
    },
    {
      name: "ctaText",
      type: "list",
      defaultValue: [],
      subFields: [
        {
          name: "ctaLabel",
          type: "text",
          defaultValue: "Explore",
          localized: true,
          required: true,
        },
        {
          name: "url",
          type: "string",
          defaultValue: "",
        },
      ],
    },
    {
      name: "reverseCta",
      type: "boolean",
      defaultValue: false,
      localized: true,
    },
  ],
  childRequirements: {
    message: "You can add image or video!",
    query: {
      "component.name": { $in: ["Video", "Image"] },
    },
  },
});

Builder.registerComponent(Testimonial, {
  name: "Testimonial",
  inputs: [
    {
      name: "text",
      type: "richText",
      helperText: "Enter text for the testimonial!",
    },
    {
      name: "author",
      type: "reference",
      model: "author",
      helperText: "Select Author for the blog!",
      required: true,
    },
  ],
});

Builder.registerComponent(SimpleHeroWithCta, {
  name: "SimpleHeroWithCta",
  inputs: [
    {
      name: "Subtitle",
      type: "text",
      defaultValue: {
        "@type": "@builder.io/core:LocalizedValue",
        Default:
          "Build a beautiful, modern website with flexible, fully customizable, atomic MUI components.",
      },
      localized: true,
    },
    {
      name: "Button1Text",
      type: "text",
      defaultValue: {
        "@type": "@builder.io/core:LocalizedValue",
        Default: "Purchase now",
      },
      localized: true,
    },
    {
      name: "Button1Url",
      type: "url",
      defaultValue: "https://mui.com/store/items/the-front-landing-page/",
    },
    {
      name: "Button2Url",
      type: "url",
      defaultValue: "https://thefront.maccarianagency.com/docs/introduction",
    },
    {
      name: "Button2Text",
      type: "text",
      defaultValue: {
        "@type": "@builder.io/core:LocalizedValue",
        Default: "View Documentation",
        "en-de": "View Documentation DE",
      },
      localized: true,
    },
    {
      name: "title",
      type: "text",
      defaultValue: "Title",
      required: true,
    },
  ],
});

Builder.registerComponent("ContactForm", {
  name: "ContactForm",
  inputs: [
    {
      name: "emails",
      type: "text",
      defaultValue: "",

      regex: {
        // eslint-disable-next-line prettier/prettier
        pattern:
          "^(|([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5}){1,25})+)*$",
        message: "Emails must be in xx@xx.xx format, separated by semicolon.",
        options: "g",
      },
    },
    {
      name: "testInput",
      type: "text",
      regex: {
        pattern: "/^[a-zA-Z0-9]{1,10}$/",
        message: "No longer than 10 Character",
      },
      defaultValue: "",
      max: 10,
    },
  ],
});

Builder.registerComponent("SublistWithLimit", {
  name: "SublistWithLimit",
  inputs: [
    {
      name: "list1",
      type: "list",
      onChange: (options) => {
        if (options.get("list1").length > 0) {
          options.set("list1", options.get("list1").slice(0, 0));
          alert("maximum items is 6, delete items to continue");
        }
      },
      subFields: [
        {
          name: "subList",
          type: "list",
          subFields: [
            {
              name: "subListText",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
});

// Builder.registerComponent(HeroCarousel, {
//   name: "HeroCarousel",
//   inputs: [
//     {
//       name: "carouselItem",
//       type: "list",
//       defaultValue: [
//         {
//           imageUrl:
//             "https://cdn.builder.io/api/v1/image/assets%2Fc782aff3c66f48acb425981b997feb10%2Fcaccbc5f7a224ef1a08f8efbb79d567e",
//           mobileImageUrl:
//             "https://cdn.builder.io/api/v1/image/assets%2Fc782aff3c66f48acb425981b997feb10%2F28c7b1407cf44530994c12504421606e",
//           imageAlt: "image Alt text",
//           title: "Check Off Your List Event",
//           subtitle: "Save up to 50%",
//           description: "Shop early to get your holiday gifts on time.",
//           buttonText: "Shop Holiday Items on Sale",
//           contentPosition: "right",
//           buttonLink: "https://builder.io",
//         },
//         {
//           imageUrl:
//             "https://cdn.builder.io/api/v1/image/assets%2Fc782aff3c66f48acb425981b997feb10%2F73dd3ce0e5424489ab09dc10f10e41c4",
//           mobileImageUrl:
//             "https://cdn.builder.io/api/v1/image/assets%2Fc782aff3c66f48acb425981b997feb10%2Fa52821d3083140ef85bd790d47ec147d",
//           imageAlt: "image Alt text",
//           title: "Save upto 70%",
//           subtitle: "Check Off Your List Event",
//           description: "Shop early to get your holiday gifts on time.",
//           buttonText: "Shop Holiday Items on Sale",
//           contentPosition: "right",
//           buttonLink: "https://builder.io",
//         },
//       ],
//       subFields: [
//         {
//           name: "imageUrl",
//           type: "file",
//         },
//         {
//           name: "mobileImageUrl",
//           type: "file",
//         },
//         {
//           name: "imageAlt",
//           type: "string",
//         },
//         {
//           name: "title",
//           type: "string",
//         },
//         {
//           name: "subtitle",
//           type: "string",
//         },
//         {
//           name: "description",
//           type: "string",
//         },
//         {
//           name: "buttonText",
//           type: "string",
//         },
//         {
//           name: "contentPosition",
//           type: "string",
//         },
//         {
//           name: "buttonLink",
//           type: "string",
//         },
//       ],
//     },
//   ],
// });

Builder.registerComponent(PBNavigationBar, {
  name: "PB NavigationBar",
  docsLink:
    "https://docs.vuestorefront.io/integrations/builder/overview/frontend-components#pb-navigationbar",
  inputs: [
    {
      name: "categories",
      type: "list",
      subFields: [
        {
          name: "data",
          type: "object",
          subFields: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "link",
              type: "string",
            },
            {
              name: "role",
              type: "object",
              subFields: [
                {
                  name: "admin",
                  type: "boolean",
                },
                {
                  name: "developer",
                  type: "boolean",
                },
                {
                  name: "designer",
                  type: "boolean",
                },
              ],
            },
            {
              name: "children",
              type: "list",
              subFields: [
                {
                  name: "name",
                  type: "string",
                },
                {
                  name: "link",
                  type: "string",
                },
                {
                  name: "role",
                  type: "object",
                  subFields: [
                    {
                      name: "admin",
                      type: "boolean",
                    },
                    {
                      name: "developer",
                      type: "boolean",
                    },
                    {
                      name: "designer",
                      type: "boolean",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      required: true,
    },
  ],
});

Builder.registerComponent(SectionWithMargin, {
  name: "section-margin",
  inputs: [
    {
      name: "childComp",
      type: "uiBlocks",
      defaultValue: [],
    },
  ],
});

Builder.registerComponent(CustomTabs, {
  name: "TabsComponent",
  models: ["page"], // Ensure 'size-chart' model exists
  canHaveChildren: true, // Allows nested elements
  inputs: [
    {
      name: "tabs",
      type: "list",
      subFields: [
        {
          name: "text",
          type: "string",
          defaultValue: "Tab Name",
        },
        {
          name: "content",
          type: "uiBlocks",
          hideFromUI: true,
          defaultValue: [],
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
