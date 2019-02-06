from rest_framework import serializers
from .models import Recipe, Ingredient


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('name', )


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ('id', 'name', 'description', 'ingredients')

    def create(self, validated_data):
        recipe = Recipe.objects.create(name=validated_data["name"], description=validated_data["description"])
        for ingredient in validated_data["ingredients"]:
            Ingredient.objects.create(name=ingredient["name"], recipe=recipe)
        return recipe

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        if 'ingredients' in validated_data:
            for ingredient in instance.ingredients.all():
                ingredient.delete()
            for ingredient in validated_data["ingredients"]:
                Ingredient.objects.create(name=ingredient["name"], recipe=instance)
        instance.save()
        return instance

