from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Q
from django.db import IntegrityError

from .models import Profile, Event, Category, Region, College, Registration


# =====================================================
# HOME REDIRECT BASED ON ROLE
# =====================================================
@login_required
def home(request):
    try:
        profile = request.user.profile
    except Profile.DoesNotExist:
        logout(request)
        return redirect('index')

    if profile.role == 'student':
        return redirect('student_dashboard')
    else:
        return redirect('organizer_dashboard')


# =====================================================
# STUDENT REGISTER
# =====================================================
def student_register(request):
    if request.method == "POST":
        email = request.POST.get('email', '').strip().lower()
        password = request.POST.get('password')
        fullname = request.POST.get('fullname')
        department = request.POST.get('department')
        college_id = request.POST.get('college')

        if User.objects.filter(username__iexact=email).exists():
            messages.error(request, "Email already exists")
            return redirect('student_register')

        try:
            user = User.objects.create_user(
                username=email,
                password=password
            )

            Profile.objects.create(
                user=user,
                role='student',
                fullname=fullname,
                department=department,
                college_id=college_id
            )

            messages.success(request, "Account Created Successfully")
            return redirect('home')
        except IntegrityError:
            messages.error(request, "Email already exists")
            return redirect('student_register')

    colleges = College.objects.all()
    return render(request, "user-register.html", {'colleges': colleges})


# =====================================================
# ORGANIZER REGISTER
# =====================================================
def organizer_register(request):
    if request.method == "POST":
        email = request.POST.get('email', '').strip().lower()
        password = request.POST.get('password')
        organization_name = request.POST.get('organization_name')
        contact_person = request.POST.get('contact_person')
        phone = request.POST.get('phone')
        college_id = request.POST.get('college')

        if User.objects.filter(username__iexact=email).exists():
            messages.error(request, "Email already exists")
            return redirect('organizer_register')

        # Only one organizer per college
        if Profile.objects.filter(college_id=college_id, role='organizer').exists():
            messages.error(request, "Organizer already exists for this college")
            return redirect('organizer_register')

        try:
            user = User.objects.create_user(
                username=email,
                password=password
            )

            Profile.objects.create(
                user=user,
                role='organizer',
                organization_name=organization_name,
                contact_person=contact_person,
                phone=phone,
                college_id=college_id
            )

            messages.success(request, "Organizer Account Created")
            return redirect('home')
        except IntegrityError:
            messages.error(request, "Email already exists")
            return redirect('organizer_register')

    colleges = College.objects.all()
    return render(request, "organizer-register.html", {'colleges': colleges})


