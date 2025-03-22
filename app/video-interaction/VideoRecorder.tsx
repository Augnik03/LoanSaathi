// "use client"

// import { useState, useRef, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Camera, User } from "lucide-react"
// import axios from "axios"

// export default function VideoRecorder({
//   currentQuestion,
//   questions,
//   onRecordingComplete,
// }: {
//   currentQuestion: number
//   questions: string[]
//   onRecordingComplete: (videoUrl: string, transcript: string) => void
// }) {
//   const [isRecording, setIsRecording] = useState(false)
//   const [videoUrl, setVideoUrl] = useState<string | null>(null)
//   const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])
//   const [transcript, setTranscript] = useState<string>("")
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null)

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream
//       }

//       setIsRecording(true)
//       const mediaRecorder = new MediaRecorder(stream)
//       mediaRecorderRef.current = mediaRecorder

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           setRecordedChunks((prev) => [...prev, event.data])
//         }
//       }

//       mediaRecorder.onstop = async () => {
//         const blob = new Blob(recordedChunks, { type: "video/webm" })
//         const url = URL.createObjectURL(blob)
//         setVideoUrl(url)
//         await processTranscript(blob)
//         setRecordedChunks([])
//       }

//       mediaRecorder.start()
//     } catch (error) {
//       console.error("Error accessing camera or microphone:", error)
//       alert("Please allow access to your camera and microphone to proceed.")
//     }
//   }

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop()
//       setIsRecording(false)
      
//       if (videoRef.current && videoRef.current.srcObject) {
//         const stream = videoRef.current.srcObject as MediaStream
//         stream.getTracks().forEach((track) => track.stop())
//       }
//     }
//   }

//   const processTranscript = async (videoBlob: Blob) => {
//     const formData = new FormData()
//     formData.append("file", videoBlob, "recording.webm")
//     try {
//       const response = await axios.post("http://localhost:5000/api/transcribe", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       })
//       setTranscript(response.data.transcript)
//       onRecordingComplete(videoUrl || "", response.data.transcript)
//     } catch (error) {
//       console.error("Error processing transcript:", error)
//       setTranscript("Failed to transcribe.")
//     }
//   }

//   useEffect(() => {
//     return () => {
//       if (mediaRecorderRef.current) {
//         mediaRecorderRef.current.stop()
//       }
//       if (videoRef.current && videoRef.current.srcObject) {
//         const stream = videoRef.current.srcObject as MediaStream
//         stream.getTracks().forEach((track) => track.stop())
//       }
//     }
//   }, [])

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden relative shadow-lg">
//         <img
//           src="/placeholder.svg?height=300&width=400"
//           alt="AI Branch Manager"
//           className="w-full h-full object-cover opacity-70"
//         />
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="bg-black/70 backdrop-blur-sm p-6 rounded-lg max-w-xs border border-gray-700">
//             <div className="flex items-center gap-3 mb-3">
//               <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
//                 <Camera className="h-5 w-5 text-white" />
//               </div>
//               <div>
//                 <p className="text-white font-medium">AI Branch Manager</p>
//                 <p className="text-xs text-gray-400">Speaking...</p>
//               </div>
//             </div>
//             <p className="text-white">{questions[currentQuestion]}</p>
//           </div>
//         </div>
//       </div>

//       <div className="aspect-video bg-gradient-to-br from-gray-100 to-white rounded-lg overflow-hidden relative shadow-lg border">
//         {videoUrl ? (
//           <video src={videoUrl} controls className="w-full h-full object-cover" />
//         ) : (
//           <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
//         )}
//       </div>

//       <div className="col-span-full text-center">
//         <p className="text-lg font-semibold">Transcript:</p>
//         <p className="text-gray-600 bg-gray-100 p-4 rounded-lg">{transcript || "Processing transcript..."}</p>
//       </div>

//       <div className="flex justify-center gap-4 col-span-full">
//         {!videoUrl ? (
//           !isRecording ? (
//             <Button onClick={startRecording} className="bg-gradient-to-r from-primary to-purple-600 rounded-full px-6">
//               <Camera className="mr-2 h-4 w-4" /> Start Recording
//             </Button>
//           ) : (
//             <Button variant="destructive" onClick={stopRecording} className="rounded-full px-6 animate-pulse">
//               Stop Recording
//             </Button>
//           )
//         ) : (
//           <div className="text-center bg-green-50 border border-green-100 rounded-lg p-4 w-full max-w-md">
//             <p className="text-green-800 font-medium mb-1">Response recorded</p>
//             {currentQuestion < questions.length - 1 ? (
//               <p className="text-sm text-green-600">Next question loading...</p>
//             ) : (
//               <p className="text-sm text-green-600">Processing your responses...</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
