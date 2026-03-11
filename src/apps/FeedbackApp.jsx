import { useState } from "react";

function FeedbackApp() {
  const [feedback, setFeedback] = useState("");

  const sendWhatsApp = () => {
    if (!feedback.trim()) return;
    const phone = "917889666070";
    const message = encodeURIComponent(
      `Feedback for portfolioOS:\n\n${feedback}`
    );

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const sendEmail = () => {
    if (!feedback.trim()) return;
    const email = "prashantgo7691@gmail.com";
    const subject = encodeURIComponent("Portfolio Feedback");
    const body = encodeURIComponent(feedback);

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="p-4 text-gray-200 space-y-4">

      <h2 className="text-lg font-semibold text-white">
        Send Feedback
      </h2>

      <textarea
        className="w-full h-40 bg-black/40 border border-white/20 rounded p-3 outline-none"
        placeholder="Write your feedback here..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />

      <div className="flex gap-3">

        <button
          onClick={sendWhatsApp}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
        >
          Send via WhatsApp
        </button>

        <button
          onClick={sendEmail}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Send via Email
        </button>

      </div>

    </div>
  );
}

export default FeedbackApp;