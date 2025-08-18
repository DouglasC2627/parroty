# TASK List: AI Documentation Assistant

This document outlines all the necessary steps to build, test, and deploy the AI-powered documentation assistant for Visual Studio Code. The tasks are organized into sequential phases.

---

### Phase 1: Project Foundation & Setup (The Groundwork)

*This phase focuses on setting up the development environment, project structure, and a basic "proof-of-concept" to ensure the VS Code extension can communicate with the Python backend.*

* [V] **1.1: Environment Setup**
    * [V] 1.1.1: Initialize a Git repository with `git init`.
    * [V] 1.1.2: Create a corresponding repository on GitHub and push the initial commit.
    * [V] 1.1.3: Create a `.gitignore` file to exclude common files (`__pycache__`, `node_modules`, `.vscode`, `*.env`, etc.).

* [V] **1.2: Project Directory Structure**
    * [V] 1.2.1: Create a root project folder.
    * [V] 1.2.2: Inside the root, create a `backend` folder for all Python code.
    * [V] 1.2.3: Inside the root, create an `extension` folder for all VS Code extension code (TypeScript/JavaScript).

* [ ] **1.3: Python Backend Setup**
    * [ ] 1.3.1: Navigate into the `backend` folder.
    * [ ] 1.3.2: Create a Python virtual environment (`python -m venv .venv`).
    * [ ] 1.3.3: Activate the virtual environment.
    * [ ] 1.3.4: Create a `requirements.txt` file.
    * [ ] 1.3.5: Add and install initial dependencies (`pip install google-generativeai python-dotenv`).

* [ ] **1.4: VS Code Extension Setup**
    * [ ] 1.4.1: Install Node.js and npm globally.
    * [ ] 1.4.2: Install Yeoman and the VS Code Extension Generator (`npm install -g yo generator-code`).
    * [ ] 1.4.3: Navigate into the `extension` folder and run `yo code` to scaffold a new TypeScript extension.

* [ ] **1.5: Establish Communication Bridge (Proof of Concept)**
    * [ ] 1.5.1: Write a simple Python script in `backend` that prints "Hello from Python!".
    * [ ] 1.5.2: In the `extension` code, create a basic VS Code command (e.g., "docuGenius.helloWorld").
    * [ ] 1.5.3: Implement the command to execute the Python script using Node.js's `child_process`.
    * [ ] 1.5.4: Display the output from the Python script in a VS Code information message. **(Crucial step to validate the architecture)**.

---

### Phase 2: Core Feature Development (The AI Backend)

*This phase focuses on implementing the core AI logic in the Python backend. The goal is to create functions that can be called by the extension to generate content.*

* [ ] **2.1: Implement Comment Generation Logic**
    * [ ] 2.1.1: Create a Python function `generate_comment(code_snippet: str) -> str`.
    * [ ] 2.1.2: Integrate the Gemini API client within this function.
    * [ ] 2.1.3: Engineer a precise prompt that instructs the AI to generate a descriptive docstring/comment for the given `code_snippet`.
    * [ ] 2.1.4: Implement a way to securely manage the Gemini API key (e.g., using environment variables).
    * [ ] 2.1.5: Create a main script in `backend` that can be called from the command line, taking code as an argument and printing the generated comment.

* [ ] **2.2: Implement README Generation Logic**
    * [ ] 2.2.1: Create a Python function `generate_readme(project_structure: str, file_contents: list) -> str`.
    * [ ] 2.2.2: Engineer a prompt that takes the project structure (e.g., directory listing, key file contents) and instructs the AI to generate a full `README.md` file.
    * [ ] 2.2.3: Update the main script to handle a different command-line argument for generating a README.

---

### Phase 3: Extension UI & Feature Integration (The Frontend)

*This phase focuses on building the user-facing components in the VS Code extension and connecting them to the Python backend services.*

* [ ] **3.1: Build "Generate Comments" Feature**
    * [ ] 3.1.1: Register a command `docuGenius.generateComment` in the extension's `package.json`.
    * [ ] 3.1.2: Add a "Generate Comment" item to the editor's right-click context menu.
    * [ ] 3.1.3: Write the TypeScript logic to get the text currently selected by the user in the editor.
    * [ ] 3.1.4: Call the Python backend script, passing the selected text as an argument.
    * [ ] 3.1.5: Get the returned comment and insert it above the selected code block.

* [ ] **3.2: Build "Generate README.md" Feature**
    * [ ] 3.2.1: Register a command `docuGenius.generateReadme` that can be run from the Command Palette.
    * [ ] 3.2.2: Write TypeScript logic to scan the current workspace, listing directories and files.
    * [ ] 3.2.3: (Optional) Read the contents of key files like `package.json` or `requirements.txt` to identify dependencies.
    * [ ] 3.2.4: Call the Python backend's README generation service with this project information.
    * [ ] 3.2.5: Create a new file named `README.md` in the root of the workspace and write the generated content to it.

* [ ] **3.3: Implement Configuration**
    * [ ] 3.3.1: Add a configuration section to `package.json` to allow users to set their Gemini API key in the VS Code settings.
    * [ ] 3.3.2: Read this configuration in the extension and pass it securely to the Python script.

---

### Phase 4: Testing, Refinement, and Deployment (The Finish Line)

*This final phase is about polishing the extension, ensuring it's robust, and publishing it for others to use.*

* [ ] **4.1: Error Handling and UX Refinement**
    * [ ] 4.1.1: Implement error handling for API failures or invalid code inputs. Show clear error messages to the user.
    * [ ] 4.1.2: Add progress indicators (e.g., a "loading" message) while waiting for the AI to respond.

* [ ] **4.2: Finalize Documentation**
    * [ ] 4.2.1: Use your own tool to generate a final `README.md` for the project.
    * [ ] 4.2.2: Add a `CHANGELOG.md` to track versions and new features.

* [ ] **4.3: Packaging & Testing**
    * [ ] 4.3.1: Test all features thoroughly in a real-world development environment.
    * [ ] 4.3.2: Install `vsce` (`npm install -g @vscode/vsce`).
    * [ ] 4.3.3: Package the extension into a `.vsix` file using `vsce package`.

* [ ] **4.4: Publish to Marketplace**
    * [ ] 4.4.1: Create a publisher account on the Visual Studio Marketplace.
    * [ ] 4.4.2: Log in with `vsce login <publisher_name>`.
    * [ ] 4.4.3: Publish the extension using `vsce publish`.
