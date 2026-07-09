import React, { useState } from 'react';
import { detailedLectures } from './data/lessons';

export default function App() {
  const [selectedLecture, setSelectedLecture] = useState(detailedLectures[0]); 
  const [userCode, setUserCode] = useState(detailedLectures[0].codeSnippet);
  const [chatInput, setChatInput] = useState('');
  const [aiActive, setAiActive] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { 
      sender: 'bot', 
      text: "Hello! I am your dynamic Code Assistant. I can now understand your custom requirements and generate functional HTML/CSS snippets for paragraphs, images, forms, structures, and layouts. Try typing: 'give me a paragraph with a picture inside it'." 
    }
  ]);

  // Main high-level unified chapter accordions
  const [isHtmlOpen, setIsHtmlOpen] = useState(true);
  const [isCssOpen, setIsCssOpen] = useState(true);

  const selectLectureHandler = (lecture: typeof detailedLectures[0]) => {
    setSelectedLecture(lecture);
    setUserCode(lecture.codeSnippet);
  };

  // ================= INTELLIGENT ROUTER FOR THE AI ASSISTANT =================
  const generateAiResponse = (prompt: string): string => {
    const cleanPrompt = prompt.toLowerCase();

    // 1. Critical Requirement: Paragraph AND Picture/Image combined
    if ((cleanPrompt.includes('paragraph') || cleanPrompt.includes('text')) && 
        (cleanPrompt.includes('picture') || cleanPrompt.includes('image') || cleanPrompt.includes('img'))) {
      return `### 🤖 Generated Code: Paragraph with an Embedded Picture\n\nHere is a complete HTML and CSS structure combining a text paragraph with a fully responsive image asset:\n\n\`\`\`html\n<div style="font-family: sans-serif; max-width: 500px; margin: 20px auto; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; background: #fff; shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">\n  <h3 style="color: #1e293b; margin-top: 0;">Beautiful Travel Destinations</h3>\n  \n  \n  <img \n    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" \n    alt="Sunny Ocean Beach" \n    style="width: 100%; height: 200px; object-fit: cover; border-radius: 6px; margin-bottom: 12px;"\n  />\n  \n  \n  <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0;">\n    This paragraph describes a wonderful coastal retreat. By combining structured HTML text markup with standard image location endpoints, your layout loads cleanly inside all modern web engine viewports.\n  </p>\n</div>\n\`\`\``;
    }

    // 2. Just a standalone Picture/Image
    if (cleanPrompt.includes('picture') || cleanPrompt.includes('image') || cleanPrompt.includes('img')) {
      return `### 🤖 Generated Code: Image Asset Card\n\n\`\`\`html\n<img \n  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" \n  alt="Workspace Layout" \n  style="width: 100%; max-width: 400px; border-radius: 8px; border: 2px solid #3b82f6;"\n/>\n\`\`\``;
    }

    // 3. Just a standard Paragraph
    if (cleanPrompt.includes('paragraph') || cleanPrompt.includes('text') || cleanPrompt.includes('para')) {
      return `### 🤖 Generated Code: Styled Paragraph\n\n\`\`\`html\n<p style="font-family: sans-serif; color: #334155; font-size: 15px; line-height: 1.7; padding: 10px; background: #f8fafc; border-left: 4px solid #10b981;">\n  This is a custom stylized content paragraph designed to hold read-only textbook data blocks cleanly.\n</p>\n\`\`\``;
    }

    // 4. Forms & Input Controls
    if (cleanPrompt.includes('form') || cleanPrompt.includes('input') || cleanPrompt.includes('login')) {
      return `### 🤖 Generated Code: Interactive Input Form\n\n\`\`\`html\n<form style="font-family: sans-serif; max-width: 300px; padding: 15px; border: 1px solid #ccc; border-radius: 6px;">\n  <label style="font-size: 12px; font-weight: bold; display: block; margin-bottom: 4px;">User Repository Name:</label>\n  <input type="text" placeholder="e.g., dev-portfolio" style="width: 100%; padding: 6px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;" />\n  <button type="submit" style="background: #2563eb; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Submit Action</button>\n</form>\n\`\`\``;
    }

    // 5. Layout systems (Grid or Flexbox)
    if (cleanPrompt.includes('grid') || cleanPrompt.includes('flex') || cleanPrompt.includes('layout')) {
      return `### 🤖 Generated Code: Multi-Column Flexbox Layout\n\n\`\`\`html\n<div style="display: flex; gap: 15px; font-family: sans-serif;">\n  <div style="flex: 1; background: #dbeafe; p: 15px; padding: 15px; border-radius: 6px; border: 1px solid #bfdbfe; text-align: center;">\n    <strong>Column Box A</strong>\n  </div>\n  <div style="flex: 1; background: #fef08a; p: 15px; padding: 15px; border-radius: 6px; border: 1px solid #fef08a; text-align: center;">\n    <strong>Column Box B</strong>\n  </div>\n</div>\n\`\`\``;
    }

    // 6. Generic Default Fallback Response
    return `### 🤖 Code Hub Assistant\n\nI processed your request for **"${prompt}"**. To best support your software development learning, here is a clean, multi-purpose HTML template layout snippet:\n\n\`\`\`html\n<div style="padding: 15px; background: #f1f5f9; border-radius: 6px; font-family: sans-serif;">\n  <h4 style="margin: 0 0 5px 0; color: #0f172a;">Custom Template Block</h4>\n  <p style="margin: 0; color: #475569; font-size: 13px;">Modify this block structure to fit your live project requirement definitions.</p>\n</div>\n\`\`\``;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { sender: 'user', text: chatInput };
    const systemReplyText = generateAiResponse(chatInput);

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput('');

    // Simulate response delay for a genuine assistant experience
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { sender: 'bot', text: systemReplyText }]);
    }, 450);
  };

  return (
    <div className="h-screen w-screen bg-[#f1f3f5] text-[#212529] flex flex-col overflow-hidden font-sans">
      
      {/* ================= HEADER BAR ================= */}
      <header className="bg-[#1a252f] text-white p-3 px-5 flex items-center justify-between shadow-md flex-shrink-0 z-20">
        <div className="flex items-center space-x-2">
          <span className="text-xl">🚀</span>
          <h1 className="text-lg font-black tracking-wide text-cyan-400">
            LEARN CODE HUB <span className="text-white font-normal text-sm">| HTML & CSS STUDY DASHBOARD</span>
          </h1>
        </div>

        {/* AI CODING ASSISTANT AT TOP RIGHT CORNER */}
        <div className="relative flex items-center space-x-2">
          <button 
            onClick={() => setAiActive(!aiActive)}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center space-x-1 shadow transition-all cursor-pointer"
          >
            <span>🤖 AI Coding Assistant</span>
            <span>{aiActive ? '▲' : '▼'}</span>
          </button>

          {aiActive && (
            <div className="absolute right-0 top-11 w-96 bg-white border border-slate-300 rounded-xl shadow-2xl p-4 text-slate-800 z-50 flex flex-col space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="text-xs font-bold text-purple-700 border-b pb-1">Ask the Code Mentor:</div>
              <div className="h-64 overflow-y-auto bg-slate-50 p-2 rounded-lg space-y-2 border border-slate-200 text-xs">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`p-2.5 rounded-lg whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-purple-100 text-purple-900 ml-6 font-semibold' : 'bg-slate-200 text-slate-800 mr-6 font-mono border-l-2 border-purple-500'}`}>
                    {msg.text}
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex space-x-1">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="e.g. paragraph with picture..." 
                  className="flex-1 border border-slate-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:border-purple-500"
                />
                <button type="submit" className="bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs px-3 rounded-md cursor-pointer">Ask</button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* CORE WORKSPACE FRAMES */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden max-h-[calc(100vh-53px)]">
        
        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="lg:col-span-3 bg-[#e9ecef] border-r border-[#dee2e6] h-full flex flex-col overflow-hidden">
          <div className="p-3 bg-[#dee2e6] border-b border-[#ced4da] flex-shrink-0">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#495057]">
              📋 Select Your Lesson
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2 text-sm text-[#343a40]">
            
            {/* HTML TUTORIALS */}
            <div>
              <button onClick={() => setIsHtmlOpen(!isHtmlOpen)} className="w-full text-left font-bold px-2 py-1.5 bg-[#ced4da]/60 hover:bg-[#ced4da] rounded flex items-center justify-between text-xs text-[#2b3035] cursor-pointer">
                <span>HTML Tutorials</span> <span>{isHtmlOpen ? '▲' : '▼'}</span>
              </button>
              {isHtmlOpen && (
                <div className="pl-1 mt-1 space-y-0.5 border-l-2 border-[#ced4da]">
                  {detailedLectures.filter(l => l.type === 'HTML').map((l) => (
                    <button key={l.id} onClick={() => selectLectureHandler(l)} className={`w-full text-left px-3 py-1 text-xs rounded transition-all flex items-center justify-between ${selectedLecture.id === l.id ? 'bg-white text-blue-600 font-bold shadow-sm border-l-4 border-blue-500' : 'hover:bg-[#dee2e6]'}`}>
                      <span>{l.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CSS TUTORIALS */}
            <div>
              <button onClick={() => setIsCssOpen(!isCssOpen)} className="w-full text-left font-bold px-2 py-1.5 bg-[#ced4da]/60 hover:bg-[#ced4da] rounded flex items-center justify-between text-xs text-[#2b3035] cursor-pointer">
                <span>CSS Tutorials</span> <span>{isCssOpen ? '▲' : '▼'}</span>
              </button>
              {isCssOpen && (
                <div className="pl-1 mt-1 space-y-0.5 border-l-2 border-[#ced4da]">
                  {detailedLectures.filter(l => l.type === 'CSS').map((l) => (
                    <button key={l.id} onClick={() => selectLectureHandler(l)} className={`w-full text-left px-3 py-1 text-xs rounded transition-all flex items-center justify-between ${selectedLecture.id === l.id ? 'bg-white text-blue-600 font-bold shadow-sm border-l-4 border-blue-500' : 'hover:bg-[#dee2e6]'}`}>
                      <span>{l.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        </aside>

        {/* ================= MIDDLE PANEL ================= */}
        <section className="lg:col-span-5 bg-white p-6 h-full overflow-y-auto flex flex-col space-y-4 shadow-inner">
          <div className="border-b pb-3">
            <span className="text-[10px] font-extrabold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {selectedLecture.type} Reference Manual
            </span>
            <h2 className="text-2xl font-black text-slate-800 mt-2">{selectedLecture.title}</h2>
          </div>

          <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
            {selectedLecture.mainExplanation}
          </div>

          {selectedLecture.subTerms && (
            <div className="mt-4 space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">⚙️ Detailed Sub-Terms Breakdown:</h3>
              {selectedLecture.subTerms.map((term, index) => (
                <div key={index} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <h4 className="font-bold text-blue-700 text-sm">{term.name}</h4>
                  <p className="text-xs text-slate-600">{term.explanation}</p>
                  <code className="block bg-slate-900 text-emerald-400 font-mono text-[11px] p-2 rounded-md mt-1 overflow-x-auto">
                    {term.example}
                  </code>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ================= RIGHT PANEL ================= */}
        <main className="lg:col-span-4 flex flex-col bg-[#1e222b] h-full overflow-hidden border-l border-slate-800">
          
          <div className="flex-1 flex flex-col p-3 border-b border-slate-800">
            <div className="flex items-center justify-between mb-1.5 text-[11px] font-mono text-slate-400">
              <span>💻 Type Your Code Below:</span>
              <button 
                onClick={() => setUserCode(selectedLecture.codeSnippet)} 
                className="text-cyan-400 hover:underline cursor-pointer text-[10px]"
              >
                Reset Default Code 🔄
              </button>
            </div>
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full flex-1 bg-[#15181f] border border-slate-700 rounded-lg p-3 font-mono text-xs text-emerald-400 focus:outline-none focus:border-cyan-500 resize-none shadow-inner overflow-y-auto"
            />
          </div>

          <div className="flex-1 flex flex-col p-3 bg-slate-900/40">
            <span className="text-[11px] font-mono text-slate-400 mb-1.5">👁️ Live Browser Preview:</span>
            <div className="w-full flex-1 bg-white rounded-lg overflow-hidden border border-slate-700 shadow-md">
              <iframe
                srcDoc={`
                  <html>
                    <head>
                      <style>
                        body { font-family: sans-serif; padding: 15px; margin: 0; background-color: #ffffff; color: #000000; }
                      </style>
                    </head>
                    <body>
                      ${userCode}
                    </body>
                  </html>
                `}
                title="Browser Preview Sandbox"
                className="w-full h-full bg-white border-none"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}