# Create virtual environment
python3 -m venv virtual

# Activate environment (UNIX)
(UNIX) source virtual/bin/activate

# Install required packages
pip install -r requirements.txt

# Run
python3 price_service.py