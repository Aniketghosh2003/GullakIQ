import React, { useEffect } from 'react';
import { ShieldCheck, Lock, Eye, Database, UserCheck, FileText, ArrowLeft, Mail, KeyRound, Server } from 'lucide-react';

export default function PrivacyPolicy({ onNavigateHome, onOpenAuth }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: Eye,
      title: "1. Information We Collect",
      content: [
        {
          subtitle: "Account Information",
          text: "When you create an account on GullakIQ, we collect basic registration information including your name, email address, and encrypted password credentials."
        },
        {
          subtitle: "Financial & Expense Data",
          text: "We collect transaction details, expense categories, income entries, savings goals, and investment records that you voluntarily input to track your personal finances."
        },
        {
          subtitle: "Usage & Device Analytics",
          text: "To ensure system security and optimize user experience, we collect minimal technical telemetry such as browser type, device details, and session timestamps."
        }
      ]
    },
    {
      icon: Database,
      title: "2. How We Use Your Information",
      content: [
        {
          subtitle: "Expense & Financial Tracking",
          text: "Your data is strictly processed to render interactive financial dashboards, compute monthly budgets, track savings goals, and project investment trends."
        },
        {
          subtitle: "Smart Personal Insights",
          text: "We analyze your spending categories to generate automated financial insights, alert you to budget thresholds, and suggest optimization strategies."
        },
        {
          subtitle: "Communication & Service Updates",
          text: "We may send important system notifications, security alerts, and account-related updates to your registered email address."
        }
      ]
    },
    {
      icon: Lock,
      title: "3. Security & Data Protection",
      content: [
        {
          subtitle: "Industry-Standard Encryption",
          text: "All data transmitted between your browser and our servers is protected using TLS 1.3 encryption. Sensitive user data is encrypted at rest using AES-256."
        },
        {
          subtitle: "Zero Selling of Personal Data",
          text: "We NEVER sell, rent, trade, or monetize your personal financial data to third parties, advertisers, or data brokers under any circumstances."
        },
        {
          subtitle: "Secure Access Controls",
          text: "Your password is salted and hashed using industry-standard bcrypt algorithms. Authentication tokens (JWT) are stored securely in local browser session storage."
        }
      ]
    },
    {
      icon: UserCheck,
      title: "4. Your Rights & Data Ownership",
      content: [
        {
          subtitle: "Data Export & Portability",
          text: "You retain 100% ownership of your financial records. You can export your full transaction history and financial reports at any time."
        },
        {
          subtitle: "Account & Data Deletion",
          text: "You hold the right to permanently delete your account. Initiating account deletion permanently purges all associated transactions, goals, and profile data from our databases."
        },
        {
          subtitle: "Correction & Updates",
          text: "You can update your personal information, monthly budget targets, and security preferences at any time directly through the Settings dashboard."
        }
      ]
    },
    {
      icon: Server,
      title: "5. Cookies & Local Storage",
      content: [
        {
          subtitle: "Session Caching",
          text: "GullakIQ utilizes browser LocalStorage and essential session tokens exclusively for user authentication and preserving UI preference states across sessions."
        },
        {
          subtitle: "No Tracking Cookies",
          text: "We do not utilize invasive third-party cross-site tracking cookies or marketing web beacons."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0e] text-white flex flex-col font-sans">
      {/* Header Banner / Navigation */}
      <header className="border-b border-white/10 bg-[#09090c]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-xs font-semibold text-paisa-textMuted hover:text-white transition-colors bg-[#13131b] px-3.5 py-2 rounded-xl border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div
            onClick={onNavigateHome}
            className="flex items-center gap-1 text-2xl font-bold tracking-tight cursor-pointer"
          >
            <span className="text-white font-extrabold tracking-tight">GullakIQ</span>
            <span className="w-2.5 h-2.5 rounded-full bg-paisa-lime inline-block shadow-[0_0_10px_#ccff00]"></span>
          </div>

          {onOpenAuth && (
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-4 py-2 text-xs font-semibold text-black bg-paisa-lime rounded-full hover:bg-paisa-limeHover transition-all shadow-[0_0_15px_rgba(204,255,0,0.35)]"
            >
              Get Started
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12">
        {/* Title Badge */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paisa-lime/10 border border-paisa-lime/20 text-paisa-lime text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy & Transparency</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-sm text-paisa-textMuted max-w-xl mx-auto leading-relaxed">
            Your trust is our top priority. Learn how <span className="text-white font-semibold">GullakIQ</span> collects, encrypts, and protects your personal financial data.
          </p>

          <div className="text-xs text-paisa-textMuted/70 pt-2">
            Last Updated: <span className="text-white/80 font-medium">August 17, 2026</span>
          </div>
        </div>

        {/* Highlight Card */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#161622] to-[#111118] border border-paisa-lime/20 shadow-[0_0_30px_rgba(204,255,0,0.05)] relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-paisa-lime/20 border border-paisa-lime/30 flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6 text-paisa-lime" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Our Core Privacy Commitment</h3>
              <p className="text-xs sm:text-sm text-paisa-textMuted leading-relaxed">
                We believe your money and spending habits are your private business. We never sell your personal financial records, run ads on your data, or share credentials with third parties. Your data is used exclusively to power your personal dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-10">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div
                key={idx}
                className="bg-[#13131b] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <div className="w-9 h-9 rounded-xl bg-paisa-lime/10 flex items-center justify-center text-paisa-lime">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">{section.title}</h2>
                </div>

                <div className="space-y-5">
                  {section.content.map((item, itemIdx) => (
                    <div key={itemIdx} className="space-y-1.5">
                      <h4 className="text-xs sm:text-sm font-semibold text-white/90">{item.subtitle}</h4>
                      <p className="text-xs sm:text-sm text-paisa-textMuted leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-14 bg-[#13131b] border border-white/10 rounded-2xl p-6 sm:p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-paisa-lime/10 text-paisa-lime flex items-center justify-center mx-auto">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Have questions about your data?</h3>
          <p className="text-xs text-paisa-textMuted max-w-md mx-auto leading-relaxed">
            If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please contact our privacy compliance team.
          </p>
          <div className="pt-2">
            <a
              href="mailto:privacy@gullakiq.app"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1c1c28] border border-white/10 text-xs font-semibold text-paisa-lime hover:bg-[#232332] transition-colors"
            >
              <span>privacy@gullakiq.app</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#09090c] py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-paisa-textMuted gap-4">
          <div className="flex items-center gap-1 font-bold text-white">
            <span>GullakIQ</span>
            <span className="w-2 h-2 rounded-full bg-paisa-lime inline-block"></span>
            <span className="font-normal text-paisa-textMuted ml-2">© 2026 GullakIQ. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={onNavigateHome} className="hover:text-white transition-colors">
              Home
            </button>
            <span className="text-paisa-lime font-semibold">Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
