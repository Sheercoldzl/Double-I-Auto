from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)


class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_id = models.PositiveSmallIntegerField(unique=True)


class PotentialCustomer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200,)
    phone_number = models.CharField(max_length=50, unique=True)


class SalesRecord(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="vehicle",
        on_delete=models.PROTECT
    )
    salesperson = models.ForeignKey(
        SalesPerson,
        related_name = "employee",
        on_delete = models.PROTECT
    )
    customer = models.ForeignKey(
        PotentialCustomer,
        related_name = "consumer",
        on_delete=models.PROTECT
    )
    price = models.CharField(max_length=50)
