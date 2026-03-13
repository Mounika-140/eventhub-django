from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator


# ===============================
# REGION MODEL
# ===============================
class Region(models.Model):
    name = models.CharField(max_length=150, unique=True)

    def __str__(self):
        return self.name


# ===============================
# COLLEGE MODEL
# ===============================
class College(models.Model):
    name = models.CharField(max_length=200, unique=True)
    region = models.ForeignKey(
        Region,
        on_delete=models.CASCADE,
        related_name="colleges"
    )

    def __str__(self):
        return self.name


# ===============================
# CATEGORY MODEL
# ===============================
class Category(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name



# ===============================
# PROFILE MODEL (Student + Organizer)
# ===============================
class Profile(models.Model):

    ROLE_CHOICES = [
        ('student', 'Student'),
        ('organizer', 'Organizer'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    # ✅ FIXED: allow null so migration won't crash
    college = models.ForeignKey(
        College,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    # Student Fields
    fullname = models.CharField(max_length=200, blank=True, null=True)
    department = models.CharField(max_length=200, blank=True, null=True)

    # Organizer Fields
    organization_name = models.CharField(max_length=200, blank=True, null=True)
    contact_person = models.CharField(max_length=200, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.role}"


# ===============================
# EVENT MODEL
# ===============================
class Event(models.Model):

    PAYMENT_CHOICES = [
        ('free', 'Free'),
        ('paid', 'Paid'),
    ]

    title = models.CharField(max_length=250)
    description = models.TextField()

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="events"
    )

    payment_type = models.CharField(max_length=10, choices=PAYMENT_CHOICES)
    price = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        blank=True,
        null=True
    )

    college = models.ForeignKey(
        College,
        on_delete=models.CASCADE
    )

    region = models.ForeignKey(
        Region,
        on_delete=models.CASCADE
    )

    date = models.DateField()
    time = models.TimeField()
    venue = models.CharField(max_length=250)

    total_seats = models.PositiveIntegerField(
        validators=[MinValueValidator(1)]
    )
    seats_left = models.PositiveIntegerField()

    organizer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="organized_events"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    poster = models.ImageField(
        upload_to='event_posters/',
        null=True,
        blank=True
    )

    def is_seats_full(self):
        return self.seats_left <= 0

    def save(self, *args, **kwargs):
        # Automatically set seats_left when creating event
        if not self.pk:
            self.seats_left = self.total_seats
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


# ===============================
# REGISTRATION MODEL
# ===============================
class Registration(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="registrations"
    )

    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="registrations"
    )

    registered_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'event')

    def __str__(self):
        return f"{self.user.username} registered for {self.event.title}"
