# YouTube 59s Fixer

YouTube 59s Fixer is a browser extension designed to solve the issue where YouTube videos only play for 59 seconds for certain IPs. The extension replaces the default YouTube video player with an iframe to embed player to bypass this limitation.

## Features

- Automatically detects YouTube video pages.

- Replaces the default YouTube player with an iframe-based embedded player.

## How It Works

The extension utilizes JavaScript to detect and replace the YouTube video player on supported pages. The embedded iframe ensures the video plays correctly without being limited to 59 seconds.

## Installation

- Firefox: The extension is available on mozilla add-ons, you can install form [this link](https://addons.mozilla.org/en-US/firefox/addon/yt-59s-fixer/).

- Chrome (chromium based browsers): Download .crx file from [here](https://github.com/amir-mahdih86/YT-59s-Fixer/releases/tag/v1.0), go to chrome://extensions, enable "Developer Mode", drag and drop the downloaded file to the extensions page.

## Contributing

This project welcomes contributions from anyone! If you have suggestions, find bugs, or want to improve the extension, feel free to submit a pull request or open an issue.

    Note: This project was created with the help of ChatGPT for the base code.

## TODO

- Add a GUI (popup menu) when clicking the extension icon with the following features:

    - Enable/Disable Player Replacement: Allow users to toggle the player replacement functionality.

    - Check 59s Problem: A button to verify if the 59-second issue occurs with the user's current IP.

## License

This project is licensed under the MIT License.