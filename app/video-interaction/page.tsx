"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Camera, Mic, MicOff, Video, VideoOff, FileText, User } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import RecordRTC from "recordrtc"

export default function VideoInteraction() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isRecording, setIsRecording] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [cameraEnabled, setCameraEnabled] = useState(true)
  const [micEnabled, setMicEnabled] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [transcript, setTranscript] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const recorderRef = useRef<RecordRTC | null>(null)
  const recognitionRef = useRef<any>(null)

  const questions = [
    "Could you please introduce yourself and tell us what type of loan you're interested in?",
    "What is the purpose of this loan and how much funding do you require?",
    "Could you share details about your current employment and monthly income?",
    "Do you have any existing loans or financial commitments?",
    "How would you describe your credit history?",
  ]

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: cameraEnabled,
        audio: micEnabled,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      return stream
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("Please allow access to your camera and microphone to proceed.")
      return null
    }
  }

  const startTranscription = () => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + transcript + " ");
        } else {
          interimTranscript += transcript;
        }
      }
      console.log("Interim Transcript:", interimTranscript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const startRecording = async () => {
    const stream = await startCamera();
    if (!stream) return;

    setIsRecording(true);
    startTranscription();

    // Initialize RecordRTC
    recorderRef.current = new RecordRTC(stream, {
      type: "video", // Record video
      mimeType: "video/webm", // Use WebM format
    });

    recorderRef.current.startRecording();
  };

  const stopRecording = () => {
    if (recorderRef.current && isRecording) {
      recorderRef.current.stopRecording(() => {
        const blob = recorderRef.current?.getBlob(); // Get the recorded Blob
        if (blob) {
          const url = URL.createObjectURL(blob);
          setVideoUrl(url); // Set the video URL for playback
        }
        setIsRecording(false);
        setIsProcessing(false);

        // Stop all tracks of the stream
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach((track) => track.stop());
        }

        // Stop transcription
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      });
    }
  };

  const toggleCamera = () => {
    setCameraEnabled(!cameraEnabled)
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !cameraEnabled
      })
    }
  }

  const toggleMic = () => {
    setMicEnabled(!micEnabled)
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !micEnabled
      })
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setVideoUrl(null)
      setTranscript("")
    } else {
      setStep(3)
    }
  }

  const handleFileUpload = async (file: File, documentType: string) => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process the image.");
      }

      const data = await response.json();
      console.log(`Extracted Text for ${documentType}:`, data.text);
      alert(`Extracted Text for ${documentType}:\n${data.text}`);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing the image.");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="w-full max-w-4xl">
            <CardHeader>
              <CardTitle>Video Interaction Setup</CardTitle>
              <CardDescription>
                Our AI Branch Manager will ask you a series of questions to understand your loan requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="AI Branch Manager"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-background/80 p-6 rounded-lg max-w-md">
                    <h3 className="text-xl font-semibold mb-2">Welcome to LoanSaathi</h3>
                    <p className="mb-4">
                      I'm your AI Branch Manager. I'll guide you through the loan application process with a few video
                      questions. Please ensure your camera and microphone are working properly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button variant="outline" size="icon" onClick={toggleCamera}>
                  {cameraEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>
                <Button variant="outline" size="icon" onClick={toggleMic}>
                  {micEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href="/dashboard">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <Button onClick={() => setStep(2)}>Start Interview</Button>
            </CardFooter>
          </Card>
        )

      case 2:
        return (
          <Card className="w-full max-w-4xl">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-500/10">
              <CardTitle>Video Interview</CardTitle>
              <CardDescription>
                Question {currentQuestion + 1} of {questions.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden relative shadow-lg">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="AI Branch Manager"
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/70 backdrop-blur-sm p-6 rounded-lg max-w-xs border border-gray-700">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
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
                            className="h-5 w-5 text-white"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polygon points="10 8 16 12 10 16 10 8"></polygon>
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-medium">AI Branch Manager</p>
                          <p className="text-xs text-gray-400">Speaking...</p>
                        </div>
                      </div>
                      <p className="text-white">{questions[currentQuestion]}</p>
                    </div>
                  </div>
                </div>

                <div className="aspect-video bg-gradient-to-br from-gray-100 to-white rounded-lg overflow-hidden relative shadow-lg border">
                  {videoUrl ? (
                    <video src={videoUrl} controls className="w-full h-full object-cover" />
                  ) : (
                    <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                  )}

                  {isRecording && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                      <div className="h-3 w-3 rounded-full bg-white animate-pulse"></div>
                      Recording
                    </div>
                  )}

                  {!videoUrl && !isRecording && (
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                        <User className="h-8 w-8 text-gray-500" />
                      </div>
                      <p className="text-gray-500">Ready to record your response</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                {videoUrl ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Your Recorded Response</h3>
                    <video src={videoUrl} controls className="w-full rounded-lg" />
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Transcript</h4>
                      <p className="text-sm text-gray-700">{transcript}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No video recorded yet.</p>
                )}
              </div>

              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <div className="h-0.5 flex-grow bg-gray-200">
                      <div
                        className="h-0.5 bg-primary"
                        style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-sm font-medium">
                      {currentQuestion + 1}/{questions.length}
                    </div>
                  </div>
                  <Progress value={(currentQuestion / questions.length) * 100} className="h-1" />
                </div>
              </div>

              <div className="flex justify-center gap-4">
                {!videoUrl ? (
                  <>
                    {!isRecording ? (
                      <Button
                        onClick={startRecording}
                        className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 rounded-full px-6"
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Start Recording
                      </Button>
                    ) : (
                      <Button variant="destructive" onClick={stopRecording} className="rounded-full px-6 animate-pulse">
                        Stop Recording
                      </Button>
                    )}
                  </>
                ) : (
                  <div className="text-center bg-green-50 border border-green-100 rounded-lg p-4 w-full max-w-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-green-500 mx-auto mb-2"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <p className="text-green-800 font-medium mb-1">Response recorded</p>
                    <Button onClick={handleNextQuestion} className="mt-2">
                      Next Question
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6">
              <Button variant="outline" onClick={() => router.push("/dashboard")} className="gap-2">
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
                  className="h-4 w-4"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" x2="9" y1="12" y2="12"></line>
                </svg>
                Exit Interview
              </Button>
              <Button
                variant="outline"
                disabled={currentQuestion === 0}
                onClick={() => {
                  setCurrentQuestion(currentQuestion - 1)
                  setVideoUrl(null)
                  setTranscript("")
                }}
                className="gap-2"
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
                  className="h-4 w-4"
                >
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
                Previous Question
              </Button>
            </CardFooter>
          </Card>
        )

      case 3:
        return (
          <Card className="w-full max-w-4xl">
            <CardHeader>
              <CardTitle>Document Submission</CardTitle>
              <CardDescription>Please upload the required documents to complete your application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 border rounded-lg bg-muted/50">
                <h3 className="text-lg font-semibold mb-4">
                  Based on your responses, we need the following documents:
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Identity Proof (Aadhaar Card)</p>
                      <p className="text-sm text-muted-foreground">Front and back of your Aadhaar card</p>
                      <input
                        type="file"
                        accept="image/*"
                        id="aadhaar-upload"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileUpload(e.target.files[0], "Aadhaar Card");
                          }
                        }}
                      />
                      <Button size="sm" variant="outline" className="mt-2" onClick={() => document.getElementById("aadhaar-upload")?.click()}>
                        Upload
                      </Button>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">PAN Card</p>
                      <p className="text-sm text-muted-foreground">Clear image of your PAN card</p>
                      <input
                        type="file"
                        accept="image/*"
                        id="pan-upload"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileUpload(e.target.files[0], "PAN Card");
                          }
                        }}
                      />
                      <Button size="sm" variant="outline" className="mt-2" onClick={() => document.getElementById("pan-upload")?.click()}>
                        Upload
                      </Button>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Income Proof</p>
                      <p className="text-sm text-muted-foreground">Last 3 months salary slips or bank statements</p>
                      <input
                        type="file"
                        accept="image/*"
                        id="income-upload"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileUpload(e.target.files[0], "Income Proof");
                          }
                        }}
                      />
                      <Button size="sm" variant="outline" className="mt-2" onClick={() => document.getElementById("income-upload")?.click()}>
                        Upload
                      </Button>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Document Guidelines:</h4>
                <ul className="text-sm space-y-1 list-disc pl-5">
                  <li>All documents should be clearly visible and not blurry</li>
                  <li>File size should be less than 5MB</li>
                  <li>Accepted formats: JPG, PNG, PDF</li>
                  <li>Documents should be valid and not expired</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                Save & Continue Later
              </Button>
              <Button onClick={() => setStep(4)}>Continue to Eligibility Check</Button>
            </CardFooter>
          </Card>
        )

        case 4:
          return (
            <Card className="w-full max-w-4xl">
              <CardHeader>
                <CardTitle>Loan Eligibility Results</CardTitle>
                <CardDescription>
                  Based on your information and documents, here are your loan eligibility results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-green-600"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Congratulations! You're Pre-Approved</h3>
                <p className="text-green-700 mb-4">Based on your profile, you're eligible for a personal loan</p>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-left">
                  <div>
                    <p className="text-sm text-muted-foreground">Loan Amount</p>
                    <p className="font-semibold">₹5,00,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Interest Rate</p>
                    <p className="font-semibold">10.99% p.a.</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tenure</p>
                    <p className="font-semibold">Up to 5 years</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">EMI Starting From</p>
                    <p className="font-semibold">₹10,824/month</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
                <ol className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Review Loan Offer</p>
                      <p className="text-sm text-muted-foreground">Check the loan details and terms</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                      2
                    </div>
                    <div>
                      <p className="font-medium">E-Sign Loan Agreement</p>
                      <p className="text-sm text-muted-foreground">Digitally sign the loan agreement</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Loan Disbursement</p>
                      <p className="text-sm text-muted-foreground">Funds will be transferred to your account</p>
                    </div>
                  </li>
                </ol>
              </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.push("/dashboard")}>
                  Save & Review Later
                </Button>
                <Button onClick={() => router.push("/loan-agreement")}>Proceed to Loan Agreement</Button>
              </CardFooter>
            </Card>
          );

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary/10 to-background">
      <header className="container py-4">
        <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </header>

      <main className="flex-1 container flex items-center justify-center py-8">{renderStep()}</main>
    </div>
  )
}