'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, Search, RefreshCw, Trash2, Shield, Calendar, Key, BarChart3, ChevronDown, ChevronRight, CheckCircle2, AlertTriangle, ExternalLink
} from 'lucide-react';

interface ToolUsage {
  tool_name: string;
  usage_count: number;
  last_accessed_at: string;
}

interface VerifiedUser {
  id: string;
  email: string;
  company_domain: string;
  email_verified: boolean;
  verified_at: string;
  last_login: string;
  created_at: string;
  usage: ToolUsage[];
}

export default function FreeToolsAdminPage() {
  const [users, setUsers] = useState<VerifiedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [deletingEmail, setDeletingEmail] = useState<string | null>(null);

  // Fetch verified users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/free-tools/auth/list-users');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch verified users');
      }
      setUsers(data.users || []);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Revoke/Delete user verification
  const handleDeleteUser = async (email: string) => {
    if (!confirm(`Are you sure you want to revoke verification for ${email}? They will need to verify via OTP again to access any free tools.`)) {
      return;
    }

    setDeletingEmail(email);
    try {
      const response = await fetch('/api/free-tools/auth/list-users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to revoke verification');
      }
      // Refresh list
      setUsers((prev) => prev.filter((u) => u.email !== email));
    } catch (err: any) {
      alert(`Error revoking user: ${err.message}`);
    } finally {
      setDeletingEmail(null);
    }
  };

  // Toggle expanded usage details row
  const toggleExpandUser = (email: string) => {
    setExpandedUser(expandedUser === email ? null : email);
  };

  // Filter users based on search
  const filteredUsers = users.filter((user) => 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.company_domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date strings helper
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Never';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  // Calculate total tool uses count
  const calculateTotalUsage = (usage: ToolUsage[]) => {
    return usage.reduce((sum, curr) => sum + curr.usage_count, 0);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <div>
          <div style={styles.badge}>
            <Shield size={14} color="#a78bfa" />
            <span>Security Console</span>
          </div>
          <h1 style={styles.title}>Free Tool Verified Users</h1>
          <p style={styles.subtitle}>
            Monitor and manage organizations and email domains authorized to access the outbound marketing tools.
          </p>
        </div>

        <button onClick={fetchUsers} style={styles.refreshButton} disabled={loading}>
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>

      <div style={styles.searchBarWrapper}>
        <div style={styles.searchField}>
          <Search size={18} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by email or domain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <div style={styles.statPill}>
          <Users size={16} color="#94a3b8" />
          <span>{filteredUsers.length} Users Found</span>
        </div>
      </div>

      {error ? (
        <div style={styles.errorBanner}>
          <AlertTriangle size={24} color="#ef4444" />
          <div>
            <h3 style={{ margin: '0 0 4px 0', color: '#ffffff' }}>Failed to Load Verified Users</h3>
            <p style={{ margin: 0, color: '#fca5a5', fontSize: '14px' }}>{error}</p>
          </div>
        </div>
      ) : loading && users.length === 0 ? (
        <div style={styles.loadingContainer}>
          <RefreshCw size={36} className="animate-spin" color="#8b5cf6" />
          <p style={{ marginTop: '16px', color: '#94a3b8' }}>Querying registration databases...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div style={styles.emptyContainer}>
          <Users size={48} color="#475569" />
          <h3>No Verified Users Found</h3>
          <p>Verified domains will appear here once users complete the OTP loop.</p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeadRow}>
                <th style={{ ...styles.th, width: '40px' }}></th>
                <th style={styles.th}>User Email</th>
                <th style={styles.th}>Company Domain</th>
                <th style={styles.th}>Verification Status</th>
                <th style={styles.th}>Date Verified</th>
                <th style={styles.th}>Total Tool Uses</th>
                <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const totalUsage = calculateTotalUsage(user.usage);
                const isExpanded = expandedUser === user.email;

                return (
                  <React.Fragment key={user.email}>
                    <tr style={{
                      ...styles.tableRow,
                      background: isExpanded ? 'rgba(255, 255, 255, 0.02)' : 'transparent'
                    }}>
                      <td style={styles.td}>
                        <button 
                          onClick={() => toggleExpandUser(user.email)} 
                          style={styles.expandButton}
                          title={isExpanded ? "Collapse Usage Details" : "Expand Usage Details"}
                        >
                          {isExpanded ? (
                            <ChevronDown size={18} color="#94a3b8" />
                          ) : (
                            <ChevronRight size={18} color="#94a3b8" />
                          )}
                        </button>
                      </td>
                      <td style={{ ...styles.td, fontWeight: 600, color: '#ffffff' }}>
                        {user.email}
                      </td>
                      <td style={styles.td}>
                        <span style={styles.domainBadge}>
                          {user.company_domain}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <div style={styles.statusBadge}>
                          <CheckCircle2 size={14} color="#10b981" />
                          <span style={{ color: '#34d399' }}>Verified</span>
                        </div>
                      </td>
                      <td style={{ ...styles.td, color: '#94a3b8', fontSize: '13px' }}>
                        {formatDate(user.verified_at)}
                      </td>
                      <td style={styles.td}>
                        <div style={styles.usagePill}>
                          <BarChart3 size={12} color="#a78bfa" />
                          <span>{totalUsage} hits</span>
                        </div>
                      </td>
                      <td style={{ ...styles.td, textAlign: 'right' }}>
                        <button
                          onClick={() => handleDeleteUser(user.email)}
                          disabled={deletingEmail === user.email}
                          style={styles.deleteButton}
                          title="Revoke Verification"
                        >
                          {deletingEmail === user.email ? (
                            <RefreshCw size={14} className="animate-spin" />
                          ) : (
                            <Trash2 size={14} />
                          )}
                          <span>Revoke</span>
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Row for Tool Usage Breakdown */}
                    {isExpanded && (
                      <tr style={styles.expandedRow}>
                        <td colSpan={7} style={styles.expandedCell}>
                          <div style={styles.expandedContent}>
                            <h4 style={styles.expandedTitle}>Tool Usage Breakdown</h4>
                            {user.usage.length === 0 ? (
                              <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>
                                No tools accessed yet.
                              </p>
                            ) : (
                              <div style={styles.usageGrid}>
                                {user.usage.map((u, i) => (
                                  <div key={i} style={styles.usageCard}>
                                    <div style={styles.usageCardHeader}>
                                      <span style={styles.toolName}>{u.tool_name}</span>
                                      <span style={styles.toolCount}>{u.usage_count} uses</span>
                                    </div>
                                    <div style={styles.usageCardFooter}>
                                      <Calendar size={12} color="#64748b" />
                                      <span>Last: {formatDate(u.last_accessed_at)}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}

const styles = {
  pageContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 24px 80px 24px',
    minHeight: '85vh',
    fontFamily: '"Outfit", "Inter", sans-serif',
    color: '#cbd5e1',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
    gap: '24px',
    flexWrap: 'wrap' as const,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    borderRadius: '999px',
    background: 'rgba(167, 139, 250, 0.1)',
    border: '1px solid rgba(167, 139, 250, 0.15)',
    color: '#a78bfa',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    marginBottom: '12px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#ffffff',
    margin: '0 0 8px 0',
    letterSpacing: '-0.025em',
  },
  subtitle: {
    fontSize: '15px',
    color: '#94a3b8',
    margin: 0,
    maxWidth: '650px',
    lineHeight: 1.5,
  },
  refreshButton: {
    padding: '10px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s',
  },
  searchBarWrapper: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
  },
  searchField: {
    position: 'relative' as const,
    flex: 1,
    minWidth: '280px',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute' as const,
    left: '14px',
    color: '#64748b',
  },
  searchInput: {
    width: '100%',
    padding: '12px 12px 12px 42px',
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s',
  },
  statPill: {
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#94a3b8',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
  },
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
    background: 'rgba(255,255,255,0.01)',
    border: '1px dashed rgba(255,255,255,0.06)',
    borderRadius: '16px',
    textAlign: 'center' as const,
    padding: '40px',
    color: '#94a3b8',
  },
  errorBanner: {
    display: 'flex',
    gap: '16px',
    padding: '20px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.15)',
    borderRadius: '12px',
    marginBottom: '24px',
  },
  tableContainer: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '14px',
    overflow: 'hidden' as const,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    textAlign: 'left' as const,
  },
  tableHeadRow: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    background: 'rgba(255, 255, 255, 0.01)',
  },
  th: {
    padding: '16px 20px',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    color: '#64748b',
    letterSpacing: '0.05em',
  },
  tableRow: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
    transition: 'background 0.2s',
  },
  td: {
    padding: '18px 20px',
    fontSize: '14px',
    verticalAlign: 'middle',
  },
  expandButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  domainBadge: {
    padding: '4px 8px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px',
    fontSize: '13px',
    fontFamily: '"Outfit", monospace',
    color: '#cbd5e1',
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    borderRadius: '999px',
    background: 'rgba(16, 185, 129, 0.08)',
    border: '1px solid rgba(16, 185, 129, 0.15)',
    fontSize: '12px',
    fontWeight: 600,
  },
  usagePill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    borderRadius: '6px',
    background: 'rgba(139, 92, 246, 0.08)',
    border: '1px solid rgba(139, 92, 246, 0.15)',
    fontSize: '12px',
    fontWeight: 600,
    color: '#c084fc',
  },
  deleteButton: {
    padding: '6px 12px',
    background: 'rgba(239, 68, 68, 0.08)',
    border: '1px solid rgba(239, 68, 68, 0.15)',
    borderRadius: '6px',
    color: '#fca5a5',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s',
  },
  expandedRow: {
    background: 'rgba(15, 23, 42, 0.3)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
  },
  expandedCell: {
    padding: '20px 24px 28px 24px',
  },
  expandedContent: {
    marginLeft: '36px',
  },
  expandedTitle: {
    fontSize: '13px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    color: '#64748b',
    letterSpacing: '0.05em',
    margin: '0 0 16px 0',
  },
  usageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '12px',
  },
  usageCard: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '8px',
    padding: '12px 16px',
  },
  usageCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  toolName: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#ffffff',
  },
  toolCount: {
    fontSize: '11px',
    fontWeight: 600,
    padding: '2px 6px',
    background: 'rgba(139, 92, 246, 0.1)',
    color: '#c084fc',
    borderRadius: '4px',
  },
  usageCardFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    color: '#64748b',
  },
};
