from django.shortcuts import render
from rest_framework import viewsets
from .models import Weapon, Spell
from .serializers import WeaponSerializer, SpellSerializer

# Create your views here.

class WeaponViewSet(viewsets.ModelViewSet):
    queryset = Weapon.objects.all()
    serializer_class = WeaponSerializer

class SpellViewSet(viewsets.ModelViewSet):
    queryset = Spell.objects.all()
    serializer_class = SpellSerializer