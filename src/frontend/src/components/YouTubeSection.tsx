import { Button } from '@/components/ui/button';
import { Youtube, ExternalLink } from 'lucide-react';

export default function YouTubeSection() {
  const channelUrl = 'https://youtube.com/@evergreengamerz?si=cQtRVvA1XpyUHMyQ';

  return (
    <section className="py-20 bg-gradient-to-b from-emerald-950/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-6 py-2 mb-6">
              <Youtube className="h-6 w-6 text-emerald-500" />
              <span className="font-semibold text-emerald-500">YouTube Channel</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Join Our YouTube Community
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Subscribe to <span className="text-emerald-500 font-bold">Evergreen Hub</span> for free tutorials, tips, and strategies
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed?listType=user_uploads&list=evergreengamerz"
                title="Evergreen Hub YouTube Channel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-8 text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">Evergreen Hub</h3>
                <a
                  href={channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-500 hover:text-emerald-400 inline-flex items-center gap-1 transition-colors"
                >
                  @evergreengamerz
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <Button
                onClick={() => window.open(channelUrl, '_blank')}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-red-600/50 transition-all duration-300"
              >
                <Youtube className="mr-2 h-5 w-5" />
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
