import OpenAI from "openai";
// console.log(import.meta.env.OPENAI_API_KEY)
const openai = new OpenAI({
  apiKey:"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",
  dangerouslyAllowBrowser: true,
});

export default openai;
