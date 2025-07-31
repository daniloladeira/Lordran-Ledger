from rest_framework import serializers
from .models import Spell, Weapon

class WeaponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weapon
        fields = [
            'id', 'name', 'description', 'type', 'physical_damage', 'weight',
            'image', 'strength_required', 'dexterity_required', 'created_at'
        ]
        read_only_fields = ['created_at']
        
    def validate_physical_damage(self, value):
        if value < 0:
            raise serializers.ValidationError("Physical damage must be non-negative.")
        return value
        
    def validate_weight(self, value):
        if value <= 0:
            raise serializers.ValidationError("Weight must be positive.")
        return value
        
class SpellSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spell
        fields = [
            'id', 'name', 'description', 'school', 'slots_required', 
            'uses', 'cost_fp', 'intelligence_required', 'is_offensive', 'created_at'
        ]
        read_only_fields = ['created_at']
        
    def validate_cost_fp(self, value):
        if value < 0:
            raise serializers.ValidationError("Focus Points cost must be non-negative.")
        return value
        
    def validate_slots_required(self, value):
        if value < 1:
            raise serializers.ValidationError("Slots required must be at least 1.")
        return value
