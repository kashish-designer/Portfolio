"use client";

import { useActionState, useId } from "react";

import { submitContact } from "@/app/actions";
import contactContent from "@/data/contact.json";
import { INITIAL_CONTACT_STATE } from "@/types/contact";
import type { ContactContent } from "@/types/content";

const contact: ContactContent = contactContent;

/**
 * C2 · Form-as-CTA.
 *
 * Heading and lede sit left, the form right, stacking under 64rem. Every
 * control shares one 44px base height and a 1px border that never changes
 * width between states — see `.field` in globals.css.
 *
 * Validation is server-side and real. Delivery is not wired up yet, so a valid
 * submission reports that honestly instead of faking a thank-you.
 */
export default function Contact() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    INITIAL_CONTACT_STATE,
  );
  const id = useId();

  const fieldId = (name: string) => `${id}-${name}`;
  const hintId = (name: string) => `${id}-${name}-hint`;

  return (
    <section id="contact" className="bg-paper-2 px-gutter pb-3xl pt-3xl">
      <div className="grid gap-xl lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-2xl">
        <div>
          <h2 className="max-w-[16ch] font-display text-2xl font-semibold leading-[1.08] tracking-[-0.02em] text-ink [overflow-wrap:anywhere] min-w-0 sm:text-3xl">
            {contact.heading}
          </h2>
          <p className="mt-lg max-w-[44ch] text-base text-ink-2">
            {contact.lede}
          </p>
        </div>

        <form action={formAction} noValidate className="grid gap-md">
          <div className="grid gap-md sm:grid-cols-2">
            <div>
              <label
                htmlFor={fieldId("name")}
                className="mb-2xs block font-outlier text-xs uppercase tracking-[0.14em] text-ink-2"
              >
                {contact.fields.name.label}
              </label>
              <input
                id={fieldId("name")}
                name="name"
                type="text"
                autoComplete="name"
                required
                disabled={isPending}
                aria-invalid={Boolean(state.fieldErrors.name)}
                aria-describedby={hintId("name")}
                className="field"
              />
              <span
                id={hintId("name")}
                className="field-hint mt-2xs text-sm text-accent"
              >
                {state.fieldErrors.name}
              </span>
            </div>

            <div>
              <label
                htmlFor={fieldId("email")}
                className="mb-2xs block font-outlier text-xs uppercase tracking-[0.14em] text-ink-2"
              >
                {contact.fields.email.label}
              </label>
              <input
                id={fieldId("email")}
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={isPending}
                aria-invalid={Boolean(state.fieldErrors.email)}
                aria-describedby={hintId("email")}
                className="field"
              />
              <span
                id={hintId("email")}
                className="field-hint mt-2xs text-sm text-accent"
              >
                {state.fieldErrors.email}
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor={fieldId("projectType")}
              className="mb-2xs block font-outlier text-xs uppercase tracking-[0.14em] text-ink-2"
            >
              {contact.fields.projectType.label}
            </label>
            <select
              id={fieldId("projectType")}
              name="projectType"
              disabled={isPending}
              defaultValue={contact.fields.projectType.options[0]}
              className="field"
            >
              {contact.fields.projectType.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor={fieldId("message")}
              className="mb-2xs block font-outlier text-xs uppercase tracking-[0.14em] text-ink-2"
            >
              {contact.fields.message.label}
            </label>
            <textarea
              id={fieldId("message")}
              name="message"
              rows={5}
              required
              disabled={isPending}
              placeholder={contact.fields.message.placeholder}
              aria-invalid={Boolean(state.fieldErrors.message)}
              aria-describedby={hintId("message")}
              className="field resize-y"
            />
            <span
              id={hintId("message")}
              className="field-hint mt-2xs text-sm text-accent"
            >
              {state.fieldErrors.message}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-lg gap-y-sm">
            <button
              type="submit"
              disabled={isPending}
              aria-busy={isPending}
              className="button-primary"
            >
              {isPending ? contact.sending : contact.submit}
            </button>
            <p className="text-sm text-ink-2">{contact.privacy}</p>
          </div>

          {/* Status is polite, not a celebratory toast: it appears in place. */}
          <p
            role="status"
            aria-live="polite"
            className="field-hint text-sm text-ink"
          >
            {state.status !== "idle" && !Object.keys(state.fieldErrors).length
              ? state.message
              : ""}
          </p>
        </form>
      </div>
    </section>
  );
}
