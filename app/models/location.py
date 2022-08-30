from .db import db

class Location(db.Model):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    coordinates = db.Column(db.Float)
    description = db.Column(db.String(10000))
    image_url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())


    # RELATIONSHIPS
    user = db.relationship('User', back_populates='location')
    travel = db.relationship('Travel', back_populates='location', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'coordinates': self.coordinates,
            'description': self.description,
            'image_url': self.image_url,
            'created_at': self.created_at
        }
