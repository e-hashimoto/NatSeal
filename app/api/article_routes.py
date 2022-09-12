from flask import Blueprint, request, jsonify, render_template
from flask_login import login_required, current_user
from datetime import datetime
from app.models import Article, db
from app.forms import article_form

article_routes = Blueprint('articles', __name__)

# EDIT AN ARTICLE

@article_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_article(id):
    article = Article.query.get(id)
    form = article_form.EditArticleForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        article.title = request.json['title']
        article.body = request.json['body']
        db.session.commit()
        return article.to_dict(), 201

# GET ALL ARTICLES

@article_routes.route('/')
@login_required
def get_all_articles():
    articles = Article.query.all()
    data = [article.to_dict() for article in articles]
    return {'articles': data}

# GET ONE ARTICLE

@article_routes.route('/<int:id>')
@login_required
def get_one_article(id):
    article = Article.query.get(id)
    return article.to_dict()

# POST ONE ARTICLE

@article_routes.route('/', methods=['POST'])
@login_required
def post_article():
    form = article_form.ArticleForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        article = Article(
            user_id=form.data['user_id'],
            seal_id=form.data['seal_id'],
            title=form.data['title'],
            body=form.data['body'],
        )
        db.session.add(article)
        db.session.commit()
        return article.to_dict()

# DELETE ONE ARTICLE

@article_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_article(id):
    article = Article.query.get(id)
    db.session.delete(article)
    db.session.commit()
    return article.to_dict()
