import os
import google.generativeai as genai
from dotenv import load_dotenv
import sys
import argparse
import re

load_dotenv() # For local development convenience

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("Error: GEMINI_API_KEY environment variable not set.", file=sys.stderr)
    sys.exit(1)

genai.configure(api_key=api_key)
try:
    MODEL = genai.GenerativeModel("gemini-2.5-flash")
except Exception as e:
    print(f"Error creating GenerativeModel: {e}", file=sys.stderr)
    MODEL = None
    sys.exit(1)


def generate_comment(code_snippet: str) -> str:
    """
    Generates a comment for a given code snippet.

    Args:
        code_snippet: The code snippet to generate a comment for.

    Returns:
        The generated comment.
    """
    summarization_prompt = f"""
        You are an expert programmer writing documentation. Your task is to write a concise, one-line summary for the given Python code.

        **Instructions:**
        1.  Analyze the code to understand its primary function.
        2.  Summarize what the code *does* in a single, clear sentence.
        3.  Do NOT explain *how* the code works.
        4.  Only output the summary sentence itself, with no extra text, explanations, or quotation marks.

        **Code Snippet to summarize:**
        \n```\n{code_snippet}\n```\n    """

    if not MODEL:
        return "Error: Model not initialized."
    try:
        response = MODEL.generate_content(summarization_prompt)
        # wrap response into comment.
        return f'#{response.text.strip()}'
    except Exception as e:
        return f"Error generating comment: {e}"

def generate_docstring(code_snippet: str) -> str:
    """
    Generates a docstring for a given code snippet.

    Args:
        code_snippet: The code snippet to generate a docstring for.

    Returns:
        The generated docstring.
    """
    docstring_prompt = f"""
        You are an expert programmer writing documentation. Your task is to write a Python docstring for the given code snippet.

        **Instructions:**
        1.  Analyze the code to understand its purpose, arguments, and what it returns.
        2.  Write a concise one-line summary of the function's purpose.
        3.  Document each argument under an `Args:` section, explaining what it is.
        4.  Document the return value under a `Returns:` section, explaining what is returned.
        5.  The output should be only the content, with no extra text, explanations, or quotation marks.

        **Code Snippet to summarize:**
        \n```\n{code_snippet}\n```\n    """

    if not MODEL:
        return "Error: Model not initialized."
    try:
        response = MODEL.generate_content(docstring_prompt)
        # wrap response into docstring.
        content = response.text.strip()
        if "\n" in content:
            # For multi-line docstrings, PEP 257 says the closing quotes should be on their own line.
            return f'"""{content}\n"""'
        else:
            # For one-line docstrings.
            return f'"""{content}"""'
    except Exception as e:
        return f"Error generating docstring: {e}"


def clean_markdown_response(text: str) -> str:
    """
    Removes markdown code block delimiters from the response.
    
    Args:
        text: The raw text that might contain markdown code blocks
        
    Returns:
        Cleaned text without code block delimiters
    """
    # Remove ```markdown or ``` at the start
    text = re.sub(r'^```(?:markdown)?\s*\n?', '', text.strip())
    # Remove ``` at the end
    text = re.sub(r'\n?```\s*\n?', '', text)
    return text.strip()


def generate_readme(project_structure: str, file_contents: str) -> str:
    """Generates a README.md file for a given project structure and file contents.

    Args:
        project_structure: The project structure to generate a README.md file for.
        file_contents: The file contents to generate a README.md file for.

    Returns:
        The generated README.md file.
    """
    readme_prompt = f"""
        You are an expert technical writer tasked with creating a high-quality `README.md` file for a software project.

        **Instructions:**
        1.  Analyze the provided project structure and file contents to understand the project's purpose, technologies, and setup.
        2.  Generate a complete `README.md` file using Markdown.
        3.  The README should be professional, well-structured, and easy for new developers to understand.
        4.  Use the information from the file contents (e.g., `package.json`, `requirements.txt`) to infer project dependencies and setup instructions.

        **README.md Structure:**
        *   **# Project Title:** A clear and concise title for the project.
        *   **## About The Project:** A brief, one-paragraph description of what the project does and its main purpose.
        *   **## Getting Started:** Instructions on how to get a local copy of the project up and running.
            *   **### Prerequisites:** List any software or dependencies that need to be installed (e.g., Node.js, Python). Include the commands to install them.
            *   **### Installation:** Step-by-step instructions on how to install the project's dependencies (e.g., `npm install`, `pip install -r requirements.txt`).
        *   **## Usage:** Provide examples of how to use the application or its features. If it's a library, show code examples. If it's a web app, explain how to start the server.
        *   **## Contributing:** (Optional) Briefly mention how others can contribute to the project. You can include a template message like: "Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**."

        **Project Information:**

        **Project Structure:**
        ```
        {project_structure}
        ```

        **Key File Contents:**
        ```
        {file_contents}
        ```

        **Generate the `README.md` file now.**
    """

    if not MODEL:
        return "Error: Model not initialized."
    try:
        response = MODEL.generate_content(readme_prompt)
        cleaned_response = clean_markdown_response(response.text)
        return cleaned_response
    except Exception as e:
        return f"Error generating README: {e}"


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Parroty AI Documentation Assistant")
    parser.add_argument('command', nargs='?', help="The command to execute: 'comment', 'docstring', or 'readme'.")
    parser.add_argument('args', nargs='*', help="Arguments for the command.")

    parsed_args = parser.parse_args()

    if parsed_args.command == "comment":
        if len(parsed_args.args) < 1:
            print("Error: 'comment' command requires a code snippet.", file=sys.stderr)
            sys.exit(1)
        code_snippet = parsed_args.args[0]
        comment = generate_comment(code_snippet)
        print(comment)
    elif parsed_args.command == "docstring":
        if len(parsed_args.args) < 1:
            print("Error: 'docstring' command requires a code snippet.", file=sys.stderr)
            sys.exit(1)
        code_snippet = parsed_args.args[0]
        docstring = generate_docstring(code_snippet)
        print(docstring)
    elif parsed_args.command == "readme":
        if len(parsed_args.args) < 2:
            print("Error: 'readme' command requires project structure and file contents.", file=sys.stderr)
            sys.exit(1)
        project_structure = parsed_args.args[0]
        file_contents = parsed_args.args[1]
        readme = generate_readme(project_structure, file_contents)
        print(readme)
    elif parsed_args.command is None:
        print("Hello from Python!")
    else:
        print(f"Invalid command: {parsed_args.command}. Available commands: comment, docstring, readme", file=sys.stderr)
        sys.exit(1)
