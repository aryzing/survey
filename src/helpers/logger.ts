/**
 * Simple logger to log errors. Ideally, we'd send them to a monitoring
 * infrastructure, like Sentry.
 */
// eslint-disable-next-line import/prefer-default-export
export const logError = (...args: unknown[]): void => {
  // eslint-disable-next-line no-console
  console.error(...args);
};
