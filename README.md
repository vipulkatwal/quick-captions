# Caption Generator

Welcome to the project! This repository is designed to handle video transcription and processing using AWS services and FFmpeg.

## 📋 Table of Contents

- [Project Name](#project-name)
  - [📋 Table of Contents](#-table-of-contents)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [📚 Documentation](#-documentation)
    - [Components](#components)
    - [API Endpoints](#api-endpoints)
    - [Utility Functions](#utility-functions)
  - [🚀 Installation](#-installation)
  - [🔧 Usage](#-usage)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)

## 🛠️ Tech Stack

- **AWS SDK for JavaScript**: `@aws-sdk/client-s3`, `@aws-sdk/client-transcribe`
- **FFmpeg**: `@ffmpeg/ffmpeg`, `@ffmpeg/util`
- **Additional Libraries**: `aws-crt`, `axios`, `fluent-ffmpeg`, `uniqid`, `uniqueid`
- **Frontend**: `next`, `react`, `react-dom`, `tailwindcss`, `react-icons`
- **Linting & Formatting**: `eslint`, `eslint-config-next`, `postcss`

## 📚 Documentation

### Components

- **`TranscriptionEditor`**: Manages and edits transcription items.
- **`ResultVideo`**: Handles video display and applies captions using FFmpeg.
- **`FilePage`**: Main page for managing file uploads and displaying transcription and video results.
- **`ContactPage`**: Contact form and social links.
- **`PricingPage`**: Pricing information for the service.

### API Endpoints

- **POST /api/upload**: Uploads a file to S3.
- **GET /api/transcribe**: Fetches the transcription status and results from AWS Transcribe.

### Utility Functions

- **`clearTranscriptionItems`**: Cleans up transcription items and formats them.
- **`transcriptionItemsToSrt`**: Converts transcription items to SRT format.

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```
2. Navigate to the project directory:
   ```bash
   cd your-repo
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## 🔧 Usage

1. Ensure you have the necessary AWS credentials configured in your environment variables:

   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY_ID`
   - `BUCKET_NAME_ID`

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Access the application in your browser at `http://localhost:3000`.

## 🤝 Contributing

Contributions are welcome! Please follow the standard GitHub workflow:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch.
5. Submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

For more details on the project's structure and components, check out the inline comments and code documentation within the codebase.

Feel free to reach out if you have any questions or issues!
