interface IMailConfig {
  driver: 'ethereal';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: 'ethereal',
  defaults: {
    from: {
      email: 'equipe@proffy.com.br',
      name: 'Luis Moraes',
    },
  },
} as IMailConfig;
