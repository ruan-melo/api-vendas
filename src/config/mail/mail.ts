interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'contato@ruanmelo.tech',
      name: 'Ruan Melo - CEO at API VENDAS',
    },
  },
} as IMailConfig;
