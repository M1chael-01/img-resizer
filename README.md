# Resizer — project documentation

A web app for resizing images directly in the browser (no server upload). Built with **React + TypeScript + Vite**.

---

## Contents

- [Project structure](#project-structure)
- [Architecture](#architecture)
- [File reference](#file-reference)
- [Data flow](#data-flow)
- [Styles](#styles)
- [Running the project](#running-the-project)
- [Conventions](#conventions)

---

## Project structure

```
imgResize/
├── public/                        # static assets served as-is
├── src/
│   ├── assets/                    # images, icons, etc.
│   │
│   ├── components/
│   │   ├── ImageResizer/
│   │   │   ├── DimensionFields.tsx    # width/height fields + aspect-ratio lock
│   │   │   ├── DropZone.tsx           # drag & drop area for uploading a file
│   │   │   ├── EmptyState.tsx         # content shown before an image is uploaded
│   │   │   ├── FileInfo.tsx           # file name + original dimensions
│   │   │   ├── FileInput.tsx          # hidden <input type="file"> + file selection
│   │   │   ├── ImagePreview.tsx       # preview of the uploaded image
│   │   │   └── PresetButtons.tsx      # 25/50/75/100% preset buttons
│   │   ├── Button.tsx             # shared/reusable button component
│   │   └── EditorHeader.tsx       # editor header (title + "Upload another image")
│   │
│   ├── hooks/
│   │   ├── useDimensions.ts           # dimension state, lockAspect, presets
│   │   ├── useFileDropzone.ts         # drag & drop logic (isDragging, handlers)
│   │   ├── useImageExport.ts          # exporting/downloading the resized image
│   │   ├── useImageFile.ts            # loaded file, preview, original dimensions
│   │   └── useNumberFieldState.ts     # text state for numeric inputs (width/height)
│   │
│   ├── layout/
│   │   └── ImageResizer.tsx       # main component – composes hooks and components together
│   │
│   ├── lib/
│   │   └── image.ts               # pure functions: loading images, math, canvas export
│   │
│   ├── styles/
│   │   ├── Button.css
│   │   └── ImageResizer.css
│   │
│   ├── constants.ts                # shared constants (presets, labels, limits)
│   ├── counter.ts                  # helper/sample logic (Vite starter leftover, maybe removable)
│   ├── main.tsx                    # app entry point (ReactDOM render)
│   └── style.css                   # global styles (body, reset, page background)
│
├── index.html                      # HTML shell for Vite
├── package.json
├── package-lock.json
├── tsconfig.json
└── .gitignore
```

---

## Architecture

The project is split into four layers by responsibility:

| Layer | Folder | Responsibility |
|---|---|---|
| **UI components** | `components/` | Only render props, no business logic. "Dumb" components. |
| **State / logic** | `hooks/` | Hold React state, expose functions to components (`useState`, `useEffect`, `useCallback`). |
| **Pure logic** | `lib/` | No React at all — just calculations, Canvas API work, file handling. Testable in isolation. |
| **Composition** | `layout/ImageResizer.tsx` | Wires hooks together with components, no extra logic of its own. |

This separation means:
- **`lib/image.ts`** can be tested with zero React involved (pure functions → input/output).
- **Hooks** can be reused in a different component if ever needed.
- **Components** under `components/ImageResizer/` can be redesigned visually without touching any logic.

---

## File reference

### `lib/image.ts`
Pure (React-free) functions over images and dimensions:

| Function | Purpose |
|---|---|
| `loadImageFromFile(file)` | Loads a `File` as an `<img>`, returns the object URL and natural dimensions. |
| `heightFromWidth(original, width)` | Derives height from width, preserving aspect ratio. |
| `widthFromHeight(original, height)` | Derives width from height, preserving aspect ratio. |
| `dimensionsForPreset(original, percent)` | Returns dimensions for a given % preset (25/50/75/100). |
| `findActivePreset(original, dimensions, presets)` | Checks whether the current dimensions match one of the presets. |
| `exportResizedImage(sourceUrl, dimensions)` | Draws the image onto a `<canvas>` at the new size, returns a PNG `Blob`. |
| `downloadBlob(blob, filename)` | Triggers a browser download of the blob. |

### `hooks/useImageFile.ts`
Holds: `file`, `previewUrl`, `original` (dimensions). Exposes `loadFile()` and `reset()`.

### `hooks/useDimensions.ts`
Holds: `dimensions`, `lockAspect`. Exposes `handleWidthChange`, `handleHeightChange`, `applyPreset`, `toggleLockAspect`, `activePreset`. When a new image is loaded (`original` changes), dimensions automatically reset to the original.

### `hooks/useImageExport.ts`
Holds: `isExporting`. Exposes `download(previewUrl, dimensions)`, which calls `exportResizedImage` + `downloadBlob` from `lib/image.ts`.

### `hooks/useNumberFieldState.ts`
Solves the classic React controlled-number-input problem — allows an empty string while typing, prevents the `"010"` glitch when overwriting a leading zero, and falls back to the last valid value on blur if the field is left empty or invalid.

### `hooks/useFileDropzone.ts`
Encapsulates drag & drop logic (`onDragOver`, `onDragLeave`, `onDrop`, `isDragging` state) so `DropZone.tsx` doesn't have to handle it itself.

### `components/ImageResizer/*`
Presentational components composing the editor UI:
- **EmptyState** – shown until the user uploads an image (title, subtitle, `DropZone`).
- **DropZone** + **FileInput** – area for dragging a file in / clicking to select one.
- **FileInfo** – file name and original dimensions.
- **DimensionFields** – width/height fields + aspect-ratio lock button.
- **PresetButtons** – quick 25%/50%/75%/100% choices.
- **ImagePreview** – image preview inside the editor.

### `layout/ImageResizer.tsx`
The main page component. Calls all the hooks above and, based on state (image uploaded or not), renders either `EmptyState` or the editor with preview and controls.

### `components/Button.tsx`, `components/EditorHeader.tsx`
Shared UI pieces independent of the resizer's specific logic (button, editor header with "Upload another image").

> **Note:** the descriptions for `Button.tsx`, `EditorHeader.tsx`, `constants.ts`, and `counter.ts` are inferred from file names in the project tree — if their actual contents differ, share them and this documentation can be updated to match.

---

## Data flow

```
User selects/drops a file
        │
        ▼
useImageFile.loadFile(file)
        │  (lib/image.ts → loadImageFromFile)
        ▼
   file, previewUrl, original (dimensions) are stored in state
        │
        ▼
useDimensions reacts to `original` → sets dimensions = original
        │
        ▼
User changes width/height/preset
        │  (via useNumberFieldState → input validation)
        ▼
useDimensions recalculates dimensions (heightFromWidth / widthFromHeight / dimensionsForPreset)
        │
        ▼
User clicks "Download resized image"
        │
        ▼
useImageExport.download(previewUrl, dimensions)
        │  (lib/image.ts → exportResizedImage on <canvas> → downloadBlob)
        ▼
Browser downloads resized-{width}x{height}.png
```

---

## Styles

- **`style.css`** – global reset and page (`body`) background.
- **`styles/ImageResizer.css`** – all classes prefixed `ir-` (`ir-wrap`, `ir-dropzone`, `ir-field-row`, `ir-preset-btn`, …).
- **`styles/Button.css`** – styling for the shared `Button` component.

Color palette (black & white design):

| Purpose | Color |
|---|---|
| Background | `#FFFFFF` |
| Card / dropzone | `#F7F7F7` |
| Text | `#111111` |
| Muted text | `#767676` |
| Border | `#E2E2E2` |
| Accent / CTA | `#111111` |

---

## Running the project

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` (Vite's default port).

Production build:

```bash
npm run build
```

---

## Conventions

- **`ir-` prefix** for every CSS class belonging to the image resizer (distinguishes them from the header's `lt-` styles).
- **Hooks return an object**, not an array — clearer destructuring at the call site (`const { file, loadFile, reset } = useImageFile()`).
- **No business logic inside `components/`** — if a component needs extra state, it belongs in a hook, not the component.
- **`lib/` never imports React** — keeps this layer easy to test and portable.
