function theJson(e) {
    $("#listt,#text").toggle()
    var id = $(e).attr('data-set');
    console.log(id);

    var leadsRef = firebase.database().ref(`PM-Form / ${ id }`);
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