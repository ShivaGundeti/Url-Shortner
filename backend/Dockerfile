# 1. Use the official Python image as our base operating system
FROM python:3.10-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy our requirements file into the container
COPY requirements.txt .

# 4. Install our Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of our backend code into the container
RUN apt-get update && apt-get install -y openssl nodejs npm
COPY . .


# 6. [NEW] Install Node.js and OpenSSL (Required by Prisma!)

# 6. Generate the Prisma Client
RUN prisma generate

# 7. Tell Docker what command to run when the container starts
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
