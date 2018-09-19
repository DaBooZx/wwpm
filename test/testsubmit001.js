var arr = [];
$(document).ready(function () {

    $("#submit").click(function () { headSet(this) });

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

function headSet(e) {
    console.log("fn.headSet");

    var texts = $("#input").val()

    arr.push({
        id: arr.length,
        head: texts,
        sub: []
    });

    console.log(arr);
    

    $("#value").html("")
    arr.forEach((data, index) => {
        $("#value").append(`
                        <div class="panel-group m-2" id="head_${index}">
                            <div class="panel panel-default"  >
                                <div class="panel-heading">
                                    <p style="color:#333">${(data.id + 1)}. ${data.head} 
                                        <button type="button" class="btn btn-danger float-right" name="cleanSub" 
                                        data-deleteHead=true data-clearHead="${index}">
                                            <i class="fas fa-times"></i>
                                        </button>
                                        <button type="button" class="btn btn-info float-right" style="margin:0px 5px" 
                                        name="addSub" >
                                            <i class="fas fa-plus"></i>
                                        </button>
                                        <button class="btn btn-Secondary float-right"style="margin:0px 50px" 
                                        data-toggle="collapse" data-target="#pannel_${(index)}"> 
                                            <i class="fas fa-angle-double-down"></i>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    `)
    });
    
    $(`[data-deleteHead="true"]`).click(function () { deleteHead(this) });
}