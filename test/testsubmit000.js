var arr = [];
$(document).ready(function () {

    $("#submit").click(function () { headset(this) });
    
})

function removesub(e) {
    console.log("removesub");
    var headId = $(e).attr("data-head");
    var subId = $(e).attr("data-sub");
    console.log(headId); console.log(subId);
    arr[headId].sub.splice(subId, 1)
    console.log(subId);
    arr[headId].sub.sort()
    console.log(arr[headId].sub);
    $(`#sub_${headId}${subId}`).remove();

}

function clearHead(e) {
    console.log("clearHead")
    var clearH = $(e).attr("data-btn")
    arr.splice(clearH, 1)
    console.log(clearH);
    console.log(arr[clearH]);
    arr.sort()
    console.log(arr);
    headset('r')
}


function headset(e) {
    console.log("headset");

    var texts = $("#input").val()

    if (e != 'r') {
        arr.push({
            id: arr.length,
            head: texts,
            sub: []
        })
    }

    $("#value").html("")

    arr.forEach((el, index) => {
        $("#value").append(`
                        <div class="panel-group m-2" id="head_${index}">
                            <div class="panel panel-default"  >
                                <div class="panel-heading">
                                    <!-- <p>${el}. ${index}</p> -->
                                    <p style="color:#333">${(el.id + 1)}. ${el.head} 
                                        <button type="button" class="btn btn-danger float-right" 
                                        name="cleanSub" data-head="${index}" data-sub="${index}" data-add="false" data-btn="${index}">
                                            <i class="fas fa-times"></i>
                                        </button>
                                        <button type="button" class="btn btn-info float-right" style="margin:0px 5px" 
                                        name="addSub" data-add="true" data-sub="${index}" data-type="add">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                        <button class="btn btn-Secondary float-right"style="margin:0px 50px" data-toggle="collapse" data-target="#pannel_${(el.id)}"> 
                                            <i class="fas fa-angle-double-down"></i>
                                        </button>
                                    </p>
                                </div>
                                <div class="panel-body collapse" id="pannel_${el.id}" > ไม่พบข้อมูล... </div>
                            </div>
                        </div>
                    `)
        if (e != 'r') subset(`[data-head="${el.id}"]`, 1)
    });
    $(`[data-add="true"]`).click(function () { subset(this) });
    $(`[data-add="false"]`).click(function () { clearHead(this) });

}

function subset(e, n) {
    console.log("subset");
    var ID = $(e).attr("data-sub");
    if (!n) {
        arr[ID].sub.push({
            value: '',
            check: ['OK', 'NOT OK'],
            type: 'text',
            unit: '',
            config: ''
        })
    }
    // console.log(arr);
    // console.log(ID);
    var subtext = "";
    arr[ID].sub.sort()
    arr[ID].sub.forEach((subs, indexx) => {
        subtext += `
            <div class="row" id="sub_${ID}${indexx}">
                <div class="col-sm-2">
                    <input type="text" placeholder="ห้อข้อย่อย..." id="subh_${ID}" data-head="${ID}" data-sub="${indexx}" data-type="value" onKeyup="valueChange(this)" class="form-control" value="${subs.value}">
                </div>
                <div class="col-sm-2">
                    <input type="text" class="form-control" id="subl0_${ID}placeholder="add check list...">
                    <select name=""  class="form-control" id="subl1_${ID}" data-head="${ID}" data-sub="${indexx}" data-type="check" onChange="valueChange(this)">
                        <option value="OK">OK</option>
                        <option value="NOT OK">NOT OK</option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <select name=""  class="form-control"  id="subTN_${ID}" data-head="${ID}" data-sub="${indexx}" data-type="type" onChange="valueChange(this)">
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <textarea class="form-control" placeholder="unit..." id="subU_${ID}" data-head="${ID}" data-sub="${indexx}" data-type="unit" onKeyup="valueChange(this)" ></textarea>
                </div>
                <div class="col-sm-3">
                    <textarea class="form-control" placeholder="config..." id="subCF_${ID}" data-head="${ID}" data-sub="${indexx}" data-type="config" onKeyup="valueChange(this)" ></textarea>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="" >
                            Request Picture
                        </label>
                    </div>
                </div>
                
                <div class="col-sm-1">
                    <button type="button" class="btn btn-danger btn-xs" 
                    name="removeSub" data-head="${ID}" data-sub="${indexx}" data-type="remove">
                        remove <i class="fa fa-remove" />
                    </button>
                </div>
            </div>
            `;
    })
    $(`#pannel_${ID}`).html(subtext);
    $(`[data-type="remove"]`).click(function () { removesub(this) });
}

function sentData() {
    console.log("sentData");
    console.log(arr);
    firebase.database().ref('PM-Form').push({
        json: JSON.stringify(arr),
        name: $('#input').val(),
    });
}

function valueChange(e) {
    var headId = $(e).attr('data-head');
    var subId = $(e).attr('data-sub');
    var type = $(e).attr('data-type');
    arr[headId].sub[subId][type] = $(e).val();
    
    console.log('====================================');
    console.log(arr);
    console.log('====================================');
    console.log(arr[headId].sub[subId][type]);
}

$(document).ready(function () {

    $("#sent").click(function () { sentData(this) });
})