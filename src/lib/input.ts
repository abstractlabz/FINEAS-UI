import type { Dispatch, SetStateAction } from 'react';

/**
 * Handles the input phrase from the user, sends a request to generate song lyrics using GPT-4,
 * and updates the chat history with the generated output.
 *
 * @returns Promise<void>
 */
async function handleInput(
  input: string,
  chat: { chat: { id: number; input: string; output: string[] }[] },
  idx: number,
  setInput: Dispatch<SetStateAction<string>>,
  setChat: Dispatch<SetStateAction<{ chat: { id: number; input: string; output: string[] }[] }>>,
  setIdx: Dispatch<SetStateAction<number>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>
): Promise<void> {
  if (input === "") {
    setError("Please enter a phrase.");
    return;
  }

  try {
    setLoading(true);
    setError(null);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: input }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: { output: string[] } = await response.json() as { output: string[] };

    if (data.output.length === 0) {
      setInput("");
      setError("No data found. Please try again.");
      return;
    }

    const updatedChat = {
      chat: [
        ...chat.chat,
        { id: idx, input: input, output: data.output },
      ],
    };

    setChat(updatedChat);
    setIdx(idx + 1);
    setInput("");
  } catch (error: any) {
    console.error(error);
    setError("Your session has expired. Please log in again.");
  } finally {
    setLoading(false);
  }
}

export { handleInput };
