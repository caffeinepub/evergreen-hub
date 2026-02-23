import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

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
      text: 'Hello! I\'m Evergreen.AI, your virtual assistant. How can I help you today? Ask me about courses, packages, pricing, payments, video editing, or account management!',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const [showBorderAnimation, setShowBorderAnimation] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Hide border animation after it completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBorderAnimation(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isOpen) return;
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = Math.abs(e.clientX - dragStart.x - position.x);
    const deltaY = Math.abs(e.clientY - dragStart.y - position.y);
    
    if (deltaX > 5 || deltaY > 5) {
      setHasMoved(true);
    }

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Keep within viewport bounds
    const maxX = window.innerWidth - (buttonRef.current?.offsetWidth || 200);
    const maxY = window.innerHeight - (buttonRef.current?.offsetHeight || 56);

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isOpen) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    
    const deltaX = Math.abs(touch.clientX - dragStart.x - position.x);
    const deltaY = Math.abs(touch.clientY - dragStart.y - position.y);
    
    if (deltaX > 5 || deltaY > 5) {
      setHasMoved(true);
    }

    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;

    const maxX = window.innerWidth - (buttonRef.current?.offsetWidth || 200);
    const maxY = window.innerHeight - (buttonRef.current?.offsetHeight || 56);

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (!hasMoved) {
      setIsOpen(true);
    }
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'Hello! Welcome to Evergreen Hub. How can I assist you with our affiliate marketing courses today?';
    }

    // Course packages - detailed information
    if (lowerMessage.includes('e-lite') || lowerMessage.includes('elite package')) {
      return 'E-LITE Package: Our entry-level package perfect for beginners. It includes foundational courses on affiliate marketing. Check the pricing section for current offers!';
    }

    if (lowerMessage.includes('starter')) {
      return 'STARTER Package: A great package for those starting their affiliate marketing journey with comprehensive beginner-friendly content and step-by-step guidance.';
    }

    if (lowerMessage.includes('pro package') || (lowerMessage.includes('pro') && !lowerMessage.includes('elite') && !lowerMessage.includes('ultra'))) {
      return 'PRO Package: Our professional-level package with advanced affiliate marketing strategies and techniques to boost your earnings.';
    }

    if (lowerMessage.includes('advanced')) {
      return 'ADVANCED Package: Designed for serious marketers who want to scale their affiliate business with advanced tactics and insider strategies.';
    }

    if (lowerMessage.includes('elite pro')) {
      return 'ELITE PRO Package: Premium package combining elite-level training with professional tools and resources for maximum success.';
    }

    if (lowerMessage.includes('ultra pro')) {
      return 'ULTRA PRO Package: Our most comprehensive package with everything you need - all courses, lifetime access, priority support, and exclusive bonuses!';
    }

    // General course/package queries
    if (lowerMessage.includes('course') || lowerMessage.includes('package') || lowerMessage.includes('all packages')) {
      return 'We offer 6 comprehensive course packages: E-LITE, STARTER, PRO, ADVANCED, ELITE PRO, and ULTRA PRO. Each includes multiple courses on affiliate marketing, digital marketing, and passive income strategies. All packages come with lifetime access and WhatsApp support. Which package interests you?';
    }

    // Pricing
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
      return 'Our packages are competitively priced to suit different budgets and learning goals. You can view exact pricing for all 6 packages (E-LITE through ULTRA PRO) in the pricing section on our main page. We also have special offers running! Would you like help choosing the right package?';
    }

    // Payment process - comprehensive
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('how to pay')) {
      return 'Payment Process: 1) Select your package and click "Buy Now" 2) Scan the PhonePe QR code or transfer to India Post Payment Bank (Account ending in 5673) 3) Take a screenshot of your payment 4) Submit payment proof with transaction ID 5) Get approved within 24 hours! We accept PhonePe and bank transfers.';
    }

    if (lowerMessage.includes('phonepe') || lowerMessage.includes('qr code') || lowerMessage.includes('scan')) {
      return 'You can pay via PhonePe by scanning the QR code shown in the payment modal. After payment, take a screenshot and submit it along with your transaction ID for verification.';
    }

    if (lowerMessage.includes('bank transfer') || lowerMessage.includes('bank account') || lowerMessage.includes('account number')) {
      return 'Bank Transfer Details: India Post Payment Bank, Account ending in ****5673. Full details including IFSC code and account holder name are shown in the payment modal. After transfer, submit your payment proof with transaction ID.';
    }

    if (lowerMessage.includes('payment proof') || lowerMessage.includes('screenshot') || lowerMessage.includes('submit proof')) {
      return 'After making payment, submit your payment proof by: 1) Uploading a screenshot of the transaction 2) Entering your transaction ID 3) Clicking Submit. You can also send it directly via WhatsApp to +91 9263989760. Verification takes up to 24 hours.';
    }

    if (lowerMessage.includes('transaction id') || lowerMessage.includes('reference number')) {
      return 'Your transaction ID is the unique reference number from your payment (from PhonePe or bank transfer). You\'ll need to enter this when submitting your payment proof for verification.';
    }

    // Order placement
    if (lowerMessage.includes('order') || lowerMessage.includes('how to order') || lowerMessage.includes('place order')) {
      return 'To place an order: 1) Login or register 2) Click "Buy Course Now" or select a package 3) Choose your desired package 4) Complete payment via PhonePe QR or bank transfer 5) Submit payment proof 6) Wait for approval (within 24 hours) 7) Access your courses from the dashboard!';
    }

    // Offers and benefits
    if (lowerMessage.includes('offer') || lowerMessage.includes('discount') || lowerMessage.includes('deal')) {
      return 'We have special offers running! All packages include: ✓ Lifetime Access ✓ Step-by-Step Guidance ✓ Beginner Friendly Training ✓ WhatsApp Support ✓ No Hidden Fees. Check the countdown banner for limited-time deals!';
    }

    if (lowerMessage.includes('benefit') || lowerMessage.includes('what do i get') || lowerMessage.includes('includes')) {
      return 'Every package includes: 🎓 Complete course access 📱 WhatsApp support (+91 9263989760) ♾️ Lifetime access 📚 Step-by-step guidance 👥 Beginner-friendly content 🎯 Practical strategies. Higher packages include more courses and advanced content!';
    }

    // Video editing service
    if (lowerMessage.includes('video editing') || lowerMessage.includes('editing service') || lowerMessage.includes('edit video')) {
      return 'Professional Long Video Editing Service: Just ₹500 per video! We provide high-quality editing with fast turnaround. Order via WhatsApp (+91 9263989760) or through the payment modal on our website. Perfect for YouTube, Instagram, or promotional content!';
    }

    if (lowerMessage.includes('video price') || lowerMessage.includes('editing cost')) {
      return 'Our professional video editing service costs ₹500 per video. This includes complete editing with transitions, effects, and professional output. Contact us on WhatsApp (+91 9263989760) to place your order!';
    }

    // Contact and support
    if (lowerMessage.includes('contact') || lowerMessage.includes('whatsapp') || lowerMessage.includes('phone') || lowerMessage.includes('support number')) {
      return 'Contact Us: 📱 WhatsApp: +91 9263989760 (Click the floating WhatsApp button for instant chat!) We provide lifetime WhatsApp support for all course purchases. Feel free to reach out anytime!';
    }

    // Authentication and account
    if (lowerMessage.includes('register') || lowerMessage.includes('sign up') || lowerMessage.includes('create account')) {
      return 'To register: 1) Click "Register" in the header 2) Use Internet Identity for secure authentication 3) Enter your name, email, and phone 4) Complete registration. It\'s quick, secure, and passwordless!';
    }

    if (lowerMessage.includes('login') || lowerMessage.includes('log in') || lowerMessage.includes('sign in')) {
      return 'To login: Click "Login" in the header and authenticate using Internet Identity. It\'s a secure, passwordless authentication system. After login, you can access your dashboard and purchased courses!';
    }

    if (lowerMessage.includes('password') || lowerMessage.includes('forgot password')) {
      return 'We use Internet Identity for authentication - no passwords needed! It\'s more secure and convenient. Your identity is managed through cryptographic keys, so you never have to remember or reset passwords.';
    }

    // Dashboard and account management
    if (lowerMessage.includes('dashboard') || lowerMessage.includes('my account') || lowerMessage.includes('access course')) {
      return 'After purchasing and approval: 1) Login to your account 2) Go to Dashboard from the header menu 3) View "My Packages" to see purchased courses 4) Check payment status 5) Access your courses. You can also update your profile in "Profile Settings"!';
    }

    if (lowerMessage.includes('my packages') || lowerMessage.includes('purchased') || lowerMessage.includes('bought courses')) {
      return 'To view your purchased packages: Login → Dashboard → My Packages. Here you\'ll see all your payment submissions, approval status, and access to approved courses. Pending payments are verified within 24 hours!';
    }

    if (lowerMessage.includes('payment status') || lowerMessage.includes('check status') || lowerMessage.includes('approved')) {
      return 'Check your payment status: Dashboard → My Packages. You\'ll see status badges: 🟡 Pending (under review), ✅ Approved (access granted), ❌ Rejected (contact support). Approvals typically take up to 24 hours.';
    }

    if (lowerMessage.includes('profile') || lowerMessage.includes('update profile') || lowerMessage.includes('change name')) {
      return 'To update your profile: Dashboard → Profile Settings. You can update your name and phone number. Your email and principal ID are fixed for security reasons.';
    }

    // Course access and content
    if (lowerMessage.includes('access') || lowerMessage.includes('how to access') || lowerMessage.includes('start learning')) {
      return 'After your payment is approved: 1) Login to your dashboard 2) Go to "My Packages" 3) Your approved courses will be accessible 4) Start learning immediately! All courses have lifetime access with WhatsApp support.';
    }

    if (lowerMessage.includes('lifetime') || lowerMessage.includes('how long')) {
      return 'All our packages come with LIFETIME ACCESS! Once you purchase and get approved, you can access your courses forever. No expiry, no recurring fees. Learn at your own pace!';
    }

    // Refund policy
    if (lowerMessage.includes('refund') || lowerMessage.includes('money back') || lowerMessage.includes('return')) {
      return 'For refund policy and related queries, please contact us directly on WhatsApp at +91 9263989760. Our team will assist you with your specific situation.';
    }

    // Social media
    if (lowerMessage.includes('instagram') || lowerMessage.includes('insta')) {
      return 'Follow us on Instagram @rajput.rudra_s for daily tips, success stories, exclusive content, and updates! Stay connected with our community of successful affiliate marketers.';
    }

    if (lowerMessage.includes('youtube')) {
      return 'Subscribe to our YouTube channel "Evergreen Hub" for FREE tutorials, tips, and valuable content on affiliate marketing! Learn from our free content before you buy.';
    }

    // Help and general support
    if (lowerMessage.includes('help') || lowerMessage.includes('assist')) {
      return 'I can help you with: 📦 Course packages (E-LITE to ULTRA PRO) 💰 Pricing and offers 💳 Payment process 📸 Payment proof submission 🎬 Video editing service (₹500) 📱 WhatsApp support 🔐 Login/Registration 📊 Dashboard access 👤 Profile management. What would you like to know?';
    }

    // Thank you
    if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! Feel free to ask if you have any other questions. For immediate assistance, contact us on WhatsApp: +91 9263989760. Happy learning! 🚀';
    }

    // Default response
    return 'I\'m here to help! You can ask me about: 📚 Our 6 course packages 💵 Pricing and payment methods 📱 WhatsApp support (+91 9263989760) 🎬 Video editing (₹500) 🔐 Login/Registration 📊 Dashboard and account management 💳 Payment proof submission. What would you like to know?';
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

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const buttonStyle = position.x !== 0 || position.y !== 0
    ? {
        position: 'fixed' as const,
        left: `${position.x}px`,
        top: `${position.y}px`,
        right: 'auto',
        bottom: 'auto',
      }
    : {};

  return (
    <>
      {!isOpen && (
        <Button
          ref={buttonRef}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`fixed bottom-28 right-6 z-40 h-14 px-6 rounded-full bg-black hover:bg-gray-900 text-emerald-500 shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105 font-bold border-2 border-emerald-500 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} chatbot-button ${showBorderAnimation ? 'chatbot-border-animation' : ''}`}
          style={buttonStyle}
          aria-label="Open Evergreen.AI Chatbot"
        >
          <Bot className="h-6 w-6 mr-2" />
          Evergreen.AI
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-28 right-6 z-40 w-full max-w-[calc(100vw-3rem)] sm:w-96 h-[500px] max-h-[calc(100vh-10rem)] shadow-2xl border-2 border-emerald-500 flex flex-col">
          <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-t-lg p-4 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6" />
              <CardTitle className="text-lg font-bold">Evergreen.AI</CardTitle>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
              aria-label="Close Chatbot"
            >
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-emerald-500 text-black'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-emerald-500 hover:bg-emerald-600 text-black"
                  aria-label="Send Message"
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
