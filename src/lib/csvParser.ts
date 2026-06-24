export type Prospect = {
  name?: string;
  email?: string;
  valid?: boolean;
  [key: string]: any;
};

export async function parseCSV(file: File): Promise<Prospect[]> {
  const text = await file.text();
  return text
    .trim()
    .split(/\r?\n/)
    .map((line) => {
      const [email, name] = line.split(',').map((s) => s.trim());
      return { email, name, valid: !!(email && email.includes('@')) };
    });
}

export function validateProspect(p: Prospect) {
  return {
    valid: !!(p && p.email && p.email.includes('@')),
    email: p.email || '',
  };
}
