# Code Editor - AI-Powered Website Builder

An intelligent command-line tool that leverages Google's Gemini AI to automatically build frontend websites through natural language conversations. Simply describe what you want, and the AI will generate and execute the necessary shell commands to create your website.

## 🌟 Features

- **Natural Language Interface**: Describe your website requirements in plain English
- **Automated Command Generation**: AI generates appropriate shell/terminal commands based on your needs
- **Smart Task Breakdown**: Automatically breaks down complex requirements into manageable tasks
- **Error Handling**: Detects and attempts to fix execution errors automatically
- **Step-by-Step Execution**: Executes commands one at a time with result verification
- **Cross-Platform Support**: Adapts commands to your operating system (Windows, macOS, Linux)
- **Interactive Conversation**: Maintains conversation history for context-aware responses

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd code_editer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Google Gemini API key:
```env
GOOGLE_API_KEY=your_api_key_here
```

### Usage

1. Start the application:
```bash
node index.js
```

2. Enter your website requirements when prompted:
```
Ask me anything: Create a simple landing page with a header and footer
```

3. The AI will:
   - Analyze your requirements
   - Break them down into tasks
   - Generate and execute shell commands
   - Create the necessary files and folders
   - Report progress and results

4. Type `exit` to quit the application.

## 📋 How It Works

1. **User Input**: You provide a description of the website you want to build
2. **AI Analysis**: Gemini AI analyzes the requirement and creates an execution plan
3. **Command Generation**: AI generates appropriate shell/terminal commands
4. **Execution**: Commands are executed one at a time using the `executeCommand` function
5. **Result Verification**: Each command's output is verified before proceeding
6. **Error Recovery**: If errors occur, the AI attempts to generate fix commands
7. **Iteration**: Process continues until the website is complete

## 🛠️ Technology Stack

- **AI Model**: Google Gemini 2.5 Flash
- **Runtime**: Node.js
- **Key Libraries**:
  - `@google/genai` - Google Gemini AI SDK
  - `dotenv` - Environment variable management
  - `readline-sync` - Interactive command-line interface
  - `child_process` - Shell command execution

## 📝 Example Use Cases

- "Create a portfolio website with about, projects, and contact sections"
- "Build a landing page with a hero section and signup form"
- "Make a simple blog layout with sidebar"
- "Create a responsive navigation menu"

## ⚙️ Configuration

The system automatically detects your operating system and generates platform-specific commands. Currently supported:
- Linux
- macOS
- Windows

## 🔒 Security Notes

- Never commit your `.env` file to version control
- Keep your Google API key secure
- Review generated commands before execution in production environments
- The tool executes shell commands with your user permissions

## 📦 Project Structure

```
code_editer/
├── index.js          # Main application logic
├── index.html        # Generated HTML files
├── package.json      # Project dependencies
├── .env             # Environment variables (not in repo)
└── README.md        # This file
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 🐛 Known Issues

- Some complex nested commands may require manual intervention
- Error recovery is best-effort and may not handle all edge cases
- Generated websites focus on frontend only (HTML, CSS, JavaScript)

## 🔮 Future Enhancements

- [ ] Add support for CSS frameworks (Bootstrap, Tailwind)
- [ ] Implement file preview before writing
- [ ] Add undo/rollback functionality
- [ ] Support for backend scaffolding
- [ ] Web UI for easier interaction
- [ ] Save and load project templates

## 📧 Support

For issues, questions, or suggestions, please open an issue in the repository.

---
