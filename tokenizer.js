import fs from 'fs'
import { readFileSync } from 'fs'

const command = process.argv[2]
const argument = process.argv[3]

const vocabData = JSON.parse(readFileSync('./vocab.json', 'utf8'));
const tokens = vocabData.vocab;

function encode(text) {
    const token = [0] // start with BOS

    for (const char of text) {
        const index = tokens.indexOf(char)
        if (index !== -1) {
            token.push(index)
        }
    }

    token.push(1) // end with EOS
    return token
}

function decode(token) {
    let result = ''
    for (const index of token) {
        if (index >= 0 && index < tokens.length) {
            const char = tokens[index] 
            if (char !== "<BOS>" && char !== "<EOS>") {
                result += (char === "<UNK>" ? '?' : char)
            }
        }
    }
    return result
}

//CLI INTERFACE
if (command === 'encode') {
    const text = argument
    const encoded = encode(text)
    console.log("Tokens: ",encoded)
}
else if (command === 'decode') {
    const token = JSON.parse(argument) 
    const decoded = decode(token)
    console.log("Text:", decoded)
}
else{
    console.log("Invalid command")
}