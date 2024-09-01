// Function to read all bytes from a ReadableStream reader
async function readAllBytes(
  reader: ReadableStreamDefaultReader<Uint8Array>,
): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [];
  let totalLength = 0;

  while (true) {
    const { done, value: chunk } = await reader.read();

    if (done) {
      const result = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
      }
      return result;
    }

    chunks.push(chunk);
    totalLength += chunk.length;
  }
}

// Custom function to parse the response body as JSON
// deno-lint-ignore no-explicit-any
export async function customJson(response: Response): Promise<any> {
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("Response body is not readable");
  }

  // Read all bytes from the response body
  const byteArray = await readAllBytes(reader);

  // Decode the bytes into a string
  const text = new TextDecoder().decode(byteArray);

  // Parse the text as JSON
  return JSON.parse(text);
}
