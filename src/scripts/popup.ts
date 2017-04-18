$(document).ready(function (): void {

    chrome.storage.sync.get('isDisable', function (obj: any): void {
        if (obj.isDisable === 'True') {
            $('#option').text('Enable');
        }
    });

    $('#option').click(function (): void {
        if ($('#option').text() === 'Disable') {
            $('#option').text('Enable');
            chrome.storage.sync.set({ 'isDisable': 'True' });
            chrome.storage.sync.get('tabID', function (obj: any): void {
                obj.tabID.forEach(id => {
                    chrome.tabs.sendMessage(id, {isDisable: 'True'});
                });
            });
        } else {
            $('#option').text('Disable');
            chrome.storage.sync.set({ 'isDisable': 'False' });
            chrome.storage.sync.get('tabID', function (obj: any): void {
                obj.tabID.forEach(id => {
                    chrome.tabs.sendMessage(id, {isDisable: 'False'});
                });
            });
        }
    });
});