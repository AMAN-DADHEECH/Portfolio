export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export const contactService = {
  validatePayload: (payload: ContactPayload): { isValid: boolean; error?: string } => {
    if (!payload.name.trim()) {
      return { isValid: false, error: "Please enter your full name." };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!payload.email.trim() || !emailRegex.test(payload.email)) {
      return { isValid: false, error: "Please enter a valid email address." };
    }
    if (!payload.subject.trim()) {
      return { isValid: false, error: "Please provide a subject line." };
    }
    if (!payload.message.trim() || payload.message.trim().length < 10) {
      return { isValid: false, error: "Please write a message of at least 10 characters." };
    }
    return { isValid: true };
  },

  submitContactForm: async (payload: ContactPayload): Promise<ContactResponse> => {
    const validation = contactService.validatePayload(payload);
    if (!validation.isValid) {
      return { success: false, message: validation.error || "Invalid form data." };
    }

    try {
      // Simulate real async API call or Formspree integration
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Save locally or can be pointed to Formspree endpoint (https://formspree.io/f/YOUR_FORM_ID)
      return {
        success: true,
        message: "Thank you for reaching out, Aman! Your message has been sent successfully. I will get back to you shortly.",
      };
    } catch (err) {
      console.error("Contact service error:", err);
      return {
        success: false,
        message: "Failed to send your message. Please try emailing directly at work.amandadheech2005@gmail.com",
      };
    }
  },

  copyToClipboard: async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        const success = document.execCommand("copy");
        document.body.removeChild(textArea);
        return success;
      }
    } catch (err) {
      console.error("Clipboard copy error:", err);
      return false;
    }
  },
};
