
function loadMessages() {
    console.log("data")
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
        $("#modelId").modal('hide');
    };
    var fang = function (oat) {
        console.log(oat.key);
    }
    firebase
        .database()
        .ref("/PM-Form/")
        .limitToLast(12)
        .on("child_added", callback);

    firebase
        .database()
        .ref("/csv/")
        .limitToLast(12)
        .on("child_added", callback);

    // firebase
    //     .database()
    //     .ref("/PM-Form/")
    //     .limitToLast(12)
    //     .on("child_removed", fang);

}