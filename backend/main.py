import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

def generate_comment(code_snippet: str) -> str:
    """
    Generates a comment for a given code snippet.

    Args:
        code_snippet: The code snippet to generate a comment for.

    Returns:
        The generated comment.
    """
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content(f"Generate a comment for the following code:\n\n{code_snippet}")
    return response.text
