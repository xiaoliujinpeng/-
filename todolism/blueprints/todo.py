from flask import Blueprint,request,jsonify,current_app
from todolism.models import Day,Item
from todolism.extensions import db
todo_bp=Blueprint("todo",__name__)

@todo_bp.route("/new/dayEvent",methods=["POST"])
def new_dayEvent():
    data=request.get_json()
    if data is None or data["dayname"].strip()=='':
        jsonify(message="无效"),400
    try:
        day=Day(name=data.get("dayname"))
        db.session.add(day)
        db.session.commit()
    except:
        db.session.rollback()
        return jsonify(message="提交失败"),400
    return jsonify(message="提交成功",day_id=day.id)

@todo_bp.route("/new/item",methods=["POST"])
def new_item():
    data=request.get_json()
    if data is None or data["dayname"].strip()=='' or data["item"].strip()=='':
        return jsonify(message="无效"),400
    day=Day.query.filter_by(name=data.get("dayname")).first()
    try:
        item=Item(description=data.get("item"),day_id=day.id)
        db.session.add(item)
        db.session.commit()
    except:
        db.session.rollback()
        return jsonify(message="提交失败")
    return jsonify(message="提交成功",item_content=item.description)

@todo_bp.route("/index")
def index():
    days=Day.query.paginate(1,current_app.config["DAYS_PER_PAGE"]).items
    print(days)
    daynames=list()
    items=dict()
    day_ids=list()
    for each in days:
        daynames.append(each.name)
        items[each.name]=list(map(lambda x:x.description,each.items))
        day_ids.append(each.id)
    print(items)
    return jsonify(daynames=daynames,items=items,day_ids=day_ids)