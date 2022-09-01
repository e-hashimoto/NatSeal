from .db import db

class Article(db.Model):
    __tablename__ = 'articles'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    seal_id = db.Column(db.Integer, db.ForeignKey('seals.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    body = db.Column(db.String(15000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())

    # RELATIONSHIP
    user = db.relationship('User', back_populates='article')
    seal = db.relationship('Seal', back_populates='article')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'seal_id': self.seal_id,
            'title': self.title,
            'body': self.body,
            'created_at': self.created_at
        }
