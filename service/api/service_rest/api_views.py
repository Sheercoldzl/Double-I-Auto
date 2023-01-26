from django.shortcuts import render
from .models import AutomobileVO, Technician, Appointment
from common.json import ModelEncoder
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

# Create your views here.
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


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder= TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create Technician"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_technician(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            technician = Technician.objects.get(id=pk)
            technician.delete()
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            technician = Technician.objects.get(id=pk)

            props = ["name", "employee_number"]
            for prop in props:
                if prop in content:
                    setattr(technician, prop, content[prop])
            technician.save()
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder= AppoitmentEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            vin = content["vin"]
            vin = AutomobileVO.objects.get(vin=vin)  # compares vin that was entered to the vin coming from the poller

            content["vip"]=True
            print(vin)
        except AutomobileVO.DoesNotExist:

            response = JsonResponse(
                {"message": "Invalid Vin"}
            )
            response.status_code = 400
            return response
        try:
            id= content["technician"]
            technician = Technician.objects.get(id=id)
            content["technician"] = technician          # Get the technician object and put it in the content dict
        except Technician.DoesNotExist:
            response = JsonResponse(
                {"message": "Invalid technician"}
            )
            response.status_code = 400
            return response


        appointment = Appointment.objects.create(**content)
        return JsonResponse(
                appointment,
                encoder=AppoitmentEncoder,
                safe=False,
            )



@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_appointment(request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppoitmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            auto = Appointment.objects.get(id=pk)
            auto.delete()
            return JsonResponse(
                auto,
                encoder=AppoitmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            appointment = Appointment.objects.get(id=pk)

            props = ["vin", "customer_name", "date","time","reason","technician", "is_finished"]
            for prop in props:
                if prop in content:
                    setattr(appointment, prop, content[prop])
            appointment.save()
            return JsonResponse(
                appointment,
                encoder=AppoitmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response