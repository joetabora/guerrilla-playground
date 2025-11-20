'use client';

/**
 * Client-side portion of the homepage featuring animations and interactive sections.
 */
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import Button from '@/components/Button';
import Card from '@/components/Card';
import AnimatedGradient from '@/components/AnimatedGradient';

const services = [
  {
    title: 'UGC Campaigns',
    description: 'Scaled user-generated storytelling with creative frameworks that feel organic, not scripted.',
    icon: '🎥'
  },
  {
    title: 'Creator Sourcing',
    description: 'We tap micro + macro creators who actually influence culture within your category.',
    icon: '🧠'
  },
  {
    title: 'Paid Creative',
    description: 'Iterative paid ad assets optimized for thumb-stopping hooks, visual hooks, and retention.',
    icon: '📈'
  }
];

const creatorStats = [
  { label: 'Creators in our private network', value: '450+' },
  { label: 'Average ROAS on paid social', value: '4.3x' },
  { label: 'Campaigns launched in 2024', value: '120' }
];

const caseStudies = [
  {
    brand: 'Gravity Labs',
    metric: '+62% CAC efficiency',
    description: 'Drove efficient mobile subscriptions with TikTok-first creative.',
    image: '/images/case-1.svg'
  },
  {
    brand: 'Pixelboard',
    metric: '9M organic views',
    description: 'Built community trust via behind-the-scenes maker content.',
    image: '/images/case-2.svg'
  },
  {
    brand: 'Bedtime Beacon',
    metric: '2.1x conversion lift',
    description: 'Matched sleep-tech story to wellness creators who share nightly routines.',
    image: '/images/case-3.svg'
  }
];

const creators = ['creator-1.svg', 'creator-2.svg', 'creator-3.svg', 'creator-4.svg', 'creator-5.svg', 'creator-6.svg'];

const container = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const HomeContent = () => (
  <div className="space-y-12 pb-20">
    <section className="relative overflow-hidden">
      <Section className="relative flex flex-col gap-8 py-24">
        <AnimatedGradient className="-top-24 right-0" />
        <motion.div initial="hidden" animate="visible" variants={container} transition={{ duration: 0.7, ease: 'easeOut' }}>
          <motion.p variants={child} className="text-sm uppercase tracking-[0.3em] text-cyan-200">
            Influencer marketing reinvented
          </motion.p>
          <motion.h1 variants={child} className="mt-6 text-4xl font-semibold leading-tight md:text-6xl">
            The Anti-Agency. Creator-Led. Results-Driven.
          </motion.h1>
          <motion.p variants={child} className="mt-4 max-w-2xl text-lg text-slate-300">
            We connect brands with creators who move culture — not just metrics. Every campaign is engineered for
            storytelling, sales, and speed.
          </motion.p>
          <motion.div variants={child} className="mt-8 flex flex-wrap gap-4">
            <Button href="/brands">For Brands</Button>
            <Button href="/creators" variant="secondary">
              For Creators
            </Button>
          </motion.div>
        </motion.div>
      </Section>
    </section>

    <Section className="grid gap-8 md:grid-cols-3">
      {services.map((service) => (
        <Card
          key={service.title}
          title={service.title}
          description={service.description}
          icon={<span aria-hidden>{service.icon}</span>}
          footer={<Link href="/services">Explore services →</Link>}
        />
      ))}
    </Section>

    <Section className="grid gap-10 md:grid-cols-2">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Creator Network</p>
        <h2 className="text-3xl font-semibold">We work with operators who influence culture daily.</h2>
        <p className="text-slate-400">
          From beauty editors to crypto-native storytellers, our roster is curated by creative strategists who obsess over
          authenticity. We never mass-blast briefs—every creator gets bespoke guidance that preserves their voice.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {creatorStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/5 p-4">
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
              <p className="text-xs uppercase tracking-wide text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {creators.map((file) => (
          <Image
            key={file}
            src={`/images/${file}`}
            alt="Placeholder creator avatar"
            width={160}
            height={160}
            className="h-full w-full rounded-2xl border border-white/10 object-cover"
          />
        ))}
      </div>
    </Section>

    <Section>
      <div className="flex flex-col gap-6 text-center">
        <p className="text-xs uppercase tracking-[0.6em] text-cyan-200">Case studies</p>
        <h2 className="text-3xl font-semibold">Proof that creative + creator alignment wins.</h2>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {caseStudies.map((study) => (
          <Card
            key={study.brand}
            title={`${study.brand} — ${study.metric}`}
            description={study.description}
            icon={<Image src={study.image} alt="Case study graphic" width={64} height={64} />}
            footer={<Link href="/case-studies">View case study</Link>}
          />
        ))}
      </div>
    </Section>

    <Section className="text-center">
      <div className="card-surface mx-auto flex flex-col gap-6 p-12 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">Let’s build</p>
        <h3 className="text-3xl font-semibold">
          Ready to scale with creators who actually convert?
        </h3>
        <p className="text-slate-400">
          Partner with the collective brands call when they need velocity, taste, and accountability in one strike team.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/contact">Book a Strategy Call</Button>
          <Button href="/case-studies" variant="secondary">
            See wins
          </Button>
        </div>
      </div>
    </Section>
  </div>
);

export default HomeContent;
