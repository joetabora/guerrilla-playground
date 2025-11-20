/**
 * Utilities for generating SEO-friendly metadata across routes.
 * Keeps defaults centralized so each page can override selectively.
 */
import type { Metadata } from 'next';

const baseUrl = 'https://www.guerrillasocial.club';

const defaultMeta = {
  title: 'Guerrilla Social Club | Creator-Led Influencer Marketing Agency',
  description:
    'Guerrilla Social Club pairs culture-moving creators with ambitious brands for campaigns that convert.',
  keywords: [
    'influencer marketing agency',
    'creator marketing',
    'ugc production',
    'social media strategy'
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Guerrilla Social Club',
    images: [
      {
        url: `${baseUrl}/images/hero-orb.svg`,
        width: 1200,
        height: 630,
        alt: 'Guerrilla Social Club hero gradient graphic'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@guerrillasocial'
  }
} satisfies Metadata;

export type BuildMetadataArgs = {
  title?: string;
  description?: string;
  path?: string;
};

export const buildMetadata = ({ title, description, path }: BuildMetadataArgs = {}): Metadata => {
  const pageTitle = title ? `${title} | Guerrilla Social Club` : (defaultMeta.title as string);
  const pageDescription = description ?? (defaultMeta.description as string);

  return {
    ...defaultMeta,
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      ...defaultMeta.openGraph,
      title: pageTitle,
      description: pageDescription,
      url: path ? `${baseUrl}${path}` : baseUrl
    },
    twitter: {
      ...defaultMeta.twitter,
      title: pageTitle,
      description: pageDescription
    }
  } satisfies Metadata;
};
