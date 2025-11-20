'use client';

/**
 * Contact form that posts to a server action stub so beginners can hook into a real email provider later.
 */
import { useFormState, useFormStatus } from 'react-dom';
import { initialState, handleContact } from '@/app/actions/contact';
import Button from './Button';

const statusCopy = {
  success: 'We received your note. Expect a quick reply.',
  error: 'We could not send your note. Try again in a moment.'
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full md:w-auto" ariaLabel="Submit contact form">
      {pending ? 'Sending…' : 'Send message'}
    </Button>
  );
};

export const ContactForm = () => {
  const [state, formAction] = useFormState(handleContact, initialState);

  return (
    <form action={formAction} className="card-surface space-y-4 p-6" aria-label="Contact form">
      <div>
        <label htmlFor="name" className="text-sm text-slate-300">
          Full name*
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-2 w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-slate-500"
          placeholder="Taylor Creator"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm text-slate-300">
          Email*
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="mt-2 w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-slate-500"
          placeholder="you@brand.com"
        />
      </div>
      <div>
        <label htmlFor="company" className="text-sm text-slate-300">
          Company / handle
        </label>
        <input
          id="company"
          name="company"
          className="mt-2 w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-slate-500"
          placeholder="@guerrillabrand"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm text-slate-300">
          Project details*
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="mt-2 w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-slate-500"
          placeholder="Launch brief, timing, budgets, goals…"
        />
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-slate-500">
          *Server action currently uses a stub in <code>lib/email.ts</code>. Uncomment the SendGrid or SMTP block and add env vars when ready.
        </p>
        <SubmitButton />
      </div>
      {state.status !== 'idle' && (
        <p
          role="status"
          className={`text-sm ${state.status === 'success' ? 'text-emerald-300' : 'text-rose-300'}`}
        >
          {statusCopy[state.status] || state.message}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
