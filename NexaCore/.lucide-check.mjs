import * as icons from 'lucide-react';
const wanted = ['Twitter','Github','Linkedin','Youtube','GitHub','LinkedIn'];
console.log(wanted.map(name => ({ name, exists: Object.prototype.hasOwnProperty.call(icons, name) })));