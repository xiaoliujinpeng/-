from todolism.extensions import db


class Day(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(100),unique=True)
    items=db.relationship("Item",back_populates="day",cascade="all")

class Item(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    description=db.Column(db.Text)
    day_id=db.Column(db.Integer,db.ForeignKey('day.id'))
    day=db.relationship("Day",back_populates='items')
