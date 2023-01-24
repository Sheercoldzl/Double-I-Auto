
from django.urls import path
from .views import api_list_technicians, api_show_technician

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:pk>/", api_show_technician, name="api_show_technician"),
#     path("appointments/", api_show_appointments, name="api_show_appointments"),
#     path("appointments/<int:pk>/", api_show_appointment, name="api_show_appointment"),
#
]
