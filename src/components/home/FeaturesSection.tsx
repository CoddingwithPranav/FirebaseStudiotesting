import FeatureCard from './FeatureCard';
import { Globe, Users, Palette, Map } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Globe,
      title: 'Explore Vast Worlds',
      description: 'Journey through diverse, user-generated metaverses and discover unique experiences.',
    },
    {
      icon: Users,
      title: 'Connect & Socialize',
      description: 'Meet new people, collaborate on projects, and build communities in shared virtual spaces.',
    },
    {
      icon: Palette,
      title: 'Create Your Reality',
      description: 'Unleash your creativity with powerful tools to build your own spaces, avatars, and experiences.',
    },
    {
      icon: Map,
      title: 'Dynamic Maps',
      description: 'Navigate through interactive maps that lead to new adventures and hidden realms.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold font-headline text-center mb-4">
          Dive into the <span className="text-primary">MetaVerse</span>
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          MetaVerse Hub offers a seamless platform to engage with the next generation of digital interaction.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
