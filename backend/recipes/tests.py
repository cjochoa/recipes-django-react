from django.test import TestCase
from .models import Recipe, Ingredient
from rest_framework.test import APIClient

import logging
logger = logging.getLogger('django')

class RecipeViewTest(TestCase):

    def setUp(self):
        # Every test needs a client.
        self.client = APIClient()

    def test_create_recipe(self):
        # add test data
        data = {
                'name': 'pizza',
                'description':  'put it in the oven',
                'ingredients': [{'name': 'dough'}, {'name': 'cheese'}, {'name': 'tomato'}]
        }
        response = self.client.post('/recipes/', data, format='json')
        self.assertEquals(201, response.status_code)

        recipes = Recipe.objects.all()
        self.assertEquals(1, len(recipes))
        self.assertEquals(recipes[0].name, data['name'])

    def test_get_recipe(self):
        data = {
                'name': 'pizza',
                'description':  'put it in the oven',
                'ingredients': [{'name': 'dough'}, {'name': 'cheese'}, {'name': 'tomato'}]
        }
        response = self.client.post('/recipes/', data, format='json')
        self.assertEquals(201, response.status_code)

        response = self.client.get('/recipes/1/')
        self.assertEquals(200, response.status_code)
        self.assertEquals(response.data['name'], 'pizza')

    def test_get_all_recipes(self):
        data1 = {
                'name': 'pizza',
                'description':  'put it in the oven',
                'ingredients': [{'name': 'dough'}, {'name': 'cheese'}, {'name': 'tomato'}]
        }
        response = self.client.post('/recipes/', data1, format='json')
        self.assertEquals(201, response.status_code)

        data2 = {
                'name': 'onion soup',
                'description':  'with lots of onion',
                'ingredients': [{'name': 'broth'}, {'name': 'onion'}]
        }
        response = self.client.post('/recipes/', data2, format='json')
        self.assertEquals(201, response.status_code)

        response = self.client.get('/recipes/')
        logger.info(response)
        self.assertEquals(200, response.status_code)
        self.assertEquals(len(response.data), 2)

    def test_patch_recipe(self):
        # add test data
        data = {
                'name': 'pizza',
                'description':  'put it in the oven',
                'ingredients': [{'name': 'dough'}, {'name': 'cheese'}, {'name': 'tomato'}]
        }
        response = self.client.post('/recipes/', data, format='json')
        self.assertEquals(201, response.status_code)

        recipes = Recipe.objects.all()
        self.assertEquals(1, len(recipes))
        self.assertEquals(recipes[0].name, data['name'])

        data1 = {
            'name': 'pizza2'
        }
        response = self.client.patch('/recipes/1/', data1, format='json')
        self.assertEquals(200, response.status_code)

        recipes = Recipe.objects.all()
        self.assertEquals(1, len(recipes))
        self.assertEquals(recipes[0].name, data1['name'])

    def test_get_recipe_filter(self):
        data1 = {
            'name': 'pizza',
            'description': 'put it in the oven',
            'ingredients': [{'name': 'dough'}, {'name': 'cheese'}, {'name': 'tomato'}]
        }
        response = self.client.post('/recipes/', data1, format='json')
        self.assertEquals(201, response.status_code)

        data2 = {
            'name': 'onion soup',
            'description': 'with lots of onion',
            'ingredients': [{'name': 'broth'}, {'name': 'onion'}]
        }
        response = self.client.post('/recipes/', data2, format='json')
        self.assertEquals(201, response.status_code)

        response = self.client.get('/recipes/?name=pizza')
        self.assertEquals(200, response.status_code)
        self.assertEquals(len(response.data), 1)

        response = self.client.get('/recipes/?ingredient=broth&ingredient=onion')
        self.assertEquals(200, response.status_code)
        self.assertEquals(len(response.data), 1)

        response = self.client.get('/recipes/?name=omelet')
        self.assertEquals(200, response.status_code)
        self.assertEquals(len(response.data), 0)


class RecipeModelTest(TestCase):

    def test_recipe_creation(self):
        recipe = Recipe.objects.create(name='pizza', description='yummy')
        self.assertTrue(isinstance(recipe, Recipe))
        self.assertEquals('pizza', recipe.name)
        self.assertEquals('yummy', recipe.description)
        self.assertEquals('pizza - yummy', str(recipe))

        cheese = Ingredient.objects.create(name='cheese', recipe=recipe)
        dough = Ingredient.objects.create(name='dough', recipe=recipe)
        self.assertTrue(isinstance(cheese, Ingredient))
        self.assertEquals('cheese', cheese.name)
        self.assertEquals('"name":cheese', str(cheese))

        self.assertTrue(isinstance(dough, Ingredient))
        self.assertEquals('dough', dough.name)
        self.assertEquals('"name":dough', str(dough))
