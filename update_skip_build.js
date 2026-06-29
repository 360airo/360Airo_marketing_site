const fs = require('fs');
let content = fs.readFileSync('src/components/AiroAgentBuilder.tsx', 'utf8');

// 1. Instantly skip the build phase in runAutoplaySequence
const newRunAutoplay = `  const runAutoplaySequence = () => {
    clearAllTimeouts();
    setRunningNode(null);
    setVisitedNodes([]);
    setChatMessages([
      { sender: 'agent', text: "Hello! I am AiroAgent, your outbound growth architect. How can I help you today?" },
      { sender: 'user', text: "I want to build outbound automation" },
      { sender: 'agent', text: "Brilliant outbound choice! Email outreach is a high-converting foundation. If they don't reply within 2 days, what should we do as a follow-up? Also, what if they do reply?" },
      { sender: 'user', text: "After 2 days, take follow up. If replied -> push to Pipedrive CRM. If no replies -> send LinkedIn invite with personalized note." },
      { sender: 'agent', text: "Excellent multichannel logic! Pipedrive for active leads, and a personalized LinkedIn invite to keep the outreach warm. Now, if they accept the LinkedIn connection, how should we proceed if they reply vs. if they remain silent?" },
      { sender: 'user', text: "If accepted and replied -> Msg about the mail 'I tried to reach out to you on this email, no replies'. If no reply, message them SMS." },
      { sender: 'agent', text: "A masterfully structured setup! Connecting email, Pipedrive CRM, LinkedIn, and SMS creates a highly cohesive, high-converting loop. I am ready to generate this automation campaign flowchart. Shall we launch it?" },
      { sender: 'user', text: "Launch campaign" },
      { sender: 'agent', text: "Analyzing templates, writing sequence copies, setting up Pipedrive CRM Webhooks, and drawing the automation flowchart..." }
    ]);
    setCurrentStep(4);
  };`;

content = content.replace(
  /const runAutoplaySequence = \(\) => {[\s\S]*?setCurrentStep\(4\);\s*\}, 8400\);\s*};/,
  newRunAutoplay
);

// 2. Remove the decision nodes from the simulation sequence
const newSeqLogic = `    if (currentStep === 4) {
      const sequence = [
        // Path 1
        { node: 'start', delay: 300, path: ['start'] },
        { node: 'email1', delay: 1000, path: ['start', 'email1'] },
        { node: 'crm', delay: 2000, path: ['start', 'email1', 'decision1', 'crm'] },
        
        // Path 2
        { node: 'linkedin-invite', delay: 3500, path: ['start', 'email1', 'decision1', 'linkedin-invite'] },
        { node: 'linkedin-msg', delay: 4500, path: ['start', 'email1', 'decision1', 'linkedin-invite', 'decision2', 'linkedin-msg'] },
        
        // Path 3 No
        { node: 'sms', delay: 6000, path: ['start', 'email1', 'decision1', 'linkedin-invite', 'decision2', 'sms'] },
        
        { node: 'complete', delay: 7200, path: ['start', 'email1', 'decision1', 'linkedin-invite', 'decision2', 'sms'] }
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
