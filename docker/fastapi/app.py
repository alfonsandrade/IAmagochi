import requests
from fastapi import FastAPI, Response

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

# Add this middleware to allow your frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://10.147.17.216"],  # Update with your actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def home():
    return {"Chat": "Bot"}

@app.get('/ask')
def ask(prompt: str):
    try:
        res = requests.post(
            'http://ollama:11434/api/generate',
            json={
                "prompt": prompt,
                "stream": False,
                "model": "llama3.2"
            }
        )

        # Simplify the response for the frontend
        res_json = res.json()
        chatbot_response = res_json.get("response", "Sorry, I couldn't generate a response.")
        return {"response": chatbot_response}
    except Exception as e:
        print("Error communicating with Ollama:", e)
        return {"error": "Could not connect to Ollama."}, 500

