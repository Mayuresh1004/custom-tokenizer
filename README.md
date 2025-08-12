# Tokenizer

A lightweight command-line tool for encoding text into numerical tokens and decoding tokens back to text.  
It uses a predefined vocabulary including:

- Special tokens: Beginning of Sentence (`<BOS>`), End of Sentence (`<EOS>`), and Unknown (`<UNK>`).
- Lowercase and uppercase English letters.
- Digits `0–9`.
- Common punctuation, symbols, and the space character.

---

## 📂 Files

- **`index.js`** — Main JavaScript file containing:
  - Vocabulary definition.
  - Encoding/decoding functions.
  - Command-line handling.

---

## ⚙ How It Works

### 1. Vocabulary (`vocab` array)
- Each entry in `vocab` maps to an integer index.
- Special tokens:
  - `<BOS>` — Start marker.
  - `<EOS>` — End marker.
  - `<UNK>` — Placeholder for unknown characters.

### 2. Encoding (`encode(text)`)
- Optionally adds `<BOS>` (index `0`) at the start.
- Loops over each character:
  - Finds its index in `vocab`.
  - If not found, uses `<UNK>` (index `2`).
- Optionally adds `<EOS>` (index `1`) at the end.
- Returns an **array of token integers**.

### 3. Decoding (`decode(tokens)`)
- Converts token indices back to characters.
- Skips `<BOS>` and `<EOS>` in the final output.
- Replaces `<UNK>` with `?`.

### 4. CLI Features
- Accepts `encode` or `decode` as the first argument.
- Flags for customization:
  - `--lowercase` — Treat input text as lowercase before encoding.
  - `--no-bos` — Do not include `<BOS>` at the start.
  - `--no-eos` — Do not include `<EOS>` at the end.
### 4. React App Features
- Simple and Interactive Interface.
- Can swap between Text and Tokens Easily.


---


## Usage For CLI

To run this code, you will use Node.js from your terminal.

### Encoding Text to Tokens

To convert a string into an array of numerical tokens:

```bash
node index.js encode "Hello World!"
```

**Example Output:**

```
Input: Hello World!
Tokens: [0,33,4,11,11,14,65,22,18,17,11,3,1]
```

### Decoding Tokens to Text

To convert an array of numerical tokens back to a string:

```bash
node index.js decode "[0,33,4,11,11,14,65,22,18,17,11,3,1]"
```

**Example Output:**

```
Tokens: [0,33,4,11,11,14,65,22,18,17,11,3,1]
Output: Hello World!
```

### Handling Unknown Characters

Characters not present in the `vocab` array will be encoded as the `<UNK>` token (index 2) and decoded as `?`.

```bash
node index.js encode "Hello 🌍"
```

**Example Output:**

```
Input: Hello 🌍
Tokens: [0,33,4,11,11,14,65,2,1]
```

```bash
node index.js decode "[0,33,4,11,11,14,65,2,1]"
```

**Example Output:**

```
Tokens: [0,33,4,11,11,14,65,2,1]
Output: Hello ?
```
###React App
<img width="946" height="619" alt="image" src="https://github.com/user-attachments/assets/b45a6617-1659-4997-b5d7-df6a2ae9a7d3" />
<img width="780" height="557" alt="image" src="https://github.com/user-attachments/assets/1ffce98e-5df6-43ac-9bae-e8441ecef00b" />

###CLI App

<img width="1192" height="171" alt="image" src="https://github.com/user-attachments/assets/fe8ceaa1-aeb3-40e4-baae-104cf568514b" />
<img width="1226" height="157" alt="image" src="https://github.com/user-attachments/assets/8598ab4e-81ce-4535-a42e-c58eac1f2f9a" />





