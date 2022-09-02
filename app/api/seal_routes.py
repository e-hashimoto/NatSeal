from flask import Blueprint, request, jsonify, render_template
from flask_login import login_required, current_user
from datetime import datetime
from app.models import Seal, db
from app.forms import seal_form

seal_routes = Blueprint('seals', __name__)

# EDIT A SINGLE SEAL
@seal_routes.route('/<int:id>/edit', methods=['PUT'])
# @login_required
def edit_one_seal(id):
    seal = Seal.query.get(id)
    form = seal_form.EditSealForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        seal.name = request.json['name']
        seal.scientific_name = request.json['scientific_name']
        seal.image_url = request.json['image_url']
        seal.description = request.json['description']
        db.session.commit()
        return Seal.to_dict()

# GET ALL SEALS
@seal_routes.route('/')
# @login_required
def get_all_seals():
    seals = Seal.query.all()
    data = [seal.to_dict() for seal in seals]
    return {'seals': data}

# GET ONE SEAL
@seal_routes.route('/<int:id>')
# @login_required
def get_one_seal(id):
    seal = Seal.query.get(id)
    return seal.to_dict()

# POST ONE SEAL
@seal_routes.route('/', methods=['POST'])
# @login_required
def post_seal():
    form = seal_form.SealForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        seal = Seal(
            user_id=form.data['user_id'],
            name=form.data['name'],
            scientific_name=form.data['scientific_name'],
            image_url=form.data['image_url'],
            description=form.data['description']
        )
        db.session.add(seal)
        db.session.commit()
        return seal.to_dict()

# DELETE ONE SEAL
@seal_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_seal(id):
    seal = Seal.query.get(id)
    db.session.delete(seal)
    db.session.commit()
    return seal.to_dict()
