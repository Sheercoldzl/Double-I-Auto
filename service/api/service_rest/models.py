from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True, blank = False)
    import_href = models.CharField(max_length=200, unique=True)


class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveSmallIntegerField(unique=True)

    def __str__(self):
        return self.name


class Appointment(models.Model):
    vin = models.CharField(max_length=17, blank = False)
    customer_name = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    reason = models.TextField(null = True)
    vip = models.BooleanField(default = False)
    technician = models.ForeignKey(
        Technician,
        related_name = "appointments",
        on_delete = models.PROTECT,
    )

    def __str__(self):
        return self.customer_name

    is_finished = models.BooleanField(default = False)
