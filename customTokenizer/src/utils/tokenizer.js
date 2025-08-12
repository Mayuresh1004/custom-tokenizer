export async function loadVocab() {
    const res = await fetch("/vocab.json");
    const vocabData = await res.json();
    return vocabData.vocab;
}

export function encode(text, tokens) {
    const token = [0]; // BOS
    for (const char of text) {
        const index = tokens.indexOf(char);
        if (index !== -1) {
            token.push(index);
        } else {
            token.push(tokens.indexOf("<UNK>")); // handle unknown
        }
    }
    token.push(1); // EOS
    return token;
}

export function decode(tokenArray, tokens) {
    let result = "";
    for (const index of tokenArray) {
        if (index >= 0 && index < tokens.length) {
            const char = tokens[index];
            if (char !== "<BOS>" && char !== "<EOS>") {
                result += (char === "<UNK>" ? "?" : char);
            }
        }
    }
    return result;
}
