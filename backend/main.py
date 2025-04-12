from fastapi import FastAPI #to build your backend
from fastapi.middleware.cors import CORSMiddleware #to allow the frontend to talk to the backend (even from a different domain/IP)
from pydantic import BaseModel #to define what kind of data we expect in the form
import json #to read and write the form submissions
import os #to check if a file exists (submission.json)



app = FastAPI() #This creates your app — it’s the engine that powers all the endpoints.

# Middleware to allow frontend to connect (CORS)
# #This tells FastAPI:
#“Hey, accept requests from anywhere — JS frontend, browser, Postman, etc.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Defining the Contact class
#This is the structure of the data we expect in the form. When someone sends a POST request to /submit, FastAPI automatically:
#Checks if all fields are correct
#Validates the types (e.g. name must be a string)
#Converts the input into a Python object we can use
#This is like a model, and BaseModel makes this automatic.
class Contact(BaseModel):
    name: str
    email: str
    phone: str
    website: str
    message: str
#Create the POST endpoint
@app.post("/submit")
#When someone sends a POST request to /submit with a form 
#that matches the Contact structure → run this function.
def receive_form(contact: Contact):
    new_data = contact.model_dump()  # convert to dictionary

    if os.path.exists("submission.json"): #Check if the file already exists
        with open("submission.json", "r") as f: #If yes: load old data
            data = json.load(f)
    else:
        data = [] #If no: start with an empty list

    data.append(new_data)#Add the new form to the list

    with open("submission.json", "w") as f: #Save it back into the file
        json.dump(data, f, indent=2)

    return {"message": "Form submitted successfully"} #Return a message to the frontend/browser
   