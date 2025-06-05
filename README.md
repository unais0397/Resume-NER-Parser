# Resume NER Application 📄🤖

A powerful full-stack web application that leverages AI-powered Named Entity Recognition (NER) to intelligently extract structured information from PDF resumes. Built with a modern React frontend and robust Flask backend.


## ✨ Features

### 🔐 **Authentication & Security**
- **User Registration & Login** with email verification system
- **JWT-based authentication** for secure API access
- **Password hashing** using bcrypt encryption
- **Email verification** with time-limited verification codes
- **Protected routes** with role-based access control

### 📄 **Resume Processing**
- **PDF Upload** with drag-and-drop interface
- **AI-powered entity extraction** using custom-trained PyTorch NER model
- **Real-time processing** with progress indicators and status updates
- **Resume storage** with metadata in PostgreSQL database
- **File validation** with size limits and format checking

### 🎯 **Entity Extraction Capabilities**
- **Personal Information**: Name, email, phone number, address
- **Education**: Degrees, institutions, graduation dates, GPA
- **Work Experience**: Companies, job titles, employment dates, descriptions
- **Skills**: Technical skills, programming languages, soft skills
- **Certifications**: Professional certifications and licenses
- **Projects**: Project names, technologies used, descriptions

### 💻 **User Interface**
- **Modern React UI** with Material-UI (MUI) components
- **Responsive design** optimized for all device sizes
- **Professional theme** with consistent styling
- **PDF viewer** for uploaded documents
- **Interactive dashboards** for extracted data visualization
- **Real-time feedback** and error handling

## 🛠️ Technology Stack

### **Frontend**
- **React 18.2.0** - Modern UI framework with hooks
- **Material-UI (MUI) 5.15.10** - Comprehensive component library
- **React Router Dom 6.22.1** - Client-side routing
- **Axios 1.6.7** - HTTP client for API communication
- **React PDF 7.1.2** - PDF viewing and rendering
- **UUID 11.1.0** - Unique identifier generation
- **Emotion React/Styled** - CSS-in-JS styling

### **Backend**
- **Flask 3.1.1** - Lightweight and flexible web framework
- **SQLAlchemy 3.1.1** - Powerful ORM for database operations
- **PostgreSQL** - Robust relational database
- **Flask-JWT-Extended 4.6.0** - JWT authentication
- **Flask-Mail 0.10.0** - Email service integration
- **Flask-CORS 6.0.0** - Cross-origin resource sharing
- **bcrypt 4.2.1** - Password hashing and security

### **AI/Machine Learning**
- **PyTorch 2.7.0** - Deep learning framework
- **Transformers 4.52.3** - Pre-trained language models
- **Custom NER Model** - Specialized for resume entity extraction
- **PDFMiner.six** - PDF text extraction and processing
- **Unidecode 1.4.0** - Text normalization

## 📁 Project Architecture

```
resume-ner-application/
├── 📁 backend/                           # Flask API Server
│   ├── 🎯 main.py                       # Application entry point
│   ├── ⚙️ config.py                     # Configuration settings
│   ├── 🗄️ models.py                     # Database models (User, Resume, VerificationCode)
│   ├── 🔐 auth_routes.py                # Authentication endpoints
│   ├── 📄 resume_routes.py              # Resume processing endpoints
│   ├── 📧 email_service.py              # Email verification service
│   ├── 🤖 ner_model.py                  # AI model for entity extraction
│   ├── ⛏️ minegold.py                   # PDF processing utilities
│   ├── 🔧 setup_database.py             # Database initialization
│   ├── 📋 requirements.txt              # Python dependencies
│   ├── 📝 env_example.txt               # Environment variables template
│   └── 🧠 compressed_resume_ner_model_v2.pt  # Trained AI model (208MB)
├── 📁 frontend/                          # React Web Application
│   ├── 📁 public/                       # Static assets
│   │   ├── 📄 index.html               # Main HTML template
│   │   ├── 📱 manifest.json            # PWA manifest
│   │   └── 🤖 robots.txt               # SEO configuration
│   ├── 📁 src/                          # Source code
│   │   ├── 📁 components/              # React components
│   │   │   ├── 🔐 Login.js             # User login component
│   │   │   ├── ✍️ Signup.js             # User registration component
│   │   │   ├── 📧 EmailVerification.js  # Email verification component
│   │   │   ├── 📤 ResumeUpload.js       # File upload component
│   │   │   ├── 📊 ResumeDetails.js      # Resume data display
│   │   │   ├── 🏗️ Layout.js             # Main layout wrapper
│   │   │   ├── 📋 Sidebar.js            # Navigation sidebar
│   │   │   └── 🛡️ ProtectedRoute.js     # Route protection
│   │   ├── 📁 pages/                   # Page components
│   │   │   ├── 🏠 HomePage.js          # Dashboard page
│   │   │   ├── 📄 ResumePage.js        # Individual resume view
│   │   │   └── ❌ NotFoundPage.js      # 404 error page
│   │   ├── 📁 services/                # API services
│   │   │   ├── 🔐 authApi.js           # Authentication API calls
│   │   │   ├── 📄 resumeApi.js         # Resume API calls
│   │   │   ├── 💾 storage.js           # Local storage utilities
│   │   │   └── 🌐 api.js               # Base API configuration
│   │   ├── 🎨 App.js                   # Main React component
│   │   ├── 🎯 index.js                 # Application entry point
│   │   ├── 🎨 index.css                # Global styles
│   │   └── ⚙️ setupProxy.js            # Development proxy configuration
│   └── 📦 package.json                 # Node.js dependencies
└── 📖 README.md                        # Project documentation
```

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** 16+ and npm
- **Python** 3.8+ and pip
- **PostgreSQL** 12+
- **Git**

