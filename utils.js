const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
const config = require('./config/env')

// Generate TOKEN
function generateToken(email, expire) {
    return jwt.sign({ email }, config.SECRET_KEY, { expiresIn: `${expire}m` })
}

// postEmail
async function postEmail(req, nom, prenom, email, token, message = "", pageHtml = 'verifier') {
    const client = config.CLIENT_URL
    const isVerification = pageHtml === 'verifier'
    const subject = isVerification ? 'Vérification de votre email' : 'Réinitialisation de votre mot de passe'

    const verifier = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
                    <tr>
                        <td style="background: linear-gradient(135deg, #4a90d9 0%, #357abd 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Vérification d'Email</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 35px;">
                            <p style="color: #333333; font-size: 17px; line-height: 1.6; margin: 0 0 20px 0;">
                                Bonjour <strong>${nom} ${prenom}</strong>,
                            </p>
                            <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                                Nous avons besoin de vérifier votre adresse email <strong>${email}</strong>.
                            </p>
                            <p style="color: #4a90d9; font-size: 18px; font-weight: 500; margin: 0 0 30px 0; padding: 15px; background-color: #f0f7ff; border-radius: 8px; text-align: center;">${message}</p>
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 30px;">
                                <tr>
                                    <td align="center">
                                        <a href="${client}/${pageHtml}.html?token=${token}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #4a90d9 0%, #357abd 100%); color: #ffffff; text-decoration: none; font-size: 17px; font-weight: 600; border-radius: 8px;">Vérifier mon email</a>
                                    </td>
                                </tr>
                            </table>
                            <p style="color: #888888; font-size: 14px; line-height: 1.6; margin: 35px 0 0 0; text-align: center;">Ce lien expirera dans quelques minutes.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #eeeeee;">
                            <p style="color: #999999; font-size: 13px; margin: 0;">Si vous n'avez pas demandé cette vérification, ignorez cet email.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`

    const reinitialiser = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
                    <tr>
                        <td style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Réinitialisation du Mot de Passe</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 35px;">
                            <p style="color: #333333; font-size: 17px; line-height: 1.6; margin: 0 0 20px 0;">
                                Bonjour <strong>${nom} ${prenom}</strong>,
                            </p>
                            <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                                Vous avez demandé à réinitialiser le mot de passe pour <strong>${email}</strong>.
                            </p>
                            <p style="color: #4a90d9; font-size: 18px; font-weight: 500; margin: 0 0 30px 0; padding: 15px; background-color: #f0f7ff; border-radius: 8px; text-align: center;">${message}</p>
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 30px;">
                                <tr>
                                    <td align="center">
                                        <a href="${client}/${pageHtml}.html?token=${token}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: #ffffff; text-decoration: none; font-size: 17px; font-weight: 600; border-radius: 8px;">Réinitialiser mon mot de passe</a>
                                    </td>
                                </tr>
                            </table>
                            <p style="color: #888888; font-size: 14px; line-height: 1.6; margin: 35px 0 0 0; text-align: center;">Ce lien expirera dans quelques minutes.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #eeeeee;">
                            <p style="color: #999999; font-size: 13px; margin: 0;">Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`

    const transporter = nodemailer.createTransport({
        service: config.EMAIL_SERVICE,
        auth: {
            user: config.EMAIL_USER,
            pass: config.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: config.EMAIL_USER,
        to: config.EMAIL_USER,
        subject: subject,
        html: isVerification ? verifier : reinitialiser
    };

    return transporter.sendMail(mailOptions);
}

// server DB data
const { bamvf,
    bamoeuvre,
    bamresume,
    bamqcm,
    bamordreph,
    bamordreev,
    bamvide,
    antigonevf,
    antigoneoeuvre,
    antigoneresume,
    antigoneqcm,
    antigoneordreph,
    antigoneordreev,
    antigonevide,
    djcvf,
    djcoeuvre,
    djcresume,
    djcqcm,
    djcordreph,
    djcordreev,
    djcvide } = require('./bd/data');

// prepare data
function prepareData(exo) {
    switch (exo) {
        case 'bamvf': return bamvf; break;
        case 'bamoeuvre': return bamoeuvre; break;
        case 'bamresume': return bamresume; break;
        case 'bamqcm': return bamqcm; break; //.slice(0,10)
        case 'bamordreph': return bamordreph; break;
        case 'bamordreev': return bamordreev; break;
        case 'bamvide': return bamvide; break;

        case 'antigonevf': return antigonevf; break;
        case 'antigoneoeuvre': return antigoneoeuvre; break;
        case 'antigoneresume': return antigoneresume; break;
        case 'antigoneqcm': return antigoneqcm; break;
        case 'antigoneordreph': return antigoneordreph; break;
        case 'antigoneordreev': return antigoneordreev; break;
        case 'antigonevide': return antigonevide; break;

        case 'djcvf': return djcvf; break;
        case 'djcoeuvre': return djcoeuvre; break;
        case 'djcresume': return djcresume; break;
        case 'djcqcm': return djcqcm; break;
        case 'djcordreph': return djcordreph; break;
        case 'djcordreev': return djcordreev; break;
        case 'djcvide': return djcvide; break;


        default:
            break;
    }
}

module.exports = { postEmail, prepareData, generateToken }
