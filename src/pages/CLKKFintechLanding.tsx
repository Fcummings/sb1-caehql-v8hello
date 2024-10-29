import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Smartphone, BarChart, Shield, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/Logo"
import { analyticsEvents } from "@/lib/firebase"
import { saveIconAsPNG } from "@/utils/saveIcon"

export default function CLKKFintechLanding() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    analyticsEvents.pageView('landing_page');
  }, []);

  const faqs = [
    {
      question: "How does CLKK ensure transaction security?",
      answer: "CLKK utilizes advanced encryption and blockchain technology to ensure all transactions are secure, transparent, and immutable."
    },
    {
      question: "Can CLKK integrate with existing POS systems?",
      answer: "Yes, CLKK is designed to seamlessly integrate with most modern POS systems, making adoption easy for businesses."
    },
    {
      question: "What are the fees associated with using CLKK?",
      answer: "CLKK offers competitive rates with no hidden fees. Businesses pay a small percentage per transaction, significantly lower than traditional payment processors."
    },
    {
      question: "How quickly are funds available after a transaction?",
      answer: "With CLKK, funds are available instantly. Our real-time settlement ensures you have access to your money immediately after each transaction."
    }
  ]

  const handleSaveLogo = () => {
    saveIconAsPNG();
    analyticsEvents.downloadLogo();
  }

  const handleFaqClick = (index: number, question: string) => {
    setExpandedFaq(expandedFaq === index ? null : index);
    if (expandedFaq !== index) {
      analyticsEvents.faqExpand(question);
    }
  }

  const handleFeatureClick = (featureName: string) => {
    analyticsEvents.featureClick(featureName);
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Sticky Header */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          <Link to="/signup">
            <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="w-full max-w-7xl mx-auto px-4 py-32 mt-16 text-center">
        <div className="flex flex-col items-center justify-center">
          <div 
            id="clkk-logo"
            className="group cursor-pointer transition-transform hover:scale-105"
            onClick={handleSaveLogo}
            title="Click to download logo"
          >
            <Logo />
          </div>
          <p className="mt-6 mb-8 text-2xl font-light text-gray-300">Next-Generation Payment Solutions</p>
        </div>
      </header>

      {/* Features Section */}
      <section className="w-full py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">Why Choose CLKK?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Logo, title: "Instant Payments", description: "Real-time transactions and settlements" },
              { icon: Smartphone, title: "User-Friendly", description: "Intuitive mobile app for seamless payments" },
              { icon: BarChart, title: "Business Insights", description: "Advanced analytics for informed decisions" },
              { icon: Shield, title: "Secure & Compliant", description: "Bank-grade security and regulatory compliance" }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-6 bg-gray-700 rounded-lg transition-all duration-300 hover:bg-gray-600 hover:shadow-xl"
                onClick={() => handleFeatureClick(feature.title)}
              >
                {index === 0 ? (
                  <Logo showText={false} className="mb-4" />
                ) : (
                  <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
                )}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">How CLKK Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
            <div className="w-full md:w-1/2 space-y-4">
              {[
                "Download the CLKK app",
                "Link your payment method",
                "Scan QR code or tap to pay",
                "Enjoy instant transaction settlement"
              ].map((step, index) => (
                <div key={index} className="flex items-center space-x-4 bg-gray-700 p-4 rounded-lg">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <p>{step}</p>
                </div>
              ))}
            </div>
            <div className="w-full md:w-1/2">
              <div className="bg-gray-700 p-8 rounded-lg shadow-xl">
                <div className="w-64 h-96 mx-auto bg-gray-800 rounded-3xl border-4 border-gray-600 p-4 flex flex-col justify-between">
                  <div className="w-full h-4 bg-gray-600 rounded-full mb-4"></div>
                  <div className="flex-grow flex items-center justify-center">
                    <Logo className="scale-75" />
                  </div>
                  <div className="w-16 h-16 mx-auto bg-gray-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-700 rounded-lg transition-all duration-300">
                <button
                  className="flex w-full items-center justify-between p-4 text-left font-semibold"
                  onClick={() => handleFaqClick(index, faq.question)}
                >
                  {faq.question}
                  {expandedFaq === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {expandedFaq === index && (
                  <div className="p-4 pt-0 text-gray-300">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="mb-8 text-4xl font-bold">Ready to Transform Your Payment Experience?</h2>
          <p className="mb-8 text-xl text-gray-200">Join the CLKK revolution and experience seamless payments</p>
          <Link to="/signup">
            <Button className="bg-gray-900 hover:bg-gray-800 transition-colors duration-300 text-lg px-8 py-6">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <div className="inline-block">
                <Logo className="scale-75 origin-left" />
              </div>
              <p className="text-gray-400 mt-4">Revolutionizing payments with cutting-edge fintech solutions.</p>
            </div>
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button className="text-gray-400 hover:text-white transition-colors duration-300">About Us</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors duration-300">Features</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors duration-300">For Businesses</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors duration-300">Support</button></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <button key={social} className="text-gray-400 hover:text-white transition-colors duration-300">
                    <span className="sr-only">{social}</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 CLKK. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}