


SignOut = () => { if (firebase.auth().currentUser) { firebase.auth().signOut() } }

initApp = () => firebase.auth().onAuthStateChanged(user => { 
    // console.log('==================auth==================');
    // console.log(user);
    // console.log('====================================');
    if (!user) return window.location.replace("../auth/login.html")
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
    var pathname = window.location.pathname.replace(/\//gi,"");
    // console.log('====================================');
    // console.log(pathname);
    // console.log('====================================');
    $("#menu-"+pathname).addClass("active")
 }


window.onload = () => {
    loadUI('../layout/nav.html','nav-top');
    loadUI('../layout/menu.html','nav-menu');
    loadUI('../layout/footer.html','footer');
    loadUI('../layout/modal.html','ex-event');
    initApp();
}