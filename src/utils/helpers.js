const { OpenAI } = require("langchain/llms/openai");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");

const generateRandomId = () => {
  const randomNumber = Math.floor(Math.random() * 10000);
  const formattedNumber = randomNumber.toString().padStart(4, "0");
  return formattedNumber;
};

const getLLM = (temperature = 0.9) => {
  const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature,
  });
  return llm;
};

const generateOpenAIEmbeddings = () => {
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    maxConcurrency: 3,
    maxRetries: 2,
  });

  return embeddings;
};
module.exports = {
  getLLM,
  generateRandomId,
  generateOpenAIEmbeddings,
};
