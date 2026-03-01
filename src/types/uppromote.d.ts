/**
 * UpPromote affiliate tracking – global type declarations.
 *
 * The `upTag` function is injected via `<Script>` in the root layout.
 * It pushes commands into `window.upDataLayer`, which is consumed by
 * the UpPromote collect.js pixel.
 *
 * @see https://docs.uppromote.com
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

/** Payload sent with the `cart_updated` event. */
interface UpPromoteCartPayload {
  /** Shopify cart GID (includes ?key= automatically). */
  id: string;
  /** Full Shopify checkout URL for this cart. */
  checkoutUrl: string;
}

/**
 * Overloaded call signatures for the global `upTag` helper:
 *
 *  1. upTag('config', key, value)       – configuration
 *  2. upTag('event', name, payload)     – track an event
 *  3. upTag('app', name)                – retrieve a value (e.g. linker param)
 */
interface UpTagFunction {
  (command: "config", key: string, value: string | string[]): void;
  (command: "event", name: "cart_updated", payload: UpPromoteCartPayload): void;
  (command: "app", name: "linker"): string | undefined;
  (...args: any[]): void;
}

declare function upTag(command: "config", key: string, value: string | string[]): void;
declare function upTag(command: "event", name: "cart_updated", payload: UpPromoteCartPayload): void;
declare function upTag(command: "app", name: "linker"): string | undefined;
declare function upTag(...args: any[]): void;

declare interface Window {
  upDataLayer: any[];
  upTag: UpTagFunction;
}
