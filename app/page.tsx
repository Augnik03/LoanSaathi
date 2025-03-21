"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-gradient-to-r from-primary to-purple-600 py-4 sticky top-0 z-50">
        <div className="container flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-foreground flex items-center">
            <span className="bg-white text-primary rounded-full w-8 h-8 flex items-center justify-center mr-2">VB</span>
            LoanSaathi
          </h1>
          <div className="flex gap-4">
            <Link href="/login">
              <Button
                variant="outline"
                className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-white text-primary hover:bg-gray-100">Register</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-primary/10 to-background overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern "></div>
          <div className="container flex flex-col md:flex-row items-center gap-12 relative z-10 ml-32">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
                New Feature: Multi-language Support
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Banking Made <span className="text-primary">Personal</span> Again
              </h2>
              <p className="text-xl text-muted-foreground">
                Apply for loans digitally with our AI-powered Branch Manager through interactive video conversations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/login">
                  <Button size="lg" className="gap-2 rounded-full px-8">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="rounded-full px-8">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                {["Instant Approvals", "Secure Process", "No Branch Visits"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl"></div>
              <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-purple-500/20 rounded-full filter blur-3xl"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="absolute top-0 left-0 right-0 h-12 bg-gray-100 flex items-center px-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="pt-12 pb-4 px-4">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="AI Branch Manager Demo"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full h-16 w-16 bg-primary text-white hover:bg-primary/90 shadow-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-8 w-8"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 container ml-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">
              Our AI-powered Branch Manager guides you through the entire loan application process in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Video Interview",
                description: "Have a conversation with our AI Branch Manager just like you would at a physical branch.",
                icon: "🎥",
              },
              {
                step: "02",
                title: "Document Upload",
                description: "Easily upload your identity and income documents through our secure platform.",
                icon: "📄",
              },
              {
                step: "03",
                title: "Instant Verification",
                description: "Our system verifies your information and documents in real-time.",
                icon: "✅",
              },
              {
                step: "04",
                title: "Loan Approval",
                description: "Receive instant decision on your loan application with clear next steps.",
                icon: "💰",
              },
            ].map((step, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-card rounded-lg p-8 h-full flex flex-col hover:shadow-lg transition-all duration-300 border">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="text-sm font-medium text-primary mb-2">Step {step.step}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground flex-grow">{step.description}</p>
                  {index < 3 && (
                    <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                      <ChevronRight className="h-8 w-8 text-primary" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 bg-muted/30 ml-32">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "LoanSaathial AI Branch Manager",
                  description:
                    "Interact with a video assistant that mimics a real-life bank manager, guiding you through the loan process.",
                  icon: "👨‍💼",
                },
                {
                  title: "Video-Based Interaction",
                  description:
                    "Record video responses instead of filling lengthy forms for a more personal experience.",
                  icon: "🎥",
                },
                {
                  title: "Easy Document Submission",
                  description: "Upload documents via mobile or webcam with automatic information extraction.",
                  icon: "📄",
                },
                {
                  title: "Instant Loan Decisions",
                  description: "Get immediate feedback on your loan application status with clear next steps.",
                  icon: "✅",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg p-6 shadow-sm border bg-card hover:shadow-md transition-all duration-300"
                >
                  <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 transform rounded-full bg-primary/20 group-hover:bg-primary/30 transition-all duration-300"></div>
                  <div className="text-4xl mb-4 relative">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 relative">{feature.title}</h3>
                  <p className="text-muted-foreground relative">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 container ml-32">
          <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-yellow-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="italic mb-4">
                      "The video interview with the AI Branch Manager was so convenient! I got my loan approved within
                      hours without ever leaving my home."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                      <div>
                        <p className="font-medium">Priya Sharma</p>
                        <p className="text-sm text-muted-foreground">Home Loan Customer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Loan Success Rate</h3>
                  <div className="flex items-end gap-4">
                    <div className="text-4xl font-bold text-primary">94%</div>
                    <div className="text-sm text-muted-foreground pb-1">
                      of applications
                      <br />
                      successfully processed
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Average Processing Time</h3>
                  <div className="flex items-end gap-4">
                    <div className="text-4xl font-bold text-primary">2.5</div>
                    <div className="text-sm text-muted-foreground pb-1">
                      hours from application
                      <br />
                      to approval
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container text-center ml-32">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of customers who have simplified their loan application process with LoanSaathi
            </p>
            <Link href="/register">
              <Button size="lg" variant="secondary" className="rounded-full px-8">
                Create Your Account
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-100 py-12">
        <div className="container ml-32">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="bg-white text-primary rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  LS
                </span>
                LoanSaathi
              </h3>
              <p className="text-gray-400">Making banking personal again through AI-powered video interactions.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Personal Loans
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Home Loans
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Business Loans
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Education Loans
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 LoanSaathi. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

