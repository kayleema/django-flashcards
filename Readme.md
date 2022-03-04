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
git checkout deploy  # switch to deploy branch
git merge main  # merge changes from main branch
cd client
rm -rf build # remove old build bundle
npm i
npm run build  # build frontend bundle
git add .
git commit -m "build bundle"  # commit built bundle to the deploy branch
git push heroku deploy:main  # deploy changes to heroku
```
