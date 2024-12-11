import requests
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


# Add this middleware to allow your frontend to connect
app.add_middleware(
    CORSMiddleware,
    #allow_origins=["http://10.147.17.216"]
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def home():
    return {"Chat": "Bot"}

@app.get('/ask')
def ask(prompt: str):
    print("teste")
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

