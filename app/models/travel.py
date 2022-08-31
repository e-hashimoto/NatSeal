from .db import db

class Travel(db.Model):
    __tablename__ = 'travels'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'), nullable=False)
    description = db.Column(db.String(10000))
    image_url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())

    # RELATIONSHIP
    user = db.relationship('User', back_populates='travel')
    location = db.relationship('Location', back_populates='travel')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'location_id': self.location_id,
            'description': self.description,
            'image_url': self.image_url,
            'created_at': self.created_at
        }
