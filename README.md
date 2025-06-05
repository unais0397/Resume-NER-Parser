# Resume NER Application 📄🤖

A full-stack web application that uses AI-powered Named Entity Recognition (NER) to extract structured information from PDF resumes. Built with React frontend and Flask backend.

![Resume NER Demo](https://img.shields.io/badge/Status-Active-brightgreen) ![React](https://img.shields.io/badge/React-18.2.0-blue) ![Flask](https://img.shields.io/badge/Flask-3.1.1-green) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)

## 🚀 Features

### 🔐 Authentication & Security
- **User Registration & Login** with email verification
- **JWT-based authentication** for secure API access
- **Password hashing** using bcrypt
- **Email verification** system with timed codes

### 📄 Resume Processing
- **PDF Upload** with drag-and-drop interface
- **AI-powered entity extraction** using PyTorch NER model
- **Real-time processing** with progress indicators
- **Resume storage** with metadata in PostgreSQL

### 🎯 Entity Extraction
- **Personal Information**: Name, email, phone, address
- **Education**: Degrees, institutions, graduation dates
- **Work Experience**: Companies, positions, dates
- **Skills**: Technical and soft skills
- **Certifications**: Professional certifications and licenses

### 💻 User Interface
- **Modern React UI** with Material-UI components
- **Responsive design** for all devices
- **Dark/Light theme** support
- **PDF viewer** for uploaded documents
- **Interactive dashboards** for extracted data

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - UI framework
- **Material-UI (MUI)** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React PDF** - PDF viewing
- **UUID** - Unique identifiers

### Backend
- **Flask 3.1.1** - Web framework
- **SQLAlchemy** - ORM
- **PostgreSQL** - Database
- **JWT Extended** - Authentication
- **Flask-Mail** - Email service
- **PyTorch** - AI/ML framework
- **Transformers** - NER model
- **PDFMiner** - PDF text extraction

### AI/ML
- **Custom NER Model** - Trained for resume entity extraction
- **PyTorch** - Deep learning framework
- **Transformers** - Pre-trained language models

## 📁 Project Structure

```
Final-White/
├── backend/
│   ├── main.py                 # Flask application entry point
│   ├── config.py              # Configuration settings
│   ├── models.py              # Database models
│   ├── auth_routes.py         # Authentication endpoints
│   ├── resume_routes.py       # Resume processing endpoints
│   ├── email_service.py       # Email verification service
│   ├── ner_model.py           # AI model for entity extraction
│   ├── minegold.py            # PDF processing utilities
│   ├── setup_database.py     # Database initialization
│   ├── requirements.txt       # Python dependencies
│   └── compressed_resume_ner_model_v2.pt  # AI model file
├── frontend/
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── App.js            # Main React component
│   │   └── index.js          # Entry point
│   ├── package.json          # Node.js dependencies
│   └── .gitignore           # Git ignore rules
└── README.md                 # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (3.8 or higher)
- **PostgreSQL** (12 or higher)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/resume-ner-app.git
cd resume-ner-app
```

### 2. Backend Setup

#### Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

#### Database Configuration
1. Create a PostgreSQL database:
```sql
CREATE DATABASE resume_ner_db;
```

2. Create environment file:
```bash
cp env_example.txt .env
```

3. Update `.env` with your settings:
```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/resume_ner_db

# JWT Secret Key
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (for verification)
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_DEFAULT_SENDER=your-email@gmail.com
```

#### Initialize Database
```bash
python setup_database.py
```

#### Run Backend Server
```bash
python main.py
```
Server will start on `http://localhost:8002`

### 3. Frontend Setup

#### Install Node.js Dependencies
```bash
cd frontend
npm install
```

#### Run Frontend Development Server
```bash
npm start
```
Application will open at `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL=postgresql://username:password@localhost:5432/resume_ner_db
JWT_SECRET_KEY=your-secret-key
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

#### Frontend (optional)
Create `.env` in frontend directory:
```env
REACT_APP_API_URL=http://localhost:8002
```

### Email Configuration
For email verification to work:
1. Enable 2-factor authentication on Gmail
2. Generate an "App Password"
3. Use the app password in `MAIL_PASSWORD`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Verify Email
```http
POST /auth/verify-email
Content-Type: application/json

{
  "email": "john@example.com",
  "code": "123456"
}
```

### Resume Processing

#### Upload and Process Resume
```http
POST /minedata
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

{
  "file": <pdf_file>
}
```

#### Get User Resumes
```http
GET /api/resumes
Authorization: Bearer <jwt_token>
```

#### Get Resume Details
```http
GET /api/resume/<resume_id>
Authorization: Bearer <jwt_token>
```

## 🎯 Usage

1. **Register** a new account with email verification
2. **Login** to access the dashboard
3. **Upload** PDF resumes using the upload interface
4. **View** extracted entities and structured data
5. **Download** processed data in various formats

## 🧪 Testing

### Backend Tests
```bash
cd backend
python -m pytest tests/
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
# Install Heroku CLI
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set JWT_SECRET_KEY=your-secret-key
git push heroku main
```

### Frontend Deployment (Netlify/Vercel)
```bash
npm run build
# Deploy build folder to hosting service
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow **PEP 8** for Python code
- Use **ESLint** for JavaScript/React code
- Write **unit tests** for new features
- Update **documentation** for API changes

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Error
```
Solution: Check PostgreSQL is running and credentials in .env are correct
```

#### Email Verification Not Working
```
Solution: Verify Gmail app password and 2FA settings
```

#### AI Model Loading Error
```
Solution: Ensure compressed_resume_ner_model_v2.pt is in backend directory
```

#### Frontend Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourUsername](https://github.com/yourusername)

## 🙏 Acknowledgments

- **PyTorch** team for the deep learning framework
- **Material-UI** for the beautiful React components
- **Flask** community for the excellent web framework
- **Open source** contributors who made this project possible

## 📞 Support

If you have any questions or issues, please:
1. Check the [Issues](https://github.com/yourusername/resume-ner-app/issues) page
2. Create a new issue with detailed description
3. Contact: your-email@example.com

---

⭐ **Star this repository** if you found it helpful!

![GitHub stars](https://img.shields.io/github/stars/yourusername/resume-ner-app?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/resume-ner-app?style=social) 