# ABOUT: AI-Powered Documentation Assistant for VS Code

## Project Vision 

The core vision of this project is to **accelerate and improve the software documentation process** for developers. Writing and maintaining high-quality documentation, such as code comments and `README.md` files, is crucial for collaboration and long-term project maintainability. However, it's often a manual and time-consuming task that can be overlooked.

This project aims to create an intelligent assistant, integrated directly into Visual Studio Code, that automates the creation of clear, concise, and context-aware documentation. By leveraging AI, we can free up developers to focus on writing code, while ensuring their projects remain well-documented, understandable, and accessible to others.

---

## The Final Application: "Parroty" VS Code Extension

The final product will be a polished and intuitive **Visual Studio Code extension**. It will operate seamlessly within the editor, providing documentation generation capabilities on-demand. Users will interact with the extension through simple commands and context menu actions, making it a natural part of their development workflow.

The backend logic, powered by **Python**, will handle the code analysis and AI-driven content generation. The extension will act as the user-friendly interface that communicates with this powerful backend.

---

## Key Features

The MVP and future versions of the application will include the following features:

### 1. Automated Code Commenting
* **Function & Class Documentation:** Automatically generate detailed docstrings for functions and classes. The comments will describe the purpose, parameters, return values, and potential exceptions.
* **Variable Explanations:** Generate inline comments explaining the purpose of complex variables or constants.
* **Context-Aware Generation:** Users can highlight a specific block of code (a function, a class, or a few lines), right-click, and select "Generate Comments" from the context menu.

### 2. Intelligent README.md Generation
* **Project Analysis:** The extension will scan the entire project directory to understand its structure, programming languages used, key dependencies (e.g., from `requirements.txt` or `package.json`), and main entry points.
* **Structured README Creation:** It will generate a comprehensive `README.md` file with standard sections, including:
    * Project Title and Description
    * Features
    * Installation Instructions
    * Usage Examples
    * How to Contribute
* **Customization:** Allow the user to trigger the generation via a command palette command (e.g., "Docu-Genius: Create README.md").

---

## Tech Stack

The tech stack of the project will be:
* **Frontend:** Typescript and Node.js
* **Backend:** Python
* **API Library:** google-generativeai
* **Communication Bridge:** child_process (Node.js module)
* **Version Control:** Git and Github
* **Packaging & Publishing:** vsce 

---

## Final Product Goals

The success of this project will be measured by its ability to achieve the following goals:

* **Boost Developer Productivity:** Significantly reduce the time and effort developers spend on writing documentation.
* **Improve Code Quality:** Promote a culture of well-documented code, making projects easier to debug, maintain, and onboard new team members.
* **Ensure Consistency:** Create standardized, high-quality documentation across all projects, regardless of the individual developer's documentation habits.
* **Seamless Integration:** Provide a smooth and non-intrusive user experience within Visual Studio Code, feeling like a native feature of the editor.

This document will serve as the guide.
