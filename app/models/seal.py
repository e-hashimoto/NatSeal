from .db import db

class Seal(db.Model):
    __tablename__ = 'seals'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(40), nullable=False, unique=True)
    scientific_name = db.Column(db.String(120), nullable=False, unique=True)
    image_url = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(10000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())


    # RELATIONSHIPS
    user = db.relationship('User', back_populates='seal')
    article = db.relationship('Article', back_populates='seal', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'scientific_name': self.scientific_name,
            'image_url': self.image_url,
            'description': self.description,
            'created_at': self.created_at
        }
