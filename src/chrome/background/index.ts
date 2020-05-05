import { wrapStore } from 'webext-redux'
import configureStore from '@store'
import { toggleDisplay } from '@store/actions'

const { store } = configureStore()

wrapStore(store, { portName: 'tivan' })

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab.url && tab.url.indexOf('https://app.plex.tv/') > -1 && changeInfo.status === 'complete') {
        store.dispatch(toggleDisplay(false))
    }
})
