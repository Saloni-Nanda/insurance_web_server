import express, { Request, Response } from 'express';
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const { fullName, email, message , company } = req.body;

    if (!fullName || !email || !message || !company) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', });
    const currentTime = new Date().toLocaleTimeString('en-US');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.RECEIVER_EMAIL,
        subject: `Contact Form: Message from ${fullName}`,
        html: `
      <body style="margin: 0; padding: 5px; background-color: #f8f9fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <div style=" margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 32px rgba(27, 41, 81, 0.12); border: 1px solid rgba(27, 41, 81, 0.08);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1B2951 0%, #2A3B6B 100%); padding: 40px 30px; text-align: center; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; margin-bottom:10px; background: linear-gradient(90deg, #B99D54 0%, #D4B968 100%);"></div>
            <h1 style="color: white; margin: 0; font-size: 40px; font-weight: 700; text-shadow: 0 2px 8px rgba(0,0,0,0.3); letter-spacing: -0.5px;">
                RBG HR SERVICES LLP
            </h1>
            
            <div style="width: 60px; height: 2px; background: #B99D54; margin: 20px auto 0; border-radius: 2px;"></div>
        </div>
        
        <!-- Content -->
        <div style="padding: 5px 5px;">
            
            <!-- Submission Info -->
            <div style="background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%); padding: 20px 20px; border-radius: 12px; margin-top: 30px; margin-bottom: 30px; border: 1px solid #e8ecf0; border-left: 5px solid #B99D54; box-shadow: 0 2px 8px rgba(27, 41, 81, 0.04);">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <div style="width: 8px; height: 8px; background: #B99D54; border-radius: 50%; margin-right: 12px;"></div>
                    <h3 style="color: #1B2951; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.3px;">
                        Submission Details
                    </h3>
                </div>
                <div style="margin-left: 5px;">
                    <p style="color: #333333; margin: 0 0; font-size: 15px; line-height: 1.6;">
                        <strong style="color: #1B2951; font-weight: 600;">Date:</strong> 
                        <span style="color: #555555;">${currentDate}</span>
                    </p>
                    <p style="color: #333333; margin: 0 0; font-size: 15px; line-height: 1.6;">
                        <strong style="color: #1B2951; font-weight: 600;">Time:</strong> 
                        <span style="color: #555555;">${currentTime}</span>
                    </p>
                </div>
            </div>

            <!-- Contact Information -->
            <div style="background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%); padding: 20px 20px; border-radius: 12px; margin-bottom: 30px; border: 1px solid #e8ecf0; border-left: 5px solid #1B2951; box-shadow: 0 2px 8px rgba(27, 41, 81, 0.04);">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <div style="width: 8px; height: 8px; background: #1B2951; border-radius: 50%; margin-right: 12px;"></div>
                    <h3 style="color: #1B2951; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.3px;">
                        Contact Information
                    </h3>
                </div>
                <div style="margin-left: 5px;">
                    <p style="color: #333333; margin: 0 0; font-size: 15px; line-height: 1.6;">
                        <strong style="color: #1B2951; font-weight: 600;">Full Name:</strong> 
                        <span style="color: #555555;">${fullName}</span>
                    </p>
                    <p style="color: #333333; margin: 0 0; font-size: 15px; line-height: 1.6;">
                        <strong style="color: #1B2951; font-weight: 600;">Email:</strong> 
                        <a href="mailto:${email}" style="color: #B99D54; text-decoration: none; font-weight: 500; border-bottom: 1px solid transparent; transition: border-bottom 0.3s ease;">${email}</a>
                    </p>
                    <p style="color: #333333; margin: 0 0; font-size: 15px; line-height: 1.6;">
                        <strong style="color: #1B2951; font-weight: 600;">Company Name:</strong> 
                        <span style="color: #555555;">${company}</span>
                    </p>
                    <div style="margin: 15px 0;">
                        <strong style="color: #1B2951; font-weight: 600; font-size: 15px; display: block; margin-bottom: 8px;">Message:</strong>
                        <div style="font-size: 15px; background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 3px solid #B99D54; font-style: italic; color: #555555; line-height: 1.7;">
                            ${message}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Call to Action -->
            <div style="background: linear-gradient(135deg, #1B2951 0%, #2A3B6B 100%); padding: 30px; border-radius: 12px; text-align: center; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; right: -20px; width: 80px; height: 80px; background: rgba(185, 157, 84, 0.1); border-radius: 50%;"></div>
                <div style="position: absolute; bottom: -10px; left: -30px; width: 60px; height: 60px; background: rgba(185, 157, 84, 0.15); border-radius: 50%;"></div>
                <div style="position: relative; z-index: 1;">
                    <div style="width: 12px; height: 12px; background: #B99D54; border-radius: 50%; margin: 0 auto 15px; animation: pulse 2s infinite;"></div>
                    <h4 style="color: #ffffff; margin: 0 0 15px 0; font-size: 20px; font-weight: 700; letter-spacing: -0.3px;">
                        Next Steps
                    </h4>
                    <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 16px; line-height: 1.6; max-width: 400px; margin: 0 auto;">
                        A new contact form submission is waiting for your response. Consider reaching out within <strong style="color: #B99D54;">24 hours</strong> for the best customer experience.
                    </p>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #e8ecf0;">
            <p style="color: #666666; margin: 0; font-size: 13px; line-height: 1.5;">
                This email was automatically generated from your website contact form.
            </p>
            <p style="color: #888888; margin: 10px 0 0 0; font-size: 12px;">
                © ${new Date().getFullYear()} <strong style="color: #1B2951;">contact@rbghr.com</strong> - All rights reserved
            </p>
        </div>
    </div>

    <style>
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        @media (max-width: 600px) {
            body { padding: 10px !important; }
            .content-padding { padding: 25px 20px !important; }
            .header-padding { padding: 30px 20px !important; }
            .section-padding { padding: 20px !important; }
        }
    </style>
</body>
    `,
        replyTo: email,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(mailOptions)
        return res.status(200).json({ success: true, mailoptions: mailOptions , message: 'Email sent successfully' });
    } catch (error) {
        console.error('Email send error:', error);
        console.log(error)
        return res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});

export default router;