### 1. 📥 Clone Repository
```bash
git clone https://github.com/yourusername/resume-ner-application.git
cd resume-ner-application
```

### 2. 🗄️ Database Setup
```sql
-- Connect to PostgreSQL and create database
CREATE DATABASE resume_ner_db;
CREATE USER resume_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE resume_ner_db TO resume_user;
```

### 3. ⚙️ Backend Configuration

#### Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

#### Environment Setup
```bash
# Copy environment template
cp env_example.txt .env

# Edit .env with your settings
nano .env
```

**Required Environment Variables:**
```env
# Database Configuration
DATABASE_URL=postgresql://resume_user:your_password@localhost:5432/resume_ner_db

# JWT Secret (Generate a secure random string)
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this-in-production-xyz123

# Email Configuration (Gmail)
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USE_SSL=False
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-gmail-app-password
MAIL_DEFAULT_SENDER=your-email@gmail.com
```

#### Initialize Database
```bash
python setup_database.py
```

#### Launch Backend Server
```bash
python main.py
```
🎉 **Backend running at:** `http://localhost:8002`

### 4. 🎨 Frontend Setup

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Launch Development Server
```bash
npm start
```
🎉 **Frontend running at:** `http://localhost:3000`

## 📧 Email Configuration Guide

### Gmail Setup (Recommended)
1. **Enable 2-Factor Authentication** on your Google account
2. **Generate App Password:**
   - Go to Google Account Settings → Security
   - Select "App passwords" under 2-step verification
   - Generate password for "Mail"
3. **Use App Password** in `MAIL_PASSWORD` environment variable

### Alternative Email Providers
```env
# Outlook/Hotmail
MAIL_SERVER=smtp-mail.outlook.com
MAIL_PORT=587

# Yahoo
MAIL_SERVER=smtp.mail.yahoo.com
MAIL_PORT=587

# Custom SMTP
MAIL_SERVER=mail.yourdomain.com
MAIL_PORT=587
```

## 🔌 API Reference

### 🔐 Authentication Endpoints

#### User Registration
```http
POST /auth/register
Content-Type: application/json

{
  "full_name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "status": 201,
  "message": "User registered successfully",
  "user_id": "uuid-here"
}
```

#### User Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "status": 200,
  "message": "Login successful",
  "access_token": "jwt-token-here",
  "user": {
    "id": "uuid",
    "email": "john.doe@example.com",
    "full_name": "John Doe",
    "is_verified": true
  }
}
```

#### Email Verification
```http
POST /auth/verify-email
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "code": "123456"
}
```

### 📄 Resume Processing Endpoints

#### Upload & Process Resume
```http
POST /minedata
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

{
  "file": <pdf_file>
}
```

**Response:**
```json
{
  "status": 200,
  "message": "Success",
  "resume_id": "uuid-here",
  "entities": {
    "personal_info": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1-234-567-8900"
    },
    "education": [
      {
        "degree": "Bachelor of Science",
        "institution": "University of Technology",
        "graduation_date": "2023"
      }
    ],
    "experience": [
      {
        "company": "Tech Corp",
        "position": "Software Engineer",
        "duration": "2020-2023"
      }
    ],
    "skills": ["Python", "React", "PostgreSQL", "AI/ML"]
  }
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

## 🎯 Usage Workflow

1. **🔐 Register Account** → Provide name, email, and secure password
2. **📧 Verify Email** → Enter 6-digit code sent to your email
3. **🔑 Login** → Access the main dashboard
4. **📤 Upload Resume** → Drag & drop or select PDF file
5. **⏳ Processing** → AI extracts entities in real-time
6. **📊 View Results** → Review extracted information
7. **💾 Save/Export** → Store data or export in various formats

