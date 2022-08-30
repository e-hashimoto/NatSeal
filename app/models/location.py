from .db import db

class Location(db.Model):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    coordinates = db.Column(db.Float)
    description = db.Column(db.String(10000))
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())


    # RELATIONSHIPS
    user = db.relationship('User', back_populates='location')
    travel = db.relationship('Travel', back_populates='location', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'location_id': self.location_id,
            'description': self.description,
            'created_at': self.created_at
        }
