/**
 * Case Studies Data Utilities
 * Reads and processes case study data from JSON file
 */
import caseStudiesData from '@/data/case-studies.json';

export interface CaseStudy {
  id: string;
  title: string;
  brand: string;
  description: string;
  thumbnail: string;
  slug: string;
  published: boolean;
  date: string;
  category: string;
  metrics: Array<{ label: string; value: string; change?: string }>;
  beforeAfter?: {
    before: string;
    after: string;
  };
  content: {
    challenge: string;
    solution: string;
    results: string;
    creators: string[];
    highlights: string[];
  };
}

/**
 * Get all published case studies
 */
export function getAllCaseStudies(): CaseStudy[] {
  return (caseStudiesData as CaseStudy[]).filter((study) => study.published);
}

/**
 * Get a case study by slug
 */
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return (caseStudiesData as CaseStudy[]).find(
    (study) => study.slug === slug && study.published
  );
}

/**
 * Get case studies by category
 */
export function getCaseStudiesByCategory(category: string): CaseStudy[] {
  return (caseStudiesData as CaseStudy[]).filter(
    (study) => study.category === category && study.published
  );
}

