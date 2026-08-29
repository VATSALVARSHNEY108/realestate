import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-serif font-bold text-luxury-gold mb-4">404</h1>
      <h2 className="text-2xl font-sans font-semibold mb-6">Page Not Found</h2>
      <p className="text-luxury-muted max-w-md mb-8">
        The residence or page you are looking for does not exist or has been relocated.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-luxury-gold text-black font-semibold rounded-lg hover:bg-luxury-gold-light transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
