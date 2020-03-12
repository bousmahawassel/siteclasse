from django.db import models

# Create your models here.

class SuiteArithmetiqueModel(models.Model):
    raison = models.IntegerField()
    u0 = models.FloatField()
    known_values = models.TextField(blank=True)
    def calculate(self, n, recursive=False):
        try:
            values = eval(self.known_values)
        except:
            values = {}
        if n in values:
            return values[n]
        if recursive:
            res = self.calculate(n-1, True) + self.raison
            values[n] = res
            self.known_values = str(values)
            self.save()
            return res
        res = self.raison * n + self.u0
        values[n] = res
        self.known_values = str(values)
        self.save()
        return res

    @staticmethod
    def get_raison(dico_values):
        assert len(dico_values) == 2
        for i, l in dico_values.items():
            assert isinstance(i, int)
            assert isinstance(l, int)
        r = (dico_values[list(dico_values.keys())[1]] - dico_values[list(dico_values.keys())[0]]) / \
            (list(dico_values.keys())[1] - list(dico_values.keys())[0])
        return r

    @staticmethod
    def get_u0(r, value):
        if isinstance(value, dict):
            value = value.items().__iter__().__next__()
        assert len(value) == 2
        return value[1] - r*value[0]

    @classmethod
    def get_suite(cls, dico_values):
        r = cls.get_raison(dico_values)
        u0 = cls.get_u0(r, dico_values.items().__iter__().__next__())
        return cls.objects.get_or_create(raison=r, u0=u0)

    def get_explicite(self):
        return f"u<sub>n</sub> = {self.raison}n + {self.u0}"

    def get_recurrence(self):
        return [f"u<sub>n+1</sub> = u<sub>n</sub> + {self.raison}", f"u<sub>0</sub> = {self.u0}"]

    class Meta:
        unique_together = ["raison", "u0"]

class SuiteGeometriqueModel(models.Model):
    raison = models.IntegerField()
    u0 = models.FloatField()
    known_values = models.TextField(blank=True)

    def calculate(self, n, recursive=False):
        try:
            values = eval(self.known_values)
        except:
            values = {}
        if n in values:
            return values[n]
        if recursive:
            res = self.calculate(n - 1, True) * self.raison
            values[n] = res
            self.known_values = str(values)
            self.save()
            return res
        res = self.raison ** n * self.u0
        values[n] = res
        self.known_values = str(values)
        self.save()
        return res

    @staticmethod
    def get_raison(dico_values):
        assert len(dico_values) == 2
        for i, l in dico_values.items():
            assert isinstance(i, int)
            assert isinstance(l, int)
        r = (dico_values[list(dico_values.keys())[1]] / dico_values[list(dico_values.keys())[0]]) / \
            (list(dico_values.keys())[1] - list(dico_values.keys())[0])
        return r

    @staticmethod
    def get_u0(r, value):
        if isinstance(value, dict):
            value = value.items().__iter__().__next__()
        assert len(value) == 2
        return value[1] / r ** value[0]

    @classmethod
    def get_suite(cls, dico_values):
        r = cls.get_raison(dico_values)
        u0 = cls.get_u0(r, dico_values.items().__iter__().__next__())
        return cls.objects.get_or_create(raison=r, u0=u0)

    def get_explicite(self):
        return f"u<sub>n</sub> = {self.raison}<sup>n</sup> * {self.u0}"

    def get_recurrence(self):
        return [f"u<sub>n+1</sub> = u<sub>n</sub> + {self.raison}", f"u<sub>0</sub> = {self.u0}"]

    class Meta:
        unique_together = ["raison", "u0"]