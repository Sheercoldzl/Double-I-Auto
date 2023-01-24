from django.db import models

# Create your models here.
class AutomobileVO(models.Model):
    import_vin = models.CharField(max_length=17, unique=True, blank = False)

class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.name

class Appointment(models.Model):
    vin = models.CharField(max_length=17, unique=True, blank = False)
    customer_name = models.CharField(max_length=100)
    date = models.DateTimeField()
    time = models.TimeField()
    reason = models.TextField(null = True)
    status = models.CharField(max_length=10)
    technician = models.ForeignKey(
        Technician,
        related_name = "appointments",
        on_delete = models.PROTECT,
    )

    def __str__(self):
        return self.customer_name
