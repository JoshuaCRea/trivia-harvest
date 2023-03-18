const fs = require('fs');

const INPUT_PATH = "step2output.json"

fs.readFile(INPUT_PATH, (err, data) => {
    if (err) {
        console.log(`\n🚨🚨🚨 Error reading file 🚨🚨🚨`);
        console.error(err);
    }
    console.log(`\n📄📄📄 File contents (${INPUT_PATH}) 📄📄📄`);
    console.log(data.toString());
}); 