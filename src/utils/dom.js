function waitForElement (selector) {
    return new Promise((resolve, reject) => {
        var element = document.querySelector(selector)

        if (element) {
            resolve(element)
            return
        }

        var observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                var nodes = Array.from(mutation.addedNodes)
                for (var node of nodes) {
                    if (node.matches && (node.matches(selector) || node.contains(document.querySelector(selector)))) {
                        observer.disconnect()
                        resolve(node)
                        return
                    }
                };
            })
        })

        observer.observe(document.documentElement, { childList: true, subtree: true })
    })
}

export {
    waitForElement
}
