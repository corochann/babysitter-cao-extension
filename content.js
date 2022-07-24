function fillForm() {
    const storageItemNames = [
        'start-date', 'start-hours', 'start-minutes',
        'end-date', 'end-hours', 'end-minutes',
        'child-name', 'child-birthday', 'babysitter-name',
        'place'
    ]

    // Set the word, which is stored in storage.
    chrome.storage.sync.get(storageItemNames, items => {
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
}

// Apply when window is loaded.
//fillForm();

chrome.runtime.onMessage.addListener(message => {
    console.log(`message: ${message}`)
    if (message.type === 'SUBMIT') {
        fillForm();
    }
    return true;
});
