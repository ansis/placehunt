function restore_options() {
    var select = document.getElementById("template");
    chrome.storage.sync.get("template", function(d) {
        if (d.template) {
            select.value = d.template;
        }
    });
}

function save_options() {
    var select = document.getElementById("template");
    chrome.storage.sync.set({
        "template": select.value
    });
}

document.querySelector('#save').addEventListener('click', save_options);
restore_options();
