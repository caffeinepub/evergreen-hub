import { Button } from '@/components/ui/button';
import { SiFacebook } from 'react-icons/si';
import { ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function FacebookSection() {
  const facebookUrl = 'https://www.facebook.com/profile.php?id=100094603583884';
  const pageName = 'Evergreen Hub';
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-gradient-to-b from-emerald-950/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 via-blue-600/10 to-blue-700/10 border border-blue-500/30 rounded-full px-6 py-2 mb-6">
            <SiFacebook className="h-6 w-6 text-blue-500" />
            <span className="font-semibold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent">
              Facebook
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Follow Us on Facebook
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Stay connected for updates, tips, and community support
          </p>

          <div 
            ref={ref} 
            className={`bg-card border border-border rounded-2xl p-8 shadow-2xl space-y-6 transition-all duration-[600ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                <SiFacebook className="h-14 w-14 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent hover:opacity-80 inline-flex items-center gap-2 transition-opacity"
              >
                {pageName}
                <ExternalLink className="h-5 w-5 text-blue-500" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                onClick={() => window.open(facebookUrl, '_blank')}
                size="lg"
                className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300 w-full sm:w-auto"
              >
                <SiFacebook className="mr-2 h-5 w-5" />
                Follow {pageName}
              </Button>

              <Button
                onClick={() => window.open(facebookUrl, '_blank')}
                size="lg"
                variant="outline"
                className="border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white font-bold text-lg px-8 py-6 rounded-lg transition-all duration-300 w-full sm:w-auto"
              >
                Connect on Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
