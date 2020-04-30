const waitForElement = (selector: string): Promise<Node> => {
    return new Promise((resolve) => {
        const element = document.querySelector(selector)

        if (element) {
            resolve(element)
            return
        }

        const observer = new MutationObserver((mutations: MutationRecord[]) => {
            mutations.forEach((mutation: MutationRecord) => {
                const nodes = Array.from(mutation.addedNodes)
                for (const node of nodes) {
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
