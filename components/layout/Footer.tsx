import { Container } from '@/components/ui/Container';

export function Footer() {
  return (
    <footer className="bg-luxury-black border-t border-white/5 py-16 text-gray-400 text-xs">
      <Container className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="font-serif text-lg tracking-[0.25em] text-white uppercase">
              AUREUS
            </span>
            <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-light">
              ESTATES
            </span>
          </div>
          <p className="text-gray-500 leading-relaxed max-w-xs">
            Curating the pinnacle of architectural excellence and ultra-luxury residential spaces globally.
          </p>
        </div>

        <div>
          <h4 className="text-white uppercase tracking-widest mb-4 text-[11px] font-medium">
            Navigation
          </h4>
          <ul className="space-y-2.5">
            <li><a href="#residences" className="hover:text-luxury-gold transition-colors">Residences</a></li>
            <li><a href="#architecture" className="hover:text-luxury-gold transition-colors">Architects</a></li>
            <li><a href="#amenities" className="hover:text-luxury-gold transition-colors">Private Amenities</a></li>
            <li><a href="#press" className="hover:text-luxury-gold transition-colors">Press & Journal</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white uppercase tracking-widest mb-4 text-[11px] font-medium">
            Global Advisory
          </h4>
          <ul className="space-y-2.5 text-gray-500">
            <li>New York · London</li>
            <li>Monaco · Dubai</li>
            <li>Tokyo · Singapore</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white uppercase tracking-widest mb-4 text-[11px] font-medium">
            Private Inquiries
          </h4>
          <p className="text-gray-500 mb-4">
            Access off-market portfolios via private consultation.
          </p>
          <a
            href="mailto:concierge@aureusestates.com"
            className="text-luxury-gold hover:underline tracking-wider"
          >
            concierge@aureusestates.com
          </a>
        </div>
      </Container>
      <Container className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-gray-600 text-[11px]">
        <p>© {new Date().getFullYear()} AUREUS ESTATES. All rights reserved.</p>
        <p className="mt-2 md:mt-0 tracking-wider">FOUNDATION ARCHITECTURE PART 01</p>
      </Container>
    </footer>
  );
}
