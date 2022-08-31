from flask import Blueprint, request, jsonify, render_template
from flask_login import login_required, current_user
from datetime import datetime
from app.models import Travel, db, travel

travel_routes = Blueprint('travels', __name__)

# Edit a Travel Opportunity

@travel_routes.route('/<int:id>/edit/', methods=['PUT'])
@login_required
def edit_travel(id):
    data = request.json
    travel = Travel.query.get(id)
    travel.description = request.json['description']
    travel.image_url = request.json['image']
    db.session.commit()
    return travel.to_dict()

# Get all Traveling Opportunities

@travel_routes.route('/')
@login_required
def all_travels():
    travels = Travel.query.all()
    data = [travel.to_dict() for travel in travels]
    return {'travels': data}

# Get a Travel Opportunity

@travel_routes.route('/<int:id>/')
@login_required
def one_travels(id):
    travel = Travel.query.get(id)
    return travel.to_dict()

# Create a Traveling Opportunity
