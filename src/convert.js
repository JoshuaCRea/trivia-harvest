const fs = require('fs');
const { parse } = require('path');

const INPUT_PATH = "step2output.json"
const OUTPUT_DIR = "./trivia";
const OUTPUT_FILE = "round.txt";
const OUTPUT_PATH = `${OUTPUT_DIR}/${OUTPUT_FILE}`;
// const foo = toString(makeRound(INPUT_PATH));

function makeRound(file) {
    fs.readFile(file, (err, data) => {
        if (err) {
            console.log(`\n🚨🚨🚨 Error reading file 🚨🚨🚨`);
            console.error(err);
        }
        fs.writeFile(OUTPUT_PATH, data, (err) => {
            if (err) {
                console.log(`\n🚨🚨🚨 Error writing file 🚨🚨🚨`);
                console.error(err);
            }
            console.log(data.toString());
        });
        console.log(`\n📄📄📄 File contents (${INPUT_PATH}) 📄📄📄`);
        // console.log(data.toString());
        // const parsedJson = JSON.parse(data);
        // console.log(parsedJson);
    });
}

// function reformat(data) {
//     data[Object.keys(data)[0]];
// }

makeRound(INPUT_PATH);