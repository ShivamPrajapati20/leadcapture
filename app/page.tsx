import LeadForm from '@/app/components/leadForm';
import Link from 'next/link'

export default function Home() {
  return (
     <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      
      <div className="w-full max-w-md space-y-6">
        
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Let's work together
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Share your details and we'll get back to you shortly.
          </p>
        </div>
        
        {/* Landing Form */}
        <div className="bg-white p-6 rounded-xl shadow">
          <LeadForm />

          <div className="text-center">
            <Link
              href="/leads"
              className="text-sm text-blue-600 hover:underline"
            >
              View submitted leads
            </Link>
          </div>
        </div>
        
      </div>
    </main>
  );
}
