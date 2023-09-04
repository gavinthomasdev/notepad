let noteData = ""

function setNoteData(data) {
    noteData = data
}
    
function getState(state) {
    if (state == "note") {
        return noteData
    }
    return localStorage.getItem(state);
}

function setState(state, value) {
    if (state == "note") {
        return setExternalState(state, value)
    }
    localStorage.setItem(state, value);
}

function removeState(state) {
    localStorage.removeItem(state);
}

function selectById(id) {
    return $(`#${id}`);
}

function selectByClassName(className) {
    return $(`.${className}`);
}

function get(context) {
    return $(context);
}

function getNoteName() {
    return window.location.search.length > 0 ? window.location.search.substring(1) : "default"
}

function getExternalState(state, callback) {
    const data = {
        action: "get",
        data: getNoteName()
    }
    return chrome.runtime.sendMessage("ojcedbmgmccbhpepdagjifadaaiimbej", data, callback)
}

function setExternalState(state, value) {
    const data = {
        action: "set",
        data: {
            [getNoteName()]: {
                [state]: value
            }
        }
    }
    chrome.runtime.sendMessage("ojcedbmgmccbhpepdagjifadaaiimbej", data)
}

function selector() {
    return {
        notepad: {
            aboutModal: selectById('aboutModal'),
            clearNotes: selectById('clearNotes'),
            closeDonationPopup: selectById('closeDonationPopup'),
            copyToClipboard: selectById('copyToClipboard'),
            downloadNotes: selectById('downloadNotes'),
            fontSize: selectById('fontSize'),
            fontWeight: selectById('fontWeight'),
            installApp: selectById('installApp'),
            lineHeight: selectById('lineHeight'),
            mode: selectById('mode'),
            note: selectById('note'),
            preferencesModal: selectById('preferencesModal'),
            resetPreferences: selectById('resetPreferences'),
            showWordCountPill: selectById('showWordCountPill'),
            wordCount: selectById('wordCount'),
            installAppButtonContainer: selectByClassName('install-app-btn-container'),
            stickyNotice: selectByClassName('sticky-notice'),
            wordCountContainer: selectByClassName('word-count-container'),
            keyboardShortcutsModal: selectById('keyboardShortcutsModal'),
        },
        state: {
            note: getState('note'),
            mode: getState('mode'),
            isUserPreferredTheme: getState('isUserPreferredTheme'),
            userChosenFontSize: getState('userChosenFontSize'),
            userChosenFontWeight: getState('userChosenFontWeight'),
            userChosenLineHeight: getState('userChosenLineHeight'),
            hasUserDismissedDonationPopup: getState('hasUserDismissedDonationPopup'),
            userChosenWordCountPillSelected: getState('userChosenWordCountPillSelected'),
        },
        get,
        getState,
        setState,
        setExternalState,
        getExternalState,
        setNoteData,
        removeState,
        selectById,
        selectByClassName
    }
}
