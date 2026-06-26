"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Country {
  name: string;
  code: string;
  flag: string;
  dialCode: string;
}

const countries: Country[] = [
  { name: 'United States', code: 'US', flag: '🇺🇸', dialCode: '+1' },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', dialCode: '+44' },
  { name: 'Canada', code: 'CA', flag: '🇨🇦', dialCode: '+1' },
  { name: 'Australia', code: 'AU', flag: '🇦🇺', dialCode: '+61' },
  { name: 'India', code: 'IN', flag: '🇮🇳', dialCode: '+91' },
  { name: 'Singapore', code: 'SG', flag: '🇸🇬', dialCode: '+65' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪', dialCode: '+49' },
  { name: 'France', code: 'FR', flag: '🇫🇷', dialCode: '+33' },
  { name: 'Japan', code: 'JP', flag: '🇯🇵', dialCode: '+81' },
  { name: 'China', code: 'CN', flag: '🇨🇳', dialCode: '+86' },
  { name: 'Brazil', code: 'BR', flag: '🇧🇷', dialCode: '+55' },
  { name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪', dialCode: '+971' },
  { name: 'South Africa', code: 'ZA', flag: '🇿🇦', dialCode: '+27' },
  { name: 'Mexico', code: 'MX', flag: '🇲🇽', dialCode: '+52' },
  { name: 'Netherlands', code: 'NL', flag: '🇳🇱', dialCode: '+31' },
  { name: 'Switzerland', code: 'CH', flag: '🇨🇭', dialCode: '+41' },
  { name: 'Sweden', code: 'SE', flag: '🇸🇪', dialCode: '+46' },
  { name: 'Ireland', code: 'IE', flag: '🇮🇪', dialCode: '+353' },
  { name: 'Spain', code: 'ES', flag: '🇪🇸', dialCode: '+34' },
  { name: 'Italy', code: 'IT', flag: '🇮🇹', dialCode: '+39' },
  { name: 'New Zealand', code: 'NZ', flag: '🇳🇿', dialCode: '+64' },
  { name: 'Hong Kong', code: 'HK', flag: '🇭🇰', dialCode: '+852' }
];

const publicDomains = [
  'gmail.com', 'googlemail.com', 'outlook.com', 'hotmail.com',
  'yahoo.com', 'ymail.com', 'aol.com', 'icloud.com', 'mail.com',
  'live.com', 'msn.com', 'zoho.com', 'proton.me', 'protonmail.com',
  'gmx.com', 'yandex.com'
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM'
];

const timezones = [
  { value: 'America/New_York', label: 'EST / America (New York)' },
  { value: 'America/Los_Angeles', label: 'PST / America (Los Angeles)' },
  { value: 'Europe/London', label: 'GMT / London' },
  { value: 'Europe/Paris', label: 'CET / Europe (Paris)' },
  { value: 'Asia/Kolkata', label: 'IST / India' },
  { value: 'Asia/Singapore', label: 'SGT / Singapore' },
  { value: 'Australia/Sydney', label: 'AEST / Sydney' }
];

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function BookDemoModal({ isOpen, onClose }: BookDemoModalProps) {
  // Step 1: Info (with toggle), Step 2: Scheduling, Step 3: Success
  const [step, setStep] = useState(1);
  const [teamType, setTeamType] = useState<'small-team' | 'company'>('small-team');

  // Form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [employeeSize, setEmployeeSize] = useState('1-10');

  // Search country dropdown
  const [countrySearch, setCountrySearch] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // Calendar selections
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timezone, setTimezone] = useState('America/New_York');

  // Validation messages
  const [emailError, setEmailError] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dropdown ref click listener to close search list
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.country-dropdown-container')) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if ((window as any).lenis) {
        (window as any).lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [isOpen]);

  // Reset state on open/close
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setTeamType('small-team');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setSelectedDate(null);
      setSelectedTime(null);
      setEmailError('');
      setFormError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Real-time email domain validation
  const validateEmailAddress = (emailVal: string, type: 'small-team' | 'company') => {
    if (!emailVal) {
      setEmailError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    if (type === 'company') {
      const parts = emailVal.split('@');
      const domain = parts[parts.length - 1]?.toLowerCase();
      if (publicDomains.includes(domain)) {
        setEmailError('Gmail, Outlook, and other public email domains are not allowed for Organization demos. Please use a work email.');
        return false;
      }
    }
    setEmailError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    validateEmailAddress(val, teamType);
  };

  const handleBookDemoSubmit = async () => {
    if (!selectedDate || !selectedTime) return;
    setIsSubmitting(true);
    setFormError('');
    try {
      const response = await fetch('/api/book-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          countryCode: selectedCountry.dialCode,
          employeeSize,
          demoDate: selectedDate.toISOString(),
          demoTime: selectedTime,
          timezone,
          teamType
        })
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || 'Failed to schedule demo');
      }

      setStep(3);
    } catch (err: any) {
      console.error(err);
      setFormError(err.message || 'Something went wrong while booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Next steps
  const handleNextToCalendar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone) {
      setFormError('Please fill in all required fields.');
      return;
    }
    const isEmailValid = validateEmailAddress(email, teamType);
    if (!isEmailValid) {
      return;
    }
    setFormError('');
    setStep(2);
  };

  // Calendar helpers
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    const minMonth = today.getMonth();
    const minYear = today.getFullYear();
    if (currentYear === minYear && currentMonth <= minMonth) {
      return;
    }
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const isDateDisabled = (day: number, isCurrMonth: boolean) => {
    if (!isCurrMonth) return true;
    const d = new Date(currentYear, currentMonth, day);
    const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < todayZero;
  };

  const isDateSelected = (day: number, isCurrMonth: boolean) => {
    if (!isCurrMonth || !selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  // Build Calendar Days array
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayIndex = getFirstDayOfMonth(currentMonth, currentYear);
  const prevMonthDaysCount = currentMonth === 0 ? getDaysInMonth(11, currentYear - 1) : getDaysInMonth(currentMonth - 1, currentYear);

  const daysArr: { day: number; currentMonth: boolean }[] = [];
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    daysArr.push({ day: prevMonthDaysCount - i, currentMonth: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArr.push({ day: i, currentMonth: true });
  }
  const remainingSlots = 42 - daysArr.length;
  for (let i = 1; i <= remainingSlots; i++) {
    daysArr.push({ day: i, currentMonth: false });
  }

  // Country filtering
  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) || 
    c.dialCode.includes(countrySearch)
  );

  return (
    <div 
      data-lenis-prevent
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(2, 8, 23, 0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '24px'
      }} 
      onClick={onClose}
      className="booking-modal-overlay"
    >
      {/* Modal Window Container */}
      <div 
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: step === 2 ? '780px' : '500px',
          width: '100%',
          background: 'rgba(10, 18, 36, 0.55)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '12px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          padding: '30px 24px',
          transition: 'max-width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
          overflow: 'visible'
        }}
        className="booking-card booking-modal-card"
      >
        {/* Absolute Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '16px',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'color 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.03)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
          }}
        >
          ✕
        </button>
        
        {/* Header Step Indicators (Except success step) */}
        {step < 3 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingRight: '20px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Step {step} of 2
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[1, 2].map((s) => (
                <div 
                  key={s} 
                  style={{
                    width: '24px',
                    height: '3.5px',
                    borderRadius: '2px',
                    background: s <= step ? '#0EB5BB' : 'rgba(255, 255, 255, 0.1)',
                    transition: 'background 0.3s'
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* STEP 1: Contact Form with Toggle inside */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px', letterSpacing: '-0.015em', color: '#fff', textAlign: 'center' }}>
              Tell us about yourself
            </h2>
            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.45)', marginBottom: '20px', textAlign: 'center' }}>
              Select your team size and fill in your details to schedule your demo.
            </p>

            {/* Sliding Toggle Selector */}
            <div style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '30px',
              padding: '3px',
              width: '100%',
              maxWidth: '300px',
              margin: '0 auto 24px',
              position: 'relative',
              cursor: 'pointer',
              userSelect: 'none'
            }}>
              {/* Sliding Indicator */}
              <div style={{
                position: 'absolute',
                top: '3px',
                bottom: '3px',
                left: teamType === 'small-team' ? '3px' : 'calc(50% + 1px)',
                width: 'calc(50% - 4px)',
                background: 'linear-gradient(135deg, #0EB5BB, #3B82F6)',
                borderRadius: '26px',
                transition: 'left 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                zIndex: 1
              }} />
              
              <div 
                onClick={() => {
                  setTeamType('small-team');
                  validateEmailAddress(email, 'small-team');
                }}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '7px 0',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: teamType === 'small-team' ? '#020817' : 'rgba(255, 255, 255, 0.55)',
                  position: 'relative',
                  zIndex: 2,
                  transition: 'color 0.25s'
                }}
              >
                Small Team
              </div>
              
              <div 
                onClick={() => {
                  setTeamType('company');
                  validateEmailAddress(email, 'company');
                }}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '7px 0',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: teamType === 'company' ? '#020817' : 'rgba(255, 255, 255, 0.55)',
                  position: 'relative',
                  zIndex: 2,
                  transition: 'color 0.25s'
                }}
              >
                Organization
              </div>
            </div>

            <form onSubmit={handleNextToCalendar} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* First and Last Name */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="booking-form-row contact-form-row">
                <div>
                  <label htmlFor="booking-fname-modal" style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '5px', fontWeight: 600 }}>First Name *</label>
                  <input 
                    id="booking-fname-modal"
                    type="text" 
                    required
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '13px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0EB5BB'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                  />
                </div>
                <div>
                  <label htmlFor="booking-lname-modal" style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '5px', fontWeight: 600 }}>Last Name *</label>
                  <input 
                    id="booking-lname-modal"
                    type="text" 
                    required
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '13px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0EB5BB'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                  />
                </div>
              </div>

              {/* Email Address with Corporate validation warning */}
              <div>
                <label htmlFor="booking-email-modal" style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '5px', fontWeight: 600 }}>
                  Work Email *
                </label>
                <input 
                  id="booking-email-modal"
                  type="email" 
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={handleEmailChange}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${emailError ? '#EF4444' : 'rgba(255, 255, 255, 0.08)'}`,
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '13px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = emailError ? '#EF4444' : '#0EB5BB'}
                  onBlur={(e) => e.target.style.borderColor = emailError ? '#EF4444' : 'rgba(255, 255, 255, 0.08)'}
                />
                {emailError && (
                  <span style={{ display: 'block', color: '#F87171', fontSize: '11.5px', marginTop: '4px', lineHeight: '1.4' }}>
                    ⚠️ {emailError}
                  </span>
                )}
              </div>

              {/* Phone Extension with Real-time Search Dropdown & Phone Number */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.5fr', gap: '12px' }} className="booking-form-row contact-form-row">
                
                {/* Phone Extension Selector with Search */}
                <div className="country-dropdown-container">
                  <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '5px', fontWeight: 600 }}>Country Code *</label>
                  <div style={{ position: 'relative' }}>
                    <div 
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '11px 12px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '13px',
                        cursor: 'pointer',
                        justifyContent: 'space-between',
                        userSelect: 'none'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <img 
                          src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`} 
                          alt={selectedCountry.name}
                          style={{ width: '16px', height: 'auto', borderRadius: '2px', marginRight: '2px' }}
                        />
                        <span>{selectedCountry.dialCode}</span>
                      </span>
                      <span style={{ fontSize: '8px', opacity: 0.6 }}>▼</span>
                    </div>

                    {/* Dropdown Menu Overlay */}
                    {isCountryDropdownOpen && (
                      <div style={{
                        position: 'absolute',
                        top: '46px',
                        left: '0',
                        width: '240px',
                        background: '#0B1528',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '8px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                        zIndex: 100,
                        padding: '8px'
                      }}>
                        {/* Search Input */}
                        <input 
                          type="text"
                          placeholder="Search country..."
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '5px',
                            color: '#fff',
                            fontSize: '12px',
                            outline: 'none',
                            marginBottom: '6px'
                          }}
                          autoFocus
                        />
                        {/* List of Countries */}
                        <div data-lenis-prevent style={{ maxHeight: '140px', overflowY: 'auto' }}>
                          {filteredCountries.map((c) => (
                            <div 
                              key={c.code}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCountry(c);
                                setIsCountryDropdownOpen(false);
                                setCountrySearch('');
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '6px 8px',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                fontSize: '12px',
                                color: '#E2E8F0',
                                transition: 'background 0.2s'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
                              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <img 
                                  src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`} 
                                  alt={c.name}
                                  style={{ width: '16px', height: 'auto', borderRadius: '2px', marginRight: '4px' }}
                                />
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}>{c.name}</span>
                              </span>
                              <span style={{ fontWeight: 600, color: '#0EB5BB' }}>{c.dialCode}</span>
                            </div>
                          ))}
                          {filteredCountries.length === 0 && (
                            <div style={{ padding: '6px', color: 'rgba(255,255,255,0.4)', fontSize: '12px', textAlign: 'center' }}>
                              No results
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Phone Number Input */}
                <div>
                  <label htmlFor="booking-phone-modal" style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '5px', fontWeight: 600 }}>Phone Number *</label>
                  <input 
                    id="booking-phone-modal"
                    type="tel" 
                    required
                    placeholder="201 555-0123"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '13px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0EB5BB'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                  />
                </div>

              </div>

              {/* Employee Size Dropdown */}
              <div>
                <label htmlFor="booking-size-modal" style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '5px', fontWeight: 600 }}>Employee Size *</label>
                <select 
                  id="booking-size-modal"
                  value={employeeSize}
                  onChange={(e) => setEmployeeSize(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    background: '#0B1528',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '13px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="1-10">1 - 10 employees</option>
                  <option value="11-50">11 - 50 employees</option>
                  <option value="51-200">51 - 200 employees</option>
                  <option value="201-plus">201+ employees</option>
                </select>
              </div>

              {formError && (
                <p style={{ color: '#EF4444', fontSize: '12.5px', margin: '2px 0 0' }}>
                  ⚠️ {formError}
                </p>
              )}

              {/* Next Button */}
              <button 
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #0EB5BB, #3B82F6)',
                  borderRadius: '8px',
                  padding: '12px',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(14, 181, 187, 0.25)',
                  marginTop: '8px',
                  textAlign: 'center',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(14, 181, 187, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(14, 181, 187, 0.25)';
                }}
              >
                Next: Choose Date & Time
              </button>

            </form>
          </div>
        )}

        {/* STEP 2: Scheduling (Calendar, Clock, Timezone) */}
        {step === 2 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <button 
                onClick={() => setStep(1)} 
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0EB5BB',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '0'
                }}
              >
                ← Back
              </button>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px', letterSpacing: '-0.015em', color: '#fff' }}>
              Select Date & Time
            </h2>
            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.45)', marginBottom: '20px' }}>
              Select a convenient slot for your custom outbound strategy walk-through.
            </p>

            {/* Side-by-Side Grid: Calendar on Left, Clock Slots on Right */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '24px',
              alignItems: 'start'
            }} className="booking-schedule-row contact-form-row">
              
              {/* Column A: Interactive Calendar */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '16px'
              }}>
                {/* Calendar Month Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}>
                  <button 
                    onClick={prevMonth}
                    type="button"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '6px',
                      width: '28px',
                      height: '28px',
                      color: '#fff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ‹
                  </button>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>
                    {monthNames[currentMonth]} {currentYear}
                  </span>
                  <button 
                    onClick={nextMonth}
                    type="button"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '6px',
                      width: '28px',
                      height: '28px',
                      color: '#fff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ›
                  </button>
                </div>

                {/* Day Headers (Sun - Sat) */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 1fr)',
                  gap: '4px',
                  textAlign: 'center',
                  marginBottom: '6px'
                }}>
                  {daysOfWeek.map((day) => (
                    <span key={day} style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.35)' }}>
                      {day}
                    </span>
                  ))}
                </div>

                {/* Days Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 1fr)',
                  gap: '4px'
                }}>
                  {daysArr.map((cell, idx) => {
                    const disabled = isDateDisabled(cell.day, cell.currentMonth);
                    const selected = isDateSelected(cell.day, cell.currentMonth);
                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                          const newD = new Date(currentYear, currentMonth, cell.day);
                          setSelectedDate(newD);
                          setSelectedTime(null);
                        }}
                        style={{
                          background: selected 
                            ? '#0EB5BB' 
                            : cell.currentMonth 
                              ? 'rgba(255, 255, 255, 0.03)' 
                              : 'transparent',
                          border: selected 
                            ? '1px solid #0EB5BB' 
                            : cell.currentMonth 
                              ? '1px solid rgba(255, 255, 255, 0.06)' 
                              : 'none',
                          borderRadius: '6px',
                          height: '32px',
                          color: disabled 
                            ? 'rgba(255, 255, 255, 0.15)' 
                            : selected 
                              ? '#020817' 
                              : '#fff',
                          fontSize: '12px',
                          fontWeight: selected ? '700' : '500',
                          cursor: disabled ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'background 0.2s, border-color 0.2s'
                        }}
                        className={disabled ? '' : 'calendar-day-btn'}
                      >
                        {cell.day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Column B: Time Slots Selection */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Timezone Selector */}
                <div>
                  <label htmlFor="booking-timezone-modal" style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '6px', fontWeight: 600 }}>
                    Timezone
                  </label>
                  <select
                    id="booking-timezone-modal"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: '#0B1528',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {timezones.map((tz) => (
                      <option key={tz.value} value={tz.value}>{tz.label}</option>
                    ))}
                  </select>
                </div>

                {/* Clock Slots Grid */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '6px', fontWeight: 600 }}>
                    Available Times {selectedDate ? `for ${selectedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}` : ''}
                  </label>

                  {!selectedDate ? (
                    <div style={{
                      padding: '24px 12px',
                      textAlign: 'center',
                      background: 'rgba(255,255,255,0.01)',
                      border: '1px dashed rgba(255,255,255,0.08)',
                      borderRadius: '10px',
                      color: 'rgba(255,255,255,0.3)',
                      fontSize: '12px'
                    }}>
                      Select calendar date first
                    </div>
                  ) : (
                    <div data-lenis-prevent style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '6px',
                      maxHeight: '160px',
                      overflowY: 'auto',
                      paddingRight: '2px'
                    }}>
                      {timeSlots.map((time) => {
                        const isSel = selectedTime === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            style={{
                              padding: '8px',
                              background: isSel ? '#0EB5BB' : 'rgba(255, 255, 255, 0.02)',
                              border: isSel ? '1px solid #0EB5BB' : '1px solid rgba(255, 255, 255, 0.08)',
                              borderRadius: '6px',
                              color: isSel ? '#020817' : '#E2E8F0',
                              fontSize: '11px',
                              fontWeight: isSel ? '700' : '500',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              textAlign: 'center'
                            }}
                          >
                            🕒 {time}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {formError && (
                  <div style={{ color: '#FF4A4A', fontSize: '12px', marginTop: '8px', marginBottom: '8px', textAlign: 'center', width: '100%' }}>
                    ⚠️ {formError}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="button"
                  disabled={!selectedDate || !selectedTime || isSubmitting}
                  onClick={handleBookDemoSubmit}
                  style={{
                    background: (!selectedDate || !selectedTime || isSubmitting) 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'linear-gradient(135deg, #0EB5BB, #3B82F6)',
                    borderRadius: '8px',
                    padding: '12px',
                    color: (!selectedDate || !selectedTime || isSubmitting) ? 'rgba(255, 255, 255, 0.25)' : '#fff',
                    fontSize: '14px',
                    fontWeight: 600,
                    border: 'none',
                    cursor: (!selectedDate || !selectedTime || isSubmitting) ? 'default' : 'pointer',
                    boxShadow: (!selectedDate || !selectedTime || isSubmitting) ? 'none' : '0 4px 16px rgba(14, 181, 187, 0.25)',
                    marginTop: '4px',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedDate && selectedTime && !isSubmitting) {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(14, 181, 187, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedDate && selectedTime && !isSubmitting) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(14, 181, 187, 0.25)';
                    }
                  }}
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                </button>

              </div>

            </div>
          </div>
        )}

        {/* STEP 3: Confirmation / Success State */}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(14, 181, 187, 0.1)',
              border: '1px solid rgba(14, 181, 187, 0.2)',
              color: '#0EB5BB',
              fontSize: '24px',
              marginBottom: '20px'
            }} className="animate-pulse-glow">
              ✓
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.015em', color: '#fff' }}>
              Demo Booked Successfully!
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5', marginBottom: '24px', maxWidth: '420px', margin: '0 auto 24px' }}>
              Thank you, {firstName}. Your outbound engine strategy review for {teamType === 'company' ? 'your organization' : 'your team'} has been scheduled.
            </p>

            {/* Summary details card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '12px',
              padding: '18px 20px',
              textAlign: 'left',
              marginBottom: '28px'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>Date</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>
                    📅 {selectedDate?.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>Time ({timezones.find(tz => tz.value === timezone)?.label.split(' / ')[0]})</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>
                    🕒 {selectedTime}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>Attendee</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>
                    👤 {firstName} {lastName}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>Email</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', whiteSpace: 'nowrap', color: '#fff' }}>
                    ✉️ {email}
                  </span>
                </div>
              </div>
            </div>

            <button 
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '10px 24px',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
