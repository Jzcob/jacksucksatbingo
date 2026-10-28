# JackSucksAtBingo 🎯

**The unofficial JackSucksAtLife Reddit Video Bingo game.**

[**Play JackSucksAtBingo**](https://jacksucksatbingo.app)

Watch Jack's Reddit videos, spot familiar moments, and mark them off on your own randomized Bingo card! This is a free, fan-made project inspired by JackSucksAtLife and his community.

> **Note:** This README was created with AI assistance. JackSucksAtBingo is an unofficial fan project and is not affiliated with or endorsed by JackSucksAtLife.

## 🎮 How to play

1. Visit **[jacksucksatbingo.app](https://jacksucksatbingo.app)**.
2. Click **Generate New Card** to get a randomized 5×5 Bingo board.
3. Watch one of Jack's Reddit videos and click a square whenever you spot the moment described.
4. Complete **five squares in a row, column, or diagonal** to get Bingo. Finished lines are highlighted automatically.
5. Click a marked square again if you need to undo it. Use **Clear Marks** to reset your selections without changing the card.

The center **FREE SPACE** is always marked. You can keep playing after getting Bingo—there are no win popups or game-ending screens.

## ✨ Features

- **Random cards:** Each board uses 24 unique prompts from `bingo_list.json`, plus the free center square.
- **Easy marking:** Click or tap squares to mark and unmark them, with subtle animations.
- **Automatic Bingo highlights:** Completed horizontal, vertical, and diagonal lines are highlighted.
- **New card or fresh start:** Generate a different card or clear the existing marks.
- **Mobile friendly:** A responsive, minimalist black-and-white interface.
- **No saved games:** No accounts, cookies, browser local storage, database, or saved game state. Refreshing the page starts fresh. Your hosting provider may still keep ordinary server access logs.
- **Community inspired:** The prompt list can be updated with suggestions from JSAL viewers.

## 💡 Suggest a Bingo square

Have an idea for something Jack often says, does, or sees in a Reddit video? Community suggestions are welcome!

A good square should be **recognizable, fun, and reasonably likely to happen**, but not so common that every card wins instantly. You can suggest ideas through the project's GitHub Issues once submissions are enabled, or through the community Reddit discussion.

The included prompts are **starter ideas**, not verified recurring moments.

## 🛠️ For developers

This project is a lightweight static website built with **HTML, CSS, and JavaScript**. It doesn't need a Python backend, a database, or any paid hosting.

### Project structure

```text
jacksucksatbingo/
├── index.html        # Website layout and content
├── style.css         # Black-and-white design and animations
├── script.js         # Card generation and Bingo logic
├── bingo_list.json   # Editable Bingo prompts
└── README.md         # Project information and setup instructions
```

### Run the project locally

You'll need Python installed, but only to serve the files locally.

1. Download or clone the repository and open a terminal in the project folder.
2. Start the local web server:

   ```bash
   python -m http.server 8000
   ```

   On Windows, `py -m http.server 8000` also works.

3. Open **http://localhost:8000** in your browser.
4. Press **Ctrl+C** in the terminal to stop the server.

Don't open `index.html` directly with a `file://` URL: browsers can block the request for `bingo_list.json`.

### Edit the Bingo prompts

Open `bingo_list.json` and add or change the entries. It's a regular JSON array of text strings:

```json
[
  "Jack mentions a play button",
  "Someone brings up an old video",
  "Jack recognizes a repost",
  "A viewer references one of Jack's other channels"
]
```

This short example is **not a complete playable list**. Keep **at least 24 different, non-empty entries** in the real file; **50–100 or more** is recommended for better variety. The game selects 24 prompts per card without repeating them. You don't need to include `FREE SPACE` in the JSON file—the website adds it automatically.

The prompts are publicly accessible because they're served as a normal website file.

## 🚀 Hosting and deployment

JackSucksAtBingo is designed to run on **Cloudflare Pages** using its free static-site hosting.

For a GitHub-connected deployment:

1. Push the website files to a GitHub repository, with `index.html` at the repository root.
2. In the [Cloudflare dashboard](https://dash.cloudflare.com/), open **Workers & Pages** and create a Pages project connected to the repository.
3. Select the production branch (usually `main`). This site doesn't require a build command; publish the repository root (`.`) as the output directory.
4. Deploy the project, then open **Custom domains** to connect `jacksucksatbingo.app` and follow Cloudflare's DNS instructions.
5. Future pushes to the production branch will automatically deploy the updated website.

See the [official Cloudflare Pages documentation](https://developers.cloudflare.com/pages/) for detailed instructions. Cloudflare Pages hosting can be free; registering or renewing a custom domain is a separate cost.

## 🔗 Source code

The website's **View Source Code** footer link is intended to open its public GitHub repository. Make sure the link in `index.html` points to the correct repository before publishing.

## ❤️ Community and credits

This website is a fan-made project for the **JackSucksAtLife community**. Thank you to everyone who contributes ideas and helps make the Bingo cards more fun!

**Disclaimer:** JackSucksAtBingo is not affiliated with, sponsored by, or endorsed by JackSucksAtLife.

*README prepared with AI assistance.*
