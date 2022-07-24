// Reference: kintoneのスレッド投稿がスマートになるChrome拡張をVue.jsで作る - Qiita
// https://qiita.com/RyBB/items/3f343252b0397e93050e
window.onload = ()  => {
    const messageEl = document.getElementById('message');
    const saveBtnEl = document.getElementById('submit');
    // --- storage element ---
    const storageItemNames = [
        'start-date', 'start-hours', 'start-minutes',
        'end-date', 'end-hours', 'end-minutes',
        'child-name', 'child-birthday', 'babysitter-name',
        'place'
    ];

    // すでに保存されている情報があればそれを設定する処理
    chrome.storage.sync.get(storageItemNames, items => {
        // すでに保存されている情報があればそれを設定する処理
        for (let i = 0; i < storageItemNames.length; i++) {
            let storageItemName = storageItemNames[i];
            let storageItem = items[storageItemName];
            console.log(storageItemName + ' -> ' + storageItem);
            document.getElementById(storageItemName).value = storageItem;
        }
    });

    // Option画面で保存されたときの処理
    saveBtnEl.onclick = () => {
        let savedDict = {};
        for (let i = 0; i < storageItemNames.length; i++) {
            let storageItemName = storageItemNames[i];
            savedDict[storageItemName] = document.getElementById(storageItemName).value;
        }
        console.log(`savedDict: ${savedDict}`);
        chrome.storage.sync.set(savedDict, () => {
            messageEl.textContent = 'Saved';
            setTimeout(() => messageEl.textContent = '', 750);
        });

        console.log('tabs SUBMIT');
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: 'SUBMIT',
            });
        });
    }
};