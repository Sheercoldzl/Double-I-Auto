import json
from django.http import JsonResponse
from .models import AutomobileVO, Technician, Appointment
from django.views.decorators.http import require_http_methods
from common.encoders import TechnicianEncoder, AppoitmentEncoder


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
                {"message": "Could not create Technician, id needs to be smaller tahn 3200"}
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
            response = JsonResponse({"message": f"Technician {pk} does not exist"})
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
            return JsonResponse({"message": "Technician does not exist"})
    else:
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
            response = JsonResponse({"message": f"Technician {pk} does not exist"})
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
            vin = AutomobileVO.objects.get(vin=vin)
            content["vip"]=True
        except:
            pass
        try:
            input_id = content["technician"]
            technician = Technician.objects.get(id=input_id)
            content["technician"] = technician
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
    else:
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
