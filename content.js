const storageItemNames = [
    'start-date', 'start-hours', 'start-minutes',
    'end-date', 'end-hours', 'end-minutes',
    'child-name', 'child-birthday', 'babysitter-name',
    'place'
]

// すでに保存されている情報があればそれを設定する処理
chrome.storage.sync.get(storageItemNames, items => {
    // すでに保存されている情報があればそれを設定する処理
    document.getElementById("atms-ticket-form-start").value = items["start-date"];
    document.getElementById("atms-ticket-form-start-hours").value = items["start-hours"];  // start
    document.getElementById("atms-ticket-form-start-minutes").value = items["start-minutes"];  // start
    document.getElementById("atms-ticket-form-end").value = items["end-date"];  // end
    document.getElementById("atms-ticket-form-end-hours").value = items["end-hours"];
    document.getElementById("atms-ticket-form-end-minutes").value = items["end-minutes"];

    document.getElementById("atms-form-free-item0").value = items["child-name"];
    document.getElementById("atms-form-free-item3").value = items["place"];

    var elements = document.querySelectorAll("#atms-form-free-item2");
    elements[0].value = items["child-birthday"];  // Birthday
    elements[1].value = items["babysitter-name"];    // Babysitter name
});

// This does not work. It won't enable "next" button...
//document.getElementById("policy-confirm").checked = true;