## 🧪 Testing

### Backend Testing
```bash
cd backend
# Install test dependencies
pip install pytest pytest-cov

# Run tests
python -m pytest tests/ -v
python -m pytest tests/ --cov=. --cov-report=html
```

### Frontend Testing
```bash
cd frontend
# Run unit tests
npm test

# Run tests with coverage
npm test -- --coverage --watchAll=false
```

## 🚀 Deployment

### 🐳 Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build

# Production deployment
docker-compose -f docker-compose.prod.yml up -d
```

### ☁️ Cloud Deployment

#### Backend (Heroku)
```bash
# Install Heroku CLI and login
heroku login

# Create app and add PostgreSQL
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_SECRET_KEY=your-secret-key
heroku config:set MAIL_USERNAME=your-email@gmail.com
heroku config:set MAIL_PASSWORD=your-app-password

# Deploy
git push heroku main
```

#### Frontend (Vercel/Netlify)
```bash
# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod

# Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Setup
1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/yourusername/resume-ner-application.git`
3. **Create branch**: `git checkout -b feature/amazing-feature`
4. **Make changes** and add tests
5. **Commit**: `git commit -m 'Add amazing feature'`
6. **Push**: `git push origin feature/amazing-feature`
7. **Create Pull Request**

### Code Standards
- **Python**: Follow PEP 8, use type hints
- **JavaScript**: Use ESLint, Prettier formatting
- **Git**: Conventional commit messages
- **Testing**: Maintain >80% code coverage

## 🐛 Troubleshooting

### Common Issues & Solutions

#### ❌ Database Connection Error
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Reset connection
sudo systemctl restart postgresql

# Verify connection
psql -h localhost -U resume_user -d resume_ner_db
```

#### ❌ Email Not Sending
- ✅ Verify Gmail 2FA is enabled
- ✅ Use App Password, not regular password
- ✅ Check firewall/antivirus blocking SMTP
- ✅ Verify MAIL_SERVER and MAIL_PORT settings

#### ❌ AI Model Loading Error
```bash
# Check model file exists and size
ls -lh backend/compressed_resume_ner_model_v2.pt

# Should be ~208MB. If missing, re-download or train model
```

#### ❌ Frontend Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### ❌ CORS Errors
- ✅ Verify Flask-CORS is installed
- ✅ Check backend is running on correct port (8002)
- ✅ Update frontend proxy configuration

## 📊 Performance Optimization

### Backend Optimizations
- **Database Indexing**: Add indexes on frequently queried fields
- **Caching**: Implement Redis for session management
- **File Storage**: Use cloud storage (S3, Google Cloud) for PDFs
- **Load Balancing**: Use Gunicorn with multiple workers

### Frontend Optimizations
- **Code Splitting**: Implement React.lazy() for route-based splitting
- **Memoization**: Use React.memo() and useMemo() for expensive components
- **Bundle Analysis**: Run `npm run build --analyze` to optimize bundle size
- **CDN**: Serve static assets via CDN

## 🔒 Security Considerations

### Backend Security
- **Environment Variables**: Never commit .env files
- **JWT Expiration**: Set appropriate token expiration times
- **Rate Limiting**: Implement API rate limiting
- **Input Validation**: Validate all user inputs
- **HTTPS**: Use SSL certificates in production

### Frontend Security
- **XSS Prevention**: Sanitize user inputs
- **CSRF Protection**: Implement CSRF tokens
- **Secure Storage**: Use secure methods for token storage
- **Content Security Policy**: Implement CSP headers

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

- **Your Name** - *Initial Development* - [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- **PyTorch Team** - Deep learning framework
- **Material-UI** - React component library
- **Flask Community** - Web framework
- **Transformers** - NLP model library
- **Open Source Community** - Various dependencies and tools

## 📞 Support & Contact

### 🆘 Get Help
- **📖 Documentation**: Check this README and inline code comments
- **🐛 Issues**: [Create an issue](https://github.com/yourusername/resume-ner-application/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/yourusername/resume-ner-application/discussions)
- **📧 Email**: your-email@example.com

### 🌟 Show Your Support
Give a ⭐️ if this project helped you!

[![GitHub stars](https://img.shields.io/github/stars/yourusername/resume-ner-application?style=social)](https://github.com/yourusername/resume-ner-application/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/resume-ner-application?style=social)](https://github.com/yourusername/resume-ner-application/network/members)

---

**Made with ❤️ by developers, for developers** 🚀 