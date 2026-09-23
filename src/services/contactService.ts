export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  _gotcha?: string;
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
    if (!payload.email.trim() || !emailRegex.test(payload.email.trim())) {
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: payload.name.trim(),
          email: payload.email.trim(),
          subject: payload.subject.trim(),
          message: payload.message.trim(),
          _gotcha: payload._gotcha || "",
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        return {
          success: false,
          message:
            data?.message ||
            "Failed to transmit message to Aman. Please email directly at work.amandadheech2005@gmail.com",
        };
      }

      return {
        success: true,
        message:
          data?.message ||
          `Transmission received, ${payload.name}! Your message was successfully sent.`,
      };
    } catch (err) {
      console.error("Contact service network error:", err);
      return {
        success: false,
        message:
          "Network connection error. Please check your connection or email directly at work.amandadheech2005@gmail.com",
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
