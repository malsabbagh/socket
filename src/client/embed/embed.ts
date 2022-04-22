declare var Webex: any;

document.addEventListener("DOMContentLoaded", function(event) {
    const baseUrl = window.location.hostname;
    var app = new Webex.Application();
    app.onReady().then(async () => {
        var url = `https://${baseUrl}`;
        console.log(`onReady called setting share Url ${url}`);
        app.on('application:shareStateChanged', (event: any) => { 
            if (event) {
                window.location.href = url;
            } else {
                window.location.href = `${url}/embedWebex.html`;
            }
        });
        await app.setShareUrl(url, url, "Socket Demo");
    });
});