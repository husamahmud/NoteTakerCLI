import fs from 'fs/promises'
import http from 'http'
import open from 'open'

/**
 * interpolate - Replaces placeholders in a string with values from an object.
 * @param {string} html - The HTML string to interpolate
 * @param {object} data - The data object to use for interpolation
 * @returns {string} - The interpolated HTML string
 **/
const interpolate = (html, data) => {
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
    return data[placeholder] || ''
  })
}

/**
 * formatNotes - Formats notes as HTML
 * @param {object[]} notes - The notes to format
 * @returns {string} - The formatted notes as HTML
 **/
const formatNotes = (notes) => {
  return notes.map(note => {
    return `
      <div class="note">
        <p>note (${note.id}): ${note.content}</p>  
        <div class="tags">
          tags: ${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    `
  }).join('\n')
}

/**
 * createServer - Creates a new HTTP server
 * @param {object[]} notes - The notes to display
 * @returns {http.Server} - The new server instance
 **/
const createServer = (notes) => {
  return http.createServer(async (req, res) => {
    const HTML_PATH = new URL('./template.html', import.meta.url).pathname
    const template = await fs.readFile(HTML_PATH, 'utf-8')
    const html = interpolate(template, { notes: formatNotes(notes) })

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(html)
  })
}

/**
 * start - Starts the server
 * @param {object[]} notes - The notes to display
 * @param {number} port - The port to listen on
 * @returns {void}
 **/
export const start = (notes, port) => {
  const server = createServer(notes)

  server.listen(port, () => {
    const address = `http://localhost:${port}`
    console.log(`server on ${address}`)

    open(address) //* Automatically open the served URL in the default web browser.
  })
}
