import { useState, useEffect } from "react";

const ChatBot = () => {
  const faqs = [
    {
      question: "How do I track my yoga progress?",
      answer: "Our app automatically tracks your daily practice duration, completed asanas, and consistency streaks. You can view detailed progress reports in your dashboard.",
    },
    {
      question: "What community features are available?",
      answer: "Join themed yoga groups, participate in challenges, share achievements, and connect with fellow practitioners through our community feed and direct messaging.",
    },
    {
      question: "How do the yoga challenges work?",
      answer: "We host daily/weekly challenges where you earn points for completing specific asanas or practice durations. Top performers appear on our leaderboards and earn special badges.",
    },
    {
      question: "Can I create custom yoga routines?",
      answer: "Yes! Premium members can create and save personalized routines with preferred asanas, durations, and difficulty levels. Share them with the community or keep them private.",
    },
    {
      question: "How does the achievement system work?",
      answer: "Earn digital badges and level up by completing daily goals, maintaining streaks, and mastering new asanas. Special achievements unlock exclusive content.",
    },
    {
      question: "What's included in the Premium membership?",
      answer: "Premium features include advanced analytics, custom routines, ad-free experience, exclusive challenges, and priority support. Starts at ₹299/month.",
    },
    {
      question: "How do I join a yoga group?",
      answer: "Browse groups by style (Hatha, Vinyasa) or difficulty level. Join up to 5 groups simultaneously and participate in their specific challenges and discussions.",
    },
    {
      question: "Is there live instructor support?",
      answer: "We offer weekly live sessions with certified instructors, posture correction through video analysis, and a Q&A forum for personalized guidance.",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleQuestionClick = (question, answer) => {
    // Add user message
    setMessages((prev) => [...prev, { type: "user", content: question }]);

    // Add bot response after delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", content: answer }]);
      speakAnswer(answer);
    }, 500);
  };

  const speakAnswer = (text) => {
    window.speechSynthesis.cancel(); // Stop any ongoing speech
    const speech = new SpeechSynthesisUtterance(text);
    setIsSpeaking(true);

    speech.onend = () => setIsSpeaking(false);
    speech.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Chatbot Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all animate-bounce"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 bg-white rounded-xl shadow-xl overflow-hidden transform transition-all">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg
                  xmlns=""
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              {isSpeaking && (
                <div className="absolute -top-1 -right-1 flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-white font-semibold">YogaZen Assistant</h2>
              <p className="text-xs text-blue-100">Namaste! How can I help?</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto text-white hover:text-blue-200"
            >
              ×
            </button>
          </div>

          {/* Chat Body */}
          <div className="h-96 p-4 bg-gray-50 overflow-y-auto space-y-4">
            {/* Initial Bot Message */}
            <div className="animate-slideIn">
              <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-md max-w-[85%]">
                <p className="text-sm text-gray-600">
                  Welcome to YogaZen! How can I assist you today? 🙏
                </p>
              </div>
            </div>

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`animate-slideIn flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[85%] ${
                    msg.type === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white rounded-tl-none shadow-md"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Questions */}
          <div className="p-4 bg-gray-100 border-t">
            <div className="grid grid-cols-1 gap-2">
              {faqs.map((faq, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(faq.question, faq.answer)}
                  className="text-left p-2 bg-white hover:bg-blue-50 rounded-lg transition-all text-sm text-gray-700 hover:text-blue-600 shadow-sm"
                >
                  {faq.question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;