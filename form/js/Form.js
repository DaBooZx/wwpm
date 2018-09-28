var arr = [];
function loadMessages() {
    console.log("loadMessages")
    // Loads the last 12 messages and listen for new ones.
    var callback = function (snap) {

        var data = snap.val();
        // console.log(data);
        var div = $(`#${snap.key}`);

        // console.log(!div);
        if (!div == false) {
            // console.log("add");
            $("#text")
                .prepend(`
                <div id="${snap.key}" class="col-sm-12">
                    <div class="card text-black">
                        <div class="card-body">
            <!--            <div>${data.json}</div>  -->
                            <div style="float:left">Name : ${data.name}</div>
                            <button type="button" class="btn btn-success" 
                            style="float:right;margin:0px 0px 0px 20px"
                            onclick="theJson(this)" data-set="${snap.key}">Json</button>
                            <div style="float:right">Appover : ${data.number}</div>
                        </div>
                    </div>
                </div>
                `)
            console.log(data);
        }
    };

    firebase
        .database()
        .ref("/PM-Form/")
        .limitToLast(12)
        .on("child_added", callback);
}

function addSub(id) {
    console.log("addSub")
    console.log('====================================');
    console.log(id);
    console.log(arr[id]);
    console.log('====================================');
    arr[id].sub.push({
        value: '',
        check: ['OK', 'NOT OK'],
        type: 'text',
        unit: '',
        config: ''
    })
    render(id)


}

function valueChange(e) {
    var headId = $(e).attr('data-head');
    var subId = $(e).attr('data-sub');
    var type = $(e).attr('data-type');
    arr[headId].sub[subId][type] = $(e).val();
    var textss = arr[headId].sub[subId][type];

    console.log('====================================');
    console.log(textss);
    console.log('====================================');

}


function render(id) {
    var subtext = "";
    var index = 0;
    console.log(id);
    console.log("render");
    console.log('====================================');
    console.log(arr[id]);
    console.log(arr[id].sub);
    console.log('====================================');
    arr[id].sub.sort()
    arr[id].sub.forEach(subs => {
        subtext += `
            <div class="row">
                <div class="col-sm-2">
                    <input type="text" placeholder="ห้อข้อย่อย..." id="subh_${id}" data-head="${id}" data-sub="${index}" data-type="value" onKeyup="valueChange(this)" class="form-control" value="${subs.value}">
                </div>
                <div class="col-sm-2">
                    <input type="text" class="form-control" id="subl0_${id}placeholder="add check list...">
                    <select name=""  class="form-control" id="subl1_${id}" data-head="${id}" data-sub="${index}" data-type="check" onChange="valueChange(this)">
                        <option value="OK">OK</option>
                        <option value="NOT OK">NOT OK</option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <select name=""  class="form-control"  id="subTN_${id}" data-head="${id}" data-sub="${index}" data-type="type" onChange="valueChange(this)">
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <textarea class="form-control" placeholder="unit..." id="subU_${id}" data-head="${id}" data-sub="${index}" data-type="unit" onKeyup="valueChange(this)" ></textarea>
                </div>
                <div class="col-sm-3">
                    <textarea class="form-control" placeholder="config..." id="subCF_${id}" data-head="${id}" data-sub="${index}" data-type="config" onKeyup="valueChange(this)" ></textarea>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="" >
                            Request Picture
                        </label>
                    </div>
                </div>
                
                <div class="col-sm-1">
                    <button type="button" class="btn btn-danger btn-xs" onclick="removeSub(${id},${index})" >
                        remove <i class="fa fa-remove" />
                    </button>
                </div>
            </div>
            `;
        index++;
    })
    $(`#pannel_${id}`).html(subtext);
    return subtext;
}

function removeSub(head, id) {
    console.log('=============remove=================');
    console.log("removeSub");
    console.log(id);
    console.log(arr[head]);
    console.log(arr[head].sub[id]);
    console.log('=============remove=================');
    arr[head].sub.splice(id, 1)
    render(head)
}




