const fs = require('fs');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const chatGptPrompt = (numOfQs, category) => {
    return (
        `Give me an array containing ${numOfQs} trivia questions about ${category} and their answers. ` +
        `Each question and answer should be in its own array, with the element at index 0 being the question, and the element at index 1 being the answer.`
    );
}

const fetchTrivia = async (numOfQs, category) => {
    const prompt = chatGptPrompt(numOfQs, category);
    const completion = await openai.createCompletion(
        {
            model: "text-davinci-003-BOGUS",
            prompt: prompt,
            max_tokens: 1000,
        }
    );
    return completion;
}

fetchTrivia(3, "pizza")
    .then((res) => {
        const foo = JSON.parse(res.data.choices[0].text);
        console.log(foo);
        const jsonFoo = JSON.stringify(foo);
        console.log(jsonFoo);
        const folderName = "./trivia";
        try {
            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName);
            }
        } catch (err) {
            console.error(err.data);
        }
        fs.writeFile(`${folderName}/sample.json`, jsonFoo, (err) => {
            if (err) {
                console.error(err);
            }
        });
    })
    .catch((err) => {
        console.error(err);
    });
