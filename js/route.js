
$("#btnLogout").click((e) => SignOut())
SignOut = () => { if (firebase.auth().currentUser) { firebase.auth().signOut() } }
initApp = () => firebase.auth().onAuthStateChanged(user => { 
    console.log('==================auth==================');
    console.log(user);
    console.log('====================================');
    if (!user) return window.location.replace("../auth/login.html")
 });


window.onload = () => {
    fetch('../layout/nav.html')
        .then(res => res.text())
        .then(res => {
            $("#nav-top").html(res);
        })
    fetch('../layout/menu.html')
        .then(res => res.text())
        .then(res => {
            $("#nav-menu").html(res);
            var pathname = window.location.pathname.replace(/\//gi,"");
            console.log('====================================');
            console.log(pathname);
            console.log('====================================');
            $("#menu-"+pathname).addClass("active")
        })
    fetch('../layout/footer.html')
        .then(res => res.text())
        .then(res => {
            $("#footer").html(res);
        })
    fetch('../layout/modal.html')
        .then(res => res.text())
        .then(res => {
            $("#ex-event").html(res);
        })



    initApp();
}