import json
import re
from typing import Dict, Any
from app.schemas.analysis import AIAnalysisOutput
from app.core.exceptions import AIModelException

class ResponseParser:
    @staticmethod
    def parse_and_validate(raw_text: str) -> AIAnalysisOutput:
        clean_text = raw_text.strip()
        
        # Remove markdown code blocks if present
        if "```" in clean_text:
            json_match = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", clean_text, re.DOTALL)
            if json_match:
                clean_text = json_match.group(1)
            else:
                clean_text = re.sub(r"```[a-z]*", "", clean_text).replace("```", "").strip()

        try:
            data = json.loads(clean_text)
            return AIAnalysisOutput.model_validate(data)
        except Exception as e:
            raise AIModelException(f"Failed to parse and validate AI response JSON: {str(e)}")

parser = ResponseParser()
