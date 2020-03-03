var natural = require('natural');
const fs = require('fs');

// classifier creation

// read data from json file 
const readResult = fs.readFileSync('stackoverflow-question-tags.json');
let parsed = JSON.parse(readResult);

// tokenize and map the data
var tokenizer = new natural.WordTokenizer();
let documents = parsed.map(x => ({
    text: tokenizer.tokenize(x.title), // x.body and be added for the question body
    stem: x.tags
}));

// map data to new documents, each question foreach of its tags
let docs = [];
documents.forEach(d => {
    let tags = d.stem.split('|');
    tags.forEach(t =>{
        docs.push({
            text: d.text.map(x =>  x.toLowerCase()),
            stem: t.toLowerCase()
        })
    })
});

// add documents to the classifier
var classifier = new natural.BayesClassifier();
docs.forEach(doc => classifier.addDocument(doc.text, doc.stem));

// train the model
classifier.train();

// save classifier is classifier.json file
classifier.save('classifier.json', function(err, classifier) {
    console.log("Saved");
});