from .models import Recipe
from .serializers import RecipeSerializer
from rest_framework import viewsets


class RecipeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def get_queryset(self):
        """
        """
        queryset = Recipe.objects.all()
        name = self.request.query_params.get('name', None)
        if name is not None:
            queryset = queryset.filter(name__icontains=name)

        ingredient = self.request.query_params.get('ingredient', None)
        if ingredient is not None:
            queryset = queryset.filter(ingredients__name__icontains=ingredient).distinct()
        return queryset
