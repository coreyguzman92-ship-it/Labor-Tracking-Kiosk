// ==UserScript==
// @name          Labor Tracking 2.0
// @version       1.2.2
// @description   Adds Calm Code Buttons into the FCLM Labor Tracking Kiosk.
// @author        @jeickels @dkingamz @salloumr
// @author        Edited by @corguzma
// @match         https://fcmenu-iad-regionalized.corp.amazon.com/*/laborTrackingKiosk*
// @match         http://fcmenu-iad-regionalized.corp.amazon.com/*/laborTrackingKiosk*
// @exclude       http://fcmenu-iad-regionalized.corp.amazon.com/do/laborTrackingKiosk*
// @exclude       https://fcmenu-iad-regionalized.corp.amazon.com/do/laborTrackingKiosk*
// @downloadURL   https://axzile.corp.amazon.com/-/carthamus/download_script/labor-tracking-relo,-cre-ts.user.js
// @updateURL     https://axzile.corp.amazon.com/-/carthamus/download_script/labor-tracking-relo,-cre-ts.user.js
// ==/UserScript==
var css = document.createElement("style");
css.innerHTML += `
* {
    box-sizing: border-box;
}
#body {
    display: flex;
    flex-flow: row nowrap;
    align-content: space-around;
    justify-content: space-around;
}
#body > .login {
    margin: 0;
    width: 25%;
    max-width: 300px;
}
#body > #toolbox {
    width: 75%;
    flex-grow: 2;
    font-size: 150%;
    display: flex;
    flex-flow: column nowrap;
    align-content: space-around;
    justify-content: space-around;
}
#body > #toolbox > .row {
    margin-bottom: 8px;
}
#body > #toolbox > .row > h1 {
    border-bottom: 2px inset;
    margin-bottom: 4px;
    padding: 0 8px;
    background: rgba(255,255,255,0.5);
}
#body > #toolbox > .row > .roles {
    display: flex;
    flex-flow: row nowrap;
    align-content: space-between;
    justify-content: space-between;
    padding: 0 8px;
    max-width: 800px;
}
#body > #toolbox > .row > .roles > button {
    display: table-row;
    max-width: 25%;
    background: #3498db;
    border-radius: 13px;
    border:1px solid black;
    color: #ffffff;
    font-size: 20px;
    padding: 4px 12px;
    margin: 0 8px;
}
#body > #toolbox > .row > .roles > button:hover {
    background: #3cb0fd;
}
`;
document.querySelector("head").appendChild(css);
function movebox() {
    let waitForIt;
    if (waitForIt = document.querySelector('#body > .login')) {
        waitForIt.style = '';
    } else {
        setTimeout(movebox, 500);
    }
}
movebox();
var codes = [
    {
        title: 'PA/PG/PS',
        roles: [
            {name: 'CRET Lead/PA', code: 'LRTN'},
            {name: 'Super Solver', code: 'QLRTN'},
            {name: 'Mobile Problem Solve', code: 'REBTRN3'},
            {name: 'Add-Ins', code: 'CRADD'},
        ]
    },
    {
        title: 'Customer Returns',
        roles: [
            {name: 'AUDIT', code: 'CRAUDIT'},
            {name: 'End of Line', code: 'CREOL'},
            {name: 'Waterspider', code: 'CRSDCNTF'},
            {name: 'TUGGER', code: 'STWSWP'},
            {name: 'NonCon', code: 'SCRET01'},
            {name: 'EXCEPTIONS', code: 'CRETREF'},
            {name: 'IOL', code: 'SCRFB10'},
        ]
    },
     {
        title: 'Clean Decant',
        roles: [
            {name: 'FAST-02', code: 'SCRET02'},
            {name: 'QRTN-04', code: 'SCRET04'},
            {name: 'DEFAULT-05', code: 'SCRET05'},
            {name: 'SCRET06', code: 'SCRET06'},
            {name: 'Clean Decant Waterspider', code: 'CRCDFL'},
        ]
    },
         {
        title: 'Dock And DA',
        roles: [
            {name: 'Unloader', code: 'CRUNLD'},
            {name: 'Diverter', code: 'CRSORT'},
            {name: 'TDR', code: 'CRDSCAN'},
            {name: 'DA Lead/PA', code: 'TOTOL'},
            {name: 'DA', code: 'TRFOCR'},
            {name: 'Loader', code: 'MTTL'},
        ]
    },
    {
        title: 'Warehouse Deals',
        roles: [
            {name: 'WHD Lead/PA', code: 'LPAWD'},
            {name: 'WHD Problem Solve', code: 'WDPS'},
            {name: 'WHD Waterspider', code: 'WHDWTSP'},
            {name: 'WHD Audit', code: 'WDQA'},
            {name: 'BOD', code: 'CRBODBA'},
            {name: 'TEST', code: 'TVQA'},
            {name: 'SPAR', code: 'WDGRADA'},
            {name: 'SPAR Support', code: 'GRDAST'},
        ]
    },
     {
        title: 'Admin/HR/IT',
        roles: [
            {name: '5S', code: 'CR5S'},
            {name: 'Kaizen', code: 'CRKZN'},
            {name: 'ISTOP', code: 'ISTOP'},
            {name: 'MSTOP', code: 'MSTOP'},
            {name: 'Sev 1/2', code: 'NTWRKSEV'},
        {name: 'OPS Regional', code: 'OPSREGP'},
        ]
    },
];
let toolbox = document.createElement('div'), toolboxHTML = '';
toolbox.id = "toolbox";
for (let shift of codes) {
    console.log(shift);
    toolboxHTML += '<div class="row"><h1>' + shift.title + '</h1><div class="roles">';
    for (let role of shift.roles) {
        toolboxHTML += '<button value="' + role.code + '">' + role.name + '</button>';
    }
    toolboxHTML += '</div></div>';
}
toolbox.innerHTML = toolboxHTML
document.querySelector('#body').appendChild(toolbox);
Array.from(document.querySelectorAll('#body > #toolbox > .row > .roles > button')).forEach(function(el){
    el.addEventListener('click', function () {
        document.getElementById('calmCode').value = el.value
        document.forms[0].submit()
    })
})