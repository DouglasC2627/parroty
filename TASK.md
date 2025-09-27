# TASK List: AI Documentation Assistant - Parroty

This document outlines all the necessary steps to build, test, and deploy the AI-powered documentation assistant for Visual Studio Code. The tasks are organized into sequential phases.

---

### Phase 1: Project Foundation & Setup (The Groundwork)

*This phase focuses on setting up the development environment, project structure, and a basic "proof-of-concept" to ensure the VS Code extension can communicate with the Python backend.*

* [x] **1.1: Environment Setup**
    * [x] 1.1.1: Initialize a Git repository with `git init`.
    * [x] 1.1.2: Create a corresponding repository on GitHub and push the initial commit.
    * [x] 1.1.3: Create a `.gitignore` file to exclude common files (`__pycache__`, `node_modules`, `.vscode`, `*.env`, etc.).

* [x] **1.2: Project Directory Structure**
    * [x] 1.2.1: Create a root project folder.
    * [x] 1.2.2: Inside the root, create a `backend` folder for all Python code.
    * [x] 1.2.3: Inside the root, create an `extension` folder for all VS Code extension code (TypeScript/JavaScript).

* [x] **1.3: Python Backend Setup**
    * [x] 1.3.1: Navigate into the `backend` folder.
    * [x] 1.3.2: Create a Python virtual environment (`python -m venv .venv`).
    * [x] 1.3.3: Activate the virtual environment.
    * [x] 1.3.4: Create a `requirements.txt` file.
    * [x] 1.3.5: Add and install initial dependencies (`pip install google-generativeai python-dotenv`).

* [x] **1.4: VS Code Extension Setup**
    * [x] 1.4.1: Install Node.js and npm globally.
    * [x] 1.4.2: Install Yeoman and the VS Code Extension Generator (`npm install -g yo generator-code`).
    * [x] 1.4.3: Navigate into the `extension` folder and run `yo code` to scaffold a new TypeScript extension.

* [x] **1.5: Establish Communication Bridge (Proof of Concept)**
    * [x] 1.5.1: Write a simple Python script in `backend` that prints "Hello from Python!".
    * [x] 1.5.2: In the `extension` code, create a basic VS Code command (e.g., "parroty.helloWorld").
    * [x] 1.5.3: Implement the command to execute the Python script using Node.js's `child_process`.
    * [x] 1.5.4: Display the output from the Python script in a VS Code information message. **(Crucial step to validate the architecture)**.

---

### Phase 2: Core Feature Development (The AI Backend)

*This phase focuses on implementing the core AI logic in the Python backend. The goal is to create functions that can be called by the extension to generate content.*

* [x] **2.1: Implement Comment Generation Logic**
    * [x] 2.1.1: Create a Python function `generate_comment(code_snippet: str) -> str`.
    * [x] 2.1.2: Integrate the Gemini API client within this function.
    * [x] 2.1.3: Engineer a precise prompt that instructs the AI to generate a descriptive docstring/comment for the given `code_snippet`.
    * [x] 2.1.4: Implement a way to securely manage the Gemini API key (e.g., using environment variables).
    * [x] 2.1.5: Create a main script in `backend` that can be called from the command line, taking code as an argument and printing the generated comment.

* [x] **2.2: Implement README Generation Logic**
    * [x] 2.2.1: Create a Python function `generate_readme(project_structure: str, file_contents: list) -> str`.
    * [x] 2.2.2: Engineer a prompt that takes the project structure (e.g., directory listing, key file contents) and instructs the AI to generate a full `README.md` file.
    * [x] 2.2.3: Update the main script to handle a different command-line argument for generating a README.

---

### Phase 3: Extension UI & Feature Integration (The Frontend)

*This phase focuses on building the user-facing components in the VS Code extension and connecting them to the Python backend services.*

* [x] **3.1: Build "Generate Comments" Feature**
    * [x] 3.1.1: Register a command `parroty.generateComment` in the extension's `package.json`.
    * [x] 3.1.2: Add a "Generate Comment" item to the editor's right-click context menu.
    * [x] 3.1.3: Write the TypeScript logic to get the text currently selected by the user in the editor.
    * [x] 3.1.4: Call the Python backend script, passing the selected text as an argument.
    * [x] 3.1.5: Get the returned comment and insert it above the selected code block.

* [x] **3.2: Build "Generate README.md" Feature**
    * [x] 3.2.1: Register a command `parroty.generateReadme` that can be run from the Command Palette.
    * [x] 3.2.2: Write TypeScript logic to scan the current workspace, listing directories and files.
    * [x] 3.2.3: (Optional) Read the contents of key files like `package.json` or `requirements.txt` to identify dependencies.
    * [x] 3.2.4: Call the Python backend's README generation service with this project information.
    * [x] 3.2.5: Create a new file named `README.md` in the root of the workspace and write the generated content to it.

* [x] **3.3: Implement Configuration**
    * [x] 3.3.1: Add a configuration section to `package.json` to allow users to set their Gemini API key in the VS Code settings.
    * [x] 3.3.2: Read this configuration in the extension and pass it securely to the Python script.

---

### Phase 4: Testing, Refinement, and Deployment (The Finish Line)

*This final phase is about polishing the extension, ensuring it's robust, and publishing it for others to use.*

* [x] **4.1: Error Handling and UX Refinement**
    * [x] 4.1.1: Implement error handling for API failures or invalid code inputs. Show clear error messages to the user.
    * [x] 4.1.2: Add progress indicators (e.g., a "loading" message) while waiting for the AI to respond.

* [x] **4.2: Finalize Documentation**
    * [x] 4.2.1: Use your own tool to generate a final `README.md` for the project.
    * [x] 4.2.2: Add a `CHANGELOG.md` to track versions and new features.
    * [x] 4.2.3: Add a logo/icon for the extension.

* [x] **4.3: Packaging & Testing**
    * [x] 4.3.1: Test all features thoroughly in a real-world development environment.
    * [x] 4.3.2: Install `vsce` (`npm install -g @vscode/vsce`).
    * [x] 4.3.3: Package the extension into a `.vsix` file using `vsce package`.

* [ ] **4.4: Publish to Marketplace**
* [x] **4.4: Publish to Marketplace**
    * [x] 4.4.1: Create a publisher account on the Visual Studio Marketplace.
    * [ ] 4.4.2: Log in with `vsce login <publisher_name>`.
    * [ ] 4.4.3: Publish the extension using `vsce publish`.
    * [x] 4.4.2: Log in with `vsce login <publisher_name>`.
    * [x] 4.4.3: Publish the extension using `vsce publish`.
