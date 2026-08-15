/**
 * Contact form state.
 *
 * Lives outside `app/actions.ts` deliberately: a `"use server"` module may only
 * export async functions, so a plain const exported from there is stripped and
 * arrives as `undefined` on the client.
 */

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
  /** Field name → error message, for inline validation display. */
  fieldErrors: Record<string, string>;
}

export const INITIAL_CONTACT_STATE: ContactFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
