import { useParams } from '@tanstack/react-router';
import { useGetLandingPageById, useIncrementLandingPageVisit } from '../hooks/useQueries';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function LandingPagePreview() {
  const { pageId } = useParams({ strict: false }) as { pageId: string };
  const { data: landingPage, isLoading, error } = useGetLandingPageById(pageId);
  const incrementVisit = useIncrementLandingPageVisit();

  useEffect(() => {
    if (landingPage && pageId) {
      incrementVisit.mutate(BigInt(pageId));
    }
  }, [landingPage, pageId]);

  useEffect(() => {
    if (landingPage) {
      document.title = landingPage.title || 'Landing Page';
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', landingPage.content.substring(0, 160));
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = landingPage.content.substring(0, 160);
        document.head.appendChild(meta);
      }
    }
  }, [landingPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading landing page...</p>
        </div>
      </div>
    );
  }

  if (error || !landingPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
          <p className="text-xl font-semibold mb-2">Landing Page Not Found</p>
          <p className="text-muted-foreground">
            The landing page you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {landingPage.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {landingPage.template}
              </span>
              <span>•</span>
              <span>{landingPage.visitCount.toString()} views</span>
            </div>
          </header>

          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: landingPage.content }}
          />
        </article>
      </div>
    </div>
  );
}
