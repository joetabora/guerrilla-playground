/**
 * Creator Verification Page
 * Upload documents and content links for verification
 */
import VerificationForm from '@/components/VerificationForm';

export const metadata = {
  title: 'Creator Verification',
  description: 'Verify your creator account with ID documents and sample content.'
};

export default function VerifyPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            Creator <span className="text-cyan">Verification</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Verify your creator account to unlock premium features and brand partnerships.
          </p>
        </div>
        <VerificationForm />
      </div>
    </div>
  );
}

