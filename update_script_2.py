import re

with open('src/app/work/page.tsx', 'r') as f:
    content = f.read()

# Remove useMemo from import
content = content.replace("import React, { useMemo } from 'react';", "import React from 'react';")

# Move optimization outside the component
work_page_pattern = r"export default function WorkPage\(\) \{\n  // ⚡ Bolt: Pre-calculate derivative arrays once per component lifecycle to prevent redundant slice operations during React render cycles \(especially with frequent Framer Motion re-renders\)\.\n  const optimizedProjects = useMemo\(\(\) => \{\n    return projects\.map\(\(project\) => \(\{\n      \.\.\.project,\n      previewTags: project\.tags\.slice\(0, 4\)\n    \}\)\);\n  \}, \[\]\);\n\n"

replacement = """
// ⚡ Bolt: Pre-calculate derivative arrays at the module level to prevent redundant slice operations during React render cycles.
// Since `projects` is static, moving this outside the component avoids `useMemo` overhead on mount.
const optimizedProjects = projects.map((project) => ({
  ...project,
  previewTags: project.tags.slice(0, 4)
}));

export default function WorkPage() {
"""
content = re.sub(work_page_pattern, replacement, content)

with open('src/app/work/page.tsx', 'w') as f:
    f.write(content)
