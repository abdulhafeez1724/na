from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Tags(models.Model):
    title = models.CharField(max_length=255)
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)
    
    class Meta:
        verbose_name_plural = "Tags"
        
    def __str__(self):
        return self.title

    def __repr__(self):
        return f"Tags(title='{self.title}', added_by={self.added_by})"