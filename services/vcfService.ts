import { Contact } from '../types';

// Maps various possible CSV header names to our internal Contact keys. Case-insensitive.
const HEADER_MAPPINGS: { [key: string]: keyof Contact } = {
    'first name': 'firstName',
    'given name': 'firstName',
    'last name': 'lastName',
    'family name': 'lastName',
    'middle name': 'middleName',
    'name prefix': 'prefix',
    'name suffix': 'suffix',
    'name': 'fullName',
    'e-mail address': 'email',
    'e-mail 2 address': 'email2',
    'e-mail 3 address': 'email3',
    'phone': 'phoneMobile',
    'primary phone': 'phoneMobile',
    'mobile phone': 'phoneMobile',
    'home phone': 'phoneHome',
    'business phone': 'phoneWork',
    'company': 'organization',
    'organization': 'organization',
    'job title': 'jobTitle',
    'home street': 'street',
    'business street': 'street',
    'home city': 'city',
    'business city': 'city',
    'home state': 'state',
    'business state': 'state',
    'home postal code': 'zip',
    'business postal code': 'zip',
    'home country/region': 'country',
    'business country/region': 'country',
    'web page': 'website',
    'notes': 'notes',
    'group': 'group',
    'categories': 'group',
};


const parseCsvLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    return result;
};

export const parseCsv = (csvText: string): Contact[] => {
    const lines = csvText.trim().split(/\r\n|\n/);
    if (lines.length < 2) return [];

    const headerLine = lines.shift();
    if (!headerLine) return [];

    const rawHeaders = parseCsvLine(headerLine);
    const mappedHeaders = rawHeaders.map(h => HEADER_MAPPINGS[h.toLowerCase().trim()] || h.toLowerCase().trim());
    
    return lines.map(line => {
        if (!line.trim()) return null;
        const values = parseCsvLine(line);
        const contact: Contact = {};
        mappedHeaders.forEach((headerKey, index) => {
            if (headerKey && values[index]) {
                contact[headerKey as keyof Contact] = values[index];
            }
        });
        return contact;
    }).filter((c): c is Contact => c !== null && Object.keys(c).some(key => c[key as keyof Contact]));
};


const escapeVcf = (str: string | undefined): string => {
    if (!str) return '';
    return str.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
};

export const generateSingleVcf = (contact: Contact): string => {
    let vcf = 'BEGIN:VCARD\r\n';
    vcf += 'VERSION:3.0\r\n';
    
    const firstName = escapeVcf(contact.firstName);
    const lastName = escapeVcf(contact.lastName);
    const middleName = escapeVcf(contact.middleName);
    const prefix = escapeVcf(contact.prefix);
    const suffix = escapeVcf(contact.suffix);

    // N (Name) field
    vcf += `N:${lastName};${firstName};${middleName};${prefix};${suffix}\r\n`;

    // FN (Formatted Name) field
    let fullName = contact.fullName;
    if (!fullName) {
      fullName = [contact.prefix, contact.firstName, contact.middleName, contact.lastName, contact.suffix]
        .filter(Boolean)
        .join(' ');
    }
    vcf += `FN:${escapeVcf(fullName)}\r\n`;
    
    if (contact.email) vcf += `EMAIL;TYPE=INTERNET,PREF:${escapeVcf(contact.email)}\r\n`;
    if (contact.email2) vcf += `EMAIL;TYPE=INTERNET:${escapeVcf(contact.email2)}\r\n`;
    if (contact.email3) vcf += `EMAIL;TYPE=INTERNET:${escapeVcf(contact.email3)}\r\n`;

    if (contact.phoneMobile) vcf += `TEL;TYPE=CELL,VOICE:${escapeVcf(contact.phoneMobile)}\r\n`;
    if (contact.phoneHome) vcf += `TEL;TYPE=HOME,VOICE:${escapeVcf(contact.phoneHome)}\r\n`;
    if (contact.phoneWork) vcf += `TEL;TYPE=WORK,VOICE:${escapeVcf(contact.phoneWork)}\r\n`;

    const street = escapeVcf(contact.street);
    const city = escapeVcf(contact.city);
    const state = escapeVcf(contact.state);
    const zip = escapeVcf(contact.zip);
    const country = escapeVcf(contact.country);
    if (street || city || state || zip || country) {
        vcf += `ADR;TYPE=HOME:;;${street};${city};${state};${zip};${country}\r\n`;
    }
    
    if (contact.organization) vcf += `ORG:${escapeVcf(contact.organization)}\r\n`;
    if (contact.jobTitle) vcf += `TITLE:${escapeVcf(contact.jobTitle)}\r\n`;
    if (contact.website) vcf += `URL:${escapeVcf(contact.website)}\r\n`;
    if (contact.notes) vcf += `NOTE:${escapeVcf(contact.notes)}\r\n`;
    if (contact.group) vcf += `CATEGORIES:${escapeVcf(contact.group)}\r\n`;

    vcf += 'END:VCARD\r\n';
    return vcf;
}

export const generateVcf = (contacts: Contact[]): string => {
    return contacts.map(generateSingleVcf).join('');
};