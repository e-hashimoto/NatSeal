# from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError

def no_image(form, field):
    image_url_body = field.data
    if len(image_url_body) == 0:
        raise ValidationError('Please provide an image for this travel opportunity.')

def description_length(form, field):
    description_body = field.data
    if len(description_body) == 0:
        raise ValidationError("We're sorry.  The travel description can be no longer than 10,000 characters.")

def no_name(form, field):
    name_body = field.data
    if len(name_body) == 0:
        raise ValidationError("Please provide a name for this travel opportunity.")

class TravelForm(FlaskForm):
    user_id = StringField('User ID', validators=[DataRequired()])
    location_id = StringField('Location ID', validators=[DataRequired()])
    name = StringField('Name', validators=[DataRequired(), no_name])
    description = TextAreaField('Description', validators=[description_length, Length(min=0, max=10000)])
    image_url = StringField('Image URL', validators=[DataRequired(), no_image])
    submit = SubmitField('Submit')

class EditTravelForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), no_name])
    description = TextAreaField('Description', validators=[description_length, Length(min=0, max=10000)])
    image_url = StringField('Image URL', validators=[DataRequired(), no_image])
    submit = SubmitField('Submit')
