from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    full_name = db.Column(db.String(128), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    # RELATIONSHIPS
    location = db.relationship('Location', back_populates='user', cascade='all, delete-orphan')
    travel = db.relationship('Travel', back_populates='user', cascade='all, delete-orphan')
    seal = db.relationship('Seal', back_populates='user', cascade='all, delete-orphan')
    article = db.relationship('Article', back_populates='user', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'full_name': self.full_name
        }
