"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Options = {
  clearAfterMs?: number;
};

type FormStatus = "idle" | "success" | "error";

export function useContactForm<T extends HTMLFormElement = HTMLFormElement>({
  clearAfterMs = 4000,
}: Options = {}) {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const clearStatusTimerRef = useRef<number | null>(null);

  const clearStatusTimer = useCallback(() => {
    if (clearStatusTimerRef.current) {
      window.clearTimeout(clearStatusTimerRef.current);
      clearStatusTimerRef.current = null;
    }
  }, []);

  useEffect(() => clearStatusTimer, [clearStatusTimer]);

  const onSubmit = useCallback(
    async (e: React.SyntheticEvent<T>) => {
      e.preventDefault();

      const form = e.currentTarget;
      const formData = new FormData(form);

      try {
        clearStatusTimer();
        setStatus("idle");
        setMessage("");
        setSending(true);

        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
          }),
        });

        const result = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;

        if (!response.ok) {
          throw new Error(result?.error ?? "Failed to send message.");
        }

        form.reset();
        setStatus("success");
        setMessage("Message sent successfully. Laughter will get back to you soon.");

        clearStatusTimerRef.current = window.setTimeout(() => {
          setStatus("idle");
          setMessage("");
          clearStatusTimerRef.current = null;
        }, clearAfterMs);
      } catch (error) {
        console.error(error);
        setStatus("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "Failed to send. Please try again."
        );
      } finally {
        setSending(false);
      }
    },
    [clearAfterMs, clearStatusTimer]
  );

  return { onSubmit, sending, status, message };
}
