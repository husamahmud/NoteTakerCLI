# NoteTakerCLI

This Notes Manager is a Node.js based command-line application that allows users
to manage their personal notes. It provides functionality to create, retrieve,
delete, and find notes with optional tags, and also to launch a local web server
to view all notes.

## Installation

Prerequisites:

- Node.js
- npm

## gettting started

1. Clone the repository

```bash
git clone https://github.com/husamahmud/NoteTakerCLI.git
```

2. Navigate to the project directory:

```bash
cd NoteTakerCLI
```

3. Install the dependencies:

```bash
npm install
```

4. Link the package to use the CLI globally:

```bash
npm link
```

### Usage

1. To create a new note:

```bash
note create "This is a new note" --tags tag1,tag2,tag3
```

2. To list all notes:

```bash
note all
```

3. To find notes (Find notes containing specific content):

```bash
note find "search query"
```

4. To delete a note:

```bash
note delete <note_id>
```

5. To view all notes in a web browser:

```bash
note web <port>
```

6. Delete all notes:

```bash
note clean
```
