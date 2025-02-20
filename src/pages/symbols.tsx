// pages/edit-symbol.jsx

import { BuilderComponent, builder } from '@builder.io/react';

// Replace with your Public API Key.
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default function Page() {
  return <BuilderComponent model="symbol" />
}