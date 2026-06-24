// CSV Parser utility for prospect data
import Papa from 'papaparse';

export interface Prospect {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company?: string;
  title?: string;
  website?: string;
  seniority?: string;
  person_linkedin?: string;
  [key: string]: string | undefined;
}

const REQUIRED_FIELDS = ['first_name', 'last_name', 'email'];
const OPTIONAL_FIELDS = ['title', 'company', 'seniority', 'person_linkedin', 'website'];

const HEADER_MAPPING: { [key: string]: string } = {
  'first_name': 'first_name',
  'firstname': 'first_name',
  'firstName': 'first_name',
  'first name': 'first_name',
  'fname': 'first_name',
  'last_name': 'last_name',
  'lastname': 'last_name',
  'lastName': 'last_name',
  'last name': 'last_name',
  'lname': 'last_name',
  'email': 'email',
  'email_address': 'email',
  'emailaddress': 'email',
  'title': 'title',
  'position': 'title',
  'job_title': 'title',
  'company': 'company',
  'company_name': 'company',
  'companyname': 'company',
  'organization': 'company',
  'seniority': 'seniority',
  'level': 'seniority',
  'person_linkedin': 'person_linkedin',
  'person_linkedin_url': 'person_linkedin',
  'linkedin': 'person_linkedin',
  'linkedinurl': 'person_linkedin',
  'linkedin_url': 'person_linkedin',
  'linkedin url': 'person_linkedin',
  'website': 'website',
  'company_website': 'website',
  'website_url': 'website',
  'company_url': 'website',
  'url': 'website',
};

export const validateCSVHeaders = (headers: string[]): { valid: boolean; missing: string[] } => {
  const normalizedHeaders = headers.map(h => {
    const lower = h.toLowerCase().trim();
    return HEADER_MAPPING[lower] || lower.replace(/[^a-z0-9_]/g, '_');
  });

  const missing = REQUIRED_FIELDS.filter(req => !normalizedHeaders.includes(req));
  return { valid: missing.length === 0, missing };
};

export const normalizeHeaders = (headers: string[]): { [key: string]: string } => {
  const mapping: { [key: string]: string } = {};
  headers.forEach(header => {
    const lower = header.toLowerCase().trim();
    const key = HEADER_MAPPING[lower] || lower.replace(/[^a-z0-9_]/g, '_');
    mapping[header] = key;
  });
  return mapping;
};

export const parseCSV = (file: File): Promise<Prospect[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      complete: (results: any) => {
        if (results.errors.length > 0) {
          reject(new Error('Error parsing CSV: ' + results.errors[0].message));
          return;
        }

        if (!results.data || results.data.length === 0) {
          reject(new Error('CSV file is empty'));
          return;
        }

        const headers = results.data[0] as string[];
        const validation = validateCSVHeaders(headers);

        if (!validation.valid) {
          reject(new Error(`Missing required fields: ${validation.missing.join(', ')}`));
          return;
        }

        const headerMapping = normalizeHeaders(headers);
        const prospects: Prospect[] = results.data
          .slice(1)
          .filter((row: string[]) => row.some(cell => cell && cell.trim()))
          .map((row: string[], idx: number) => {
            const prospect: Prospect = { 
              id: `prospect-${idx}`,
              first_name: '',
              last_name: '',
              email: ''
            };

            headers.forEach((header, colIdx) => {
              const key = headerMapping[header];
              const value = row[colIdx] || '';
              (prospect as any)[key] = value;
            });

            return prospect;
          });

        resolve(prospects);
      },
      error: (error: any) => {
        reject(error);
      }
    });
  });
};

export const validateProspect = (prospect: Prospect): { valid: boolean; errors: { [key: string]: string | null } } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const emailValid = !!(prospect.email && emailRegex.test(prospect.email));
  const firstNameValid = !!prospect.first_name;
  const lastNameValid = !!prospect.last_name;

  return {
    valid: emailValid && firstNameValid && lastNameValid,
    errors: {
      email: emailValid ? null : 'Valid email required',
      first_name: firstNameValid ? null : 'First name required',
      last_name: lastNameValid ? null : 'Last name required'
    }
  };
};
