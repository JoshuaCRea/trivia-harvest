function prompt(numOfQs, category) {
    return `Give me an array containing ${numOfQs} trivia questions about ${category} and their answers. Each question and answer should be in its own array, with the element at index 0 being the question, and the element at index 1 being the answer.`;
}

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function fetchTrivia(numOfQs, category) {
    const foo = prompt(numOfQs, category);
    console.log(foo);
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: foo,
        max_tokens: 1000,
    });
    return response;
}

fetchTrivia(3, "pizza")
    .then((res) => {
        console.log(res.data.choices[0].text);
        // console.log(JSON.parse(res.data.choices[0].text));
    })