$(document).ready(function () {
    $("#json").click(() => {
        console.log(JSON.stringify(arr));
    })
    $("#submit").click(function () {
        var texts = $("#text1").val()
        
            arr.push({
                id: arr.length,
                head: texts,
                sub: []
            })
            console.log(arr);
        
        $("#value").html("")

        arr.forEach((el, index) => {

            $("#value").append(`
        <div class="panel-group m-2" id="head_${index}">
            <div class="panel panel-default"  >
                <div class="panel-heading">
                    <!--<a href="#"  data-toggle="collapse" data-target="#pannel_${(el.id)}" >${(el.id + 1)}. ${el.head}</a> -->
                    <p style="color:#333">${(el.id + 1)}. ${el.head} 
                        <button type="button" class="btn btn-danger btn-xs float-right" onclick="cleanSub(${index})" >
                            <i class="fas fa-times"></i>
                        </button>
                        <button type="button" class="btn btn-info float-right btn-xs" style="margin:0px 10px" onclick="addSub(${el.id})" >
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="btn btn-Secondary float-right" data-toggle="collapse" style="margin:0px 50px" data-target="#pannel_${(el.id)}"> 
                            <i class="fas fa-angle-double-down"></i>
                        </button>
                        </p>
                </div>
                <div class="panel-body collapse" id="pannel_${el.id}" > ไม่พบข้อมูล... </div>
                
            </div>
        </div>
        `)
        });
    });

});

function cleanSub(id) {
    console.log("cleanSub");
    console.log(id);
    arr.splice(id, 1)
    $(`#head_${id}`).remove();
    // arr[id].sub.sort()
}

function writeNewPost() {
    console.log(arr);
    var namee =$('#FormInputt').val();
    var numberr =$('#vVersionn').val();
    if(namee == ""){
        alert("please enter word in Form-name"); 
    } else if(numberr == ""){
        alert("please enter word in Form-number"); 
    }else{
    firebase.database().ref('PM-Form').push({
        json: JSON.stringify(arr),
        name: namee,
        number: numberr
    })
    console.log(arr)}
}

function theJson(e) {
    $("#listt,#text").toggle()
    var id = $(e).attr('data-set');
    console.log(id);

    var leadsRef = firebase.database().ref(`PM-Form/${id}`);
    leadsRef.on('value', function (snapshot) {
        var useJson = snapshot.val().json;
        var obj = JSON.parse(useJson);
        $("#listt").html("")

        var subtext = "";
        obj.forEach((el, i) => {
            subtext += `
            <div class="panel-group m-2">
                <div class="panel panel-default"  >
                    <div class="panel-heading">
                        <!--<a href="#"  data-toggle="collapse" data-target="#pannel_${(el.id)}" >${(el.id + 1)}. ${el.head}</a> -->
                        <p style="color:#333">${(el.id + 1)}. ${el.head} 
                            <button class="btn btn-Secondary pull-right" data-toggle="collapse" data-target="#pannel_${(el.id)}"> 
                                <i class="fas fa-angle-double-down"></i>
                            </button>
                        </p>
                    </div>
                    <div class="panel-body collapse" id="pannel_${(el.id)}" >${renderSubs(el.sub)} </div>
                    
                </div>
            </div>
            `;
        })
        $("#listt").html(subtext)
    });

}

function renderSubs(subs) {
    var str = "";
    subs.forEach((subs, index) => {
        console.log(subs);
        console.log(subs.value);
        str += `
            <div class="row">
                <div class="col-sm-12">
                    <p>${subs.value}</p>
                    <div class="row">
                        <div class="col-sm-3">
                            <p>${subs.check}</p>
                        </div>
                        <div class="col-sm-3">
                            <p>${subs.type}</p>
                        </div>
                        <div class="col-sm-3">
                            <p>${subs.unit}</p>
                        </div>
                        <div class="col-sm-3">
                            <p>${subs.config}</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
    return str;
}