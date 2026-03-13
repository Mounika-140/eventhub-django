# 🎓 EventHub - Event Organization Management System

A comprehensive Django-based event management system that allows students and event organizers to create, manage, and discover events with ease.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 👨‍🎓 Student Features
- **User Registration & Authentication** - Secure signup and login system
- **Event Discovery** - Browse and search for events
- **Advanced Filtering** - Filter events by:
  - Category, Region, Payment Type, Status
  - Search by name, college, venue
  - Real-time client-side filtering
- **Personal Dashboard** - View registered and upcoming events
- **Event Details** - Comprehensive event information with images
- **Profile Management** - View and manage user profile
- **Event Registration** - Register for events with one click

### 🎯 Organizer Features
- **Event Creation** - Create and publish new events
- **Event Management Dashboard** - Centralized event management
- **Event Analytics** - View active and closed events statistics
- **Event Posters** - Upload and manage event images
- **Event Editing** - Update event details after creation
- **Status Control** - Mark events as active or closed

### 🔐 Security Features
- Django authentication system
- CSRF protection
- Password validation
- User session management

---

## 🛠 Tech Stack

| Component | Technology |
|-----------|------------|
| **Backend Framework** | Django 6.0.2 |
| **Database** | SQLite3 |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Image Processing** | Pillow 10.0.0 |
| **Server** | Asgi/Wsgi |
| **Python Version** | 3.8+ |

### Dependencies
- `Django==6.0.2` - Web framework
- `asgiref==3.11.1` - Async support
- `sqlparse==0.5.5` - SQL parsing
- `tzdata==2025.1` - Timezone support
- `Pillow==10.0.0` - Image processing

---

## 📁 Project Structure

```
eventhub-django/
├── DemoProject/                    # Main Django project
│   ├── accounts/                   # User authentication app
│   │   ├── migrations/             # Database migrations
│   │   ├── __init__.py
│   │   ├── admin.py               # Admin configuration
│   │   ├── apps.py
│   │   ├── models.py              # User models
│   │   ├── urls.py                # URL routing
│   │   ├── views.py               # Authentication views
│   │   └── tests.py
│   │
│   ├── backend/                    # Django settings
│   │   ├── __init__.py
│   │   ├── settings.py            # Main project settings
│   │   ├── urls.py                # Main URL configuration
│   │   ├── asgi.py                # Async server config
│   │   └── wsgi.py                # Production server config
│   │
│   ├── event_posters/              # Event images directory
│   │   └── (uploaded images stored here)
│   │
│   ├── static/                     # Static files
│   │   ├── css/
│   │   │   ├── style.css          # Main styles
│   │   │   ├── addevent.css       # Event creation styles
│   │   │   ├── login.css          # Login page styles
│   │   │   ├── modal.css          # Modal styles
│   │   │   ├── my-events.css      # My events page styles
│   │   │   ├── organizer-dashboard.css
│   │   │   ├── organizer-register.css
│   │   │   ├── profile.css        # Profile page styles
│   │   │   └── user-register.css
│   │   └── js/
│   │       ├── app.js             # Shared utilities
│   │       └── organizer-dashboard.js
│   │
│   ├── templates/                  # HTML templates
│   │   ├── index.html             # Landing page
│   │   ├── student-dashboard.html # Student dashboard
│   │   ├── organizer-dashboard.html
│   │   ├── addevent.html          # Create event form
│   │   ├── event-details.html     # Event detail page
│   │   ├── my-events.html         # User's events
│   │   ├── profile.html           # User profile
│   │   ├── login.html             # Login page
│   │   ├── user-register.html     # Student registration
│   │   └── organizer-register.html
│   │
│   ├── manage.py                   # Django CLI tool
│   ├── db.sqlite3                 # SQLite database
│   └── requirements.txt            # Python dependencies
│
├── README.md                       # This file
├── .gitignore                      # Git ignore rules
└── LICENSE                         # License file (optional)
```

---

## 🚀 Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/eventhub-django.git
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

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Apply Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Step 5: Create a Superuser (Admin)

```bash
python manage.py createsuperuser
```

Follow the prompts to create your admin account.

### Step 6: Run Development Server

```bash
python manage.py runserver
```

The application will be available at: `http://127.0.0.1:8000/`

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root (optional):

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Database Configuration

The project uses SQLite by default. To change the database:

1. Edit `backend/settings.py`
2. Modify the `DATABASES` dictionary:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'eventhub_db',
        'USER': 'postgres',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### Static and Media Files

```python
# In settings.py
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
```

---

## 📖 Usage

### Access the Application

