


SignOut = () => { if (firebase.auth().currentUser) { firebase.auth().signOut() } }

<<<<<<< HEAD
initApp = () => firebase.auth().onAuthStateChanged(user => { 
=======
initApp = () => firebase.auth().onAuthStateChanged(user => {
>>>>>>> bf3b851038a20432d881063ef7b8ab92745990d0
    if (!user) return window.location.replace("../../auth/login.html")
 });

 loadUI = (url,tagId) =>{
    fetch(url)
    .then(res => res.text())
    .then(res => {
        $("#"+tagId).html(res);
        if(tagId=='nav-menu') menuActive()
        if(tagId=='ex-event') $("#btnLogout").click((e) => SignOut())
    })
 }

 menuActive = () =>{
<<<<<<< HEAD
    var pathname = window.location.pathname.split("/");
    $("#menu-"+pathname[1]).addClass("active")
=======
     var a = window.location.pathname.split("/");
     var path = a[1];
    $("#menu-"+path).addClass("active");
>>>>>>> bf3b851038a20432d881063ef7b8ab92745990d0
 }


window.onload = () => {
    loadUI('../../layout/nav.html','nav-top');
    loadUI('../../layout/menu.html','nav-menu');
    loadUI('../../layout/footer.html','footer');
    loadUI('../../layout/modal.html','ex-event');
    initApp();
}