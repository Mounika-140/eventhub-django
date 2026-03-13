# Contributing to EventHub

Thank you for your interest in contributing to EventHub! We welcome contributions from everyone. This document provides guidelines and instructions for contributing.

## 🤝 Ways to Contribute

- **Report Bugs** - Found a bug? Let us know!
- **Suggest Features** - Have a feature idea? Share it!
- **Submit Code** - Contribute code improvements
- **Improve Documentation** - Help us document better
- **Share Feedback** - Your ideas help us improve

## 🐛 Reporting Bugs

When reporting bugs, please include:
- **Description** - Clear description of the bug
- **Steps to Reproduce** - How to reproduce the issue
- **Expected Behavior** - What should happen
- **Actual Behavior** - What actually happens
- **Environment** - Python version, Django version, OS
- **Screenshots** - If applicable

### Example Bug Report
```
Title: Event registration form not submitting

Description:
When clicking the register button on an event, nothing happens.

Steps to Reproduce:
1. Log in as a student
2. Navigate to an event details page
3. Click "Register for Event" button
4. Form does not submit

Expected Behavior:
Registration should be recorded and user redirected to dashboard

Actual Behavior:
Page remains on event detail with no error message

Environment:
- Python 3.9.0
- Django 6.0.2
- Windows 10
- Firefox 95.0
```

## ✨ Suggesting Features

Use the feature request template on GitHub Issues:

- **Description** - Clear description of the feature
- **Use Case** - Why would this be useful?
- **Proposed Solution** - How should it work?
- **Alternatives** - Other solutions you've considered
- **Additional Context** - Any other relevant information

## 🔧 Setting Up Development Environment

### 1. Fork the Repository
```bash
# Click "Fork" on GitHub
```

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR_USERNAME/eventhub-django.git
cd eventhub-django
```

### 3. Add Upstream Remote
```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/eventhub-django.git
```

### 4. Create Virtual Environment
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

### 5. Install Dependencies
```bash
pip install -r requirements.txt
pip install -r requirements-dev.txt  # Development dependencies
```

### 6. Set Up Database
```bash
python manage.py migrate
python manage.py createsuperuser
```

### 7. Run Development Server
```bash
python manage.py runserver
```

## 📝 Making Changes

### 1. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b bugfix/issue-description
```

### Branch Naming Convention
- `feature/feature-name` - New features
- `bugfix/issue-description` - Bug fixes
- `docs/change-description` - Documentation updates
- `refactor/component-name` - Code refactoring
- `test/test-description` - Test additions

### 2. Make Your Changes
- Write clean, readable code
- Add comments for complex logic
- Follow PEP 8 style guide
- Update documentation as needed

### 3. Write Tests
```bash
# Run existing tests
python manage.py test

# Run specific app tests
python manage.py test accounts

# Run with coverage
coverage run --source='.' manage.py test
coverage report
```

### 4. Commit Changes
```bash
git add .
git commit -m "Brief description of changes"
```

### Commit Message Guidelines
- Use present tense: "Add feature" not "Added feature"
- Use imperative mood: "Move cursor to..." not "Moves cursor to..."
- Limit subject line to 50 characters
- Reference issues when applicable: "Fixes #123"

#### Examples
```
Add event registration functionality
Fix user authentication redirect issue
Update README installation instructions
Refactor event filtering logic
```

### 5. Keep Branch Updated
```bash
git fetch upstream
git rebase upstream/main
```

### 6. Push to Your Fork
```bash
git push origin feature/your-feature-name
```

## 🔍 Pull Request Process

### 1. Create Pull Request
- Click "New Pull Request" on GitHub
- Select your branch
- Fill in the PR template
- Link any related issues: "Fixes #123"

### 2. PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking)
- [ ] New feature (non-breaking)
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #123

## Testing
Describe testing performed:
- [ ] Test A passed
- [ ] Test B passed
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests written/updated
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Self-review completed
```

### 3. Code Review
- Maintainers review your code
- Address feedback and suggestions
- Push additional commits if needed
- Request re-review when ready

### 4. Merge
Once approved, your PR will be merged!

## 📚 Code Style Guidelines

### Python Style (PEP 8)
```python
# Good
class EventManager:
    def __init__(self, name):
        self.name = name
    
    def create_event(self, event_data):
        """Create a new event with provided data."""
        return Event.objects.create(**event_data)

# Bad
class EventManager:
    def __init__(self,name):
        self.name=name
    
    def create_event(self,e):
        return Event.objects.create(**e)
```

### Django Conventions
```python
# Models
class Event(models.Model):
    title = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

# Views
def event_detail(request, event_id):
    event = get_object_or_404(Event, id=event_id)
    return render(request, 'event_details.html', {'event': event})

# URLs
urlpatterns = [
    path('events/<int:event_id>/', views.event_detail, name='event_detail'),
]
```

### JavaScript Style
```javascript
// Good - camelCase, clear names
function loadEventDetails(eventId) {
    const event = getEvent(eventId);
    displayEventModal(event);
}

// Bad - unclear names, inconsistent style
function load_ed(id) {
    var e = get_E(id);
    show_modal(e);
}
```

## 📖 Documentation Standards

### Docstring Format
```python
def register_for_event(user, event):
    """
    Register a user for an event.
    
    Args:
        user (User): The user registering
        event (Event): The event to register for
    
    Returns:
        Registration: The created registration object
    
    Raises:
        ValueError: If user is already registered
        Event.DoesNotExist: If event doesn't exist
    """
    pass
```

### HTML Comments
```html
<!-- Event registration form -->
<form method="post" action="{% url 'register_event' %}">
    <!-- User must be logged in to register -->
    {% if user.is_authenticated %}
        <input type="submit" value="Register">
    {% endif %}
</form>
```

## ✅ Before Submitting PR

- [ ] Code follows project style
- [ ] All tests pass
- [ ] Added/updated tests for new code
- [ ] Updated documentation
- [ ] No console errors
- [ ] No hardcoded secrets/passwords
- [ ] Commit messages are clear
- [ ] Branch is up to date with main

## 💬 Communication

- Use respectful and inclusive language
- Ask questions if unsure
- Help other contributors
- Provide constructive feedback
- Report issues professionally

## 🏆 Recognition

All contributors are recognized in:
- Git commit history
- GitHub contributors page
- Project documentation

## ❓ Questions?

- Check existing issues and PRs
- Review project documentation
- Ask in PR discussion
- Start a GitHub discussion

## 📋 Code of Conduct

This project adheres to a Code of Conduct. All contributors are expected to uphold this code. Please review [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

**Thank you for contributing to EventHub! 🎉**
