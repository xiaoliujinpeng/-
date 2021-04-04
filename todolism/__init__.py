import os
from todolism.settings import config
from todolism.extensions import db
from todolism.blueprints.home import home_bp
from todolism.blueprints.todo import todo_bp
from todolism.commands import register_commands

from flask import Flask

def create_app(config_name=None):
    if config_name==None:
        config_name=os.getenv("FLASK_CONFIG","development")

    app=Flask("todolism")
    app.config.from_object(config[config_name])
    register_extentions(app)
    register_blueprints(app)
    register_commands(app)
    return app

def register_extentions(app):
    db.init_app(app)

def register_blueprints(app):
    app.register_blueprint(home_bp)
    app.register_blueprint(todo_bp)



create_app()
