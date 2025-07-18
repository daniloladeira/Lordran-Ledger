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

    image = models.ImageField(upload_to='weapons/', blank=True, null=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    physical_damage = models.IntegerField(default=0)
    magic_damage = models.IntegerField(default=0)
    fire_damage = models.IntegerField(default=0)
    lightning_damage = models.IntegerField(default=0)
    critical = models.IntegerField(default=100)
    durability = models.IntegerField(default=100)
    weight = models.FloatField()

    strength_required = models.IntegerField()
    dexterity_required = models.IntegerField()
    intelligence_required = models.IntegerField()
    faith_required = models.IntegerField()

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

    name = models.CharField(max_length=100)
    description = models.TextField()
    school = models.CharField(max_length=20, choices=SPELL_TYPE_CHOICES)

    slots_required = models.IntegerField(default=1)
    uses = models.IntegerField(default=1)
    cost_fp = models.IntegerField(default=0, verbose_name="Focus Points Cost")
    cost_stamina = models.IntegerField(default=0)

    intelligence_required = models.IntegerField(default=0)
    faith_required = models.IntegerField(default=0)

    is_offensive = models.BooleanField(default=True)
    is_buff = models.BooleanField(default=False)
    is_heal = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name