import React from "react";

interface JsonLdProps {
  schema: Record<string, any> | null | undefined;
}

export function JsonLd({ schema }: JsonLdProps) {
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      // JSON-LD can safely live in the body; search engines still parse it.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
