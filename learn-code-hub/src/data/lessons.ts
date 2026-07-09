export interface SubTerm {
  name: string;
  explanation: string;
  example: string;
}

export interface DetailedLecture {
  id: string;
  title: string;
  type: 'HTML' | 'CSS';
  mainExplanation: string;
  codeSnippet: string;
  subTerms?: SubTerm[];
}

export const detailedLectures: DetailedLecture[] = [
  // ==================== HTML TUTORIALS ====================
  {
    id: 'html-intro',
    title: 'HTML Introduction',
    type: 'HTML',
    mainExplanation: 'HTML stands for HyperText Markup Language. It is the universal standard language used to design and structure content on the web. By using tags, HTML acts as the skeleton or structural frame of every webpage, interpreting raw text strings into structured visual components.',
    codeSnippet: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Web Page</title>\n</head>\n<body>\n  <h1>Welcome to Learn Code Hub</h1>\n  <p>This is standard content structured with HTML.</p>\n</body>\n</html>',
    subTerms: [
      { name: '<!DOCTYPE html>', explanation: 'Defines that this document is an HTML5 document.', example: '<!DOCTYPE html>' },
      { name: '<html>', explanation: 'The root element that wraps all contents on the entire web page.', example: '<html>...</html>' },
      { name: '<head>', explanation: 'Contains machine-readable meta-information, configuration, and titles about the page.', example: '<head><title>Page Title</title></head>' },
      { name: '<body>', explanation: 'Contains the visible page content like text, links, buttons, and images.', example: '<body><h1>Hello World</h1></body>' },
      { name: 'HyperText', explanation: 'Refers to the method by which you move around the web—by clicking special text links (hyperlinks).', example: '<a href="...">Link</a>' },
      { name: 'Markup Language', explanation: 'Refers to the process of marking text up with tags to tell a browser how to format its appearance.', example: '<b>Text becomes bold</b>' }
    ]
  },
  {
    id: 'html-editors',
    title: 'HTML Editors',
    type: 'HTML',
    mainExplanation: 'While raw HTML can be drafted in any absolute plaintext program, utilizing modern developer editors accelerates coding with color coding and auto-closing tags.',
    codeSnippet: '\n<p>Learning code is simple with a lightweight text editor layout.</p>',
    subTerms: [
      { name: 'Plain Text Editors', explanation: 'Basic built-in operating system software tools without complex text formatting constraints.', example: 'Notepad (Windows) or TextEdit (Mac)' },
      { name: 'IDE Editors', explanation: 'Professional software featuring syntax highlighting, code completion, and Git source integration.', example: 'VS Code, Sublime Text, or Atom' },
      { name: 'File Extension', explanation: 'HTML structures must always be saved with a standard layout suffix so web engines recognize them.', example: 'filename.html' }
    ]
  },
  {
    id: 'html-basic',
    title: 'HTML Basic',
    type: 'HTML',
    mainExplanation: 'There are a few foundational building blocks that make up the structure of a standard webpage template. Mastering these basics is essential before styling with CSS.',
    codeSnippet: '<h1>Core Basic Layout</h1>\n<p>Every element requires proper opening and closing rules.</p>\n<a href="https://google.com">Search Link</a>',
    subTerms: [
      { name: 'Headings', explanation: 'Titles rendered on pages ranging from the most important down to the smallest.', example: '<h1>Main Title</h1> to <h6>Sub-item</h6>' },
      { name: 'Paragraphs', explanation: 'Text blocks designed to store information chunks cleanly on individual view lines.', example: '<p>Paragraph data block</p>' },
      { name: 'Hyperlinks', explanation: 'Interactive text snippets that connect separate document URLs together when clicked.', example: '<a href="url">Click Me</a>' }
    ]
  },
  {
    id: 'html-elements',
    title: 'HTML Elements',
    type: 'HTML',
    mainExplanation: 'An HTML element is everything from the start tag to the end tag. Elements can also be nested, meaning one element can sit cleanly inside another.',
    codeSnippet: '<div>\n  <h2>Nested Layout Header</h2>\n  <p>This paragraph is a child nested inside a parent div container block.</p>\n</div>',
    subTerms: [
      { name: 'Start Tag', explanation: 'The initial markup character sequence indicating where an element\'s rule begins.', example: '<p>' },
      { name: 'Element Content', explanation: 'The actual text description or child media stored inside the tag parameters.', example: 'Sample Content text strings' },
      { name: 'End Tag', explanation: 'The matching closing character pattern utilizing a forward slash to terminate the element.', example: '</p>' },
      { name: 'Empty Elements', explanation: 'Special elements that have no content and do not require a closing tag.', example: '<br> or <hr>' }
    ]
  },
  {
    id: 'html-attributes',
    title: 'HTML Attributes',
    type: 'HTML',
    mainExplanation: 'Attributes provide additional properties or configuring directives for an HTML element. They are always declared inside the opening tag.',
    codeSnippet: '<img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba" alt="Cat Profile" width="150">\n<br>\n<a href="https://w3schools.com" style="color: dodgerblue;">Visit Reference</a>',
    subTerms: [
      { name: 'href attribute', explanation: 'Specifies the target web link destination URL for an anchor tag link.', example: 'href="https://google.com"' },
      { name: 'src attribute', explanation: 'Specifies the path or image web location source of an image to layout display.', example: 'src="image_path.jpg"' },
      { name: 'Width & Height', explanation: 'Attributes designed to explicitly hardcode coordinate frame boundaries for items.', example: 'width="300" height="200"' },
      { name: 'alt attribute', explanation: 'Provides alternative text information for screen readers or if an asset fails to load.', example: 'alt="Profile Picture Description"' }
    ]
  },
  {
    id: 'html-headings',
    title: 'HTML Headings',
    type: 'HTML',
    mainExplanation: 'Headings establish a clear information hierarchy on web pages. Search engines crawl these headings to understand how your web page sections are structured.',
    codeSnippet: '<h1>Main Topic (H1)</h1>\n<h2>Sub-Topic Section (H2)</h2>\n<h3>Detail Breakdown Point (H3)</h3>',
    subTerms: [
      { name: '<h1>', explanation: 'Used for main overarching titles. Should ideally only appear once per page document layout.', example: '<h1>Main Blog Title</h1>' },
      { name: '<h2>', explanation: 'Defines key major section headings under the primary subject line.', example: '<h2>Chapter 1: Setup</h2>' },
      { name: '<h3> & <h4>', explanation: 'Subsections used for secondary detailed conceptual separation grids.', example: '<h3>Step A: Coding Layout</h3>' },
      { name: '<h5> & <h6>', explanation: 'The smallest headings available, typically used for deep footnotes or tertiary card descriptions.', example: '<h6>Minor notes label</h6>' }
    ]
  },
  {
    id: 'html-paragraphs',
    title: 'HTML Paragraphs',
    type: 'HTML',
    mainExplanation: 'Paragraph structures align your continuous body content text beautifully with automatic whitespace padding buffers separating adjacent data segments.',
    codeSnippet: '<p>This is our primary content paragraph block.</p>\n<p>This paragraph displays cleanly on a brand new structural layout line line.</p>',
    subTerms: [
      { name: '<p>', explanation: 'Wraps text blocks and forces a clean line break before and after the text context blocks.', example: '<p>Content body text.</p>' },
      { name: '<br>', explanation: 'Inserts a single line break directly without creating an entirely separate layout margin space.', example: 'Line One <br> Line Two' },
      { name: '<pre>', explanation: 'Displays text exactly as it is written in your source code, maintaining your spacing and indent layout keys.', example: '<pre>  Preserved    spacing  </pre>' }
    ]
  },
  {
    id: 'html-styles',
    title: 'HTML Styles',
    type: 'HTML',
    mainExplanation: 'The style attribute sets layout appearance overrides directly on specific elements before transferring global rules to external CSS files.',
    codeSnippet: '<h2 style="color: crimson; font-family: sans-serif;">Styled Main Title</h2>\n<p style="background-color: powderblue; font-size: 14px;">Highlighted text framework card.</p>',
    subTerms: [
      { name: 'color', explanation: 'Alters the text color tone displayed inside the target markup tag element frame.', example: 'style="color: blue;"' },
      { name: 'background-color', explanation: 'Applies a solid backdrop fill color to the entire canvas bounding box area of the item.', example: 'style="background-color: black;"' },
      { name: 'font-size', explanation: 'Controls the height scaling and text presentation dimensions of fonts inside elements.', example: 'style="font-size: 24px;"' },
      { name: 'text-align', explanation: 'Coordinates text distribution configurations between left, center, right, or justified layouts.', example: 'style="text-align: center;"' }
    ]
  },
  {
    id: 'html-formatting',
    title: 'HTML Formatting',
    type: 'HTML',
    mainExplanation: 'HTML contains several elements for defining text with a special meaning. Formatting elements were designed to display special types of text:',
    codeSnippet: '<p>\n  This is <b>bold text</b>, <strong>important text</strong>, <i>italic text</i>, and <em>emphasized text</em>.\n</p>\n<p>\n  You can also use <mark>marked text</mark>, <small>smaller text</small>, <del>deleted text</del>, <ins>inserted text</ins>, <sub>subscript text</sub>, and <sup>superscript text</sup>.\n</p>',
    subTerms: [
      { name: '<b>', explanation: 'Bold text', example: '<b>Bold text content</b>' },
      { name: '<strong>', explanation: 'Important text', example: '<strong>Important text content</strong>' },
      { name: '<i>', explanation: 'Italic text', example: '<i>Italic text content</i>' },
      { name: '<em>', explanation: 'Emphasized text', example: '<em>Emphasized text content</em>' },
      { name: '<mark>', explanation: 'Marked text', example: '<mark>Marked text content</mark>' },
      { name: '<small>', explanation: 'Smaller text', example: '<small>Smaller text content</small>' },
      { name: '<del>', explanation: 'Deleted text', example: '<del>Deleted text content</del>' },
      { name: '<ins>', explanation: 'Inserted text', example: '<ins>Inserted text content</ins>' },
      { name: '<sub>', explanation: 'Subscript text', example: '<sub>Subscript text content</sub>' },
      { name: '<sup>', explanation: 'Superscript text', example: '<sup>Superscript text content</sup>' }
    ]
  },
  {
    id: 'html-links',
    title: 'HTML Links',
    type: 'HTML',
    mainExplanation: 'Links form the connective tissue of the World Wide Web. By linking pages together, users can surf smoothly across separate network nodes.',
    codeSnippet: '<a href="https://wikipedia.org" target="_blank">Open Wikipedia Encyclopedia</a>',
    subTerms: [
      { name: 'href', explanation: 'The absolute link target url or local relative directory location path anchor.', example: 'href="contact.html"' },
      { name: 'target="_blank"', explanation: 'Forces the targeted page asset url link to load cleanly inside a completely fresh browser tab.', example: 'target="_blank"' },
      { name: 'target="_self"', explanation: 'The default action value. Loads the linked document in the same frame/tab where it was clicked.', example: 'target="_self"' }
    ]
  },
  {
    id: 'html-images',
    title: 'HTML Images',
    type: 'HTML',
    mainExplanation: 'Images bring visual feedback to your app structures. Using image properties keeps layouts scalable and accessible.',
    codeSnippet: '<img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" alt="Tech Workplace" style="width:100%; max-width:350px; border-radius:8px;">',
    subTerms: [
      { name: '<img>', explanation: 'An empty layout element container holding property configuration attributes only.', example: '<img src="url" alt="text">' },
      { name: 'src file-path', explanation: 'Points to either a relative local folder asset path or an online web URL.', example: 'src="assets/logo.png"' },
      { name: 'alt optimization', explanation: 'Crucial fallback text description displayed if a user has slow networks or screen readers active.', example: 'alt="Development Laptop Grid"' }
    ]
  },
  {
    id: 'html-tables',
    title: 'HTML Tables',
    type: 'HTML',
    mainExplanation: 'Tables group complex arrays of structured record values cleanly into grid matrices made of overlapping row and column blocks.',
    codeSnippet: '<table style="width:100%; border: 1px solid #ccc; border-collapse: collapse;">\n  <tr style="background:#f4f4f4;">\n    <th style="padding:8px; border:1px solid #ccc;">Skill</th>\n    <th style="padding:8px; border:1px solid #ccc;">Level</th>\n  </tr>\n  <tr>\n    <td style="padding:8px; border:1px solid #ccc;">HTML Frontend</td>\n    <td style="padding:8px; border:1px solid #ccc;">Expert</td>\n  </tr>\n</table>',
    subTerms: [
      { name: '<table>', explanation: 'The primary wrapper container initialized to turn nested elements into standard data grids.', example: '<table>...</table>' },
      { name: '<tr>', explanation: 'Table Row component block used to map out a single horizontal index sequence.', example: '<tr>...</tr>' },
      { name: '<th>', explanation: 'Table Header cell block displaying bold, centered text descriptions.', example: '<th>Username</th>' },
      { name: '<td>', explanation: 'Table Data cell storing individual data field inputs and values inside rows.', example: '<td>Areej Portfolio</td>' }
    ]
  },
  {
    id: 'html-lists',
    title: 'HTML Lists',
    type: 'HTML',
    mainExplanation: 'Lists are excellent for wireframing navigation bars, text points, dropdown menu options, or stacked sidebar parameters.',
    codeSnippet: '<h3>Development Priorities:</h3>\n<ol>\n  <li>Master Frontend Flexbox Layouts</li>\n  <li>Deploy Responsive Projects</li>\n</ol>',
    subTerms: [
      { name: '<ul>', explanation: 'Unordered list layout that outputs bullet points.', example: '<ul><li>Item</li></ul>' },
      { name: '<ol>', explanation: 'Ordered list layout that outputs auto-incremented numerical or alphabetical lists.', example: '<ol><li>First</li></ol>' },
      { name: '<li>', explanation: 'List Item element which must be nested directly inside either an ordered or unordered list.', example: '<li>List Node text</li>' }
    ]
  },
  {
    id: 'html-div',
    title: 'HTML Div',
    type: 'HTML',
    mainExplanation: 'The division tag operates as a generic block-level container grid element used to pack separate segments together for global styling or script targets.',
    codeSnippet: '<div style="background: #1e293b; color: #38bdf8; padding: 20px; border-radius: 12px;">\n  <h3>Container Division Box</h3>\n  <p>Styled uniformly using Tailwind CSS colors.</p>\n</div>',
    subTerms: [
      { name: 'Block-level', explanation: 'Takes up the full available screen row width automatically, starting on an isolated fresh layout line.', example: '<div> element nodes' },
      { name: 'Layout Container', explanation: 'Groups separate inner text frames or buttons together under a collective parent container wrapper.', example: '<div className="card-box">' },
      { name: 'Semantic Alternative', explanation: 'Modern alternatives to general divs that improve search indexing structure definitions.', example: '<section>, <article>, or <aside>' }
    ]
  },
  {
    id: 'html-forms',
    title: 'HTML Forms',
    type: 'HTML',
    mainExplanation: 'Forms create interactive submission zones where users type values, check settings boxes, or select files to send back to processing endpoints.',
    codeSnippet: '<div style="background:#f8fafc; padding:15px; border:1px solid #e2e8f0; border-radius:8px;">\n  <form onsubmit="alert(\'Form Submission Triggers Sample!\'); return false;">\n    <label style="font-size:12px; font-weight:bold;">Project Name:</label><br>\n    <input type="text" placeholder="e.g. dev-portfolio" style="padding:6px; border:1px solid #ccc; width:100%; border-radius:4px; margin-top:4px;"><br><br>\n    <button type="submit" style="background:blue; color:white; border:none; padding:6px 12px; border-radius:4px;">Save Repository</button>\n  </form>\n</div>',
    subTerms: [
      { name: '<form>', explanation: 'Defines the boundaries of the interactive area where user entry properties are captured.', example: '<form>...</form>' },
      { name: '<input>', explanation: 'Multi-purpose input element that can modify its behavior dynamically using the type property configuration.', example: 'type="text", type="password", or type="checkbox"' },
      { name: '<label>', explanation: 'Explicit descriptive text binding accessible screen reader focus targets to input fields.', example: '<label for="id">Name</label>' },
      { name: '<button>', explanation: 'The actionable trigger button component used to execute form submission actions.', example: 'type="submit"' }
    ]
  },

  // ==================== CSS TUTORIALS ====================
  {
    id: 'css-intro',
    title: 'CSS Introduction',
    type: 'CSS',
    mainExplanation: 'CSS stands for Cascading Style Sheets. It is used to design, layout, and format the presentation of a webpage. With CSS, you can completely separate presentation layout rules away from structural document files, controlling the color, font, spacing, and positioning of elements across multiple web pages all at once.',
    codeSnippet: '<style>\n  h1 { color: teal; text-align: center; }\n  p { font-family: sans-serif; color: indigo; }\n</style>\n<h1>Welcome to CSS Introduction</h1>\n<p>Presentation rules are now handled separately!</p>',
    subTerms: [
      { name: 'Cascading', explanation: 'Refers to the way styles fall down or inherit from one rule to another, resolving layout priorities dynamically.', example: 'Global body settings flow into paragraphs.' },
      { name: 'Style Sheets', explanation: 'The systematic collections of design definitions tracking properties like dimensions, backdrops, margins, and visibility grids.', example: 'A standalone style block or file.' },
      { name: 'Inline Styles', explanation: 'Applying presentation rules directly into an HTML tag using the style attribute container.', example: 'style="color: blue;"' }
    ]
  },
  {
    id: 'css-syntax',
    title: 'CSS Syntax',
    type: 'CSS',
    mainExplanation: 'A CSS rule-set consists of a selector pointing to an HTML element, followed by a declaration block containing design attributes separated by semicolons.',
    codeSnippet: '<style>\n  span {\n    color: darkorange;\n    letter-spacing: 2px;\n  }\n</style>\n<span>Styled via explicit syntax rules.</span>'
  },
  {
    id: 'css-selectors',
    title: 'CSS Selectors',
    type: 'CSS',
    mainExplanation: 'CSS selectors are used to search and match the elements you want to style. Selectors can use element names, IDs, classes, attributes, or pseudo-states.',
    codeSnippet: '<style>\n  .highlight { background-color: yellow; padding: 2px; }\n</style>\n<p class="highlight">Class Selected Target</p>'
  },
  {
    id: 'css-borders',
    title: 'CSS Borders',
    type: 'CSS',
    mainExplanation: 'The CSS border properties allow you to specify the design style, width thickness, and hex color scheme of an element\'s perimeter borders.',
    codeSnippet: '<div style="border: 4px double blue; padding: 10px;">Double Blue Border Frame Line</div>'
  },
  {
    id: 'css-margins',
    title: 'CSS Margins',
    type: 'CSS',
    mainExplanation: 'Margins create empty whitespace around elements, outside of any defined borders. You can configure individual sides (margin-top, margin-right, etc.).',
    codeSnippet: '<div style="border: 1px solid red; margin: 30px;">This component is pushed 30px away from nearby items.</div>'
  },
  {
    id: 'css-padding',
    title: 'CSS Padding',
    type: 'CSS',
    mainExplanation: 'Padding is used to clear internal cushion space around an element\'s core content, inside any defined border perimeters.',
    codeSnippet: '<div style="border: 2px solid purple; padding: 25px;">Internal clearance padding buffer space of 25px.</div>'
  },
  {
    id: 'css-boxmodel',
    title: 'CSS Box Model',
    type: 'CSS',
    mainExplanation: 'All HTML elements can be considered as structural layout boxes. The box model acts as a standard rule system mapping Content, Padding, Borders, and Margins together.',
    codeSnippet: '<div style="background-color: #e2e8f0; border: 10px solid #475569; padding: 30px; margin: 15px;">\n  Inspect this container element box layer rules!\n</div>',
    subTerms: [
      { name: '1. Content Box', explanation: 'The internal core viewport where texts, clips, or child nodes are displayed directly.', example: 'width: 100%; height: auto;' },
      { name: '2. Padding Box', explanation: 'The inside cushion buffer space separating core contents away from the border line paths.', example: 'padding: 30px;' },
      { name: '3. Border Box', explanation: 'The solid outline drawn cleanly along the boundaries of the matching inner padding layers.', example: 'border: 10px solid #475569;' },
      { name: '4. Margin Box', explanation: 'The external spacing wrapper forcing layout separation distance from outside adjacent page siblings.', example: 'margin: 15px;' }
    ]
  },
  {
    id: 'css-gradients',
    title: 'CSS Gradients',
    type: 'CSS',
    mainExplanation: 'CSS gradients let you display smooth transitions between two or more specified colors without relying on static external image assets.',
    codeSnippet: '<div style="height:100px; background-image: linear-gradient(to bottom right, cyan, blue); color:white; padding:15px;">Linear background transformation</div>'
  },
  {
    id: 'css-flexbox',
    title: 'CSS Flexbox Layout',
    type: 'CSS',
    mainExplanation: 'Flexbox aligns elements effortlessly into responsive horizontal row alignments or vertical column structures without layout breaks.',
    codeSnippet: '<div style="display: flex; justify-content: space-between; background: #f1f3f5; padding: 10px;">\n  <div style="background: white; padding: 10px; border: 1px solid #ccc;">Item A</div>\n  <div style="background: white; padding: 10px; border: 1px solid #ccc;">Item B</div>\n</div>'
  },
  {
    id: 'css-grid',
    title: 'CSS Grid Layout',
    type: 'CSS',
    mainExplanation: 'The CSS Grid Layout Module offers a powerful grid-based coordinate system with intersecting structural columns and rows.',
    codeSnippet: '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">\n  <div style="background: lightblue; padding: 15px;">Column Box 1</div>\n  <div style="background: lightgray; padding: 15px;">Column Box 2</div>\n</div>'
  }
];