let waitForElement = (selector: string): Promise<Node> => {
    return new Promise((resolve, reject) => {
        var element = document.querySelector(selector)

        if (element) {
            resolve(element)
            return
        }

        var observer = new MutationObserver((mutations: MutationRecord[]) => {
            mutations.forEach((mutation: MutationRecord) => {
                var nodes = Array.from(mutation.addedNodes)
                for (var node of nodes) {
                    if (node.isEqualNode(element) || node.contains(document.querySelector(selector))) {
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
