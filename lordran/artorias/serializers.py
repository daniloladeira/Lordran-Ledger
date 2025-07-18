from rest_framework import serializers
from .models import Spell, Weapon

class WeaponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weapon
        fields = '__all__'
        read_only_fields = ['created_at']
        
class SpellSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spell
        fields = '__all__'
        read_only_fields = ['created_at']
        
    def validate(self, data):
        if data['cost_fp'] < 0 or data['cost_stamina'] < 0:
            raise serializers.ValidationError("Focus Points and Stamina costs must be non-negative.")
        return data
