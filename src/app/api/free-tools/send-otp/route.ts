import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder')
);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || process.env.EMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASSWORD,
  },
});

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    console.log('📧 Received OTP request for:', email);

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Check if user exists
    console.log('🔍 Checking if user exists...');
    const { data: existingUser, error: userCheckError } = await supabase
      .from('free_tool_users')
      .select('id, email_verified')
      .eq('email', normalizedEmail)
      .single();

    if (userCheckError && userCheckError.code !== 'PGRST116') {
      console.error('❌ User check error:', userCheckError);
      throw new Error(`User check failed: ${userCheckError.message}`);
    }

    let userId = existingUser?.id;

    // If user exists and is already verified, skip OTP
    if (existingUser && existingUser.email_verified) {
      console.log('✅ User already verified, skipping OTP');
      
      // Update last login and updated_at time
      await supabase
        .from('free_tool_users')
        .update({ 
          last_login: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', existingUser.id);
      
      return NextResponse.json(
        {
          success: true,
          alreadyVerified: true,
          message: 'Email already verified',
          userId: existingUser.id,
        },
        { status: 200 }
      );
    }

    // If user doesn't exist, create them
    if (!userId) {
      console.log('👤 Creating new user...');
      const { data: newUser, error: createError } = await supabase
        .from('free_tool_users')
        .insert([
          {
            email: normalizedEmail,
            email_verified: false,
          },
        ])
        .select('id')
        .single();

      if (createError || !newUser) {
        console.error('❌ Error creating user:', createError);
        throw new Error(`Failed to create user: ${createError?.message}`);
      }

      userId = newUser.id;
      console.log('✅ User created:', userId);
    } else {
      console.log('✅ User already exists:', userId);
    }

    // Generate OTP
    const otp = generateOTP();
    console.log('🔐 Generated OTP:', otp);
    const now = new Date();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    console.log('🕐 Current time (UTC):', now.toISOString());
    console.log('🕐 Will expire at (UTC):', expiresAt.toISOString());
    console.log('🕐 Valid for (seconds):', 600);

    // Save OTP to database
    console.log('💾 Saving OTP to database...');
    const { error: otpError } = await supabase
      .from('free_tool_otp_codes')
      .insert([
        {
          user_id: userId,
          email: normalizedEmail,
          otp_code: otp,
          expires_at: expiresAt.toISOString(),
          is_used: false,
        },
      ]);

    if (otpError) {
      console.error('❌ Error saving OTP to database:', otpError);
      throw new Error(`Failed to save OTP: ${otpError.message}`);
    }
    console.log('✅ OTP saved to database');

    // Send OTP via email
    console.log('📨 Sending OTP email...');
    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USER || process.env.EMAIL_USER,
        to: email,
        subject: 'Your Free Tools OTP Code',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background: linear-gradient(135deg, #0a0014 0%, #19001d 100%); border-radius: 12px; color: white;">
            <h2 style="color: #b45ecf;">Free Tools Access</h2>
            <p>Your OTP code is:</p>
            <h1 style="color: #b45ecf; font-size: 36px; letter-spacing: 4px; margin: 20px 0;">${otp}</h1>
            <p>This code will expire in 10 minutes.</p>
            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">If you didn't request this code, please ignore this email.</p>
          </div>
        `,
      });
      console.log('✅ Email sent successfully');
    } catch (emailError: any) {
      console.error('❌ Email send error:', emailError);
      throw new Error(`Failed to send OTP email: ${emailError.message}`);
    }

    console.log('✅ OTP request completed successfully');
    return NextResponse.json(
      {
        success: true,
        message: 'OTP sent successfully to your email',
        userId: userId,
        expiresIn: 600,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Error in send-otp:', error.message);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message,
        hint: 'Check server logs for more details'
      },
      { status: 500 }
    );
  }
}
