# 📘 Google Classroom UI Enhancer — Chrome Extension

> A Chrome Extension that enhances the Google Classroom experience by embedding presentation and document previews directly into the Classwork interface.

---

## 🎯 Overview

Google Classroom makes it difficult to preview attachments such as PowerPoint slides or Google Drive files — you often need to open each file in a new tab.  
This extension fixes that by **embedding previews directly inside Classroom**, making the workflow smoother and faster.

---

## ✨ Features

- 🖱 **One-Click Preview** — Click any classwork item to instantly view its description and slides.
- 🧩 **Smart File Detection**
  - Google Slides (`docs.google.com/presentation`)
  - Google Drive files (`drive.google.com/file/...`)
  - PowerPoint (`.ppt`, `.pptx`)
- 🔐 **Security-First Design**
  - Fully **Trusted Types / CSP** compliant
  - No external dependencies or unsafe script injection
- 🧠 **Dynamic Observation**
  - Uses `MutationObserver` to automatically detect new classwork items
- 🎨 **UI Enhancements**
  - Custom right-side preview panel
  - Styled for a native Google Classroom look and feel

---

## 🧠 Why I Built It

> Instead of waiting for someone to fix a daily frustration, I built a better experience myself.

Opening attachments one by one inside Google Classroom was time-consuming.  
This extension adds **instant inline previews**, helping educators and students stay in context and save time.

---

## ⚙️ Installation

### 🧩 Load as an Unpacked Chrome Extension

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer Mode** (top-right corner).
4. Click **Load Unpacked** and select the project folder.
5. Open **Google Classroom** — your enhanced UI will appear automatically.

---

## 🧭 How It Works

1. The extension injects a script that observes the Classroom page (`MutationObserver`).
2. When a classwork item (`li[data-stream-item-id]`) is clicked:
   - The script extracts the content and any attached file link.
   - If the attachment is a Google Drive, Slides, or PowerPoint file, it generates a secure embedded preview.
3. The content and preview are displayed in a fixed side panel.

---

## 🧩 Tech Stack

- **JavaScript (Vanilla)** — core logic  
- **Trusted Types API** — to comply with Chrome CSP policies  
- **MutationObserver** — for dynamic updates  
- **CSS Injection** — to seamlessly integrate into Classroom UI  

---

## 🛡 Security & Performance

- Complies with Chrome Trusted Types (no unsafe HTML injection).  
- Runs client-side only — no data collection or network requests.  
- Lightweight (~10KB of code).  

---

## 🧑‍💻 Usage Example

1. Open any Google Classroom course.
2. Click a classwork item — its content and document preview will open on the right side.  
3. Embedded previews support Slides, Drive files, and PPT/PPTX.

---

## 💬 Philosophy

> “Don’t complain. Build.”  
>
> This project represents the mindset of ownership — when something doesn’t work the way you need, take initiative, build a solution, and share it to help others.

---

## 📜 License

MIT License — Feel free to modify and improve.

---

## 👤 Author

**[Your Name]**  
Frontend Developer | Problem Solver | Builder  
🔗 *Creating tools that make everyday workflows smoother.*
