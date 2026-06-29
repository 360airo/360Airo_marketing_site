const fs = require('fs');
let content = fs.readFileSync('src/components/AiroAgentBuilder.tsx', 'utf8');

const newGetLineClass = `  const getLineClass = (buildStep: number, sourceNode: string, targetNode: string) => {
    const isBuildPhase = !runningNode && currentStep <= 4;
    
    if (isBuildPhase && currentStep === buildStep) return 'flow-line active';

    if (!isBuildPhase) {
      if (runningNode === targetNode) return 'flow-line active';
      if (visitedNodes.includes(targetNode) && runningNode !== targetNode) return 'flow-line completed';
    }
    
    return 'flow-line';
  };`;

content = content.replace(
  /const getLineClass = [\s\S]*?return 'flow-line';\s*};/,
  newGetLineClass
);

const newGetNodeClass = `  const getNodeClass = (nodeId: string, baseClass: string, buildStep: number) => {
    let classes = [baseClass];
    if (currentStep >= buildStep) classes.push('visible');
    
    const isBuildPhase = !runningNode && currentStep <= 4;
    
    if (isBuildPhase && currentStep === buildStep) classes.push('running');

    if (!isBuildPhase) {
      if (runningNode === nodeId) classes.push('running');
      if (visitedNodes.includes(nodeId) && runningNode !== nodeId) classes.push('active-completed');
    }
    
    return classes.join(' ');
  };`;

content = content.replace(
  /const getNodeClass = [\s\S]*?return classes\.join\(' '\);\s*};/,
  newGetNodeClass
);

fs.writeFileSync('src/components/AiroAgentBuilder.tsx', content);
console.log('Update complete');
