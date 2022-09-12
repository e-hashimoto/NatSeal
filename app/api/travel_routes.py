from flask import Blueprint, request, jsonify, render_template
from flask_login import login_required, current_user
from datetime import datetime
from app.models import Travel, db
from app.forms import travel_form


travel_routes = Blueprint('travels', __name__)

# Edit a Travel Opportunity

@travel_routes.route('/<int:id>/edit', methods=['PUT'])
# @login_required
def edit_travel(id):
    travel = Travel.query.get(id)
    form = travel_form.EditTravelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        travel.name = request.json['name']
        travel.description = request.json['description']
        travel.image_url = request.json['image_url']
        db.session.commit()
        return travel.to_dict(), 201

# Get all Traveling Opportunities

@travel_routes.route('/')
# @login_required
def all_travels():
    travels = Travel.query.all()
    data = [travel.to_dict() for travel in travels]
    return {'travels': data}

# Get a Travel Opportunity

@travel_routes.route('/<int:id>')
# @login_required
def one_travels(id):
    travel = Travel.query.get(id)
    return travel.to_dict()

# # Create a Traveling Opportunity
@travel_routes.route('/', methods=['POST'])
# @login_required
def post_travel():
    form = travel_form.TravelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print('THIS IS ME!!!!!!!', form)
        travel = Travel(
            user_id=form.data['user_id'],
            location_id=form.data['location_id'],
            name=form.data['name'],
            description=form.data['description'],
            image_url=form.data['image_url']
        )
        db.session.add(travel)
        db.session.commit()
        return travel.to_dict()

# Delete a Traveling Opportunity
@travel_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_travel(id):
    travel = Travel.query.get(id)
    db.session.delete(travel)
    db.session.commit()
    return travel.to_dict()
