from common.json import ModelEncoder
from .models import AutomobileVO, SalesPerson, PotentialCustomer, SalesRecord


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["name", "employee_id"]


class PotentialCustomerEncoder(ModelEncoder):
    model = PotentialCustomer
    properties = ["name", "address", "phone_number"]


class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "automobile",
        "customer",
        "price",
        "salesperson",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "customer": PotentialCustomerEncoder(),
        "salesperson": SalesPersonEncoder(),
    }
