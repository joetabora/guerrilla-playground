'use client';

/**
 * Client experience for the creators page including the mock application form.
 */
import { useState, type FormEvent } from 'react';
import Section from '@/components/Section';
import Button from '@/components/Button';

const perks = [
  'Briefs tailored to your tone and workflow',
  'Usage rights and payment transparency',
  'Creative direction from former brand-side leads',
  'Priority placement for product seeding + paid deals'
];

const CreatorsContent = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 py-20">
      <Section>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">For creators</p>
        <h1 className="mt-4 text-4xl font-semibold">Apply to Guerrilla Social Club.</h1>
        <p className="mt-4 max-w-3xl text-slate-400">
          We partner with creators who obsess over craft, not virality. If you care about storytelling, iteration, and
          delivering for brands without sacrificing your POV, we want to meet you.
        </p>
      </Section>
      <Section className="grid gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Why join</h2>
          <ul className="space-y-3 text-slate-300">
            {perks.map((perk) => (
              <li key={perk} className="flex gap-3">
                <span aria-hidden className="text-cyan-200">
                  ▹
                </span>
                {perk}
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-500">
            We review applications weekly. Approved creators are onboarded into a private Slack with briefs, brand
            insights, and creative resources.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="card-surface space-y-4 p-6" aria-label="Creator application form">
          <div>
            <label htmlFor="handle" className="text-sm text-slate-300">
              Handle / stage name*
            </label>
            <input
              id="handle"
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white"
              placeholder="@guerrillacreator"
            />
          </div>
          <div>
            <label htmlFor="platforms" className="text-sm text-slate-300">
              Primary platforms*
            </label>
            <input
              id="platforms"
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white"
              placeholder="TikTok (350k), YouTube (120k)"
            />
          </div>
          <div>
            <label htmlFor="niche" className="text-sm text-slate-300">
              Niche / speciality*
            </label>
            <input
              id="niche"
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white"
              placeholder="Beauty tech, futurist lifestyle"
            />
          </div>
          <div>
            <label htmlFor="links" className="text-sm text-slate-300">
              Portfolio links
            </label>
            <textarea
              id="links"
              rows={3}
              className="mt-2 w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white"
              placeholder="Linktree, drive folder, favorite posts"
            />
          </div>
          <Button type="submit" className="w-full" ariaLabel="Submit creator application">
            {submitted ? 'Application received' : 'Apply now'}
          </Button>
          {submitted && <p className="text-sm text-emerald-300">We will reach out within a week.</p>}
        </form>
      </Section>
    </div>
  );
};

export default CreatorsContent;
