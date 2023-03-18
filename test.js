const fs = require('fs');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

console.log(process.env.OPENAI_API_KEY);

function chatGptPrompt(numOfQs, category) {
    return (
        `Give me an array containing ${numOfQs} trivia questions about ${category} and their answers. ` +
        `Each question and answer should be in its own array, with the element at index 0 being the question, and the element at index 1 being the answer.`
    );
}

async function fetchTrivia(numOfQs, category) {
    const prompt = chatGptPrompt(numOfQs, category);
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 1000,
        });
        return completion;
    } catch (err) {
        console.error(err);
    }
}

fetchTrivia(3, "pizza")
    .then((res) => {
        const foo = JSON.parse(res.data.choices[0].text);
        console.log(foo);
        const jsonFoo = JSON.stringify(foo);
        console.log(jsonFoo);
        const folderName = "./Trivia";
        try {
            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName);
            }
        } catch (err) {
            console.error(err.data);
        }
        fs.writeFile("./Trivia/sample.json", jsonFoo, function (err) {
            if (err) {
                console.error(err);
            }
        });
    })