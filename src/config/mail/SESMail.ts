import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import HBSTemplate from './HBSTemplate';
import mailConfig from './mail';

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
    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
      }),
    });

    const { email, name } = mailConfig.defaults.from;

    const mailTemplate = new HBSTemplate();
    const message = await transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });
  }
}
