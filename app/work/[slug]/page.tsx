/**
 * Dynamic Case Study Detail Page
 * Generated from /data/case-studies.json based on slug
 */
import { getCaseStudyBySlug, getAllCaseStudies } from '@/lib/case-studies';
import { notFound } from 'next/navigation';
import CaseStudyContent from '@/components/CaseStudyContent';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const caseStudies = getAllCaseStudies();
  return caseStudies.map((study) => ({
    slug: study.slug
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const caseStudy = getCaseStudyBySlug(params.slug);
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found'
    };
  }
  return {
    title: `${caseStudy.title} | Guerrilla Social Club`,
    description: caseStudy.description
  };
}

export default function CaseStudyPage({ params }: PageProps) {
  const caseStudy = getCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyContent caseStudy={caseStudy} />;
}
