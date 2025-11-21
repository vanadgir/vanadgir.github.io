// src/content/entries/GuestbookEntry.jsx
import { useState } from "react";
import emailjs from "@emailjs/browser";

const GuestbookEntry = () => {
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");

  // Simple CAPTCHA puzzle
  const [numA] = useState(() => Math.floor(2 + Math.random() * 4)); // 2–5
  const [numB] = useState(() => Math.floor(2 + Math.random() * 4));
  const [captcha, setCaptcha] = useState("");
  const isCaptchaCorrect = parseInt(captcha, 10) === numA + numB;

  // Status + error
  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isCaptchaCorrect) {
      setErrorMsg("Please solve the puzzle before sending.");
      return;
    }

    if (!message.trim()) {
      setErrorMsg("Please enter a message.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      // TODO: replace with your actual EmailJS IDs
      const serviceId = "service_xbnhbub";
      const templateId = "template_ot0l8v8";
      const publicKey = "LDAjMUPUvIUiY3x7t";

      // These names MUST match your EmailJS template vars:
      // {{source}}, {{name}}, {{email}}, {{title}}, {{message}}
      const templateParams = {
        source: "varun.pro guestbook",
        name: name || "Guest",
        email: userEmail || "",
        title: name || "Guest",
        message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setStatus("success");
      setName("");
      setUserEmail("");
      setMessage("");
      setCaptcha("");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setErrorMsg(
        "Something went wrong sending your message. Please try again later."
      );
    }
  };

  return (
    <article className="detail-pane">
      <section className="detail-pane-body guestbook-body">
        <p>
          If you liked anything you saw here, feel free to send me a message
          and get in touch!
        </p>

        <form className="guestbook-form" onSubmit={handleSubmit}>
          <label className="guestbook-label">
            Your Name
            <input
              type="text"
              className="guestbook-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </label>

          <label className="guestbook-label">
            Your Email (optional)
            <input
              type="email"
              className="guestbook-input"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label className="guestbook-label">
            Your Message
            <textarea
              className="guestbook-textarea"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write something nice..."
            />
          </label>

          {/* CAPTCHA */}
          <label className="guestbook-label">
            Solve to verify you're human:
            <div className="guestbook-captcha-row">
              {numA} + {numB} =
              <input
                type="text"
                className="guestbook-captcha-input"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
              />
            </div>
          </label>

          {/* SEND BUTTON */}
          <button
            type="submit"
            className={`guestbook-submit-button ${
              !isCaptchaCorrect || status === "sending" ? "disabled" : "active"
            }`}
            disabled={!isCaptchaCorrect || status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="guestbook-success">
              Thanks! Your message has been sent.
            </p>
          )}

          {errorMsg && (
            <p className="guestbook-warning">{errorMsg}</p>
          )}
        </form>
      </section>
    </article>
  );
};

export default GuestbookEntry;
