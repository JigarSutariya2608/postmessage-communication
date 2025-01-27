/**
 * Sends a postMessage to the target window (iframe or parent).
 * @param {Window} targetWindow - The target window (iframe.contentWindow or window.parent).
 * @param {string} messageType - The type of message to send.
 * @param {any} payload - The data to send in the message.
 * @param {string} allowedOrigin - The expected origin of the target window for security.
 */
function sendMessageToWindow(
  targetWindow,
  messageType,
  payload,
  allowedOrigin
) {
  // Send the message to the target window
  targetWindow.postMessage(
    { type: messageType, payload: payload },
    allowedOrigin
  );
}

/**
 * Sets up a message listener to handle incoming postMessages.
 * @param {string} allowedOrigin - The expected origin of the incoming message for security.
 * @param {Object} messageHandlers - An object where keys are message types and values are handler functions.
 * @returns {Function} - A cleanup function to remove the event listener.
 */
function receiveMessagesFromWindow(allowedOrigin, messageHandlers) {
  // Handle incoming messages
  const handleMessage = (event) => {
    // Check the origin for security
    if (event.origin !== allowedOrigin) return;

    // Extract message type and payload
    const { type, payload } = event.data;

    // If a handler for this message type exists, call it
    if (messageHandlers[type]) {
      messageHandlers[type](payload);
    }
  };

  // Attach the event listener for incoming messages
  window.addEventListener("message", handleMessage);

  // Return cleanup function to remove the event listener
  return () => {
    window.removeEventListener("message", handleMessage);
  };
}

// Export the functions for external usage
module.exports = { sendMessageToWindow, receiveMessagesFromWindow };
