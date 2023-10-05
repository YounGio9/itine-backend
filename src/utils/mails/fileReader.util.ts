import fs from 'fs'
// eslint-disable-next-line  @typescript-eslint/ban-types
export default function readHtmlFile(path: string, callback: Function): void {
    fs.readFile(
        path,
        {
            encoding: 'utf-8',
        },
        (err, html) => {
            if (err) {
                callback(err)
                throw err
            } else {
                callback(null, html)
            }
        },
    )
}
