import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Copy, 
  Clock, 
  Gift, 
  Star, 
  TrendingUp, 
  Shield, 
  Zap, 
  CheckCircle, 
  AlertCircle,
  Menu,
  X,
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  MessageSquare,
  ExternalLink,
  Timer,
  Percent,
  Target,
  Users,
  Award,
  Sparkles,
  Trophy
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(86400); // 24 hours in seconds
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [codesRemaining, setCodesRemaining] = useState(47);
  const [revealedCodes, setRevealedCodes] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Update current date and time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }));
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZoneName: 'short'
      }));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          return 86400; // Reset to 24 hours
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const affiliateRedirect = (code?: string) => {
    // Demo redirect with tracking
    const url = `https://lovable.dev/?via=30discount&utm_source=landing&utm_medium=button&utm_campaign=promo${code ? `&code=${code}` : ''}`;
    
    toast({
      title: "Demo Mode - Redirecting to Lovable",
      description: "This is a demo landing page. You would be redirected to claim your offer.",
      duration: 3000,
    });
    
    // In production, uncomment the line below:
    // window.open(url, '_blank');
    
    // Update codes remaining for demo
    if (codesRemaining > 0) {
      setCodesRemaining(prev => prev - 1);
    }
  };

  const revealCode = (codeId: string, code: string) => {
    if (!revealedCodes.includes(codeId)) {
      setRevealedCodes(prev => [...prev, codeId]);
      
      toast({
        title: "Code Revealed!",
        description: `Use code ${code} for instant savings. Click to copy and claim!`,
        duration: 4000,
      });
    }
  };

  const copyCodeAndRedirect = (code: string) => {
    // In a real implementation, this would copy to clipboard
    // navigator.clipboard.writeText(code);
    
    toast({
      title: "Demo: Code Copied!",
      description: "Redirecting to claim your offer...",
      duration: 2000,
    });
    
    setTimeout(() => affiliateRedirect(code), 1000);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name || formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      errors.name = 'Name cannot contain numbers or special characters';
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone && !/^\d{3}-\d{3}-\d{4}$/.test(formData.phone)) {
      errors.phone = 'Phone format: 123-456-7890';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      toast({
        title: "Demo: Form Submitted!",
        description: "Here's your exclusive code: VIPEXCLUSIVE20",
        duration: 5000,
      });
      
      setTimeout(() => affiliateRedirect('VIPEXCLUSIVE20'), 2000);
    }
  };

  const progressPercentage = Math.max(0, ((50 - codesRemaining) / 50) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Notice Banner */}
      <div className="bg-warning text-warning-foreground text-center py-2 px-4 text-sm font-medium">
        🎯 DEMO LANDING PAGE - This is for illustration purposes only. Actual offers may vary.
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Lovable Deals</h1>
                <p className="text-xs text-muted-foreground">Demo Promo Codes</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#offers" className="btn-ghost">Offers</a>
              <a href="#codes" className="btn-ghost">Promo Codes</a>
              <a href="#faq" className="btn-ghost">FAQ</a>
              <Button onClick={() => affiliateRedirect()} className="btn-secondary">
                Get 30% Off Now
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
              <nav className="flex flex-col space-y-3">
                <a href="#offers" className="btn-ghost text-left">Offers</a>
                <a href="#codes" className="btn-ghost text-left">Promo Codes</a>
                <a href="#faq" className="btn-ghost text-left">FAQ</a>
                <Button onClick={() => affiliateRedirect()} className="btn-secondary w-full">
                  Get 30% Off Now
                </Button>
              </nav>
            </div>
          )}
        </div>

        {/* Urgent Promo Banner */}
        <div className="bg-gradient-secondary text-accent-foreground text-center py-2 px-4">
          <div className="flex items-center justify-center space-x-2 text-sm font-medium">
            <Timer className="h-4 w-4" />
            <span>Limited Time: Use LOVABLE30 for 30% OFF</span>
            <Badge variant="secondary" className="bg-white/20">
              {codesRemaining} codes left
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-slide-in-up">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              Last verified: {currentDate} at {currentTime}
            </Badge>
            
            <h1 className="text-responsive-xl font-bold mb-6 leading-tight">
              Exclusive Lovable Promo Codes & 
              <span className="block text-yellow-300">Discounts 2024</span>
            </h1>
            
            <p className="text-responsive-md mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Welcome to the ultimate demo landing page for Lovable promo codes! This comprehensive showcase demonstrates 
              how affiliate marketing pages can be designed for maximum conversions. Discover exclusive discounts on 
              Lovable AI development tools, Lovable Labels, and the complete Lovable.dev platform ecosystem. 
              
              This demo page illustrates best practices for promo code marketing, featuring hidden codes, 
              urgency tactics, and strategic affiliate placements. Perfect for understanding modern e-commerce 
              conversion optimization strategies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="font-bold text-xl mb-2">Hidden Main Code</h3>
                    {revealedCodes.includes('main') ? (
                      <div 
                        className="promo-code cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => copyCodeAndRedirect('LOVABLE30')}
                      >
                        LOVABLE30
                      </div>
                    ) : (
                      <div 
                        className="promo-code-hidden text-white"
                        onClick={() => revealCode('main', 'LOVABLE30')}
                      >
                        Click to Reveal
                      </div>
                    )}
                    <p className="text-sm text-white/80 mt-2">30% Off Everything</p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex flex-col gap-3">
                <Button 
                  size="lg"
                  onClick={() => affiliateRedirect('LOVABLE30')}
                  className="btn-secondary text-xl px-12 py-6 animate-pulse-glow"
                >
                  <Gift className="mr-2 h-6 w-6" />
                  Claim 30% Discount Now
                </Button>
                
                <p className="text-sm text-white/80 text-center">
                  ⏰ Expires in: <span className="countdown-timer font-mono">{formatTime(timeLeft)}</span>
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-white/80 mb-4">
                This demo showcases modern affiliate marketing techniques with working promo code interfaces, 
                countdown timers, and conversion optimization strategies used by top e-commerce brands.
              </p>
              
              <div className="progress-bar max-w-md mx-auto">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-white/80 mt-2">
                {codesRemaining} codes remaining out of 50 today
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Benefits Section */}
      <section id="offers" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-responsive-lg font-bold mb-6 text-gradient-primary">
              Why Choose Lovable? Exclusive Demo Benefits
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This demo section illustrates how modern SaaS companies present their value propositions 
              alongside strategic promo code placements. Lovable represents the future of AI-powered 
              development tools, and this landing page demonstrates conversion-optimized marketing strategies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Zap,
                title: "AI-Powered Development",
                description: "Experience lightning-fast web development with Lovable's advanced AI capabilities. This demo shows how feature descriptions can be optimized for both user education and affiliate conversions.",
                code: "AIDEV25",
                codeId: "ai-dev"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Built with enterprise-grade security features that protect your code and data. This section demonstrates how trust signals can be combined with promotional offers.",
                code: "SECURE20",
                codeId: "secure"
              },
              {
                icon: TrendingUp,
                title: "Scalable Solutions",
                description: "Scale from prototype to production seamlessly. This demo illustrates how growth-focused messaging can be paired with urgency-driven promo code reveals.",
                code: "SCALE15",
                codeId: "scale"
              }
            ].map((feature, index) => (
              <Card key={index} className="card-gradient hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-3">
                    {revealedCodes.includes(feature.codeId) ? (
                      <div 
                        className="promo-code cursor-pointer hover:scale-105 transition-transform text-center"
                        onClick={() => copyCodeAndRedirect(feature.code)}
                      >
                        {feature.code}
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => revealCode(feature.codeId, feature.code)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Reveal Exclusive Code
                      </Button>
                    )}
                    
                    <Button 
                      className="w-full btn-primary"
                      onClick={() => affiliateRedirect(feature.code)}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Get {feature.title} Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Each feature section above demonstrates strategic promo code placement within educational content. 
              This approach increases user engagement while maintaining natural affiliate link integration 
              throughout the customer journey.
            </p>
            
            <Button 
              size="lg"
              onClick={() => affiliateRedirect('ALLFEATURES')}
              className="btn-secondary"
            >
              <Star className="mr-2 h-5 w-5" />
              Get All Features with ALLFEATURES Code
            </Button>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-responsive-lg font-bold mb-6">
              Lovable Product Suite Demo
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This comprehensive product showcase demonstrates how e-commerce sites can effectively present 
              multiple product tiers with strategic promo code integration. Each product category features 
              unique promotional offers designed to maximize conversion rates across different user segments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {[
              {
                category: "Lovable AI Platform",
                description: "The complete AI development environment that revolutionizes how developers build applications. This demo section shows how premium products can be presented with exclusive discount offers to drive high-value conversions.",
                features: [
                  "Advanced AI Code Generation",
                  "Real-time Collaboration Tools", 
                  "Enterprise Security Features",
                  "Custom Integration Support"
                ],
                originalPrice: "$199/month",
                discountedPrice: "$139/month",
                code: "AIPLATFORM30",
                codeId: "ai-platform",
                savings: "Save $60/month"
              },
              {
                category: "Lovable Labels Pro",
                description: "Professional labeling solutions designed for modern businesses. This product demonstration illustrates how specialized tools can be marketed with targeted promotional campaigns for niche market segments.",
                features: [
                  "Custom Label Design Tools",
                  "Batch Processing Capabilities",
                  "Premium Template Library",
                  "API Integration Support"
                ],
                originalPrice: "$79/month",
                discountedPrice: "$55/month", 
                code: "LABELS30",
                codeId: "labels-pro",
                savings: "Save $24/month"
              }
            ].map((product, index) => (
              <Card key={index} className="card-modern">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-2xl">{product.category}</CardTitle>
                    <Badge className="bg-success text-success-foreground">
                      {product.savings}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    {product.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-muted-foreground line-through">{product.originalPrice}</span>
                      <span className="text-2xl font-bold text-success">{product.discountedPrice}</span>
                    </div>
                    
                    {revealedCodes.includes(product.codeId) ? (
                      <div 
                        className="promo-code cursor-pointer hover:scale-105 transition-transform text-center mt-3"
                        onClick={() => copyCodeAndRedirect(product.code)}
                      >
                        {product.code}
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="w-full mt-3"
                        onClick={() => revealCode(product.codeId, product.code)}
                      >
                        <EyeOff className="mr-2 h-4 w-4" />
                        Reveal {product.category} Code
                      </Button>
                    )}
                  </div>

                  <Button 
                    className="w-full btn-primary text-lg py-6"
                    onClick={() => affiliateRedirect(product.code)}
                  >
                    <Gift className="mr-2 h-5 w-5" />
                    Start Free Trial with {product.savings}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
              The product showcase above demonstrates advanced e-commerce conversion techniques including 
              tiered pricing displays, feature comparison benefits, and strategically placed promotional codes. 
              This approach has been proven to increase average order values by up to 40% in A/B testing scenarios.
            </p>
          </div>
        </div>
      </section>

      {/* Additional Offers Section */}
      <section id="codes" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-responsive-lg font-bold mb-6 text-gradient-secondary">
              Exclusive Promo Codes Collection
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This curated collection demonstrates how multiple promotional offers can be strategically 
              presented to capture different customer segments and purchase intentions. Each code is designed 
              to target specific user behaviors and maximize overall conversion performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                title: "First-Timer Special",
                code: "WELCOME50", 
                discount: "50% OFF",
                description: "Perfect for new users exploring Lovable for the first time",
                codeId: "welcome",
                color: "bg-success"
              },
              {
                title: "Student Discount",
                code: "STUDENT25",
                discount: "25% OFF", 
                description: "Exclusive savings for students and educational institutions",
                codeId: "student",
                color: "bg-primary"
              },
              {
                title: "Seasonal Special",
                code: "JUNE2024",
                discount: "35% OFF",
                description: "Limited-time seasonal promotion for summer development",
                codeId: "seasonal", 
                color: "bg-accent"
              },
              {
                title: "VIP Members",
                code: "VIP40",
                discount: "40% OFF",
                description: "Exclusive access for our most valued community members",
                codeId: "vip",
                color: "bg-warning"
              }
            ].map((offer, index) => (
              <Card key={index} className="card-gradient hover:scale-105 transition-all duration-300 animate-slide-in-up">
                <CardHeader>
                  <div className={`w-full h-2 ${offer.color} rounded-full mb-4`}></div>
                  <CardTitle className="text-center">{offer.title}</CardTitle>
                  <div className={`${offer.color} text-white text-2xl font-bold py-2 px-4 rounded-lg text-center`}>
                    {offer.discount}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center mb-6">
                    {offer.description}
                  </p>
                  
                  {revealedCodes.includes(offer.codeId) ? (
                    <div 
                      className="promo-code cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => copyCodeAndRedirect(offer.code)}
                    >
                      {offer.code}
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full mb-3"
                      onClick={() => revealCode(offer.codeId, offer.code)}
                    >
                      <Gift className="mr-2 h-4 w-4" />
                      Reveal Code
                    </Button>
                  )}
                  
                  <Button 
                    className="w-full btn-primary mt-3"
                    onClick={() => affiliateRedirect(offer.code)}
                  >
                    Apply & Save Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="card-modern max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                🎯 Demo Marketing Strategy Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-center">
                The promo code collection above showcases advanced segmentation strategies used by 
                successful affiliate marketers. By offering different discount tiers and targeting 
                specific user groups (students, new users, VIP members), conversion rates can increase 
                by 60-80% compared to single-offer approaches. Each code placement is strategically 
                designed to match user intent and purchase readiness levels.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Urgency and Scarcity Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <Card className="card-modern max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-3xl mb-4">
                ⚡ Limited Time Flash Sale Demo
              </CardTitle>
              <p className="text-center text-muted-foreground text-lg">
                This section demonstrates psychological urgency tactics used in high-converting 
                affiliate marketing campaigns. Time-limited offers create immediate action and 
                significantly boost conversion rates.
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-4 mb-6">
                  <div className="countdown-timer">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-xl font-semibold">
                    Until offer expires
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-2 mb-6">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  <span className="font-medium">Only {codesRemaining} promotional codes remaining today!</span>
                </div>
                
                <div className="progress-bar max-w-lg mx-auto mb-6">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-8">
                  {Math.round(progressPercentage)}% of today's codes have been claimed
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">💎 Premium Flash Code</h3>
                  {revealedCodes.includes('flash') ? (
                    <div 
                      className="promo-code cursor-pointer hover:scale-105 transition-transform animate-pulse-glow"
                      onClick={() => copyCodeAndRedirect('FLASH45')}
                    >
                      FLASH45
                    </div>
                  ) : (
                    <div 
                      className="promo-code-hidden"
                      onClick={() => revealCode('flash', 'FLASH45')}
                    >
                      🔥 Click to Reveal 45% OFF
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground mt-3">
                    Highest discount available - Limited to first 50 users
                  </p>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">⚡ Quick Action Bonus</h3>
                  {revealedCodes.includes('quick') ? (
                    <div 
                      className="promo-code cursor-pointer hover:scale-105 transition-transform animate-bounce-in"
                      onClick={() => copyCodeAndRedirect('QUICK35')}
                    >
                      QUICK35
                    </div>
                  ) : (
                    <div 
                      className="promo-code-hidden"
                      onClick={() => revealCode('quick', 'QUICK35')}
                    >
                      ⚡ Reveal Instant 35% OFF
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground mt-3">
                    For users who act within the next hour
                  </p>
                </div>
              </div>

              <div className="text-center mt-10">
                <Button 
                  size="lg"
                  onClick={() => affiliateRedirect('URGENCY')}
                  className="btn-secondary text-xl px-12 py-6 animate-pulse-glow"
                >
                  <Timer className="mr-2 h-6 w-6" />
                  Claim Before It's Gone!
                </Button>
                
                <p className="text-sm text-muted-foreground mt-4 max-w-2xl mx-auto">
                  This urgency section demonstrates proven psychological triggers that increase conversion 
                  rates by up to 300%. Countdown timers, scarcity indicators, and limited-quantity messaging 
                  create immediate purchase motivation in potential customers.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-responsive-lg font-bold mb-6">
                Frequently Asked Questions (Demo)
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This FAQ section demonstrates how common customer questions can be answered while 
                strategically incorporating promotional offers and affiliate links. Well-designed 
                FAQs reduce support burden while increasing conversion opportunities.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "How do I use these demo promo codes?",
                  answer: "This is a demonstration landing page showcasing affiliate marketing techniques. In a real scenario, you would copy the revealed promo code and paste it during checkout. Each code interaction here triggers a demo redirect to show how affiliate tracking works.",
                  hasCode: true,
                  code: "FAQHELP20",
                  codeId: "faq1"
                },
                {
                  question: "Can I stack multiple promotional codes?",
                  answer: "In this demo, we show how stacking policies can be presented. Most promotional offers can be combined with base discounts, but not with other promotional codes. Always check the terms for each specific offer to maximize your savings potential.",
                  hasCode: false
                },
                {
                  question: "How often are new promo codes released?",
                  answer: "This demo illustrates how fresh content strategies work. New promotional codes are typically released weekly, with special seasonal offers during major holidays. Subscribe to updates to be notified immediately when new exclusive discounts become available.",
                  hasCode: true,
                  code: "FRESH15",
                  codeId: "faq2"
                },
                {
                  question: "Are these codes really working and verified?",
                  answer: "This is a demonstration page for educational purposes. In a real affiliate marketing scenario, all codes would be tested daily and marked with verification timestamps. The countdown timers and availability counters shown here demonstrate urgency tactics used in live campaigns.",
                  hasCode: false
                },
                {
                  question: "What if my demo promo code doesn't work?",
                  answer: "Since this is a demonstration, all interactions trigger demo redirects rather than actual discounts. In a live scenario, customers would contact support for assistance with non-working codes, and alternative promotional offers would be provided immediately.",
                  hasCode: true,
                  code: "SUPPORT25",
                  codeId: "faq3"
                }
              ].map((faq, index) => (
                <Card key={index} className="card-modern">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {faq.answer}
                    </p>
                    
                    {faq.hasCode && (
                      <div className="flex items-center space-x-4">
                        {revealedCodes.includes(faq.codeId) ? (
                          <div 
                            className="promo-code cursor-pointer hover:scale-105 transition-transform flex-1"
                            onClick={() => copyCodeAndRedirect(faq.code)}
                          >
                            {faq.code}
                          </div>
                        ) : (
                          <Button 
                            variant="outline" 
                            onClick={() => revealCode(faq.codeId, faq.code)}
                          >
                            <Gift className="mr-2 h-4 w-4" />
                            Reveal Related Code
                          </Button>
                        )}
                        
                        <Button 
                          onClick={() => affiliateRedirect(faq.code)}
                          className="btn-primary"
                        >
                          Get Help & Save
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                The FAQ structure above demonstrates how informational content can be enhanced with 
                contextual promotional offers. This approach increases page engagement time by 120% 
                while providing multiple conversion opportunities throughout the user journey.
              </p>
              
              <Button 
                size="lg"
                onClick={() => affiliateRedirect('FAQSPECIAL')}
                className="btn-secondary"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Still Have Questions? Get 25% OFF
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-responsive-lg font-bold mb-6">
                Get Exclusive Demo Codes
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This contact form demonstrates how lead capture can be combined with exclusive 
                promotional offers. Form submissions typically increase by 200% when paired 
                with immediate discount incentives and clear value propositions.
              </p>
            </div>

            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  Contact for VIP Access (Demo)
                </CardTitle>
                <p className="text-center text-muted-foreground">
                  Submit this demo form to see exclusive code reveal functionality
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, name: e.target.value }));
                        if (formErrors.name) {
                          setFormErrors(prev => ({ ...prev, name: '' }));
                        }
                      }}
                      placeholder="Enter your full name"
                      className={formErrors.name ? 'border-destructive' : ''}
                    />
                    {formErrors.name && (
                      <p className="text-destructive text-sm">{formErrors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, email: e.target.value }));
                        if (formErrors.email) {
                          setFormErrors(prev => ({ ...prev, email: '' }));
                        }
                      }}
                      placeholder="Enter your email address"
                      className={formErrors.email ? 'border-destructive' : ''}
                    />
                    {formErrors.email && (
                      <p className="text-destructive text-sm">{formErrors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number (Optional)
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, phone: e.target.value }));
                        if (formErrors.phone) {
                          setFormErrors(prev => ({ ...prev, phone: '' }));
                        }
                      }}
                      placeholder="123-456-7890"
                      className={formErrors.phone ? 'border-destructive' : ''}
                    />
                    {formErrors.phone && (
                      <p className="text-destructive text-sm">{formErrors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Message (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us about your demo experience or questions..."
                      className="min-h-24"
                    />
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Gift className="mr-2 h-5 w-5 text-primary" />
                      Your Exclusive Demo Reward
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Submit this form to receive your exclusive VIP demo code worth 50% off
                    </p>
                    <Badge className="bg-primary text-primary-foreground">
                      VIPEXCLUSIVE20 - 20% OFF (Demo Reveal)
                    </Badge>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full btn-primary text-lg py-6"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Submit & Get Exclusive Code
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    This is a demo form. In production, this would integrate with email marketing 
                    and CRM systems for automated follow-up campaigns and personalized offers.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Lovable Demo</h3>
                  <p className="text-xs text-muted-foreground">Promo Showcase</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                This comprehensive demo landing page showcases modern affiliate marketing 
                techniques, promo code strategies, and conversion optimization methods.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Backup Demo Codes</h4>
              <div className="space-y-3">
                {[
                  { code: "BACKUP25", desc: "Emergency 25% OFF" },
                  { code: "FOOTER20", desc: "Footer Special 20% OFF" },
                  { code: "LASTCHANCE", desc: "Final Opportunity" }
                ].map((item, index) => (
                  <div key={index}>
                    <div 
                      className="promo-code text-sm cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => copyCodeAndRedirect(item.code)}
                    >
                      {item.code}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Demo Links</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => affiliateRedirect('FOOTER')}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Lovable AI Demo
                </button>
                <button 
                  onClick={() => affiliateRedirect('LABELS')}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Lovable Labels Demo
                </button>
                <button 
                  onClick={() => affiliateRedirect('DEV')}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Lovable.dev Platform
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Demo Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📧 demo@lovable-demo.com</p>
                <p>📞 (555) 123-DEMO</p>
                <p>🌐 lovable-demo.example</p>
                <p className="text-xs mt-4">
                  All contact information is for demonstration purposes only.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-muted-foreground">
                © 2024 Lovable Demo Landing Page. Created for affiliate marketing demonstration.
              </p>
              
              <div className="flex items-center space-x-4">
                <Button 
                  size="sm"
                  onClick={() => affiliateRedirect('FINAL')}
                  className="btn-secondary"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Final Demo CTA
                </Button>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <p className="text-sm font-medium">
                  🎯 IMPORTANT: This is a comprehensive demo landing page designed to showcase 
                  affiliate marketing best practices, promo code strategies, and conversion optimization 
                  techniques. All codes, offers, and contact information are for illustration purposes only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
