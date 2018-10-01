var arr = [];

$(document).ready(function () {
    $("#Bbtn_submitT").click(function (e) {
        e.preventDefault();
        var head_ip = $('#text1').val();
        if (head_ip == "") {
            alert("please enter word in Form-head");
        } else {
            add_head();
        }
    });


});

function add_head() {
    var textH = $("#text1").val();
    var Appover = $("#AppoverR").val();
    var Head = $("#text0").val();
    var h = arr.length;
    arr.push({
        name: textH,
        appover: Appover,
        head : Head,
        sub: []
    })
    $("#render").append(text_head(h, arr[h]))
    //console.log(arr);

}

function add_sub(h) {
    var s = arr[h].sub.length;
    arr[h].sub.push({
        data: ""

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
                <input type="text" id="idh_ip${h}" data-change="name" pos_head="${h}" onKeyup="textChange_haed(this)" value="${e.name}" >
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
                <input type="text" id="idhs_ip${h}" data-change="data" pos_head="${h}" pos_sub="${s}" onKeyup="textChange_sub(this)"  value="${e.data}">
                <button class="btn btn-danger" onclick="del_sub(${h},${s})" >-</button>
                </div>
        `;
}

function writeNewPost() {
    console.log(arr);
    var namee = $('#FormInputt').val();
    var Appover = $('#AppoverR').val();
    var head = $('#text1').val();
    var Head = $('#text0').val();
    var jArr = JSON.stringify(arr);
    if (Head == "") {
        alert("please enter word in Head");
    } else if (head == "") {
        alert("please enter word in Head-sub");
    } else if (jArr == "[]") {
        alert("please click-add 'Head'");
    }else{
        firebase.database().ref('PM-Form1').push({
            name: namee,
            head : Head,
            appover: Appover,
            json: jArr
        })
        console.log(arr)
    }
}



$("#FormSumit").click(function (e) {
    var namee = $('#FormInputt').val();
    var numberr = $('#AppoverR').val();
    if (namee == "") {
        alert("please enter word in Form-name");
    } else if (numberr == "") {
        alert("please enter word in Form-number");
    } else {
        var err = 0;
        arr.forEach((dataC, I) => {
            if (dataC.name == "") {
                alert("null Head");
                err++;
            } else {
                dataC.sub.forEach((arrSub, i) => {
                    // (arrSub) ?  $("input").css("background-color", "#ed9068") : null;
                    if (arrSub.data == "") {
                        alert("null input");
                        err++;
                    } else {
                        console.log(55555);

                    }

                })
            }
        });

        if (err == 0) {
            writeNewPost();
        }

    }

})

function theJson(e) {
    $("#listt,#text").toggle()
    var id = $(e).attr('data-set');
    console.log(id);

    var leadsRef = firebase.database().ref(`PM-Form1/${id}`);
    leadsRef.on('value', function (snapshot) {
        var useJson = snapshot.val().json;
        var obj = JSON.parse(useJson);
        $("#listt").html("")
        console.log(obj);
        var subtext = "";
        obj.forEach((el, i) => {
            subtext += `
            <div class="panel-group m-2">
                <div class="panel panel-default"  >
                    <div class="panel-heading">
                        <!--<a href="#"  data-toggle="collapse" data-target="#pannel_${(el.id)}" >${(el.id + 1)}. ${el.head}</a> -->
                        <p style="color:#333">${(i + 1)}. ${el.head} (${el.name})
                            <button class="btn btn-Secondary pull-right" data-toggle="collapse" data-target="#pannel_${(i)}"> 
                                <i class="fas fa-angle-double-down"></i>
                            </button>
                        </p>
                    </div>
                    <div class="panel-body collapse" id="pannel_${(i)}" >${renderSubs(el.sub)} </div>
                    
                </div>
            </div>
            `;
        })
        $("#listt").html(subtext)
    });

}

function renderSubs(sub) {
    var str = "";
    sub.forEach((subs, index) => {
        // console.log(subs);
        // console.log(subs.data);

        str += `
                <span style="margin:0px 20px">
                    ${subs.data}
                </span>
        `
    })
    return str;
}

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
                            <div style="float:right">Appover : ${data.appover}</div>
                        </div>
                    </div>
                </div>
                `)
            console.log(data);
        }
    };

    firebase
        .database()
        .ref("/PM-Form1/")
        .limitToLast(12)
        .on("child_added", callback);
}