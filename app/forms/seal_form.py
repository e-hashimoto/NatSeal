from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length, ValidationError

def name_field_empty(form, field):
    name_body = field.data
    if len(name_body) == 0:
        raise ValidationError('Please provide the name of the seal.')

def scientific_name_empty(form, field):
    scientific_name_body = field.data
    if len(scientific_name_body) == 0:
        raise ValidationError('Please provide the scientific name of the seal.')

def no_image(form, field):
    image_url_body = field.data
    if len(image_url_body) == 0:
        raise ValidationError('Please provide an image of the seal.')

def no_description(form, field):
    description_body = field.data
    if len(description_body) == 0:
        raise ValidationError('Please provide an image for the seal.')

class SealForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), name_field_empty, Length(max=40)])
    scientific_name = StringField('Scientific Name', validators=[DataRequired(), scientific_name_empty, Length(max=120)])
    image_url = StringField('Image', validators=[DataRequired(), no_image, Length(max=255)])
    description = TextAreaField('Description', validators=[DataRequired(), no_description, Length(max=10000)])
    submit = SubmitField('Submit')

class EditSealForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), name_field_empty, Length(max=40)])
    scientific_name = StringField('Scientific Name', validators=[DataRequired(), scientific_name_empty, Length(max=120)])
    image_url = StringField('Image', validators=[DataRequired(), no_image, Length(max=255)])
    description = TextAreaField('Description', validators=[DataRequired(), no_description, Length(max=10000)])
    submit = SubmitField('Submit')
