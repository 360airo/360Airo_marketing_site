const fs = require('fs');
let content = fs.readFileSync('src/components/AiroAgentBuilder.tsx', 'utf8');

const newSeqLogic = `    if (currentStep === 4) {
      const sequence = [
        { node: 'start', delay: 300 },
        { node: 'email1', delay: 1000 },
        { node: 'decision1', delay: 1700 },
        { node: 'crm', delay: 2400 },
        
        { node: 'decision1', delay: 3500 },
        { node: 'linkedin-invite', delay: 4200 },
        { node: 'decision2', delay: 4900 },
        
        { node: 'linkedin-msg', delay: 5600 },
        
        { node: 'decision2', delay: 6700 },
        { node: 'sms', delay: 7400 },
        
        { node: 'complete', delay: 8100 }
      ];

      sequence.forEach((step) => {
        const id = window.setTimeout(() => {
          setRunningNode(step.node);
          setVisitedNodes(prev => [...prev, step.node]);
          if (step.node === 'complete') {`;

content = content.replace(
  /if \(currentStep === 4\) {[\s\S]*?if \(step\.node === 'complete'\) {/,
  newSeqLogic
);

fs.writeFileSync('src/components/AiroAgentBuilder.tsx', content);
console.log('Update complete');
