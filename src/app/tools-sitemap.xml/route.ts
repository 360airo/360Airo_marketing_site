import { getBaseUrl, urlset, xmlResponse } from '../../lib/sitemap';

const toolPages = [
  '/free-tools',
  '/free-tools/dmarc-generator',
  '/free-tools/email-deliverability-test',
  '/free-tools/email-permutator',
  '/free-tools/email-pitch-generator',
  '/free-tools/email-sequencer',
  '/free-tools/email-signature-builder',
  '/free-tools/email-spam-checker',
  '/free-tools/email-template-analyzer',
  '/free-tools/email-template-builder',
  '/free-tools/email-verifier',
  '/free-tools/email-warmup-calculator',
  '/free-tools/mailbox-calculator',
  '/free-tools/spf-generator',
];

export function GET(request: Request) {
  return xmlResponse(urlset(toolPages, getBaseUrl(request)));
}
