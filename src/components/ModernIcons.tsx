import React from 'react';
import { Mail, ShieldCheck, CheckCircle, Database } from 'lucide-react';

// Minimal set of icons used by free-tools landing page. Map to sensible lucide icons.
export const DeliverabilityIcon = (props: any) => <Mail {...props} />;
export const VerifierIcon = (props: any) => <CheckCircle {...props} />;
export const CalculatorIcon = (props: any) => <Database {...props} />;
export const DmarcIcon = (props: any) => <ShieldCheck {...props} />;
export const SpfIcon = (props: any) => <ShieldCheck {...props} />;
export const PitchIcon = (props: any) => <Mail {...props} />;
export const SignatureIcon = (props: any) => <Mail {...props} />;
export const SequencerIcon = (props: any) => <Mail {...props} />;
export const AnalyzerIcon = (props: any) => <Mail {...props} />;
export const PermutatorIcon = (props: any) => <Mail {...props} />;
export const SpamCheckerIcon = (props: any) => <Mail {...props} />;

export default {};
