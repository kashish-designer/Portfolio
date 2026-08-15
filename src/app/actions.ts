"use server";

import type { ContactFormState } from "@/types/contact";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact form submission.
 *
 * Validation is real and runs server-side. Delivery is NOT wired up: there is
 * no email provider configured, so a valid submission currently reports an
 * honest failure rather than pretending to have sent something. A form that
 * says "Thanks, I'll be in touch" into a void is worse than one that admits it
 * is not connected.
 *
 * TO FINISH: add an email provider, send the payload, and replace the
 * not-configured branch with a real success response.
 */
export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fieldErrors: Record<string, string> = {};

  if (!name) fieldErrors.name = "Please add your name.";
  if (!email) {
    fieldErrors.email = "Please add an email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "That email address does not look right.";
  }
  if (!message) fieldErrors.message = "Please describe what you are building.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Some details are missing.",
      fieldErrors,
    };
  }

  return {
    status: "error",
    message:
      "This form is not connected to an inbox yet, so nothing was sent. Email Kashish directly in the meantime.",
    fieldErrors: {},
  };
}
