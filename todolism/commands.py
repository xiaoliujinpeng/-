import click
from todolism.extensions import db

def register_commands(app):
    @app.cli.command()
    @click.option("--drop",is_flag=True,help="Create after drop")
    def initdb(drop):
        if drop:
            click.confirm("this operation will delete the database, do you want to continue?", abort=True)
            db.drop_all()
            click.echo("Initialized database")
        db.create_all()
        click.echo("Initilized database")