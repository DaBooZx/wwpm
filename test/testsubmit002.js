function subSet(e) {

    var ID = $(e).attr("data-sub");
    console.log("fn.subSet");
    arr[ID].sub.push({
        value: '',
        check: '',
        type: '',
        unit: '',
        config: ''
    })

    var subtext = "";
    arr[ID].sub.sort()
    arr[ID].sub.forEach((subs, index) => {
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
    $(`#pannel_${ID}`).html(subtext);
    $(`[data-btn="remove"]`).click(function () { removeSub(this) });
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
                                <div class="panel-body collapse" id="pannel_${index}" > ${data.sub} </div>
                            </div>
                        </div>
                    `})
        // if (e != 'r') subSet(`[data-head="${index}"]`, 1)
    ;
    $("#value").html(subBox);
    $(`[data-delH="true"]`).click(function () { deleteHead(this) });
    $(`[data-addH="true"]`).click(function () { subSet(this) })
}


// function headSet(e) {
//     console.log("fn.headSet");
//     var texts = $("#input").val()

//     arr.push({
//         id: arr.length,
//         head: texts,
//         sub: []
//     });

//     console.log(arr);


//     $("#value").html("")
//     arr.forEach((data, index) => {
//         $("#value").append(`
//                         <div class="panel-group m-2" id="head_${index}">
//                             <div class="panel panel-default"  >
//                                 <div class="panel-heading">
//                                     <p style="color:#333">${(data.id + 1)}. ${data.head} 
//                                         <button type="button" class="btn btn-danger float-right" name="cleanSub" 
//                                         data-delH=true data-clearHead="${index}">
//                                             <i class="fas fa-times"></i>
//                                         </button>
//                                         <button type="button" class="btn btn-info float-right" style="margin:0px 5px" 
//                                         name="addSub" data-addH="true" data-sub="${index}">
//                                             <i class="fas fa-plus"></i>
//                                         </button>
//                                         <button class="btn btn-Secondary float-right"style="margin:0px 50px" 
//                                         data-toggle="collapse" data-target="#pannel_${(index)}"> 
//                                             <i class="fas fa-angle-double-down"></i>
//                                         </button>
//                                     </p>
//                                 </div>
//                                 <div class="panel-body collapse" id="pannel_${index}" > ${data.sub} </div>
//                             </div>
//                         </div>
//                     `)
//         // if (e != 'r') subSet(`[data-head="${index}"]`, 1)
//     });

//     $(`[data-delH="true"]`).click(function () { deleteHead(this) });
//     $(`[data-addH="true"]`).click(function () { subSet(this) })
// }

// function subSet(e) {

//     var ID = $(e).attr("data-sub");
//     console.log("fn.subSet");
//     arr[ID].sub.push({
//         value: '',
//         check: '',
//         type: '',
//         unit: '',
//         config: ''
//     })

//     var subtext = "";
//     arr[ID].sub.sort()
//     arr[ID].sub.forEach((subs, index) => {
//         subtext += `
//             <div class="row" id="sub_${ID}${index}">
//                 <div class="col-sm-2">
//                     <input type="text" placeholder="ห้อข้อย่อย..."  class="form-control" id="subV_${ID}${index}"
//                     sub-h="${ID}" sub-b="${index}" sub-t="value" onKeyup="subKeyChenge(this)" value="${subs.value}">
//                 </div>
//                 <div class="col-sm-2">
//                     <input type="text" placeholder="Check"  class="form-control" id="subC_${ID}${index}"
//                     sub-h="${ID}" sub-b="${index}" sub-t="check" onKeyup="subKeyChenge(this)" value="${subs.check}">
//                 </div>
//                 <div class="col-sm-2">
//                 <input type="text" placeholder="Type" class="form-control" id="subT_${ID}${index}"
//                 sub-h="${ID}" sub-b="${index}" sub-t="type" onKeyup="subKeyChenge(this)" value="${subs.type}">
//                 </div>
//                 <div class="col-sm-2">
//                     <textarea class="form-control" placeholder="Unit..." id="subU_${ID}${index}" value="${subs.unit}"
//                     sub-h="${ID}" sub-b="${index}" sub-t="unit" onKeyup="subKeyChenge(this)">${subs.unit}</textarea>
//                 </div>
//                 <div class="col-sm-3">
//                     <textarea class="form-control" placeholder="Config..." id="subConf_${ID}${index}" value="${subs.config}"
//                     sub-h="${ID}" sub-b="${index}" sub-t="config" onKeyup="subKeyChenge(this)">${subs.config}</textarea>
//                     <div class="checkbox">
//                         <label>
//                             <input type="checkbox" value="" >
//                             Request Picture
//                         </label>
//                     </div>
//                 </div>
                
//                 <div class="col-sm-1">
//                     <button type="button" class="btn btn-danger btn-xs" name="removeSub" 
//                     data-btn="remove" sub_removeH="${ID}" sub_removeS="${index}" >
//                         remove 
//                     </button>
//                 </div>
//             </div>
//             `;
//     })
//     $(`[data-btn="remove"]`).click(function () { removeSub(this) });
//     return subtext;
// }