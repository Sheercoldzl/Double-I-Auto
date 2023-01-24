from django.urls import path
from .views import (
    api_automobileVO,
    api_automobileVOs,
    api_customer,
    api_customers,
    api_salesperson,
    api_salespersons,
    api_salesrecord,
    api_salesrecords,
)

urlpatterns = [
    path("sales/", api_salesrecords, name="api_sales_records"),
    path("sales/<int:pk>/", api_salesrecord, name="api_sales_record"),
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:pk>/", api_customer, name="api_customer"),
    path("employees/", api_salespersons, name="api_employees"),
    path("employees/<int:pk>/", api_salesperson, name="api_employee"),
    path("automobiles/", api_automobileVOs, name="api_automobiles"),
    path("automobiles/<int:pk>/", api_automobileVO, name="api_automobile_delete"),
]
