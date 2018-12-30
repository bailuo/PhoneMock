'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({ color: '#3aa757' }, function() {
        console.log("The color is Set to #3aa757");
    });
    chrome.contextMenus.create({
        "id": "ContextMenu",
        "title": "Context Menu",
        "contexts": ["selection"]
    });
});
// add listenner on message receive
chrome.runtime.onMessage.addListener(function(message, sender, reply) {
    // chrome.runtime.onMessage.removeListener(event);
    if (!message || !message.data) {
        return;
    }
    var dataOj = JSON.parse(message.data);
    // 执行脚本
    if (dataOj.event === 'executeScript') {
        chrome.tabs.executeScript({ code: dataOj.detail });
    }
    // 保存数据
    if (dataOj.event === 'setStorageData') {
        chrome.storage.sync.set(JSON.parse(dataOj.detail), function() {
            console.log("The color is green.");
        });
    }
});