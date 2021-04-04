
var dayTemplate = `
    <div class="card">
        <div class="card-header">
            <a href="#" data-toggle="collapse" class="card-link d-block" data-target="#text3"></a>
        </div>
        <div class="collapse" data-parent="#alldays" id="text3">
            <div class="card-body">
                <ul class="list-group">

                </ul>
            </div>
        </div>
    </div>`


function show(dayname,id,items){
    var itemstr="";
    for(var i=0;i<items.length;i++){
        itemstr+=`<a href="" class="list-group-item list-group-item-action">${items[i]}</a>`;
    }
    var dayTemplate = `
        <div class="card mt-1">
            <div class="card-header">
                <a href="#" data-toggle="collapse" class="card-link" data-target="#text${id}">${dayname}</a>
                <button type="button" class="close" aria-label="Close" data-toggle="modal"
                                data-target="#del_day_sure">
                                <span aria-hidden="true">&times;</span>
                            </button>
            </div>
            <div class="collapse" data-parent="#alldays" id="text${id}">
                <div class="raw clearfix mr-3 mt-2">
                        <button class="btn btn-primary float-right add_item_btn">添加</button>
                 </div>
                <div class="card-body">

                    <ul class="list-group">

                    </ul>
                </div>
            </div>
        </div>`;

    dayTemplate=$(dayTemplate);
    dayTemplate.find(".list-group").prepend(itemstr);
    $("#list").prepend(dayTemplate);
    $("#list").find(".add_item_btn").bind("click",function(){

    $(this).addClass("adding");
    addItem();
    $(this).removeClass("adding");
    })
}

function addDay(dayname = "day",id) {
    var dayTemplate = `
        <div class="card mt-1">
            <div class="card-header">
                <a href="#" data-toggle="collapse" class="card-link" data-target="#text${id}">${dayname}</a>
                <button type="button" class="close" aria-label="Close" data-toggle="modal"
                    data-target="#del_day_sure">
                    <span aria-hidden="true">&times;</span>
                 </button>
            </div>
            <div class="collapse" data-parent="#alldays" id="text${id}">
                <div class="raw clearfix mr-3 mt-2">
                        <button class="btn btn-primary float-right add_item_btn">添加</button>
                </div>

                <div class="card-body">

                    <ul class="list-group">
    
                    </ul>
                </div>
            </div>
        </div>`;

    var list = $("#list");
    list.prepend(dayTemplate);
    list.find(".add_item_btn").bind("click",function(){

        $(this).addClass("adding");
        addItem();
        $(this).removeClass("adding");
    })
};

function addafair() {
    var temp = `<div class="input-group flex-nowrap">
    <div class="input-group-prepend mb-1">
      <span class="input-group-text" id="addon-wrapping">日期</span>
    </div>
    <input id="input-day" type="text" class="form-control" aria-label="Username" aria-describedby="addon-wrapping">
  </div>`;
    temp = $(temp);

    var input = $(temp.find("#input-day"));
    $("#list").prepend(temp);
    input.focus();
    input.blur(function (e) {
        var value = this.value;
        if(value===""){
            temp.remove();
            return ;
        }
        $.ajax({
            type: "POST",
            url: url_new_day,
            data: JSON.stringify({
                "dayname": value
            }),
            contentType: "application/json;charset=UTF-8",
            success: data => {
                temp.remove();
                addDay(value,id=data.day_id);
            }
        })
    });

}

function addItem() {
    var temp = `<div class="input-group flex-nowrap">
    <div class="input-group-prepend mb-1">
      <span class="input-group-text" id="addon-wrapping">事务</span>
    </div>
    <input id="input-item" type="text" class="form-control" aria-label="Username" aria-describedby="addon-wrapping">
  </div>`;
    temp = $(temp);
    var input = $(temp.find("#input-item"));
    var itemList = $(".adding").parent().next().children().first();

    dayname= $(".adding").parent().parent().prev().children().first().text();
    itemList.prepend(temp);
    input.focus();
    input.blur(function () {
        var value = this.value;
        if(value===""){
            temp.remove();
            return;
        }
        temp.remove();
        $.ajax({
            type: "POST",
            url: url_new_item,
            data: JSON.stringify({
                "dayname":dayname,
                "item":value
            }),
            contentType:"application/json;charset=UTF-8",
            success:function(data){
                temp.remove();
                itemList.prepend(`<a href="" class="list-group-item list-group-item-action">${data.item_content}</a>`);
            }
        })
    })
}


function delDay(){

}

 $(document).ready(function () {
        var list = $("#list");
        var add = $("#addafair");
        add.click(function () {
            addafair();
        })
     $.ajax({
        type:"GET",
        url:url_index,
        contentType:"application/json;charset=UTF-8",
        success:data=>{
            for(var i=0;i<data.day_ids.length;i++){
                show(data.daynames[i],data.day_ids[i],data.items[data.daynames[i]])
            }
        }
     });
    

 })

// $(window).bind("hashchange", function () {
//     var hash = window.location.hash.replace("#", '');
//     var url = null;
//     if (hash === "edit") {

//     }
//     if (hash === 'addafair') {
//         addafair();
//     }
//     $.ajax({
//         type: 'GET',
//         url: url,
//         success: function (data) {
//             $("#alldays").prepend()
//         }
//     })
// })

