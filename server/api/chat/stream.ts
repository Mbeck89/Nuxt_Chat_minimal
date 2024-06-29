import {
  OpenAIClient,
  AzureKeyCredential,
  type ChatCompletions
} from '@azure/openai'
import {
  AIChatCompletionRequest,
  AIChatCompletionDelta
} from '@microsoft/ai-chat-protocol'

export default defineEventHandler(async (event: any) => {
  try {
    const AZURE_OPENAI_KEY = useRuntimeConfig().AZURE_OPENAI_KEY
    const AZURE_OPENAI_ENDPOINT = useRuntimeConfig().AZURE_OPENAI_ENDPOINT
    const AZURE_OPENAI_CHAT_DEPLOYMENT_NAME =
      useRuntimeConfig().AZURE_OPENAI_CHAT_DEPLOYMENT_NAME

    if (
      !AZURE_OPENAI_KEY ||
      !AZURE_OPENAI_ENDPOINT ||
      !AZURE_OPENAI_CHAT_DEPLOYMENT_NAME
    )
      throw new Error('AZURE OPEN AI SETTINGS UNCOMPLETE')

    const settings = { maxTokens: 4096, temperature: 0.7 }

    const { messages } = await readBody(event)
    const client = new OpenAIClient(
      AZURE_OPENAI_ENDPOINT,
      new AzureKeyCredential(AZURE_OPENAI_KEY)
    )

    const responseStream = await client.streamChatCompletions(
      AZURE_OPENAI_CHAT_DEPLOYMENT_NAME,
      messages,
      settings
    )
    return sendIterable(event, createJsonStream(responseStream))
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message
    })
  }
})

async function* createJsonStream (chunks: AsyncIterable<ChatCompletions>) {
  for await (const chunk of chunks) {
    for (const choice of chunk.choices) {
      const delta = choice.delta
      if (delta === undefined) {
        continue
      } else {
        const responseChunk: AIChatCompletionDelta = {
          delta: {
            content: delta.content || '',
            role: 'assistant'
          }
        }
        yield JSON.stringify(responseChunk) + '\n'
      }
      // Format response chunks in Newline delimited JSON
      // see https://github.com/ndjson/ndjson-spec
    }
  }
}
