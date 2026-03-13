from django.urls import path
from . import views

urlpatterns = [

    path('', views.user_login, name='home'),  # 👈 FIXED

    path('index/', views.user_login, name='index'),
    path('logout/', views.user_logout, name='logout'),

    path('student-register/', views.student_register, name='student_register'),
    path('organizer-register/', views.organizer_register, name='organizer_register'),

    path('student-dashboard/', views.student_dashboard, name='student_dashboard'),
    path('organizer-dashboard/', views.organizer_dashboard, name='organizer_dashboard'),

    path('event/<int:pk>/', views.event_detail, name='event_detail'),
    path('register/<int:pk>/', views.register_event, name='register_event'),

    path('add-event/', views.add_event, name='add_event'),

    path('my-events/', views.student_my_events, name='my_events'),
    path('profile/', views.student_profile, name='student_profile'),
]
