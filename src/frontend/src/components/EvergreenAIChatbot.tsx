import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function EvergreenAIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m Evergreen.AI, your virtual assistant. How can I help you today? Ask me about courses, packages, pricing, or payments!',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('course') || lowerMessage.includes('package')) {
      return 'We offer three amazing course packages: SILVER (₹999), GOLD (₹1,499), and DIAMOND (₹1,999 - Best Value!). Each package includes lifetime access to premium courses. Would you like to know more about a specific package?';
    }

    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return 'Our packages are priced at: SILVER - ₹999, GOLD - ₹1,499, and DIAMOND - ₹1,999 (Best Value). All packages include lifetime access and expert guidance!';
    }

    if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      return 'We accept payments via PhonePe and bank transfer. After selecting a package, you\'ll see our payment details and can upload your payment proof for verification. It\'s quick and secure!';
    }

    if (lowerMessage.includes('support') || lowerMessage.includes('help')) {
      return 'Need help? You can reach us via WhatsApp at ********60 or explore our FAQ section. We\'re here to help you succeed!';
    }

    if (lowerMessage.includes('lifetime') || lowerMessage.includes('access')) {
      return 'Yes! All our packages include lifetime access to courses. Learn at your own pace, anytime, anywhere. Plus, you get 24/7 support!';
    }

    return 'That\'s a great question! For detailed information, please check our courses section or contact us via WhatsApp. I\'m here to help guide you to the right package!';
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-soft-lg bg-primary hover:bg-primary/90 text-white z-50 chatbot-button"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-soft-lg z-50 flex flex-col bg-card dark:bg-card border-border dark:border-border">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-border dark:border-border bg-primary dark:bg-primary text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <CardTitle className="text-lg">Evergreen.AI</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 p-0 flex flex-col">
            <ScrollArea className="flex-1 p-4 bg-secondary dark:bg-[#1E293B]" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.sender === 'bot' && (
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary dark:bg-primary/80 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-background dark:bg-[#334155] text-foreground dark:text-foreground'
                          : 'bg-primary/10 dark:bg-primary/20 text-foreground dark:text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    {message.sender === 'user' && (
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-accent dark:bg-accent flex items-center justify-center">
                        <User className="h-4 w-4 text-white dark:text-[#0F172A]" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-2 justify-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary dark:bg-primary/80 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-primary/10 dark:bg-primary/20 rounded-2xl px-4 py-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary dark:bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary dark:bg-primary rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-primary dark:bg-primary rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-border dark:border-border bg-background dark:bg-card">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 input-glow bg-background dark:bg-[#1E293B] border-border dark:border-border text-foreground dark:text-foreground placeholder:text-muted-foreground dark:placeholder:text-muted-foreground"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
