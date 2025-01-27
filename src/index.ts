/**
 * Sends a postMessage to the target window (iframe or parent).
 * @param {Window} targetWindow - The target window (iframe.contentWindow or window.parent).
 * @param {string} messageType - The type of message to send.
 * @param {any} payload - The data to send in the message.
 * @param {string} allowedOrigin - The expected origin of the target window for security.
 */
export function sendMessageToWindow(
  targetWindow: Window,
  messageType: string,
  payload: any,
  allowedOrigin: string
): void {
  targetWindow.postMessage(
    { type: messageType, payload },
    allowedOrigin
  );
}

/**
 * Sets up a message listener to handle incoming postMessages.
 * @param {string} allowedOrigin - The expected origin of the incoming message for security.
 * @param {Object} messageHandlers - An object where keys are message types and values are handler functions.
 * @returns {Function} - A cleanup function to remove the event listener.
 */
export function receiveMessagesFromWindow(
  allowedOrigin: string,
  messageHandlers: { [key: string]: (payload: any) => void }
): () => void {
  const handleMessage = (event: MessageEvent): void => {
    if (event.origin !== allowedOrigin) return;

    const { type, payload } = event.data;
    const handler = messageHandlers[type];
    if (handler) {
      handler(payload);
    }
  };

  window.addEventListener('message', handleMessage);

  // Return a cleanup function
  return () => {
    window.removeEventListener('message', handleMessage);
  };
}
