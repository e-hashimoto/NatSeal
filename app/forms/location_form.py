from typing import Text
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, Length

def no_image(form, field):
    image_url_body = field.data
    if len(image_url_body) == 0:
        raise ValidationError('Please provide an image of this location')

def description_length(form, field):
    description_body = field.data
    if len(description_body) == 0:
        raise ValidationError("We're sorry.  The location description can be no longer than 10,000 characters.")

def latitude_not_float(form, field):
    latitude = field.data
    if type(latitude) is not float:
        raise ValidationError("Please provide a decimal for latitude.")
    if len(latitude) == 0:
        raise ValidationError('Please provide a decimal value for latitude.')

def longitude_not_float(form, field):
    longitude = field.data
    if type(longitude) is not float:
        raise ValidationError("Please provide a decimal for longitude.")
    if len(longitude) == 0:
        raise ValidationError("Please provide a decimal value for longitude.")

class LocationForm(FlaskForm):
    user_id = StringField('User ID', validators=[DataRequired()])
    latitude = FloatField('Latitude', validators=[])
    longitude = FloatField('Longitude', validators=[])
    description = TextAreaField('Description', validators=[Length(min=0, max=10000)])
    submit = SubmitField('Submit')

class EditLocationForm(FlaskForm):
    latitude = FloatField('Latitude')
    longitude = FloatField('Longitude')
    description = TextAreaField('Description', validators=[DataRequired])
