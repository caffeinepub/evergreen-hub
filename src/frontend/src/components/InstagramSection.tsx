import { Button } from '@/components/ui/button';
import { SiInstagram } from 'react-icons/si';
import { ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function InstagramSection() {
  const instagramUrl = 'https://www.instagram.com/rajput.rudra_s?igsh=MXVtZDVxYjNub2NnbA==';
  const username = '@rajput.rudra_s';
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-gradient-to-b from-background to-emerald-950/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 border border-pink-500/30 rounded-full px-6 py-2 mb-6">
            <SiInstagram className="h-6 w-6 text-pink-500" />
            <span className="font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              Instagram
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Follow Me on Instagram
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Stay updated with tips, updates and behind-the-scenes
          </p>

          <div ref={ref} className={`bg-card border border-border rounded-2xl p-8 shadow-2xl space-y-6 scroll-fade-in ${isVisible ? 'visible' : ''}`}>
            <div className="flex justify-center">
              <img 
                src="/assets/generated/instagram-logo.dim_128x128.png" 
                alt="Instagram" 
                className="h-24 w-24 object-contain"
              />
            </div>

            <div className="space-y-2">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent hover:opacity-80 inline-flex items-center gap-2 transition-opacity"
              >
                {username}
                <ExternalLink className="h-5 w-5 text-pink-500" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                onClick={() => window.open(instagramUrl, '_blank')}
                size="lg"
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:from-pink-600 hover:via-purple-600 hover:to-orange-600 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-pink-500/50 transition-all duration-300 w-full sm:w-auto"
              >
                <SiInstagram className="mr-2 h-5 w-5" />
                Follow {username}
              </Button>

              <Button
                onClick={() => window.open(instagramUrl, '_blank')}
                size="lg"
                variant="outline"
                className="border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white font-bold text-lg px-8 py-6 rounded-lg transition-all duration-300 w-full sm:w-auto"
              >
                Connect on Instagram
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
