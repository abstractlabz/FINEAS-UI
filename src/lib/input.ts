 import { useCallback } from "react";

 /**
  * Handles the input phrase from the user, sends a request to generate song lyrics using GPT-4, 
  * and updates the chat history with the generated output.
  *
  * @returns Promise<void>
  */
 const handleInput = useCallback(
     async (
       input: string,
       chat: { chat: { id: number; input: string; output: string[] }[] },
       idx: number,
       setInput: (value: React.SetStateAction<string>) => void,
       setChat: (value: React.SetStateAction<{ chat: { id: number; input: string; output: string[] }[] }>) => void,
       setIdx: (value: React.SetStateAction<number>) => void,
       setLoading: (value: React.SetStateAction<boolean>) => void,
       setError: (value: React.SetStateAction<string | null>) => void
     ) => {
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
  
         const { output } = await response.json();
         const parsedOutput = (await output) as string[];
  
         if (parsedOutput.length === 0) {
           setInput("");
           setError("No songs found. Please try again.");
           return;
         }
  
         const updatedChat = {
           chat: [
             ...chat.chat,
             { id: idx, input: input, output: parsedOutput },
           ],
         };
  
         setChat(updatedChat);
         setIdx(idx + 1);
         setInput("");
       } catch (error) {
         console.log(error);
         setError("Your session has expired. Please log in again.");
       } finally {
         setLoading(false);
       }
     }, []
 );
  
 export { handleInput };