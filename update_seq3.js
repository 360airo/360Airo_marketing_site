const fs = require('fs');
let content = fs.readFileSync('src/components/AiroAgentBuilder.tsx', 'utf8');

const newSeqLogic = `    if (currentStep === 4) {
      const sequence = [
        // Path 1
        { node: 'start', delay: 300, path: ['start'] },
        { node: 'email1', delay: 1000, path: ['start', 'email1'] },
        { node: 'decision1', delay: 1700, path: ['start', 'email1', 'decision1'] },
        { node: 'crm', delay: 2400, path: ['start', 'email1', 'decision1', 'crm'] },
        
        // Path 2
        { node: 'decision1', delay: 4000, path: ['start', 'email1', 'decision1'] },
        { node: 'linkedin-invite', delay: 4700, path: ['start', 'email1', 'decision1', 'linkedin-invite'] },
        { node: 'decision2', delay: 5400, path: ['start', 'email1', 'decision1', 'linkedin-invite', 'decision2'] },
        
        // Path 2 Yes
        { node: 'linkedin-msg', delay: 6100, path: ['start', 'email1', 'decision1', 'linkedin-invite', 'decision2', 'linkedin-msg'] },
        
        // Path 3 No
        { node: 'decision2', delay: 7700, path: ['start', 'email1', 'decision1', 'linkedin-invite', 'decision2'] },
        { node: 'sms', delay: 8400, path: ['start', 'email1', 'decision1', 'linkedin-invite', 'decision2', 'sms'] },
        
        { node: 'complete', delay: 9500, path: ['start', 'email1', 'decision1', 'linkedin-invite', 'decision2', 'sms'] }
      ];

      sequence.forEach((step) => {
        const id = window.setTimeout(() => {
          setRunningNode(step.node);
          setVisitedNodes(step.path);
          if (step.node === 'complete') {`;

content = content.replace(
  /if \(currentStep === 4\) {[\s\S]*?if \(step\.node === 'complete'\) {/,
  newSeqLogic
);

fs.writeFileSync('src/components/AiroAgentBuilder.tsx', content);
console.log('Update complete');
