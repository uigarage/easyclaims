var app = {};
app.$btnStart = $('#btnStart');
app.$btnLogin = $('#btnLogin');

app.$pages   = {
    intro: $('#intro'),
    loginPage: $('#loginPage'),
    policyInformation: $('#policyInformation')
};

console.log(app.$pages)

//  When "Start My Claiming Process" is clicked
app.$btnStart.bind("click", function(e) {
    console.log(e);
    app.$pages.intro.hide();
    app.$pages.loginPage.show();
})

app.$btnLogin.bind("click", function(e) {
    console.log(e);
    app.$pages.loginPage.hide();
    app.$pages.policyInformation.show();
})