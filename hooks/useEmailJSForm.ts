// hooks/useEmailJSForm.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

type Options<T extends HTMLFormElement> = {
  clearAfterMs?: number;
  serviceId?: string;
  templateId?: string;
  publicKey?: string;
};

export function useEmailJSForm<T extends HTMLFormElement = HTMLFormElement>({
  clearAfterMs = 4000,
  serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
  publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
}: Options<T> = {}) {
  const [sending, setSending] = useState(false);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current && publicKey) {
      emailjs.init(publicKey);
      initializedRef.current = true;
    }
  }, [publicKey]);

  const onSubmit = useCallback(
    async (e: React.FormEvent<T>) => {
      e.preventDefault(); // ✅ stop native form navigation

      const form = e.currentTarget;
      if (!form) return;

      if (!serviceId || !templateId || !publicKey) {
        toast.error("Email service is not configured.");
        return;
      }

      try {
        setSending(true);
        await emailjs.sendForm(serviceId, templateId, form);

        toast.success("Message sent successfully!");
        // Clear the form without reloading the page
        window.setTimeout(() => {
          form.reset();
        }, clearAfterMs);
      } catch (err) {
        console.error(err);
        toast.error("Failed to send. Please try again.");
      } finally {
        setSending(false);
      }
    },
    [clearAfterMs, publicKey, serviceId, templateId]
  );

  return { onSubmit, sending };
}
