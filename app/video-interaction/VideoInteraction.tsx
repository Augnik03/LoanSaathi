// "use client"

// import { useState, useRef, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { ArrowLeft, Camera, Mic, MicOff, Video, VideoOff, FileText, User } from "lucide-react"
// import { Progress } from "@/components/ui/progress"
// import VideoRecorder from "./VideoRecorder"
// import TranscriptDisplay from "./TranscriptDisplay"

// export default function VideoInteraction() {
//   const router = useRouter()
//   const [step, setStep] = useState(1)
//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [transcript, setTranscript] = useState("")
//   const [isProcessing, setIsProcessing] = useState(false)
//   const [videoUrl, setVideoUrl] = useState<string | null>(null)
//   const recognitionRef = useRef<any>(null)

//   const questions = [
//     "Could you please introduce yourself and tell us what type of loan you're interested in?",
//     "What is the purpose of this loan and how much funding do you require?",
//     "Could you share details about your current employment and monthly income?",
//     "Do you have any existing loans or financial commitments?",
//     "How would you describe your credit history?",
//   ]

//   // Start transcription function
//   const startTranscription = () => {
//     const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Your browser does not support speech recognition.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = "en-US";

//     recognition.onresult = (event: SpeechRecognitionEvent) => {
//       let interimTranscript = "";
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcript = event.results[i][0].transcript;
//         if (event.results[i].isFinal) {
//           setTranscript((prev) => prev + transcript + " ");
//         } else {
//           interimTranscript += transcript;
//         }
//       }
//       console.log("Interim Transcript:", interimTranscript);
//     };

//     recognitionRef.current = recognition;
//     recognition.start();
//   };

//   // Stop transcription function
//   const stopTranscription = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//   };

//   useEffect(() => {
//     if (videoUrl && step === 2) {
//       const timer = setTimeout(() => {
//         if (currentQuestion < questions.length - 1) {
//           setCurrentQuestion(currentQuestion + 1);
//           setVideoUrl(null);
//           setTranscript(""); // Reset transcript for the next question
//         } else {
//           // All questions answered, move to next step
//           setStep(3);
//         }
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, [videoUrl, currentQuestion, step]);

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return (
//           <Card className="w-full max-w-4xl">
//             <CardHeader>
//               <CardTitle>Video Interaction Setup</CardTitle>
//               <CardDescription>
//                 Our AI Branch Manager will ask you a series of questions to understand your loan requirements
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
//                 <img
//                   src="/placeholder.svg?height=400&width=600"
//                   alt="AI Branch Manager"
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-center bg-background/80 p-6 rounded-lg max-w-md">
//                     <h3 className="text-xl font-semibold mb-2">Welcome to LoanSaathi</h3>
//                     <p className="mb-4">
//                       I'm your AI Branch Manager. I'll guide you through the loan application process with a few video
//                       questions. Please ensure your camera and microphone are working properly.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-center gap-4">
//                 <Button variant="outline" size="icon">
//                   <Video className="h-5 w-5" />
//                 </Button>
//                 <Button variant="outline" size="icon">
//                   <Mic className="h-5 w-5" />
//                 </Button>
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <Link href="/dashboard">
//                 <Button variant="outline">
//                   <ArrowLeft className="mr-2 h-4 w-4" />
//                   Back to Dashboard
//                 </Button>
//               </Link>
//               <Button onClick={() => setStep(2)}>Start Interview</Button>
//             </CardFooter>
//           </Card>
//         );

//       case 2:
//         return (
//           <Card className="w-full max-w-4xl">
//             <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-500/10">
//               <CardTitle>Video Interview</CardTitle>
//               <CardDescription>
//                 Question {currentQuestion + 1} of {questions.length}
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6 p-6">
//               <VideoRecorder
//                 currentQuestion={currentQuestion}
//                 questions={questions}
//                 onRecordingComplete={(videoUrl) => {
//                   setVideoUrl(videoUrl);
//                   setIsProcessing(true);
//                   stopTranscription();
//                   setTimeout(() => {
//                     setIsProcessing(false);
//                     if (currentQuestion < questions.length - 1) {
//                       setCurrentQuestion(currentQuestion + 1);
//                       setVideoUrl(null);
//                       setTranscript("");
//                     } else {
//                       setStep(3);
//                     }
//                   }, 3000);
//                 }}
//               />

//               <TranscriptDisplay transcript={transcript} />

//               <div className="flex justify-center">
//                 <div className="w-full max-w-md">
//                   <Progress value={(currentQuestion / questions.length) * 100} className="h-1" />
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between border-t p-6">
//               <Button variant="outline" onClick={() => router.push("/dashboard")}>
//                 Exit Interview
//               </Button>
//               <Button
//                 variant="outline"
//                 disabled={currentQuestion === 0}
//                 onClick={() => setCurrentQuestion(currentQuestion - 1)}
//               >
//                 Previous Question
//               </Button>
//             </CardFooter>
//           </Card>
//         );

//       case 3:
//         return (
//           <Card className="w-full max-w-4xl">
//             <CardHeader>
//               <CardTitle>Document Submission</CardTitle>
//               <CardDescription>Please upload the required documents to complete your application</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Document submission UI */}
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <Button variant="outline" onClick={() => router.push("/dashboard")}>
//                 Save & Continue Later
//               </Button>
//               <Button onClick={() => setStep(4)}>Continue to Eligibility Check</Button>
//             </CardFooter>
//           </Card>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary/10 to-background">
//       <header className="container py-4">
//         <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Dashboard
//         </Link>
//       </header>

//       <main className="flex-1 container flex items-center justify-center py-8">{renderStep()}</main>
//     </div>
//   );
// }