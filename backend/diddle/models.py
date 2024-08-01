from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    USER_ROLES = [
        ('client', 'Client'),
        ('freelancer', 'Freelancer'),
        ('trainer', 'Trainer'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=USER_ROLES)
    bio = models.TextField(blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    # website = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.get_role_display()}"

class ClientProfile(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)

    def __str__(self):
        return f"Client: {self.user_profile.user.username}"

class FreelancerProfile(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)

    def __str__(self):
        return f"Freelancer: {self.user_profile.user.username}"

class TrainerProfile(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    skills = models.ManyToManyField('Skill', through='TrainerSkill')

    def __str__(self):
        return f"Trainer: {self.user_profile.user.username}"

class Skill(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class TrainerSkill(models.Model):
    trainer = models.ForeignKey(TrainerProfile, on_delete=models.CASCADE)
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    proof_of_work = models.TextField()

    def __str__(self):
        return f"{self.trainer.user_profile.user.username} - {self.skill.name}"

class Project(models.Model):
    client = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='client_projects')
    title = models.CharField(max_length=255)
    lancer = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='lancer_projects', null=True, blank=True)
    description = models.TextField()
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    deadline = models.DateField()

    def __str__(self):
        return self.title

class LancerProposal(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='proposals')
    client = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='client_proposals', null=True, blank=True)
    lancer = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='lancer_proposals')
    proposal_text = models.TextField()
    proposed_amount = models.DecimalField(max_digits=10, decimal_places=2)
    proposed_deadline = models.DateField()

    def __str__(self):
        return f"{self.lancer.user.username} - {self.project.title}"
    
class HireApplication(models.Model):
    lancer = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='hire_applications')
    pitch = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.lancer.user.username} - Hire Application"