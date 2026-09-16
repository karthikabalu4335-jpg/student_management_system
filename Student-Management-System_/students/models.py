from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=100)
    register_number = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=100)
    year = models.IntegerField()

    def __str__(self):
        return self.name