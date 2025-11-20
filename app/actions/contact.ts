/**
 * Server action that routes contact form submissions through the email stub.
 */
import { sendEmail } from '@/lib/email';

export type ContactFormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

const initialState: ContactFormState = {
  status: 'idle',
  message: ''
};

export { initialState };

export async function handleContact(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  'use server';
  try {
    const name = formData.get('name')?.toString() ?? '';
    const email = formData.get('email')?.toString() ?? '';
    const company = formData.get('company')?.toString();
    const message = formData.get('message')?.toString() ?? '';

    if (!name || !email || !message) {
      return { status: 'error', message: 'Please complete all required fields.' };
    }

    await sendEmail({ name, email, company, message });
    return { status: 'success', message: 'Message queued successfully. We reply within 1 business day.' };
  } catch (error) {
    console.error('[contact action] failed', error);
    return { status: 'error', message: 'Something went wrong. Please try again later.' };
  }
}
