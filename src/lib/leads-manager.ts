import * as fs from 'fs/promises';
import * as path from 'path';

export interface Lead {
  email?: string;
  name?: string;
  company?: string;
  phone?: string;
  visitorId?: string;
  sessionId?: string;
  timestamp?: string;
  source?: string;
  customFields?: Record<string, any>;
}

/**
 * Leads Manager - Utilities for managing tracked leads
 */
export class LeadsManager {
  private leadsFile: string;
  private dataDir: string;

  constructor() {
    this.dataDir = path.join(process.cwd(), 'data');
    this.leadsFile = path.join(this.dataDir, 'leads.txt');
  }

  /**
   * Initialize data directory
   */
  private async ensureDataDir(): Promise<void> {
    try {
      await fs.mkdir(this.dataDir, { recursive: true });
    } catch (error) {
      console.error('Error creating data directory:', error);
    }
  }

  /**
   * Save a single lead to file
   */
  async saveLead(lead: Lead): Promise<void> {
    await this.ensureDataDir();
    
    try {
      const formattedLead = this.formatLead(lead);
      const content = await this.readLeadsFile();
      const newContent = content ? content + '\n' + formattedLead : formattedLead + '\n';
      
      await fs.writeFile(this.leadsFile, newContent, 'utf-8');
      console.log(`✅ Lead saved: ${lead.email || lead.name}`);
    } catch (error) {
      console.error('Error saving lead:', error);
      throw error;
    }
  }

  /**
   * Save multiple leads
   */
  async saveLeads(leads: Lead[]): Promise<void> {
    await this.ensureDataDir();
    
    try {
      const formattedLeads = leads.map(lead => this.formatLead(lead));
      const content = await this.readLeadsFile();
      const leadsText = formattedLeads.join('\n');
      const newContent = content ? content + '\n' + leadsText + '\n' : leadsText + '\n';
      
      await fs.writeFile(this.leadsFile, newContent, 'utf-8');
      console.log(`✅ Saved ${leads.length} leads`);
    } catch (error) {
      console.error('Error saving leads:', error);
      throw error;
    }
  }

  /**
   * Read all leads from file
   */
  async getAllLeads(): Promise<Lead[]> {
    try {
      const content = await this.readLeadsFile();
      if (!content) return [];
      
      return content
        .split('\n')
        .filter(line => line.trim())
        .map(line => this.parseLead(line));
    } catch (error) {
      console.error('Error reading leads:', error);
      return [];
    }
  }

  /**
   * Get leads by email
   */
  async getLeadByEmail(email: string): Promise<Lead | null> {
    const leads = await this.getAllLeads();
    return leads.find(lead => lead.email?.toLowerCase() === email.toLowerCase()) || null;
  }

  /**
   * Get leads by company
   */
  async getLeadsByCompany(company: string): Promise<Lead[]> {
    const leads = await this.getAllLeads();
    return leads.filter(lead => 
      lead.company?.toLowerCase().includes(company.toLowerCase())
    );
  }

  /**
   * Get unique leads (no duplicates by email)
   */
  async getUniqueLeads(): Promise<Lead[]> {
    const leads = await this.getAllLeads();
    const seen = new Set<string>();
    
    return leads.filter(lead => {
      const key = (lead.email || lead.name || lead.visitorId || '').toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  /**
   * Get leads count
   */
  async getLeadsCount(): Promise<number> {
    const leads = await this.getAllLeads();
    return leads.length;
  }

  /**
   * Get leads created after timestamp
   */
  async getLeadsAfter(timestamp: string): Promise<Lead[]> {
    const leads = await this.getAllLeads();
    const targetTime = new Date(timestamp).getTime();
    
    return leads.filter(lead => {
      const leadTime = lead.timestamp ? new Date(lead.timestamp).getTime() : 0;
      return leadTime > targetTime;
    });
  }

  /**
   * Clear all leads (use with caution!)
   */
  async clearLeads(): Promise<void> {
    try {
      await fs.writeFile(this.leadsFile, '', 'utf-8');
      console.log('⚠️  All leads cleared');
    } catch (error) {
      console.error('Error clearing leads:', error);
      throw error;
    }
  }

  /**
   * Export leads as JSON
   */
  async exportAsJSON(): Promise<string> {
    const leads = await this.getAllLeads();
    return JSON.stringify(leads, null, 2);
  }

  /**
   * Export leads as CSV
   */
  async exportAsCSV(): Promise<string> {
    const leads = await this.getAllLeads();
    
    if (leads.length === 0) return '';
    
    // Get all unique keys from all leads
    const keys = new Set<string>();
    leads.forEach(lead => {
      Object.keys(lead).forEach(key => keys.add(key));
    });
    
    const headers = Array.from(keys);
    const rows = leads.map(lead => 
      headers.map(key => {
        const value = (lead as any)[key] || '';
        // Escape CSV values
        const escaped = String(value).replace(/"/g, '""');
        return `"${escaped}"`;
      }).join(',')
    );
    
    return [headers.join(','), ...rows].join('\n');
  }

  /**
   * Format lead for file storage
   */
  private formatLead(lead: Lead): string {
    const parts = [
      `Email: ${lead.email || 'N/A'}`,
      `Name: ${lead.name || 'N/A'}`,
      `Company: ${lead.company || 'N/A'}`,
      `Phone: ${lead.phone || 'N/A'}`,
      `Visitor ID: ${lead.visitorId || 'N/A'}`,
      `Session ID: ${lead.sessionId || 'N/A'}`,
      `Timestamp: ${lead.timestamp || new Date().toISOString()}`,
      `Source: ${lead.source || 'unknown'}`
    ];
    return parts.join(' | ');
  }

  /**
   * Parse lead from formatted string
   */
  private parseLead(line: string): Lead {
    const lead: Lead = {};
    const parts = line.split(' | ');
    
    parts.forEach(part => {
      const [key, value] = part.split(': ');
      const cleanKey = key.toLowerCase().replace(/\s+/g, '_');
      
      if (value && value !== 'N/A') {
        (lead as any)[cleanKey] = value;
      }
    });
    
    return lead;
  }

  /**
   * Read leads file content
   */
  private async readLeadsFile(): Promise<string> {
    try {
      return await fs.readFile(this.leadsFile, 'utf-8');
    } catch {
      return '';
    }
  }
}

// Export singleton instance
export const leadsManager = new LeadsManager();
