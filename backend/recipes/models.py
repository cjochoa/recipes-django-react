from django.db import models


class Recipe(models.Model):
    name = models.CharField(max_length=255, null=False)
    description = models.CharField(max_length=255, null=True)

    class Meta:
        ordering = ['name']

    def __str__(self):  # pragma: no cover
        return f"{self.name} - {self.description}"


class Ingredient(models.Model):
    name = models.CharField(max_length=255, null=False)
    recipe = models.ForeignKey(to=Recipe, related_name="ingredients", on_delete=models.CASCADE)

    class Meta:
        unique_together = ('name', 'recipe')
        ordering = ['name']

    def __str__(self):  # pragma: no cover
        return f'"name":{self.name}'


