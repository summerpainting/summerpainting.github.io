const fs = require('fs');
const path = require('path');

function listFiles(dirPath, indent = '') {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    items.forEach(item => {
        const fullPath = path.join(dirPath, item.name);
        if (item.isDirectory()) {
            console.log(`${indent}📁 ${item.name}/`);
            listFiles(fullPath, indent + '  ');
        } else {
            console.log(`${indent}📄 ${item.name}`);
        }
    });
}

const projectRoot = path.join(__dirname);
console.log('项目文件结构：');
listFiles(projectRoot);