# =====================================================
# LOGIN
# =====================================================
def user_login(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")

        user = authenticate(request, username=email, password=password)

        if user:
            login(request, user)

            profile = Profile.objects.get(user=user)

            if profile.role == "student":
                return redirect("student_dashboard")
            else:
                return redirect("organizer_dashboard")

        else:
            messages.error(request, "Invalid Email or Password")

    return render(request, "index.html")


# =====================================================
# LOGOUT
# =====================================================
@login_required
def user_logout(request):
    logout(request)
    return redirect('index')


# =====================================================
# STUDENT DASHBOARD
# =====================================================
@login_required
def student_dashboard(request):

    if request.user.profile.role != 'student':
        return redirect('organizer_dashboard')

    events = Event.objects.all().order_by('-created_at')

    search = request.GET.get('search')
    category = request.GET.get('category')
    payment = request.GET.get('payment')
    region = request.GET.get('region')
    college = request.GET.get('college')

    if search:
        events = events.filter(title__icontains=search)

    if category:
        events = events.filter(category_id=category)

    if payment:
        events = events.filter(payment_type=payment)

    if region:
        events = events.filter(region_id=region)

    if college:
        events = events.filter(college_id=college)

    participated_count = Registration.objects.filter(user=request.user).count()
    colleges_count = College.objects.count()

    context = {
        'events': events,
        'categories': Category.objects.all(),
        'regions': Region.objects.all(),
        'colleges': College.objects.all(),
        'participated_count': participated_count,
        'colleges_count': colleges_count,
    }

    return render(request, "student-dashboard.html", context)


# =====================================================
# EVENT DETAIL
# =====================================================
@login_required
def event_detail(request, pk):
    event = get_object_or_404(Event, pk=pk)
    return render(request, "event-details.html", {'event': event})


# =====================================================
# REGISTER FOR EVENT
# =====================================================
@login_required
def register_event(request, pk):

    event = get_object_or_404(Event, pk=pk)

    if request.user.profile.role != 'student':
        return redirect('organizer_dashboard')

    if event.seats_left <= 0:
        messages.error(request, "Seats Ended")
        return redirect('student_dashboard')

    if Registration.objects.filter(user=request.user, event=event).exists():
        messages.warning(request, "Already Registered")
        return redirect('student_dashboard')

    Registration.objects.create(user=request.user, event=event)

    event.seats_left -= 1
    event.save()

    messages.success(request, "Registered Successfully")
    return redirect('student_dashboard')


# =====================================================
# ORGANIZER DASHBOARD
# =====================================================
@login_required
def organizer_dashboard(request):

    try:
        profile = request.user.profile
    except Profile.DoesNotExist:
        messages.error(request, "Profile not found.")
        return redirect('index')

    if profile.role != 'organizer':
        return redirect('student_dashboard')

    events = Event.objects.filter(
        organizer=request.user
    ).order_by('-created_at')

    total_events = events.count()
    active_events = events.filter(seats_left__gt=0).count()
    closed_events = events.filter(seats_left__lte=0).count()

    total_registrations = Registration.objects.filter(
        event__organizer=request.user
    ).count()

    context = {
        'events': events,
        'total_events': total_events,
        'active_events': active_events,
        'closed_events': closed_events,
        'total_registrations': total_registrations,
    }

    return render(request, "organizer-dashboard.html", context)




# =====================================================
# ADD EVENT
# =====================================================
@login_required
def add_event(request):

    if request.user.profile.role != 'organizer':
        return redirect('student_dashboard')

    if request.method == "POST":

        total_seats = int(request.POST.get('total_seats'))
        poster = request.FILES.get('poster')   # 👈 ADD THIS

        Event.objects.create(
            title=request.POST.get('title'),
            description=request.POST.get('description'),
            category_id=request.POST.get('category'),
            payment_type=request.POST.get('payment_type'),
            price=request.POST.get('price') if request.POST.get('payment_type') == 'paid' else None,
            college_id=request.POST.get('college'),
            region_id=request.POST.get('region'),
            date=request.POST.get('date'),
            time=request.POST.get('time'),
            venue=request.POST.get('venue'),
            total_seats=total_seats,
            seats_left=total_seats,
            organizer=request.user,
            poster=poster   # 👈 ADD THIS
        )

        messages.success(request, "Event Created Successfully")
        return redirect('organizer_dashboard')

    context = {
        'categories': Category.objects.all(),
        'regions': Region.objects.all(),
        'colleges': College.objects.all(),
    }

    return render(request, "addevent.html", context)


# =====================================================
# STUDENT - MY EVENTS (registered events)
# =====================================================
@login_required
def student_my_events(request):
    if request.user.profile.role != 'student':
        return redirect('organizer_dashboard')

    registrations = Registration.objects.filter(
        user=request.user
    ).select_related('event', 'event__college', 'event__category', 'event__region').order_by('-registered_at')

    context = {
        'registrations': registrations,
        'total': registrations.count(),
    }
    return render(request, "my-events.html", context)


# =====================================================
# STUDENT - PROFILE
# =====================================================
@login_required
def student_profile(request):
    if request.user.profile.role != 'student':
        return redirect('organizer_dashboard')

    profile = request.user.profile

    if request.method == 'POST':
        fullname = request.POST.get('fullname', '').strip()
        department = request.POST.get('department', '').strip()
        college_id = request.POST.get('college')

        if fullname:
            profile.fullname = fullname
        if department:
            profile.department = department
        if college_id:
            profile.college_id = college_id

        profile.save()
        messages.success(request, "Profile updated successfully!")
        return redirect('student_profile')

    participated_count = Registration.objects.filter(user=request.user).count()

    context = {
        'profile': profile,
        'colleges': College.objects.all(),
        'participated_count': participated_count,
    }
    return render(request, "profile.html", context)

