# TabsDump Chrome Extension

A lightweight Chrome extension designed for users overwhelmed by a large number of open tabs (100+). It allows users to quickly export a filtered list of their browser tabs in customizable formats (JSON or string), enabling easy sharing, analysis, or use with AI tools like ChatGPT to help prioritize and manage workflow.

## Features

- **Quick Export**: Export all your browser tabs with a single click
- **Customizable Output**: Choose between JSON or string format
- **Flexible Fields**: Select which tab properties to include (title, URL, pinned, active, etc.)
- **Clipboard Integration**: Automatically copy results to clipboard
- **Clean UI**: Minimal, distraction-free interface
- **Smart Defaults**: Works out of the box with just tab titles

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory
5. The TabsDump extension icon should appear in your toolbar

## Usage

1. Click the TabsDump extension icon in your Chrome toolbar
2. The popup will open with default settings (titles only, string format)
3. Click "Run" to export your tabs and copy to clipboard
4. Optionally click the settings icon (⚙️) to customize:
   - Output format (JSON or string)
   - Fields to include (title, URL, pinned, active, audible, muted, incognito, window ID)
5. Paste the results wherever you need them (ChatGPT, notes, task managers, etc.)

## Permissions

- `tabs`: Required to access tab information
- `clipboardWrite`: Required to copy results to clipboard

## Development

The extension is built with vanilla HTML, CSS, and JavaScript. No build process or dependencies required.

### File Structure

```
TabsDump/
├── manifest.json          # Extension configuration
├── popup.html            # Main popup interface
├── popup.css             # Styling for the popup
├── popup.js              # Core functionality
├── assets/               # Extension icons
│   ├── 16.png
│   ├── 48.png
│   └── 128.png
└── README.md             # This file
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
