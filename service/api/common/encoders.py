from service_rest.models import AutomobileVO, Technician, Appointment
from .json import ModelEncoder
from django.views.decorators.http import require_http_methods


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["import_href", "vin", "id"]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "name",
        "employee_number",
    ]


class AppoitmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "customer_name",
        "date",
        "time",
        "reason",
        "vip",
        "technician",
        "is_finished"
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }
