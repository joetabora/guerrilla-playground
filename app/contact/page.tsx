/**
 * Contact page - contact form with brand/creator toggle
 */
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Guerrilla Social Club.'
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            Let&apos;s <span className="text-magenta">Connect</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Whether you&apos;re a brand or creator, we&apos;d love to hear from you.
          </p>
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </div>
  );
}
