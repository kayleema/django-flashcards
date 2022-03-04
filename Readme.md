# Django Flashcards

## Project Setup

Setup python virtual environment
```shell
cd mysite
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Initialize database
```shell
python manage.py migrate
```

## Management Commands

* Run tests: `python manage.py test`
* Run backend server: `python manage.py runserver`
* Run migrations: `python manage.py migrate`
* Create new migrations: `python manage.py makemigrations`
* Create admin superuser: `python manage.py createsuperuser`

## Setup for Pycharm Testing Integration
* Preferences → Languages & Frameworks → Django
  * Enable Django Support, Specify Django Project Root, Specify Settings
* Preferences → Project: ... → Python Interpreter
  * Add new python environment using venv setup above

## Adding a Dependency

```shell
pip install my-new-dependency
pip freeze > requirements.txt
```

# Deploy

```
git checkout deploy
# first merge main branch then...
cd client
npm i
npm run build
git add .
git commit -m "build bundle"
git push heroku deploy:main
```
