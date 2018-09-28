var arr = [];

$(document).ready(function () {
    $("#Bbtn_submitT").click(function (e) {
        e.preventDefault();
        add_head();
    });


});

function add_head() {
    var textH =$("#text1").val();
    var Appover =$("#AppoverR").val();
    var h = arr.length;
    arr.push({
        name: textH,
        appover: Appover,
        sub: []
    })
    $("#render").append(text_head(h, arr[h]))
    //console.log(arr);

}

function add_sub(h) {
    var s = arr[h].sub.length;
    arr[h].sub.push({
        data: "text"

    })
    $(`#h${h}`).append(text_sub(h, s, arr[h].sub[s]))
    //console.log(arr);

}

function del_head(h) {
    arr.splice(h, 1)
    render_head()
    //console.log(arr);

}

function del_sub(h, s) {
    arr[h].sub.splice(s, 1)
    render_sub(h)
}

function render_head(h) {
    var head_div = $(`#render`);
    head_div.empty();
    arr.forEach((e, i) => {
        head_div.append(text_head(i, e))
        render_sub(i)
    });
    //console.log(arr);
}

function render_sub(h) {
    var sub_div = $(`#h${h}`);
    sub_div.empty();
    arr[h].sub.forEach((e, i) => {
        sub_div.append(text_sub(h, i, e))
    });
    //console.log(arr);

}

function textChange_haed(e) {
    var h = $(e).attr('pos_head');
    var k = $(e).attr('data-change');
    arr[h][k] = e.value;
    //console.log(e.value, h);
}

function textChange_sub(e) {
    var h = $(e).attr('pos_head');
    var s = $(e).attr('pos_sub');
    var k = $(e).attr('data-change');
    arr[h].sub[s][k] = e.value;
    //console.log(e.value, h);
}



function text_head(h, e) {
    //console.log(e);

    var sub_render = render_sub(h);
    return `
                <div id="idh${h}"> 
                ${h + 1}.
                <input type="text" data-change="name" pos_head="${h}" onKeyup="textChange_haed(this)" value="${e.name}" >
                <button onclick="add_sub(${h})" class="btn btn-info">+</button>
                <button onclick="del_head(${h})" class="btn btn-danger">-</button>
                <div id="h${h}"></div>
                </div>
            `;
}

function text_sub(h, s, e) {
    return `
        <div id="idhs${h}${s}">
                ${h + 1}.${s + 1}.
                <input type="text" data-change="data" pos_head="${h}" pos_sub="${s}" onKeyup="textChange_sub(this)"  value="${e.data}">
                <button class="btn btn-danger" onclick="del_sub(${h},${s})" >-</button>
                </div>
        `;
}

function writeNewPost() {
    console.log(arr);
    var namee =$('#FormInputt').val();
    var numberr =$('#AppoverR').val();
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
    //console.log(arr)
}
}