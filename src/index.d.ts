export function sendMessageToWindow(
  targetWindow: Window,
  messageType: string,
  payload: any,
  allowedOrigin: string
): void;

export function receiveMessagesFromWindow(
  allowedOrigin: string,
  messageHandlers: { [key: string]: (payload: any) => void }
): () => void;
