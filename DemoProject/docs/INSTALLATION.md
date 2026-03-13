# EventHub - Installation & Setup Guide

Complete step-by-step guide to set up EventHub locally for development.

## 📋 Prerequisites

Before you begin, ensure you have:

- **Python 3.8+** - [Download Python](https://www.python.org/downloads/)
- **pip** - Comes with Python
- **Git** - [Download Git](https://git-scm.com/)
- **Text Editor/IDE** - VS Code, PyCharm, etc.

### Verify Installations
```bash
python --version      # Should be 3.8 or higher
pip --version         # Should be 20.0 or higher
git --version         # Should be 2.x
```

## 🚀 Installation Steps

### Step 1: Clone the Repository

**Using HTTPS:**
```bash
git clone https://github.com/yourusername/eventhub-django.git
cd eventhub-django
```

**Using SSH (if configured):**
```bash
git clone git@github.com:yourusername/eventhub-django.git
cd eventhub-django
```

### Step 2: Create Virtual Environment

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

You should see `(venv)` prefix in your terminal.

### Step 3: Install Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

Verify installation:
```bash
pip list
```

### Step 4: Configure Environment

Copy the example environment file:
```bash
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

Edit `.env` with your settings:
```env
DEBUG=True
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Step 5: Setup Database

**Run migrations:**
```bash
python manage.py migrate
```

**Create superuser (admin account):**
```bash
python manage.py createsuperuser
```

Follow prompts:
```
Username: admin
Email: admin@example.com
Password: ••••••••
```

**Load sample data (optional):**
```bash
python manage.py loaddata sample_data.json
```

### Step 6: Run Development Server

```bash
python manage.py runserver
```

Output:
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

### Step 7: Access the Application

- **Frontend:** http://127.0.0.1:8000/
- **Admin Panel:** http://127.0.0.1:8000/admin/
  - Username: admin
  - Password: (created in Step 5)

## 🎯 First Time Setup Checklist

- [ ] Python installed and verified
- [ ] Repository cloned
- [ ] Virtual environment created and activated
- [ ] Dependencies installed (`pip list` shows packages)
- [ ] `.env` file created and configured
- [ ] Database migrations applied
- [ ] Superuser created
- [ ] Development server running
- [ ] Can access http://127.0.0.1:8000/
- [ ] Can access admin panel with credentials

## 🗂 Project Structure After Setup

```
eventhub-django/
├── .venv/               # Virtual environment (created)
├── DemoProject/         # Main project
├── manage.py
├── requirements.txt
├── .env                 # Created from .env.example
└── ...
```

## 🔍 Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'django'"

**Solution:** Make sure virtual environment is activated
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

# Then install dependencies
pip install -r requirements.txt
```

### Issue: "Port 8000 already in use"

**Solution:** Use a different port
```bash
python manage.py runserver 8001
# or specify IP and port
python manage.py runserver 0.0.0.0:8080
```

### Issue: "No such table: accounts_user"

**Solution:** Migrations haven't been applied
```bash
python manage.py migrate
```

### Issue: "Secret key is insecure"

**Solution:** Generate new secret key
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Copy output and add to `.env`:
```env
SECRET_KEY=your-generated-key-here
```

### Issue: "No matching distribution found for Pillow"

**Solution:** Update pip and try again
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

## 📚 Common Commands

### Run Server
```bash
python manage.py runserver
python manage.py runserver 0.0.0.0:8000    # Accessible from network
```

### Run Tests
```bash
python manage.py test                      # All tests
python manage.py test accounts            # Specific app
python manage.py test accounts.tests.TestUserModel  # Specific test
```

### Database Operations
```bash
python manage.py makemigrations           # Create migrations
python manage.py migrate                  # Apply migrations
python manage.py sqlmigrate accounts 0001 # See SQL
python manage.py showmigrations           # List migrations
```

### Static Files
```bash
python manage.py collectstatic            # Collect static files
python manage.py findstatic static/css/style.css  # Find static file
```

### Django Shell
```bash
python manage.py shell
```

### Create Sample Data
```bash
python manage.py shell
>>> from accounts.models import User
>>> User.objects.create_user(username='test', password='test123')
>>> exit()
```

## 🔐 Database Operations

### Reset Database (Development Only)
```bash
# Delete existing database
rm db.sqlite3  # macOS/Linux
del db.sqlite3 # Windows

# Recreate migrations
python manage.py migrate
python manage.py createsuperuser
```

### Backup Database
```bash
# Windows
copy db.sqlite3 db.sqlite3.backup

# macOS/Linux
cp db.sqlite3 db.sqlite3.backup
```

### Restore Database
```bash
# Windows
copy db.sqlite3.backup db.sqlite3

# macOS/Linux
cp db.sqlite3.backup db.sqlite3
```

## 📦 Dependency Management

### Update All Packages
```bash
pip install --upgrade -r requirements.txt
```

### Add New Package
```bash
# Install
pip install package-name

# Save to requirements.txt
pip freeze > requirements.txt
```

### Remove Package
```bash
# Uninstall
pip uninstall package-name

# Update requirements.txt
pip freeze > requirements.txt
```

## 🧪 Testing

### Run All Tests
```bash
python manage.py test
```

### Run with Coverage
```bash
pip install coverage
coverage run --source='.' manage.py test
coverage report
coverage html  # Creates htmlcov/index.html
```

### Run Specific Tests
```bash
python manage.py test accounts.tests.TestUserRegistration
python manage.py test accounts -v 2  # Verbose output
```

## 🐛 Debug Mode

### Enable Debug Toolbar
```bash
pip install django-debug-toolbar

# Add to settings.py INSTALLED_APPS:
'debug_toolbar',

# Add to backend/urls.py:
if DEBUG:
    import debug_toolbar
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]
```

### Print Database Queries
```python
from django.db import connection
from django.test.utils import CaptureQueriesContext

with CaptureQueriesContext(connection) as context:
    # Your code here
    pass

print(f"Queries: {len(context.captured_queries)}")
for query in context.captured_queries:
    print(query['sql'])
```

## 📝 Next Steps

1. **Review Project Documentation**
   - Read [README.md](README.md) for project overview
   - Check [USAGE.md](docs/USAGE.md) for features guide

2. **Explore the Code**
   - Navigate through `accounts/` app
   - Study `backend/settings.py`
   - Review templates structure

3. **Make Your First Change**
   - Create a feature branch
   - Make a small change
   - Test locally
   - Commit and push

4. **Contributing**
   - Read [CONTRIBUTING.md](CONTRIBUTING.md)
   - Follow coding guidelines
   - Submit pull request

## 🤝 Getting Help

- Check [troubleshooting](#-troubleshooting) section
- Review project documentation
- Create GitHub issue
- Check existing issues for similar problems
- Ask in project discussions

## ✅ Success!

If you can see the EventHub application at http://127.0.0.1:8000/, congratulations! 🎉

You're ready to:
- Explore the codebase
- Make contributions
- Report issues
- Submit pull requests

---

**Need more help? See the full documentation in the docs/ folder.**
