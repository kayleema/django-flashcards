# Django Flashcards

## Virtual Environment Setup

```shell
cd mysite
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Management Commands

* Run tests: `python manage.py test`
* Run backend server: `python manage.py runserver`

## Setup for Pycharm Testing Integration
* Preferences → Languages & Frameworks → Django
  * Enable Django Support, Specify Django Project Root, Specify Settings
* Preferences → Project: ... → Python Interpreter
  * Add new python environment using venv setup above

