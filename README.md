# EventHub 🎉

A web-based **Event Management Platform** built using **Django**, designed to help students and organizers create, manage, and participate in campus events efficiently.

---

## 📌 Features

* 👤 **User Authentication**

  * Student and Organizer registration
  * Secure login/logout system

* 📅 **Event Management**

  * Organizers can create and manage events
  * Upload event posters
  * View event details

* 🧑‍🎓 **Student Dashboard**

  * Browse available events
  * View event details
  * Track registered events

* 🗂 **Organizer Dashboard**

  * Manage created events
  * Monitor participants

* 🖼 **Media Support**

  * Event poster uploads and storage

---

## 🛠 Tech Stack

**Backend**

* Python
* Django

**Frontend**

* HTML
* CSS
* JavaScript

**Database**

* SQLite

**Version Control**

* Git & GitHub

---

## 📁 Project Structure

```
eventhub-django/
├── accounts/                # User authentication app
│   ├── migrations/
│   ├── admin.py
│   ├── models.py
│   ├── urls.py
│   └── views.py
│
├── backend/                 # Django project settings
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── event_posters/           # Uploaded event images
│
├── static/                  # Static assets
│   ├── css/
│   └── js/
│
├── templates/               # HTML templates
│   ├── index.html
│   ├── student-dashboard.html
│   ├── organizer-dashboard.html
│   └── ...
│
├── manage.py                # Django CLI tool
├── db.sqlite3               # SQLite database
├── requirements.txt         # Python dependencies
│
├── README.md
├── .gitignore
└── LICENSE
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/eventhub-django.git
cd eventhub-django
```

### 2️⃣ Create virtual environment

```bash
python -m venv venv
```

Activate it:

**Windows**

```
venv\Scripts\activate
```

### 3️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Run migrations

```bash
python manage.py migrate
```

### 5️⃣ Start the development server

```bash
python manage.py runserver
```

Open in browser:

```
http://127.0.0.1:8000
```

---

## 🚀 Future Improvements

* Event registration system
* Email notifications
* Payment integration
* Event search & filtering
* Admin analytics dashboard

---

## 👩‍💻 Author

**Mounika**

GitHub:
https://github.com/Mounika-140




