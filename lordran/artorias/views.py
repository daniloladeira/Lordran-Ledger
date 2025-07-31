from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated  # <-- adicione isso
from .models import Weapon, Spell
from .serializers import WeaponSerializer, SpellSerializer

class WeaponViewSet(viewsets.ModelViewSet):
    queryset = Weapon.objects.all()
    serializer_class = WeaponSerializer
    permission_classes = [IsAuthenticated]  # <-- ESSENCIAL

class SpellViewSet(viewsets.ModelViewSet):
    queryset = Spell.objects.all()
    serializer_class = SpellSerializer
    permission_classes = [IsAuthenticated]  # <-- ESSENCIAL
