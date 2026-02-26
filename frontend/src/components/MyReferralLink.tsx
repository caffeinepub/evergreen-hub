import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Check, Share2 } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { toast } from 'sonner';

export default function MyReferralLink() {
  const { identity } = useInternetIdentity();
  const [copied, setCopied] = useState(false);

  const referralLink = identity
    ? `${window.location.origin}/register?ref=${encodeURIComponent(identity.getPrincipal().toString())}`
    : '';

  const handleCopy = async () => {
    if (!referralLink) return;

    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success('Referral link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  if (!identity) {
    return null;
  }

  return (
    <Card className="bg-white dark:bg-slate-800 border-2 border-yellow-400">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5 text-yellow-500" />
          Your Referral Link
        </CardTitle>
        <CardDescription>Share this link to earn commissions when users register and purchase packages</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={referralLink}
            readOnly
            className="font-mono text-sm bg-slate-50 dark:bg-slate-900"
          />
          <Button
            onClick={handleCopy}
            variant="outline"
            size="icon"
            className="shrink-0"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            💡 <strong>Tip:</strong> Share this link on social media, WhatsApp, or with friends to start earning commissions!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
