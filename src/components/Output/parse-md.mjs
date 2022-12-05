import {marked} from "marked";

/*
self.addEventListener('message', (e) => {
    const { mdText } = e.data

    const parsed = marked.marked.parse(mdText)

    self.postMessage(parsed)
})*/

export async function parseMd(e) {
    const { mdText } = e

    const parsed = await marked.parse(mdText)

    return parsed
}