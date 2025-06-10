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
- **Transformers 4.52.3** - HuggingFace transformers library
- **BERT-base-uncased** - Pre-trained foundation model
- **Custom Fine-tuned NER Model** - Resume-specific entity extraction
- **PDFMiner.six** - PDF text extraction and processing
- **Unidecode 1.4.0** - Text normalization
- **seqeval** - Sequence evaluation metrics for NER

## 🧠 AI Model Architecture & Training

### **Custom BERT Fine-tuning for Resume NER**

Our application uses a **fine-tuned BERT model** specifically trained on resume data to extract structured information. The model is based on `bert-base-uncased` and fine-tuned using a comprehensive dataset of 430 annotated resumes.

#### **📊 Model Training Details**

| **Aspect** | **Details** |
|------------|-------------|
| **Base Model** | `bert-base-uncased` (110M parameters) |
| **Training Data** | 430 annotated resume samples |
| **Entity Types** | 8 classes: NAME, EMAIL, PHONE, SKILLS, COMPANY, DESIGNATION, DEGREE, COLLEGE NAME, LOCATION |
| **Sequence Length** | 256 tokens (optimized for resume content) |
| **Training Split** | 70% train, 15% validation, 15% test |
| **Batch Size** | 8 (optimized for memory efficiency) |
| **Learning Rate** | 1e-5 (with linear warmup) |
| **Training Epochs** | Up to 100 (with early stopping) |
| **Final Model Size** | 208MB (compressed with mixed precision) |

#### **🏷️ BIO Tagging Schema**

The model uses **BIO (Beginning-Inside-Outside)** tagging for sequence labeling:

```
B-ENTITY: Beginning of an entity
I-ENTITY: Inside/continuation of an entity  
O: Outside (non-entity token)
```

**Example:**
```
John Smith works at Google Inc.
B-NAME I-NAME O O B-COMPANY I-COMPANY
```

#### **📈 Model Performance Metrics**

**Final Test Results:**
- **Token-level Accuracy:** 96.15%
- **Entity-level Precision:** 75.96%
- **Entity-level Recall:** 84.99%
- **Entity-level F1-Score:** 80.22%

**Per-Entity Performance:**
| **Entity Type** | **Precision** | **Recall** | **F1-Score** | **Support** |
|-----------------|---------------|------------|--------------|-------------|
| **NAME** | 94.20% | 98.48% | 96.30% | 66 |
| **EMAIL** | 87.30% | 98.21% | 92.44% | 56 |
| **LOCATION** | 82.61% | 93.83% | 87.86% | 81 |
| **DESIGNATION** | 79.20% | 84.62% | 81.82% | 117 |
| **DEGREE** | 70.83% | 85.00% | 77.27% | 20 |
| **COMPANY** | 68.33% | 73.21% | 70.69% | 112 |
| **COLLEGE NAME** | 57.14% | 74.07% | 64.52% | 27 |
| **SKILLS** | 47.83% | 64.71% | 55.00% | 34 |

#### **🔧 Training Process**

1. **Data Preprocessing:**
   - Text normalization and cleaning
   - BIO format conversion
   - Stratified train/validation/test splits
   - Token alignment with word boundaries

2. **Model Architecture:**
   - Base: BERT-base-uncased (12 layers, 768 hidden size)
   - Added classification head for token classification
   - 17 output labels (8 entities × 2 BIO tags + 1 O tag)

3. **Training Configuration:**
   ```python
   # Training hyperparameters
   BATCH_SIZE = 8
   MAX_LEN = 256
   LEARNING_RATE = 1e-5
   EPOCHS = 100
   WARMUP_STEPS = 500
   WEIGHT_DECAY = 0.01
   ```

4. **Optimization Techniques:**
   - **Early Stopping:** Prevents overfitting (patience=7)
   - **Learning Rate Scheduling:** Linear warmup + decay
   - **Mixed Precision Training:** Reduces memory usage
   - **Model Compression:** FP16 precision for deployment

5. **Evaluation Strategy:**
   - Token-level accuracy for sequence labeling
   - Entity-level precision, recall, F1 using `seqeval`
   - Stratified validation to handle class imbalance

#### **💾 Model Deployment**

The trained model is compressed using **mixed precision (FP16)** to reduce size from ~440MB to ~208MB while maintaining performance:


```

#### **🎯 Entity Extraction Pipeline**

1. **PDF Processing:** Extract raw text using PDFMiner
2. **Text Cleaning:** Remove noise, normalize encoding
3. **Tokenization:** BERT tokenizer with proper alignment
4. **Inference:** Forward pass through fine-tuned model
5. **Post-processing:** Convert predictions to entities
6. **Grouping:** Combine B- and I- tags into complete entities
7. **Deduplication:** Remove duplicate entities

#### **🔬 Training Notebook**

The complete training process is documented in `backend/Bert_Fine_Tunning.ipynb`, including:
- Data exploration and preprocessing
- Model architecture setup
- Training loop with validation
- Performance evaluation
- Model compression and export

**Key Features:**
- Comprehensive data analysis with label distribution
- Stratified splitting to handle class imbalance
- Real-time training metrics and visualization
- Entity-level evaluation using seqeval
- Model checkpointing and early stopping

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

```

Thank You