const fs = require('fs');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const OUTPUT_DIR = "./trivia";
const OUTPUT_FILE = "sample.json";
const OUTPUT_PATH = `${OUTPUT_DIR}/${OUTPUT_FILE}`;

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
            // Note that this relies on the API response being parseable as JSON
            // In case of frequent API errors we may need to adjust the prompt
            const responsePreparedForFile = JSON.stringify(
                JSON.parse(
                    res.data.choices[0].text
                ),
                null,
                4
            );

            if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdirSync(OUTPUT_DIR);
            }

            fs.writeFile(OUTPUT_PATH, responsePreparedForFile, (err) => {
                if (err) {
                    console.log(`\n🚨🚨🚨 Error writing file 🚨🚨🚨`);
                    console.error(err);
                }
            });

            fs.readFile(OUTPUT_PATH, (err, data) => {
                if (err) {
                    console.log(`\n🚨🚨🚨 Error reading file 🚨🚨🚨`);
                    console.error(err);
                }
                console.log(`\n📄📄📄 File contents (${OUTPUT_PATH}) 📄📄📄`);
                console.log(data.toString());
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
