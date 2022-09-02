from flask import Blueprint, request, jsonify, render_template
from flask_login import login_required, current_user
from datetime import datetime
from app.forms import location_form
from app.models import Location, db

location_routes = Blueprint('locations', __name__)

# Edit Single Location

@location_routes.route('/<int:id>/edit/', methods=['PUT'])
# @login_required
def edit_location(id):
    location = Location.query.get(id)
    location.latitude = request.json['latitude']
    location.longitude = request.json['longitude']
    location.description = request.json['description']
    db.session.commit()
    return location.to_dict()

# Get All Locations

@location_routes.route('/')
# @login_required
def all_locations():
    locations = Location.query.all()
    data = [location.to_dict() for location in locations]
    return {'locations': data}

# Get a Single Location

@location_routes.route('/<int:id>/')
# @login_required
def one_location(id):
    location = Location.query.get(id)
    return location.to_dict()

# Post a Single Location
@location_routes.route('/', methods=['POST'])
# @login_required
def create_location():
    form = location_form.LocationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data, 'HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
    if form.validate_on_submit():
        location = Location(
            user_id=form.data['user_id'],
            latitude=form.data['latitude'],
            longitude=form.data['longitude'],
            description=form.data['description'],
            image_url=form.data['image_url']
        )
        print(location, '++++++++++++++++++++++++++++++++++')
        db.session.add(location)
        db.session.commit()
        return location.to_dict()


# Delete a Single Location
@location_routes.route('/<int:id>/', methods=['DELETE'])
# @login_required
def delete_location(id):
    location = Location.query.get(id)
    db.session.delete(location)
    db.session.commit()
    return location.to_dict()
