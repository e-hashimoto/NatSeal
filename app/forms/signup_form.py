from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("We're sorry. That email address is already in use.")


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def username_empty(form, field):
    # Must provide username
    username = field.data
    if len(username) == 0:
        raise ValidationError('Username is required.')
    elif len(username) > 40:
        raise ValidationError('Username must be no more than 40 characters.')

def email_validations(form, field):
    email = field.data

    if '@' not in email:
        raise ValidationError('Email must be a valid email.')
    if len(email) > 255:
        raise ValidationError('Email cannot be more than 255 characters.')
    elif len(email) == 0:
        raise ValidationError('Please provide an email address')

def email_exists(form, field):
    email = field.data
    existing_email = User.query.filter(User.email == email).first()
    if existing_email:
        raise ValidationError('Email is already in use.')

# def full_name_length(form, field):
#     full_name = field.data

#     if len(full_name) > 128:
#         raise ValidationError('Full name cannot be longer than 128 characters.')
#     if len(full_name) == 0:
#         raise ValidationError('Full name is required.')

def password_length(form, field):
    password = field.data

    if len(password) < 6:
        raise ValidationError('Password must be at least 6 characters long.')
    if len(password) > 20:
        raise ValidationError('Password must be no more than 20 characters long.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, user_exists, username_empty])
    email = StringField('email', validators=[DataRequired(), user_exists, email_validations, email_exists])
    password = StringField('password', validators=[DataRequired(), password_length])
    # full_name =
