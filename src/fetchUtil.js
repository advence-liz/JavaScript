window.fetchUtil = function (options, errorFun) {
    if (getSecurityMode() == "0") {
        let request = encrypt(options.data);
        options.data = request;
    }

    let request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        credentials: "same-origin",
        body: options.data
    };
    if (options.method)
        request.method = options.method;
    if (options.cache)
        request.cache = options.cache;

    return fetch(options.url, request)
        .then(function (response) {
            if (response.ok) {
                // return response.text();
                return response.json();
            } else {
                if (response.status == 401) {
                    g.loading(false);
                    g.alert(true, {
                        title: I18N.get("Common.Gui", "Gui.Common_DocAve"),
                        content: I18N.get("Common.Gui", "Control.Gui_The session has timed out, please login again if you want to continue."),
                        type: 'i',
                        clickY: () => { location.href = "Login.aspx?status=1"; }
                    });
                } else if (response.status == 400) {
                    g.loading(false);
                    g.alert(true, {
                        title: I18N.get("Common.Gui", "Gui.Common_DocAve"),
                        content: I18N.get("Common.Gui", "Gui.Common_d7169263-ca9a-413b-8dc0-81afd5550b69"),
                        type: 'e'
                    });
                }

                if (errorFun)
                    errorFun(response);
                else
                    throw new Error(response.statusText);
            }
        }).then(function (dataStr) {
            if (dataStr == null || dataStr == '')
                return null;

            if (getSecurityMode() == "0") {
                dataStr = decryptResponse(dataStr);
            }

            return JSON.parse(dataStr);
        });
}