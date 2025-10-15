# 📰 Aadhaar OCR MERN Application - Aadhaaro

This is a MERN stack web application that performs OCR (Optical Character Recognition) on Aadhaar cards. Users can upload images of the **front** and **back** sides of their Aadhaar card. The application processes these images through an API, extracts relevant information, and displays it in a clean and organized format on the frontend.

---

## 🚀 Features

- Built with **ReactJS**.
- Landing page with a **user-friendly interface** for uploading Aadhaar card images (front and back).
- Displays uploaded images immediately on the page.
- Button to **trigger OCR** processing.
- Shows extracted Aadhaar information:
  - Name
  - Aadhaar Number
  - Date of Birth
  - Gender
  - Address
  - Pincode
- Responsive and intuitive UI.
---

### Backend
- Built with **Express.js**.
- Handles image uploads from the frontend.
- Processes images using **OCR library or service**.
- Returns extracted Aadhaar card information as JSON.

## Technologies Used
- **Frontend:** ReactJS, Tailwind CSS 
- **Backend:** Node.js, Express.js
- **OCR:** AWS Textract
- **File Uploads:** Multer file handling middleware
- **Security:** Input sanitization, validation of file types
- **Deployment:** Vercel, Render, or any preferred hosting platform


---

## ⚙️ Setup & Installation

### 1. Clone repositories

```bash
git clone https://github.com/faris-rahman-git/aadhaaro.git
cd ocr
```

### 2. Backend Setup

```bash
cd backend
cp  .env   # Fill in DB, JWT, etc.
npm install
npm run dev
```

Backend runs on http://localhost:5000

### 3. Frontend Setup

```bash
cd frontend
cp .env   # Fill API base URL
npm install
npm run dev
```

Frontend runs on http://localhost:4173

## 🔑 Environment Variables

### 1. Backend (backend/.env)

```bash

PORT=5000
CLIENT_URL=http://localhost:4173
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_REGION=
OPENROUTER_API_KEY=
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1

```

### 1. Frontend (frontend/.env)

```bash

VITE_BASE_API=http://localhost:5000/api
```

## 📦 Build & Deployment

### 1. Backend

```bash

cd backend
npm run build
npm start
```

Deploy on Heroku, Render, or Docker.

### 1. Frontend

```bash

cd frontend
npm run build
npm run preview
```

Deploy on Vercel, Netlify, or any static host.

## Usage

1. Open the application in a browser (http://localhost:4173)..
2. Upload the front and back images of the Aadhaar card.
3. Click Scan / Process to extract text.
4. View the extracted details on the same page.

## Error Handling

- Ensures both images are uploaded before processing.
- Validates image types (e.g., JPEG, PNG).
- Provides user feedback if OCR fails or files are invalid.
- Optional: Checks that front and back images belong to the same Aadhaar card.

## Deployment

- Deploy the frontend and backend using your preferred hosting platform.
- Ensure backend API URL is correctly set in the frontend .env.
- Test image upload and OCR functionality on the live environment.

## 👨‍💻 Author

**Faris Rahman**  
📧 [farisrahman786687@gmail.com](mailto:farisrahman786687@gmail.com)
