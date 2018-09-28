var arr = [];

$(document).ready(function () {

    $("#submit").click(function () {
        console.log("clickSubmit.headSet");
        var text = $("#input").val()
        if (text == "") {
            alert("Please enter message in input");
        } else {
            console.log(text);
            headSet(this)
        }
    });
    $("#sent").click(function (e) {
        console.log("ck.sent");
        // console.log(arr[0].sub);
        arr.forEach((dataC, I) => {
            console.log(dataC);
            dataC.sub.forEach((arrSub,i)=>{
                var value = arrSub.value;
                var check = arrSub.check;
                var type = arrSub.type;
                var unit = arrSub.unit;
                var config = arrSub.config;
                console.log(arrSub.check);
                if(value == ""){
                    alert("value null");
                } else if(check == ""){
                    alert("check null");
                }else if(type == ""){
                    alert("type null"); 
                } else if(unit == ""){
                    alert("unit null");
                } else if (config == ""){
                    alert("config null");
                } else {
                    console.log(1)
                }
                
                
                
            })
        });
        
    });
})



function deleteHead(e) {
    console.log("fn.deleteHead");
    var clearH = $(e).attr("data-clearHead");
    arr.splice(clearH, 1);
    arr.sort();
    console.log(arr);
    var x = $(`#head_${clearH}`);
    console.log(clearH);
    x.remove();

}

function removeSub(e) {
    console.log("fn.removeSub");
    var headId = $(e).attr("sub_removeH");
    var subId = $(e).attr("sub_removeS");
    arr[headId].sub.splice(subId, 1);
    arr[headId].sub.sort();
    $(`#sub_${headId}${subId}`).remove();
}


function headSet(e) {
    console.log("fn.headSet");
    
    var texts = $("#input").val()

    arr.push({
        id: arr.length,
        head: texts,
        sub: []
    });

    console.log(arr);
    var subBox = "";
    arr.forEach((data, index) => {
        subBox += `
                        <div class="panel-group m-2" id="head_${index}">
                            <div class="panel panel-default"  >
                                <div class="panel-heading">
                                    <p style="color:#333">${(data.id + 1)}. ${data.head} 
                                        <button type="button" class="btn btn-danger float-right" name="cleanSub" 
                                        data-delH=true data-clearHead="${index}">
                                            <i class="fas fa-times"></i>
                                        </button>
                                        <button type="button" class="btn btn-info float-right" style="margin:0px 5px" 
                                        name="addSub" data-addH="true" data-sub="${index}">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                        <button class="btn btn-Secondary float-right"style="margin:0px 50px" 
                                        data-toggle="collapse" data-target="#pannel_${(index)}"> 
                                            <i class="fas fa-angle-double-down"></i>
                                        </button>
                                    </p>
                                </div>
                                <div class="panel-body collapse" id="pannel_${index}"> </div>
                            </div>
                        </div>
                    `})
        // if (e != 'r') subSet(`[data-head="${index}"]`, 1)
    ;
    $("#value").html(subBox);
    $(`[data-delH="true"]`).click(function () { deleteHead(this) });
    $(`[data-addH="true"]`).click(function () { subSet(arr , arr.length) });
}

function subSet(sub , ID) {

    console.log("fn.subSet");
    console.log(sub[ID]);
    console.log('ID',ID);
    
    sub.push({
        value: '',
        check: '',
        type: '',
        unit: '',
        config: ''
    })

    var subtext = "";
    sub.sort()
    sub.forEach((subs, index) => {
        console.log(subs);
        console.log(index);
        
        // subs.forEach((key,i)=>{
        //     console.log(key);
        //     console.log(i);
        // })
        subtext += `
            <div class="row" id="sub_${ID}${index}">
                <div class="col-sm-2">
                    <input type="text" placeholder="ห้อข้อย่อย..."  class="form-control" id="subV_${ID}${index}"
                    sub-h="${ID}" sub-b="${index}" sub-t="value" onKeyup="subKeyChenge(this)" value="${subs.value}">
                </div>
                <div class="col-sm-2">
                    <input type="text" placeholder="Check"  class="form-control" id="subC_${ID}${index}"
                    sub-h="${ID}" sub-b="${index}" sub-t="check" onKeyup="subKeyChenge(this)" value="${subs.check}">
                </div>
                <div class="col-sm-2">
                <input type="text" placeholder="Type" class="form-control" id="subT_${ID}${index}"
                sub-h="${ID}" sub-b="${index}" sub-t="type" onKeyup="subKeyChenge(this)" value="${subs.type}">
                </div>
                <div class="col-sm-2">
                    <textarea class="form-control" placeholder="Unit..." id="subU_${ID}${index}" value="${subs.unit}"
                    sub-h="${ID}" sub-b="${index}" sub-t="unit" onKeyup="subKeyChenge(this)">${subs.unit}</textarea>
                </div>
                <div class="col-sm-3">
                    <textarea class="form-control" placeholder="Config..." id="subConf_${ID}${index}" value="${subs.config}"
                    sub-h="${ID}" sub-b="${index}" sub-t="config" onKeyup="subKeyChenge(this)">${subs.config}</textarea>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="" >
                            Request Picture
                        </label>
                    </div>
                </div>
                
                <div class="col-sm-1">
                    <button type="button" class="btn btn-danger btn-xs" name="removeSub" 
                    data-btn="remove" sub_removeH="${ID}" sub_removeS="${index}" >
                        remove 
                    </button>
                </div>
            </div>
            `;
    })
    $(`[data-btn="remove"]`).click(function () { removeSub(this) });
    $(`#pannel_${ID}`).html(subtext);
    return subtext;
}

function sentData() {
    console.log("fn.sentData");
    console.log(arr);
    firebase.database().ref('PM-Form').push({
        json: JSON.stringify(arr),
        name: $('#input').val(),
    });
}

function subKeyChenge(e) {
    console.log("fn.subKeyChenge");
    var subH = $(e).attr('sub-h');
    var subB = $(e).attr('sub-b');
    var subT = $(e).attr('sub-t');
    arr[subH].sub[subB][subT] = $(e).val();
    console.log(arr);
    
}