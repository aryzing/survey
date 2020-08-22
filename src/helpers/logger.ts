/**
 * Simple logger to log errors. Ideally, we'd send them to a monitoring
 * infrastructure, like Sentry.
 */
const logError = (...args: unknown[]): void => {
  // eslint-disable-next-line no-console
  console.error(...args);
};

export default logError;
