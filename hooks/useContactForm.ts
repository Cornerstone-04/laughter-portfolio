"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";

type Options = {
  clearAfterMs?: number;
};

export function useContactForm<T extends HTMLFormElement = HTMLFormElement>({
  clearAfterMs = 4000,
}: Options = {}) {
  const [sending, setSending] = useState(false);

  const onSubmit = useCallback(
    async (e: React.SyntheticEvent<T>) => {
      e.preventDefault();

      const form = e.currentTarget;
      const formData = new FormData(form);

      try {
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

        toast.success("Message sent successfully!");
        window.setTimeout(() => {
          form.reset();
        }, clearAfterMs);
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to send. Please try again."
        );
      } finally {
        setSending(false);
      }
    },
    [clearAfterMs]
  );

  return { onSubmit, sending };
}
