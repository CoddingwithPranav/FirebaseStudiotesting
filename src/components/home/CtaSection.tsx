import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CtaSection() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold font-headline mb-6">
          Ready to Join the <span className="text-accent">Future</span>?
        </h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Sign up today and start your journey in MetaVerse Hub. Adventure awaits!
        </p>
        <Link href="/signup">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-6">
            Create Your Account
          </Button>
        </Link>
      </div>
    </section>
  );
}
