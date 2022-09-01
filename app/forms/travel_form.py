from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError

def no_image(form, field):
    image_url_body = field.data
    if len(image_url_body) == 0:
        raise ValidationError('Please provide a comment.')

def description_length(form, field):
    description_body = field.data
    if len(description_body) == 0:
        raise ValidationError('Travel description can be no longer than 10,000 characters.')

class TravelForm(FlaskForm):
    user_id = StringField('User ID', validators=[DataRequired()])
    location_id = StringField('Location ID', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[description_length, Length(min=0, max=10000)])
