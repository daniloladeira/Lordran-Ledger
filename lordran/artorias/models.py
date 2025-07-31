from django.db import models

# Create your models here.

class Weapon(models.Model):
    TYPE_CHOICES = [
        ('sword', 'Sword'),
        ('axe', 'Axe'),
        ('bow', 'Bow'),
        ('spear', 'Spear'),
        ('greatsword', 'Greatsword'),
        ('katana', 'Katana'),
        ('fist', 'Fist'),
        ('halberd', 'Halberd'),
        ('magic', 'Magic'),
    ]

    # Campos essenciais
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)  # Opcional
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    physical_damage = models.IntegerField(default=0)
    weight = models.FloatField(default=1.0)

    # Campos opcionais com valores padrão
    image = models.ImageField(upload_to='weapons/', blank=True, null=True)
    magic_damage = models.IntegerField(default=0)
    fire_damage = models.IntegerField(default=0)
    lightning_damage = models.IntegerField(default=0)
    critical = models.IntegerField(default=100)
    durability = models.IntegerField(default=100)

    # Requisitos simplificados
    strength_required = models.IntegerField(default=10)
    dexterity_required = models.IntegerField(default=10)
    intelligence_required = models.IntegerField(default=0)
    faith_required = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Spell(models.Model):
    SPELL_TYPE_CHOICES = [
        ('sorcery', 'Sorcery'),
        ('pyromancy', 'Pyromancy'),
        ('miracle', 'Miracle'),
        ('hex', 'Hex'),
    ]

    # Campos essenciais
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)  # Opcional
    school = models.CharField(max_length=20, choices=SPELL_TYPE_CHOICES)

    # Campos simplificados com valores padrão
    slots_required = models.IntegerField(default=1)
    uses = models.IntegerField(default=1)
    cost_fp = models.IntegerField(default=10, verbose_name="Focus Points Cost")

    # Requisitos simplificados
    intelligence_required = models.IntegerField(default=10)
    faith_required = models.IntegerField(default=0)

    # Tipo de magia simplificado
    is_offensive = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name