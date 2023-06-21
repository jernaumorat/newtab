# newtab

## Building
Run `yarn build` to compile to the `build` directory, then run `start.sh` (or add to Login Items in macOS)
to host (http://localhost:1337 by default).

## Using
I'm using the [Custom New Tab URL](https://chrome.google.com/webstore/detail/mmjbdbjnoablegbkcklggeknkfcjkjia)
extension for Chrome to set all new tabs to the local address. Untested in Safari/Edge, 
currently [not viable](https://bugzilla.mozilla.org/show_bug.cgi?id=1460412) in Firefox.

## Adding Links

To add links, either add them manually to the `{links,mainLinks}.json` files under `src/`, or add links to
the Inbox (plus icon at the bottom right) in newtab then copy the JSON (copy icon at the bottom right), and
paste the links in the relevant `.json`.

`mainLinks.json` contains the links that will appear in the larger link panel, links entered here should not
have a `category` specified. `links.json` contains links that will appear in the bottom four panels, categorised.
These links must have a category specified.

## Adding Categories / Icons
`CATEGORIES.ts` specifies the categories available for links. All icons must go under `/static`. Adding extra panels
will probably require some rejigging of the grid layout, is currently quite static.

## Adding Dynamic Panels
New API routes can be added under `/src/routes/api`, and should accept no parameters and return `TLink[]` (`TLink`
specified in `/src/LINKS.ts`). `<LinkBox />`es can be added to `/src/routes/+page.svelte` that accept a `fetchUrl`,
which will retrieve the dynamic content from the new API route.

