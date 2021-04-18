import nodemailer from 'nodemailer';
import HBSTemplate from './HBSTemplate';

interface TemplateVariable {
  [key: string]: string | number;
}

interface ParseMailTemplate {
  file: string;
  variables: TemplateVariable;
}

interface MailContact {
  name: string;
  email: string;
}

interface SendMailParams {
  to: MailContact;
  from?: MailContact;
  subject: string;
  templateData: ParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: SendMailParams): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const mailTemplate = new HBSTemplate();
    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe API Vendas',
        address: from?.email || 'equipe@apivendas.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });
    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
