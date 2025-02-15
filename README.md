
# AI MCQ Generator

An AI-powered web application that generates multiple-choice questions (MCQs) from any given text, file, or URL. This tool is designed to help teachers, students, and content creators quickly generate quizzes and exam questions with customizable settings.

## Features

- **Multiple Input Options:**  
  - **Text:** Paste your text directly.
  - **File Upload:** Upload TXT files (currently, TXT is fully supported; PDF/DOCX processing coming soon).
  - **URL Extraction:** Provide a URL to scrape text content.
  
- **Customizable Quiz Settings:**  
  - Set the number of questions (e.g., 5 to 20).
  - Choose difficulty levels (Easy, Medium, Hard).
  - Option to include answer explanations.

- **Interactive Quiz Interface:**  
  - Options are initially neutral and clickable.
  - On selection, the chosen option turns green if correct or red if wrong.
  - Correct answers remain hidden until an option is selected.
  - Explanations are shown only after an answer is chosen.

- **Export Options:**  
  - Copy quiz content to clipboard.
  - Export questions to a text file.

- **AI-Powered Question Generation:**  
  - Uses the free DeepSeek model via the OpenRouter API to generate questions automatically.

## Technologies Used

- **React** with TypeScript
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **OpenRouter API** (using the free DeepSeek model)
- **Lucide React** (icons)



## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/abdulwaheedal/MCQ-Generator-free.git
   cd MCQ-Generator-free
  
   
2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the root directory and add your OpenRouter API key:

   ```env
   VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

4. **Start the Development Server:**

   ```bash
   npm run dev
   ```

5. **Open in Browser:**

   Navigate to `http://localhost:5173` (or the port specified by Vite).

## Usage

1. **Choose an Input Method:**  
   Select whether to paste text, upload a file, or enter a URL.

2. **Provide Your Input:**  
   Enter your text, upload a TXT file, or provide a URL for content extraction.

3. **Customize Quiz Settings:**  
   Adjust the number of questions, set the difficulty level, and choose whether to include explanations.

4. **Generate MCQs:**  
   Click on "Generate MCQs" to see the questions appear interactively.

5. **Interact with the Quiz:**  
   Click on the options. The selected option will change color based on correctness:
   - Green if correct.
   - Red if incorrect (with the correct answer then highlighted in green).

6. **Export or Copy:**  
   Use the provided buttons to export the quiz to a text file or copy it to your clipboard.

## Deployed Application

The application is deployed and available at:
https://sprightly-semolina-fb4b83.netlify.app/

## Contributing

Contributions are welcome! If you have suggestions or improvements, please fork the repository and open a pull request. For major changes, consider opening an issue first to discuss your ideas.

## License

This project is not yet licensed

## Credits

- Developed by Faaiz.
- Icons provided by [Lucide React](https://lucide.dev/).
- AI question generation powered by the DeepSeek model via OpenRouter API.
```
