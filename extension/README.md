# Parroty: Your AI Documentation Assistant

![Parroty Logo](images/logo2.png)

## About The Project

Parroty is a VS Code extension designed to streamline your documentation process. Powered by Google's Gemini AI, Parroty acts as an assistant to help you generate code comments, docstrings, and complete a draft `README.md` file directly within your project folder.

---

## Features

### Generate Comments & Docstrings

Quickly document any piece of code. Select a function, class, or any code block, and Parroty will generate a concise comment or a detailed docstring explaining its purpose, parameters, and return values.

*Right-click on selected code and choose `Parroty > Generate Comment` or `Parroty > Generate Docstring`.*

#### Generate a Comment
![Generating a comment with Parroty](images/parroty-generate-comment.gif)

####Generate a Docstring
![Generating a docstring with Parroty](images/parroty-generate-docstring.gif)

### Generate a Project README.md

Bootstrap your project's documentation in seconds. Parroty analyzes your workspace's file structure and content to generate a comprehensive `README.md` file, complete with sections for project description, installation, and usage.

*Run `Parroty > Generate README.md` from the Command Palette (`Ctrl+Shift+P`).*

####Generate a README.md file
![Generating a README.md with Parroty](images/parroty-generate-readme.gif)

README.md file generated:
![README.md generated with Parroty](images/parroty-readme-generated.gif)

---

## Requirements

1.  **Visual Studio Code**: The extension is built for VS Code.
2.  **Google Gemini API Key**: Parroty uses the Google Gemini API to generate content. You can obtain a free API key from Google AI Studio.

---

## Extension Setup

After installing the extension from the Marketplace, you must configure your API key.

1.  Open VS Code Settings (`Ctrl+,` or `Cmd+,`).
2.  Search for "Parroty".
3.  In the `Parroty: Gemini Api Key` field, paste your Google Gemini API key.
![Set up API key for Parroty](images/parroty-set-api-key.gif)

The extension is now ready to use!

---

## Release Notes

All notable changes to this project are documented in the CHANGELOG.md file.

---

## Contributing & Feedback

This is an open-source project, and contributions are welcome! If you have a suggestion, find a bug, or want to improve the extension, please visit the GitHub repository.

---

## License

Copyright (c) 2025 DouglasC.

This project is licensed under the [MIT License](LICENSE).