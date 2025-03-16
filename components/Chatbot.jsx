"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import chatbotData from '../chatbot.json'
import { Mic } from 'lucide-react'

// Voice Recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = SpeechRecognition ? new SpeechRecognition() : null

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Sam, your Personal Therapeutic AI Assistant. How can I help you today?", isBot: true }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Voice Output (Speech Synthesis)
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'  // You can set different languages
      window.speechSynthesis.speak(utterance)
    } else {
      console.warn("Speech Synthesis not supported!")
    }
  }

  // Voice Input (Speech Recognition)
  const startListening = () => {
    if (!recognition) {
      alert('Sorry, your browser does not support speech recognition.')
      return
    }

    recognition.lang = 'en-US'
    recognition.start()
    setIsListening(true)

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      console.log("Voice Input:", transcript)
      setInputMessage(transcript)
      handleSend(transcript)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
      setIsListening(false)
    }
  }

  const getBotResponse = (userInput) => {
    const userMessage = userInput.toLowerCase().trim()

    if (!userMessage) {
      const noResponseIntent = chatbotData.intents.find(intent => intent.tag === "no-response")
      return noResponseIntent.responses[Math.floor(Math.random() * noResponseIntent.responses.length)]
    }

    for (const intent of chatbotData.intents) {
      const exactMatch = intent.patterns.some(pattern => {
        if (!pattern) return false
        return userMessage === pattern.toLowerCase().trim()
      })

      if (exactMatch) {
        const response = intent.responses[Math.floor(Math.random() * intent.responses.length)]
        return response || "I'm sorry, I don't have a response for that yet."
      }
    }

    for (const intent of chatbotData.intents) {
      const partialMatch = intent.patterns.some(pattern => {
        if (!pattern) return false

        const normalizedPattern = pattern.toLowerCase().trim()

        if (userMessage.includes(normalizedPattern)) return true

        const patternWords = normalizedPattern.split(' ')
        let messageToCheck = userMessage

        return patternWords.every(word => {
          const index = messageToCheck.indexOf(word)
          if (index === -1) return false
          messageToCheck = messageToCheck.slice(index + word.length)
          return true
        })
      })

      if (partialMatch) {
        const response = intent.responses[Math.floor(Math.random() * intent.responses.length)]
        return response || "I'm sorry, I don't have a response for that yet."
      }
    }

    return "I'm not sure I understand. Could you please rephrase that or ask something else?"
  }

  const handleSend = (message = inputMessage) => {
    if (!message.trim()) return

    setMessages(prev => [...prev, { text: message, isBot: false }])

    const botResponse = getBotResponse(message)

    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, isBot: true }])
      speak(botResponse)  // Speak the bot response out loud
    }, 500)

    setInputMessage('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSend()
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 flex items-center justify-center"
        >
          <span className="text-2xl">💬</span>
        </Button>
      ) : (
        <Card className="w-[400px] h-[550px] flex flex-col shadow-lg rounded-lg border border-gray-200">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white flex justify-between items-center rounded-t-lg">
            <h3 className="font-bold text-lg">Sam AI Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-2xl hover:text-gray-300 transition-colors">&times;</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-b-lg">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg shadow-md transition-all duration-200 ${
                    message.isBot
                      ? 'bg-white text-gray-800'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2 bg-gray-100 rounded-b-lg">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message or use the mic..."
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              Send
            </Button>
            <Button
              type="button"
              onClick={startListening}
              className={`bg-${isListening ? 'red' : 'white'}-500 text-white hover:bg-${isListening ? 'red' : 'green'}-600 transition-colors`}
            >
              <Mic className='text-blue-500'/>
            </Button>
          </form>
        </Card>
      )}
    </div>
  )
}
