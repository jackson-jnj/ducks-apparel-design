
import { Check, Zap, Crown, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/Header";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for getting started",
      icon: <Zap className="w-6 h-6" />,
      features: [
        "5 mockups per month",
        "Basic 3D models",
        "Standard export quality",
        "Community support",
        "Basic animations"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      description: "For professional designers",
      icon: <Crown className="w-6 h-6" />,
      features: [
        "Unlimited mockups",
        "Premium 3D models",
        "4K export quality",
        "Priority support",
        "Advanced animations",
        "Custom branding",
        "Video exports",
        "Batch processing"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "For teams and agencies",
      icon: <Rocket className="w-6 h-6" />,
      features: [
        "Everything in Pro",
        "Team collaboration",
        "API access",
        "Custom models",
        "White-label solution",
        "Advanced analytics",
        "Dedicated support",
        "Custom integrations"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Perfect Plan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start for free and scale up as you grow. All plans include our core 3D mockup features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                plan.popular 
                  ? 'border-blue-500 scale-105' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="p-8">
                {/* Plan header */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${
                    plan.popular 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== "Free" && (
                      <span className="text-gray-600 ml-2">/month</span>
                    )}
                  </div>
                </div>
                
                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <Button
                  variant={plan.buttonVariant}
                  className={`w-full py-3 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                      : ''
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I switch plans anytime?</h3>
              <p className="text-gray-600">Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">We offer a 30-day money-back guarantee for all paid plans. No questions asked.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What file formats do you support?</h3>
              <p className="text-gray-600">We support PNG, JPG, SVG for designs, and export to PNG, MP4, and WebM formats.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">Yes! Pro plan comes with a 14-day free trial. No credit card required to start.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