| Page | URL | Role |
|------|-----|------|
| Landing Page | `/` | Public |
| Student Dashboard | `/dashboard/` | Student |
| Organizer Dashboard | `/organizer-dashboard/` | Organizer |
| Create Event | `/add-event/` | Organizer |
| Event Details | `/event/<id>/` | All |
| Profile | `/profile/` | Authenticated |
| Admin Panel | `/admin/` | Superuser |

### Student Workflow

1. **Register** → Sign up as a student
2. **Browse Events** → View all available events
3. **Search & Filter** → Find events by category, region, etc.
4. **View Details** → Click on an event to see full information
5. **Register** → Join the event
6. **My Events** → Track your registered events

### Organizer Workflow

1. **Register** → Sign up as an organizer
2. **Create Event** → Add new event details and poster
3. **Manage Events** → View all your created events
4. **Track Status** → Monitor active and closed events
5. **Update** → Edit event details as needed

---

## 🔗 API Endpoints

### Authentication
- `POST /register/` - User registration
- `POST /login/` - User login
- `GET /logout/` - User logout

### Events
- `GET /` - List all events
- `POST /add-event/` - Create new event (Organizer only)
- `GET /event/<id>/` - Get event details
- `POST /event/<id>/register/` - Register for event

### User
- `GET /profile/` - User profile page
- `GET /dashboard/` - Student dashboard
- `GET /organizer-dashboard/` - Organizer dashboard

---

## 🎨 Frontend Features

### Responsive Design
- Mobile-first approach
- Tested on: 1920px, 1366px, 768px, 375px breakpoints
- Touch-friendly interface

### JavaScript Functionality
- Real-time event filtering
- Dynamic modal management
- Form validation
- Local storage integration
- Image error handling

### CSS Framework
- Custom CSS (no framework dependencies)
- Accessible color schemes
- Smooth animations and transitions
- Properly structured component styles

---

## 🧪 Testing

Run tests with:

```bash
python manage.py test
```

Run specific app tests:

```bash
python manage.py test accounts
```

---

## 📝 Admin Panel

Access Django admin at `/admin/` using your superuser credentials.

Features:
- Manage user accounts
- Create and edit events
- Moderate registrations
- View system statistics

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🐛 Known Issues & Future Enhancements

### Future Features
- [ ] Email notifications for event updates
- [ ] Google Calendar integration
- [ ] Payment gateway integration
- [ ] Advanced analytics dashboard
- [ ] Event feedback and ratings
- [ ] Automated event reminders
- [ ] Social sharing features
- [ ] Calendar view for events

### Known Limitations
- SQLite not recommended for production (use PostgreSQL)
- No caching mechanism implemented
- Limited scalability for high traffic

---

## 🔒 Security Notes

### Before Production Deployment

1. **Change SECRET_KEY** in `settings.py`
2. **Set DEBUG = False** in production
3. **Configure ALLOWED_HOSTS** properly
4. **Use environment variables** for sensitive data
5. **Enable HTTPS** on production servers
6. **Set up proper database** (PostgreSQL recommended)
7. **Implement rate limiting** for API endpoints
8. **Add CORS headers** if serving separate frontend

### Recommended Security Packages

```bash
pip install django-cors-headers
pip install django-environ
pip install whitenoise  # For static files in production
```

---

## 📊 Performance Tips

1. **Database Optimization**
   - Add indexes to frequently queried fields
   - Use `select_related()` and `prefetch_related()`
   - Enable query caching

2. **Static Files**
   - Use CDN for static assets in production
   - Minify CSS and JavaScript
   - Enable gzip compression

3. **Image Optimization**
   - Compress images before upload
   - Use thumbnails for lists
   - Implement lazy loading

---

## 💡 Troubleshooting

### Common Issues

**1. ModuleNotFoundError: No module named 'django'**
```bash
# Solution: Install dependencies
pip install -r requirements.txt
```

**2. Port 8000 already in use**
```bash
# Solution: Use different port
python manage.py runserver 8001
```

**3. Database migration errors**
```bash
# Solution: Reset migrations
python manage.py migrate accounts zero
python manage.py migrate
```

**4. Static files not loading**
```bash
# Solution: Collect static files
python manage.py collectstatic --noinput
```

---

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Email: your-email@example.com
- Documentation: Check project wiki

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Django Framework Community
- Bootstrap for CSS inspiration
- All contributors and testers

---

## 👨‍💻 Author

**Your Name / Team**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your-email@example.com

---

## 📅 Project Timeline

- **Version 1.0** - Initial release
- **Status** - In Development / Active

---

**Last Updated:** March 2026

---

**Happy Event Organizing! 🎉**
