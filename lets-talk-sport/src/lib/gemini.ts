import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function generateSearchResponse(query: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const prompt = `You are a sports news expert. Provide a brief, informative response to this sports-related search query: "${query}". 
    Keep your response under 200 words and focus on providing accurate, up-to-date information. 
    If the query is not sports-related, politely redirect the user to search for sports topics.`
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error generating Gemini response:', error)
    return 'Unable to generate AI response at this time. Please try again later.'
  }
}