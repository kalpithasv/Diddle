import subprocess

def run_command(command):
    """Run a shell command and check if it was successful."""
    result = subprocess.run(command, shell=False)  # Recommended to avoid shell=True
    if result.returncode != 0:
        print(f"Command {' '.join(command)} failed with exit code {result.returncode}")
        exit(result.returncode)

# Install requirements
run_command(["pip", "install", "-r", "requirements.txt"])

# Convert static asset files
# run_command(["python", "manage.py", "collectstatic", "--no-input"])

# Apply any outstanding database migrations
run_command(["python", "manage.py", "migrate"])

print("Build process completed successfully.")