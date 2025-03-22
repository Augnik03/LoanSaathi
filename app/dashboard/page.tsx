"use client";

import { useState} from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ArrowRight, FileText, Home, LogOut, User, Video } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast, Toaster } from "sonner";

 

export default function Dashboard() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  useEffect(() => {
    if (success === "loan_agreement_accepted") {
      toast.success("Loan agreement accepted successfully!");
    }
  }, [success]);

  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    initials: "JD",
  });
  const [documents, setDocuments] = useState([
    { name: "Identity Proof (Aadhaar Card)", status: "pending", description: "Front and back of your Aadhaar card", icon: "🪪" },
    { name: "PAN Card", status: "pending", description: "Clear image of your PAN card", icon: "📇" },
    { name: "Income Proof", status: "pending", description: "Last 3 months salary slips or bank statements", icon: "💵" },
    { name: "Photograph", status: "completed", description: "Recent passport size photograph", icon: "📸" },
  ]);

  // Calculate the number of completed documents
  const completedDocuments = documents.filter((doc) => doc.status === "completed").length;
  const totalDocuments = documents.length;

  // Calculate the progress percentage
  const uploadProgress = (completedDocuments / totalDocuments) * 100;

  const handleFileUpload = (index: number) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*, application/pdf";
    fileInput.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement; // Cast e.target to HTMLInputElement
      if (target.files && target.files.length > 0) {
        const file = target.files[0]; // Access the first file
        if (file) {
          // Simulate file upload process
          setTimeout(() => {
            const updatedDocuments = [...documents];
            updatedDocuments[index].status = "completed";
            setDocuments(updatedDocuments);
          }, 2000);
        }
      }
    };
    fileInput.click();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-background/95">
      {/* Header and other components remain unchanged */}
      {/* ... */}<header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mr-2">
                {user.initials}
              </div>
              <h1 className="text-xl font-bold">LoanSaathi</h1>
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative">
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
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                </svg>
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
                <span className="sr-only">Notifications</span>
              </Button>
            </div>
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 bg-primary/10">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="relative h-full rounded-lg border bg-white p-4 shadow-sm">
            <div className="mb-6 flex flex-col items-center justify-center space-y-2 border-b pb-6">
              <div className="relative h-20 w-20 overflow-hidden rounded-full bg-primary/10">
                <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-primary">
                  {user.initials}
                </div>
              </div>
              <div className="space-y-1 text-center">
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <nav className="flex h-full flex-col space-y-2">
              <Button
                variant={activeTab === "overview" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("overview")}
              >
                <Home className="mr-2 h-4 w-4" />
                Overview
              </Button>
              <Button
                variant={activeTab === "apply" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("apply")}
              >
                <Video className="mr-2 h-4 w-4" />
                Apply for Loan
              </Button>
              <Button
                variant={activeTab === "documents" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("documents")}
              >
                <FileText className="mr-2 h-4 w-4" />
                My Documents
              </Button>
            </nav>
          </div>
        </aside>

        <main className="flex w-full flex-col overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsContent value="overview" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Welcome back, {user.name}</h2>
                  <p className="text-muted-foreground">Here's what's happening with your applications</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="hidden md:flex">
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
                      className="mr-2 h-4 w-4"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                      <line x1="8" x2="16" y1="12" y2="12"></line>
                      <line x1="12" x2="12" y1="8" y2="16"></line>
                    </svg>
                    New Application
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-md group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                    <CardTitle className="text-sm font-medium">Loan Applications</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="text-2xl font-bold">1</div>
                    <div className="flex items-center mt-1">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800 border-yellow-200">
                        In Progress
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Personal Loan - ₹5,00,000</p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden transition-all duration-200 hover:shadow-md group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                    <CardTitle className="text-sm font-medium">Application Progress</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="text-2xl font-bold">60%</div>
                    <Progress value={60} className="mt-2 h-2" />
                    <div className="grid grid-cols-3 gap-1 mt-2">
                      <div className="text-center">
                        <div className="h-2 w-2 bg-green-500 rounded-full mx-auto"></div>
                        <p className="text-[10px] text-muted-foreground mt-1">Interview</p>
                      </div>
                      <div className="text-center">
                        <div className="h-2 w-2 bg-green-500 rounded-full mx-auto"></div>
                        <p className="text-[10px] text-muted-foreground mt-1">Assessment</p>
                      </div>
                      <div className="text-center">
                        <div className="h-2 w-2 bg-yellow-500 rounded-full mx-auto"></div>
                        <p className="text-[10px] text-muted-foreground mt-1">Documents</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden transition-all duration-200 hover:shadow-md group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                    <CardTitle className="text-sm font-medium">Next Steps</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="text-md font-medium">Upload Documents</div>
                    <p className="text-xs text-muted-foreground">
                      Complete your application by uploading required documents
                    </p>
                    <Button size="sm" className="mt-4 w-full" onClick={() => setActiveTab("documents")}>
                      Continue Application
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent interactions with LoanSaathi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Application Started",
                        description: "Personal Loan application initiated",
                        date: "Today, 10:30 AM",
                        icon: "📝",
                      },
                      {
                        title: "Initial Assessment Completed",
                        description: "Basic eligibility check passed",
                        date: "Today, 10:45 AM",
                        icon: "✅",
                      },
                    ].map((activity, i) => (
                      <div
                        key={i}
                        className="flex items-start space-x-4 rounded-md border p-4 transition-all hover:bg-muted/50"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-lg">{activity.icon}</span>
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">{activity.date}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="apply" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Apply for a Loan</h2>
              </div>

              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-500/10">
                  <CardTitle>AI Branch Manager</CardTitle>
                  <CardDescription>
                    Our LoanSaathial branch manager will guide you through the loan application process
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                    <img
                      src="/placeholder.svg?height=400&width=600"
                      alt="AI Branch Manager"
                      className="w-full h-full object-cover"
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

                  <div className="text-center">
                    <p className="mb-4">
                      Click the button below to start your video conversation with our AI Branch Manager
                    </p>
                    <Link href="/video-interaction">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300"
                      >
                        Start Video Conversation
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Loan Products</CardTitle>
                  <CardDescription>Choose from our range of loan products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      {
                        title: "Personal Loan",
                        description: "Quick unsecured loans for personal expenses",
                        rate: "10.99% p.a.",
                        amount: "Up to ₹10,00,000",
                        icon: "💰",
                      },
                      {
                        title: "Home Loan",
                        description: "Long-term loans for buying or renovating property",
                        rate: "8.50% p.a.",
                        amount: "Up to ₹1,00,00,000",
                        icon: "🏠",
                      },
                      {
                        title: "Business Loan",
                        description: "Financing solutions for business growth",
                        rate: "12.50% p.a.",
                        amount: "Up to ₹50,00,000",
                        icon: "💼",
                      },
                      {
                        title: "Education Loan",
                        description: "Support for higher education expenses",
                        rate: "9.50% p.a.",
                        amount: "Up to ₹50,00,000",
                        icon: "🎓",
                      },
                    ].map((loan, i) => (
                      <div
                        key={i}
                        className="rounded-lg border p-4 transition-all hover:shadow-md hover:border-primary/20 group"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <span className="text-lg">{loan.icon}</span>
                          </div>
                          <h3 className="text-lg font-semibold">{loan.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{loan.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Interest Rate</p>
                            <p className="font-medium">{loan.rate}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Loan Amount</p>
                            <p className="font-medium">{loan.amount}</p>
                          </div>
                        </div>
                        <Button className="w-full mt-4" variant="outline">
                          Apply Now
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>


            <TabsContent value="documents" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Document Submission</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Upload Required Documents</CardTitle>
                  <CardDescription>
                    Please upload the following documents to complete your loan application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documents.map((doc, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <span className="text-lg">{doc.icon}</span>
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">{doc.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {doc.status === "completed" ? (
                            <span className="text-green-500 flex items-center bg-green-50 px-3 py-1 rounded-full text-sm">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 mr-1"
                              >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                              </svg>
                              Uploaded
                            </span>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="group-hover:bg-primary group-hover:text-white"
                              onClick={() => handleFileUpload(i)}
                            >
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
                                className="mr-2 h-4 w-4"
                              >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" x2="12" y1="3" y2="15"></line>
                              </svg>
                              Upload
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Document Verification Status</CardTitle>
                  <CardDescription>Track the verification status of your submitted documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Verified Documents</span>
                      <span className="text-green-500 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 mr-1"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        {completedDocuments}/{totalDocuments} Verified
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-green-500 to-green-600 h-2.5 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                    <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
                      <p className="text-green-800">
                        {completedDocuments}/{totalDocuments} documents verified
                      </p>
                      <p className="text-sm text-green-600">
                        {completedDocuments === totalDocuments
                          ? "All documents have been verified!"
                          : "Upload remaining documents to complete your application"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
          );
}
