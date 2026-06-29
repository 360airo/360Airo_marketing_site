const fs = require('fs');
let content = fs.readFileSync('src/components/AiroAgentBuilder.tsx', 'utf8');

// 1. Add visitedNodes state
content = content.replace(
  'const [runningNode, setRunningNode] = useState(null); // Keeps track of which node is currently "pulsing" or processing',
  'const [runningNode, setRunningNode] = useState(null); // Keeps track of which node is currently "pulsing" or processing\n  const [visitedNodes, setVisitedNodes] = useState([]);'
);

// 2. Clear visitedNodes
content = content.replace(
  /const runAutoplaySequence = \(\) => {\s*clearAllTimeouts\(\);\s*setRunningNode\(null\);/,
  'const runAutoplaySequence = () => {\n    clearAllTimeouts();\n    setRunningNode(null);\n    setVisitedNodes([]);'
);

// 3. Update Sequence simulation logic
const newSeqLogic = `    if (currentStep === 4) {
      const pathChoice = Math.floor(Math.random() * 3);
      let sequence = [];
      if (pathChoice === 0) {
        sequence = [
          { node: 'start', delay: 300 },
          { node: 'email1', delay: 1000 },
          { node: 'decision1', delay: 1700 },
          { node: 'crm', delay: 2400 },
          { node: 'complete', delay: 3100 }
        ];
      } else if (pathChoice === 1) {
        sequence = [
          { node: 'start', delay: 300 },
          { node: 'email1', delay: 1000 },
          { node: 'decision1', delay: 1700 },
          { node: 'linkedin-invite', delay: 2400 },
          { node: 'decision2', delay: 3100 },
          { node: 'linkedin-msg', delay: 3800 },
          { node: 'complete', delay: 4500 }
        ];
      } else {
        sequence = [
          { node: 'start', delay: 300 },
          { node: 'email1', delay: 1000 },
          { node: 'decision1', delay: 1700 },
          { node: 'linkedin-invite', delay: 2400 },
          { node: 'decision2', delay: 3100 },
          { node: 'sms', delay: 3800 },
          { node: 'complete', delay: 4500 }
        ];
      }

      sequence.forEach((step) => {
        const id = window.setTimeout(() => {
          setRunningNode(step.node);
          setVisitedNodes(prev => [...prev, step.node]);
          if (step.node === 'complete') {`;

content = content.replace(
  /if \(currentStep === 4\) {[\s\S]*?if \(step\.node === 'complete'\) {/,
  newSeqLogic
);

// 4. Update getLineClass
const newGetLineClass = `  const getLineClass = (buildStep: number, sourceNode: string, beforeNodes: string[]) => {
    const isBuild = !runningNode;
    const isActive = (isBuild && currentStep === buildStep) || runningNode === sourceNode;
    const isCompleted = (isBuild && currentStep > buildStep) || (!isBuild && visitedNodes.includes(sourceNode) && runningNode !== sourceNode);
    
    if (isActive) return 'flow-line active';
    if (isCompleted) return 'flow-line completed';
    return 'flow-line';
  };`;
  
content = content.replace(
  /const getLineClass = [\s\S]*?return 'flow-line';\s*};/,
  newGetLineClass
);

// 5. Update flow-nodes HTML logic
// We can use a simpler replacement for the node classes
const getNodeClassFn = `  const getNodeClass = (nodeId: string, baseClass: string, buildStep: number) => {
    let classes = [baseClass];
    if (currentStep >= buildStep) classes.push('visible');
    if (runningNode === nodeId) classes.push('running');
    
    const isBuildPhase = !runningNode && currentStep <= 4;
    const isCompletedBuild = isBuildPhase && currentStep > buildStep;
    const isCompletedRun = visitedNodes.includes(nodeId) && runningNode !== nodeId;
    
    if (isCompletedBuild || isCompletedRun) classes.push('active-completed');
    
    return classes.join(' ');
  };`;

content = content.replace(
  /return \(\s*<div className="agent-builder-section-wrapper"/,
  getNodeClassFn + '\n\n  return (\n    <div className="agent-builder-section-wrapper"'
);

// Node 2
content = content.replace(
  /<div className={`flow-node node-action \$\{currentStep >= 1 \? 'visible' : ''\} \$\{runningNode === 'email1' \? 'running' : ''\} \$\{\(currentStep === 5 \|\| \(runningNode !== 'start' && runningNode !== 'email1' && runningNode !== null\)\) \? 'active-completed' : ''\}`}/,
  '<div className={getNodeClass(\'email1\', \'flow-node node-action\', 1)}'
);

// Node 3
content = content.replace(
  /<div className={`flow-node node-decision \$\{currentStep >= 2 \? 'visible' : ''\} \$\{runningNode === 'decision1' \? 'running' : ''\} \$\{\(currentStep === 5 \|\| \(runningNode !== 'start' && runningNode !== 'email1' && runningNode !== 'decision1' && runningNode !== null\)\) \? 'active-completed' : ''\}`}/,
  '<div className={getNodeClass(\'decision1\', \'flow-node node-decision\', 2)}'
);

// Node 4 CRM
content = content.replace(
  /<div className={`flow-node node-action \$\{currentStep >= 2 \? 'visible' : ''\} \$\{runningNode === 'crm' \? 'running' : ''\} \$\{\(runningNode === 'complete' \|\| currentStep === 5\) && runningNode !== 'crm' \? 'active-completed' : ''\}`}/,
  '<div className={getNodeClass(\'crm\', \'flow-node node-action\', 2)}'
);

// Node 5 LinkedIn Invite
content = content.replace(
  /<div className={`flow-node node-action \$\{currentStep >= 2 \? 'visible' : ''\} \$\{runningNode === 'linkedin-invite' \? 'running' : ''\} \$\{\(runningNode === 'decision2' \|\| runningNode === 'linkedin-msg' \|\| runningNode === 'sms' \|\| currentStep === 5\) && runningNode !== 'linkedin-invite' \? 'active-completed' : ''\}`}/,
  '<div className={getNodeClass(\'linkedin-invite\', \'flow-node node-action\', 2)}'
);

// Node 6 Decision 2
content = content.replace(
  /<div className={`flow-node node-decision \$\{currentStep >= 3 \? 'visible' : ''\} \$\{runningNode === 'decision2' \? 'running' : ''\} \$\{\(runningNode === 'linkedin-msg' \|\| runningNode === 'sms' \|\| currentStep === 5\) && runningNode !== 'decision2' \? 'active-completed' : ''\}`}/,
  '<div className={getNodeClass(\'decision2\', \'flow-node node-decision\', 3)}'
);

// Node 7 LinkedIn Msg
content = content.replace(
  /<div className={`flow-node node-action \$\{currentStep >= 3 \? 'visible' : ''\} \$\{runningNode === 'linkedin-msg' \? 'running' : ''\} \$\{\(runningNode === 'complete' \|\| currentStep === 5\) && runningNode !== 'linkedin-msg' \? 'active-completed' : ''\}`}/,
  '<div className={getNodeClass(\'linkedin-msg\', \'flow-node node-action\', 3)}'
);

// Node 8 SMS
content = content.replace(
  /<div className={`flow-node node-action \$\{currentStep >= 3 \? 'visible' : ''\} \$\{runningNode === 'sms' \? 'running' : ''\} \$\{\(runningNode === 'complete' \|\| currentStep === 5\) && runningNode !== 'sms' \? 'active-completed' : ''\}`}/,
  '<div className={getNodeClass(\'sms\', \'flow-node node-action\', 3)}'
);

fs.writeFileSync('src/components/AiroAgentBuilder.tsx', content);
console.log('Update complete');
