import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  badge: string;
}

export function PlaceholderPage({ title, subtitle, badge }: PlaceholderPageProps) {
  return (
    <Section spacing="xl" className="min-h-[70vh] flex items-center justify-center">
      <Container size="md" className="text-center space-y-6">
        <Badge variant="gold" className="mx-auto">
          {badge}
        </Badge>
        <Heading level="h1">{title}</Heading>
        <p className="text-luxury-muted text-sm max-w-xl mx-auto font-light leading-relaxed">
          {subtitle}
        </p>
        <div className="pt-4">
          <Link href="/">
            <Button variant="secondary" size="md">
              Back To Overview
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
