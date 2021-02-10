# Mini Mural Summary

That was fun! This exercise taught me just how much more I have yet to learn with React 😅, and gave me a roadmap to get there.

## Summary of work

* increased text contrast in instructions
* increased sticky note outline contrast with white canvas, text contrast with background
* increased size of delete icon (and all FAB icons)
* not using color alone to convey state (e.g. sticky note selected/editing border)
* keyboard functionality for controls (button, text input) added via semantic markup and tabindex
* focus (mostly) managed
* added explicit control for add note, opening instructions
* added ARIA content and announcements where needed

## Accessibility techniques

I want to highlight some accessibility specific techniques and choices made in this project.

### Hiding decorative images from Screen Reader

The React logo was a great way to demonstrate this. Not only should decorative images be hidden from screen readers so as to not clutter the content, but they also don't need to meet minimum contrast [(WCAG 1.4.3)](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html). The font-icons in the FABs are also hidden.

### Logical tab-order

With the western left-to-right and top-to-bottom heuristic, the left-hand toolbar was put before the mural canvas. The Welcome was placed at the top, but should be moved once modal implementation is complete.

### Semantic HTML

Divs became buttons, conveying free keyboard behavior! For even better semantics, the Color Picker should be made a set of radio controls, and consider something more fitting than a button for the Sticky Note component.

### Focus management

Focus is set to the appropriate target element:

* for button-implementation Color Pickers, the focus should be set back to itself when a ColorBox is pressed
* for the help button/modal, when help is pressed, focus is set to the first interactive element of the modal (close button), and when close modal is pressed, focus is set back to the triggering element (help button).

To complete this implementation, focus should be trapped within the modal until it is closed. The component would also be better modeled as a [Toggletip](https://inclusive-components.design/tooltips-toggletips/) instead of a modal.

## Areas of improvement

Now that we've covered some best practices, here are some bad practices:

* poor variable/state management (almost anti-tokenization)
  * lots of hacky solutions and direct references to the DOM, instead of via react techniques
  * a lot of code is repeated in hard-to-find areas
* not robust
  * aria announcements are cleared on a timer, so if multiple announcements are triggered before the reset (2000ms), they won't be announced.

### Open bugs

Though some features were made more accessible, they weren't fully or consistently implemented, so the product remains largely inaccessible. Here are some immediate bugs:

| **P0** | `featRequest` | Sticky Notes | Multi-select with keyboard is COMPLETELY NON-EXISTENT |
| **P0** | `open` | Sticky Notes / Clipboard Manager | copy/paste is as broken as keyboard select, but works for what is able to be selected. |
| **P0** | `open` | Clipboard Manager | Add ARIA announcement for copied/paste |
| P1 | `open` | Sticky Notes:Delete | After pressing delete, focus is lost and taken to top of page. Occasionally not announced. |
| P1 | `open` | Sticky Notes | Custom focus state is not removed when focus moved from first or last Sticky Note to out of Mural |
| P1 | `open` | ColorPicker | (`VO`, Safari) When entering Toolbar for first time, focus is set to first element ("pink, button"), but the Color Picker group isn't accessible or being read. Only after navigating out of color picker and then back do you hear "color picker, group" |
| P1 | `open` | Welcome / Help button | Modal not complete; focus isn't trapped within modal, so if Welcome is opened or left open while notes are present, it will push them down the page. |
| P1 | `open` | Add Note Button / ariaAnnounce | remaining on the same button and triggering multiple keypresses fails to update aria-live region (e.g. when adding multiple notes in succession) |
| P1 | `open` | ariaAnnonce | Even with aria-live="assertive", still timeout >1000ms to not be overriden by the aria-label reading of the newly focused element, which gives a poor user experience with the lag in focus. Unsure why this is happening. |
| P2 | `open` | Mural / ColorBox | On page load/refresh, focus is set to the Pink (first) color box button by default, not sure why. It should be focusing on the first thing in the DOM, which is the Welcome component. |
| P2 | `open` | Sticky Notes (_Content_) | delete button doesn't indicate which note it is associated with |
| P2 | `open` | Sticky Note | Broken styling logic; single mouse click triggers "editing" styling |
| P2 | `featRequest` | General | After creating a new note, set focus to it |
| P2 | `open` | Sticky Notes:Delete | Since the Delete icon is only surfaced via note selection, but is injected into DOM Order after the note, it is "skipped" when tabbing backwards |
| P3 | `open` | Mural.jsx (line 52) | Since stickies are positioned according to top left corner coordinates, a note could be placed where the corner is within the 100vh/vw window but the body of the sticky note extends the window size, which then extends the max coordinate that can be used for placement, and repeat. |
| P3 | `featRequest` | Color Picker | Make this an input type="radio", or at least an ARIA role="radiogroup" as in this [W3C toolbar example](https://www.w3.org/TR/wai-aria-practices/examples/toolbar/toolbar.html). |

## Modularization
