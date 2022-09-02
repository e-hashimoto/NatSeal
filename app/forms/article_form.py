from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length, ValidationError

def title_field_empty(form, field):
    title_field = field.data
    if len(title_field) == 0:
        raise ValidationError('Please provide a title for the article.')
    if len(title_field) > 200:
        raise ValidationError('Please no more than 200 characters for the title of the article.')

def body_field_empty(form, field):
    body_field = field.data
    if len(body_field) == 0:
        raise ValidationError('Please provide a body for the article.')
    if len(body_field) > 15000:
        raise ValidationError('Please no more than 15,000 characters for the article.')

class ArticleForm(FlaskForm):
    user_id = StringField('User ID', validators=[DataRequired()])
    seal_id = StringField('Seal ID', validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired(), title_field_empty])
    body = TextAreaField('Body', validators=[DataRequired(), body_field_empty])
    submit = SubmitField('Submit')

class EditArticleForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), title_field_empty])
    body = TextAreaField('Body', validators=[DataRequired(), body_field_empty])
    submit = SubmitField('Submit')
