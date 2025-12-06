import { useState } from 'react';

export default function ContactForm({ form }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // 'success' | 'error'

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setMessageType(null);

    const formData = new window.FormData(e.target);

    try {
      const response = await window.fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(form.success || '¡Mensaje enviado exitosamente!');
        setMessageType('success');
        e.target.reset();
      } else {
        setMessage(
          data.error ||
            form.error ||
            'Error al enviar el mensaje. Por favor, intenta nuevamente.'
        );
        setMessageType('error');
      }
    } catch (error) {
      window.console.error(error);
      setMessage(
        form.error ||
          'Error al enviar el mensaje. Por favor, intenta nuevamente.'
      );
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
      // Auto-hide message after 5 seconds
      window.setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  return (
    <>
      <h3 className="text-2xl md:text-3xl font-montserrat font-semibold text-white mb-6">
        {form.title}
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder={form.fields.name}
          required
          className="w-full px-4 py-3 rounded-lg bg-[#2d5a47] text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-[#4a9b7f] transition-all"
        />
        <input
          type="email"
          name="email"
          placeholder={form.fields.email}
          required
          className="w-full px-4 py-3 rounded-lg bg-[#2d5a47] text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-[#4a9b7f] transition-all"
        />
        <input
          type="text"
          name="socialNetwork"
          placeholder={form.fields.socialNetwork}
          className="w-full px-4 py-3 rounded-lg bg-[#2d5a47] text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-[#4a9b7f] transition-all"
        />
        <textarea
          name="message"
          placeholder={form.fields.message}
          required
          rows="5"
          className="w-full px-4 py-3 rounded-lg bg-[#2d5a47] text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-[#4a9b7f] transition-all resize-none"
        ></textarea>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-8 py-3 rounded-lg bg-[#4a9b7f] text-white font-montserrat font-semibold flex items-center justify-center gap-2 hover:bg-[#3a7d66] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{isSubmitting ? form.sending : form.send}</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </button>
      </form>
      {message && (
        <div
          className={`mt-4 p-4 rounded-lg text-white ${
            messageType === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {message}
        </div>
      )}
    </>
  );
}
