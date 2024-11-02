@echo off
setlocal

echo Installing root dependencies...
npm install

echo Installing frontend dependencies...
cd frontend
npm install

echo Installing backend dependencies...
cd ../backend
npm install

echo Setting up predictions (Flask)...
cd ../predictions
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)
echo Activating virtual environment...
venv\Scripts\activate
pip install -r requirements.txt

echo All dependencies installed.
