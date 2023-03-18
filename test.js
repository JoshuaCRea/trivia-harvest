const fs = require('fs');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const OUTPUT_DIR = "./trivia";
const OUTPUT_FILE = "sample.json";

const chatGptPrompt = (numOfQs, category) => {
    return (
        `Give me an array containing ${numOfQs} trivia questions about ${category} and their answers. ` +
        `Each question and answer should be in its own array, with the element at index 0 being the question, and the element at index 1 being the answer. `
    );
}

const fetchTrivia = async (numOfQs, category) => {
    return await openai.createCompletion(
        {
            model: "text-davinci-003",
            prompt: chatGptPrompt(numOfQs, category),
            max_tokens: 1000,
        }
    );
}

fetchTrivia(3, "movies")
    .then((res) => {
        console.log(`\n🤖🤖🤖 Repsonse from OpenAI API 🤖🤖🤖`);
        console.log(res.data);

        try {
            // Forcibly convert the response to the format we want written to the file
            const foo = JSON.stringify(
                JSON.parse(
                    res.data.choices[0].text
                )
            );

            if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdirSync(OUTPUT_DIR);
            }
            fs.writeFile(`${OUTPUT_DIR}/${OUTPUT_FILE}`, foo, (err) => {
                if (err) {
                    console.log(`\n🚨🚨🚨 Error writing file 🚨🚨🚨`);
                    console.error(err);
                }
            });
        } catch (err) {
            console.log(`\n🚨🚨🚨 Error preparing response for writing to file 🚨🚨🚨`);
            console.error(err);
        }
    })
    .catch((err) => {
        console.log(`\n🚨🚨🚨 Error from OpenAI API 🚨🚨🚨`);
        console.log(err.response.data);
    });
