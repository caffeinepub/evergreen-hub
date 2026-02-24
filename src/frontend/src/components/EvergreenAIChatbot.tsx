import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
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
      return 'We offer six amazing course packages ranging from E-LITE (₹699) to ULTRA PRO (₹14,999). Each package includes lifetime access to premium courses. Would you like to know more about a specific package?';
    }

    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return 'Our packages are priced at: E-LITE - ₹699, SILVER - ₹1,499, GOLD - ₹2,999, DIAMOND - ₹4,999 (Best Value), PLATINUM - ₹9,999, and ULTRA PRO - ₹14,999. All packages include lifetime access and expert guidance!';
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
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 h-14 w-14 rounded-full shadow-soft-lg bg-primary hover:bg-primary/90 text-white z-40 chatbot-button"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md h-[600px] p-0 flex flex-col bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-700">
          <DialogHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-300 dark:border-slate-700 bg-primary text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <DialogTitle className="text-lg text-white">Evergreen.AI</DialogTitle>
            </div>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </DialogHeader>

          <div className="flex-1 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 p-4 bg-gray-50 dark:bg-slate-800" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.sender === 'bot' && (
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-slate-600'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    {message.sender === 'user' && (
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                        <User className="h-4 w-4 text-white dark:text-slate-900" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-2 justify-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-2xl px-4 py-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 input-glow bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
