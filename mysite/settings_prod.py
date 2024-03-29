from mysite.settings import *
import os

DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.postgresql_psycopg2',
		'NAME': os.getenv('DATABASE_NAME'),
		'USER': os.getenv('DATABASE_USER'),
		'PASSWORD': os.getenv('DATABASE_PASS'),
		'HOST': 'localhost'
	}
}
