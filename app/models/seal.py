from .db import db

class Seal(db.Model):
    __tablename__ = 'seals'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    scientific_name = db.Column(db.String(120), nullable=False, unique=True)
    image_url = db.Column(db.String(255))
    description = db.Column(db.String(10000))

    # RELATIONSHIPS
    user = db.relationship('User', back_populates='seals')

    
