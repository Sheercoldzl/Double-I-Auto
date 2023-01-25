import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, SalesPerson, PotentialCustomer, SalesRecord
from .encoders import (
    AutomobileVOEncoder,
    PotentialCustomerEncoder,
    SalesPersonEncoder,
    SalesRecordEncoder,
)


@require_http_methods(["GET", "POST"])
def api_salespersons(request):
    if request.method == "GET":
        salespersons = SalesPerson.objects.all()
        return JsonResponse(
            {"salespersons": salespersons},
            encoder=SalesPersonEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            salesperson = SalesPerson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the Salesperson"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "PUT", "DELETE"])
def api_salesperson(request, pk):
    if request.method == "GET":
        try:
            salesperson = SalesPerson.objects.get(id=pk)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            salesperson = SalesPerson.objects.get(id=pk)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            salesperson = SalesPerson.objects.get(id=pk)

            props = ["name","employee_id"]
            for prop in props:
                if prop in content:
                    setattr(salesperson, prop, content[prop])
            salesperson.save()
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = PotentialCustomer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=PotentialCustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = PotentialCustomer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=PotentialCustomerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the customer"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_customer(request, pk):
    if request.method == "GET":
        try:
            customer = PotentialCustomer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=PotentialCustomerEncoder,
                safe=False
            )
        except PotentialCustomer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = PotentialCustomer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=PotentialCustomerEncoder,
                safe=False,
            )
        except PotentialCustomer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            customer = PotentialCustomer.objects.get(id=pk)
            props = ["name","address","phone_number"]
            for prop in props:
                if prop in content:
                    setattr(customer, prop, content[prop])
            customer.save()
            return JsonResponse(
                customer,
                encoder=PotentialCustomerEncoder,
                safe=False,
            )
        except PotentialCustomer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_salesrecords(request):
    if request.method == "GET":
        sales = SalesRecord.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder = SalesRecordEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = automobile
            salesperson = SalesPerson.objects.get(employee_id=content["salesperson"])
            content["salesperson"] = salesperson
            customer = PotentialCustomer.objects.get(phone_number=content["customer"])
            content["customer"] = customer
            sale = SalesRecord.objects.create(**content)
            return JsonResponse(
                sale,
                encoder = SalesRecordEncoder,
                safe=False,
            )
        except AutomobileVO.DoesNotExist or SalesPerson.DoesNotExist or PotentialCustomer.DoesNotExist:
            response = JsonResponse( {"message": "could not create sales record"})
            response.status_code = 400
            return response

@require_http_methods(["GET", "DELETE", "PUT"])
def api_salesrecord(request, pk):
    if request.method == "GET":
        try:
            sale = SalesRecord.objects.get(id=pk)
            return JsonResponse(
                sale,
                encoder=SalesRecordEncoder,
                safe=False
            )
        except SalesRecord.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            sale = SalesRecord.objects.get(id=pk)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except SalesRecord.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            sale = SalesRecord.objects.get(id=pk)
            props = ["price"]
            for prop in props:
                if prop in content:
                    setattr(sale, prop, content[prop])
            sale.save()
            return JsonResponse(
                sale,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except SalesRecord.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET"])
def api_automobileVOs(request):
    automobiles = AutomobileVO.objects.all()
    return JsonResponse({"automobiles": automobiles}, encoder=AutomobileVOEncoder)


@require_http_methods(["DELETE"])
def api_automobileVO(request, pk):
    try:
        vin = AutomobileVO.objects.get(id=pk)
        vin.delete()
        return JsonResponse(
            vin,
            encoder=AutomobileVOEncoder,
            safe=False,
        )
    except AutomobileVO.DoesNotExist:
        return JsonResponse({"message": "Does not exist"})
