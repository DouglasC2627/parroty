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

    summarization_prompt = f"""
        You are an expert programmer writing documentation. Your task is to write a concise, one-line summary docstring for the given Python code.

        **Instructions:**
        1.  Analyze the code to understand its primary function.
        2.  Summarize what the code *does* in a single, clear sentence.
        3.  Enclose the summary in triple quotes like this: \"\"\"This is a docstring.\"\"\"
        4.  Do NOT explain *how* the code works.
        5.  Only output the docstring itself, with no extra text or explanations.

        **Code Snippet to summarize into comments:**
        \n```\n{code_snippet}\n```\n
        {code_snippet} 
    """

    response = model.generate_content(prompt=summarization_prompt)
    return response.text
