# Parroty: AI Documentation Assistant

## About The Project

(this README markdown was created with Parroty's `Generate README.md` command)

Parroty is an innovative Visual Studio Code extension designed to streamline the documentation process for developers. Leveraging the power of Google's Generative AI (Gemini), Parroty acts as an intelligent assistant that helps you generate various forms of documentation directly within your VS Code environment. Whether you need quick code comments, comprehensive function docstrings, or even an initial `README.md` for your project, Parroty aims to reduce the manual effort involved in keeping your codebase well-documented and understandable.

## Getting Started

To get a local copy of Parroty up and running, follow these steps. This project consists of a Python backend that interacts with the AI model and a TypeScript-based VS Code extension.

### Prerequisites

Ensure you have the following software installed on your system:

*   **Node.js & npm:** For building and running the VS Code extension.
    *   LTS version recommended. You can download it from [nodejs.org](https://nodejs.org/).
    *   Verify installation:
        *   bash
        *   `node -v`
        *   `npm -v`
*   **Python 3.8+ & pip:** For the AI backend.
    *   Download from [python.org](https://www.python.org/).
    *   Verify installation:
        *   bash
        *   `python3 -V`
        *   `pip3 -V`
*   **Visual Studio Code:** The editor for which this extension is developed.
    *   Download from [code.visualstudio.com](https://code.visualstudio.com/).
*   **Google Gemini API Key:** Parroty uses the Google Gemini API.
    *   Obtain a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation

1.  **Clone the repository:**
    1.   `git clone https://github.com/DouglasC2627/parroty.git`
    2.   `cd parroty`
2.  **Run the setup script:**
    *   The project includes a `setup.sh` script to automate the installation of dependencies for both the backend and the extension.
    1.   `chmod +x setup.sh`
    2.   `./setup.sh`: This script will attempt to set up a Python virtual environment for the backend and install Node.js dependencies for the extension.

3.  **Manual Installation (if `setup.sh` fails or for detailed control):**

    *   **Backend Setup:**
        *   Navigate to the `backend` directory, create a virtual environment, activate it, and install Python dependencies:
            1.   `cd backend`
            2.   `python3 -m venv venv`
            3.   `source venv/bin/activate` # On Windows, use `.\venv\Scripts\activate`
            4.   `pip install -r requirements.txt`
            5.   `cd ..` # Go back to the root directory
    *   **VS Code Extension Setup:**
        *   Navigate to the `extension` directory and install Node.js dependencies:
            1.   `cd extension`
            2.   `npm install`
            3.   `npm run compile` # This builds the extension's JavaScript files
            4.   `cd ..` # Go back to the root directory
        
## Usage

Once installed, you can launch and use the Parroty extension within VS Code.

1.  **Open the Project in VS Code:**
    Open the root `parroty` folder in Visual Studio Code.

2.  **Configure Gemini API Key:**
    The extension requires your Google Gemini API key to function.
    *   Open VS Code Settings (`File > Preferences > Settings` or `Code > Preferences > Settings` on macOS, or `Ctrl+,` / `Cmd+,`).
    *   Search for "Parroty".
    *   Locate the `Parroty: Gemini Api Key` setting and paste your Google Gemini API key into the input field.

3.  **Run the Extension (for development):**
    If you are running from source for development:
    *   Go to the Run and Debug view (`Ctrl+Shift+D` or `Cmd+Shift+D`).
    *   Select "Run Extension" from the dropdown at the top.
    *   Click the green play button. This will launch a new VS Code window (Extension Development Host) with the Parroty extension activated.

4.  **Using the AI Documentation Assistant:**

    *   **Generate Comment:**
        1.  Select a block of code (function, class, or a few lines) in your active editor.
        2.  Right-click on the selection.
        3.  Choose "Parroty > Generate Comment" from the context menu.
        4.  The AI will generate a comment or a brief explanation for the selected code.

    *   **Generate Docstring:**
        1.  Place your cursor inside a function or class definition.
        2.  Right-click.
        3.  Choose "Parroty > Generate Docstring".
        4.  The AI will attempt to generate a suitable docstring for the selected code element.

    *   **Generate `README.md`:**
        1.  Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
        2.  Type "Parroty" and select "Parroty > Generate README.md".
        3.  The extension will analyze your open project and generate a draft `README.md` file based on its understanding of the project structure and content. This will be created in your project's root directory.

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
