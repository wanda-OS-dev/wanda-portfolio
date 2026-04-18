const fs = require('fs');

let content = fs.readFileSync('src/app/page.tsx', 'utf8');

const focusClasses = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-4 focus-visible:ring-offset-brand-black";

// We need to carefully replace the class names for the <Link> tags
content = content.replace(
  /className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-medium text-sm px-7 py-3\.5 rounded-sm hover:bg-brand-gold-muted transition-colors duration-300"/g,
  `className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-medium text-sm px-7 py-3.5 rounded-sm hover:bg-brand-gold-muted transition-colors duration-300 ${focusClasses}"`
);

content = content.replace(
  /className="inline-flex items-center gap-2 border border-white\/20 text-brand-white text-sm px-7 py-3\.5 rounded-sm hover:border-brand-gold hover:text-brand-gold transition-colors duration-300"/g,
  `className="inline-flex items-center gap-2 border border-white/20 text-brand-white text-sm px-7 py-3.5 rounded-sm hover:border-brand-gold hover:text-brand-gold transition-colors duration-300 ${focusClasses}"`
);

content = content.replace(
  /className="inline-flex items-center gap-2 text-brand-gold text-sm hover:gap-4 transition-all duration-300"/g,
  `className="inline-flex items-center gap-2 text-brand-gold text-sm hover:gap-4 transition-all duration-300 rounded-sm ${focusClasses}"`
);

content = content.replace(
  /className="hidden md:inline-flex items-center gap-2 text-brand-gray-500 hover:text-brand-white text-sm transition-colors duration-300"/g,
  `className="hidden md:inline-flex items-center gap-2 text-brand-gray-500 hover:text-brand-white text-sm transition-colors duration-300 rounded-sm ${focusClasses}"`
);

content = content.replace(
  /className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 md:p-8 rounded-sm transition-all duration-500 relative overflow-hidden"/g,
  `className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 md:p-8 rounded-sm transition-all duration-500 relative overflow-hidden ${focusClasses}"`
);

content = content.replace(
  /className="inline-flex items-center gap-2 text-brand-gray-500 hover:text-brand-white text-sm transition-colors duration-300"/g,
  `className="inline-flex items-center gap-2 text-brand-gray-500 hover:text-brand-white text-sm transition-colors duration-300 rounded-sm ${focusClasses}"`
);

content = content.replace(
  /className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-medium text-sm px-8 py-4 rounded-sm hover:bg-brand-gold-muted transition-colors duration-300"/g,
  `className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-medium text-sm px-8 py-4 rounded-sm hover:bg-brand-gold-muted transition-colors duration-300 ${focusClasses}"`
);

fs.writeFileSync('src/app/page.tsx', content);
