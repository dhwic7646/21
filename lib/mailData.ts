export interface MailSite {
  id: string;
  name: string;
  url: string;
  description: string;
  features: string[];
  category: 'popular' | 'anonymous' | 'custom' | 'api' | 'other';
}

export const mailSites: MailSite[] = [
  {
    id: '1',
    name: 'YOPmail',
    url: 'https://yopmail.com',
    description: '最流行的临时邮箱服务，无需注册，即时可用',
    features: ['无需注册', '即时可用', '支持自定义'],
    category: 'popular'
  },
  {
    id: '2',
    name: 'Temp Mail',
    url: 'https://temp-mail.org',
    description: '自动生成临时邮箱，简单易用',
    features: ['自动生成', '简洁界面', '多语言'],
    category: 'popular'
  },
  {
    id: '3',
    name: '10 Minute Mail',
    url: 'https://10minutemail.com',
    description: '提供10分钟有效期的临时邮箱',
    features: ['10分钟有效', '可延长', '安全'],
    category: 'anonymous'
  },
  {
    id: '4',
    name: 'Guerrilla Mail',
    url: 'https://www.guerrillamail.com',
    description: '提供一次性电子邮件地址',
    features: ['可发邮件', '支持附件', 'API接口'],
    category: 'api'
  },
  {
    id: '5',
    name: 'Mohmal',
    url: 'https://www.mohmal.com',
    description: '阿拉伯语临时邮箱服务',
    features: ['多语言', '45分钟', '简单'],
    category: 'other'
  },
  {
    id: '6',
    name: 'EmailOnDeck',
    url: 'https://www.emailondeck.com',
    description: '快速生成临时邮箱',
    features: ['快速', '无广告', '简洁'],
    category: 'anonymous'
  },
  {
    id: '7',
    name: 'Maildrop',
    url: 'https://maildrop.cc',
    description: '提供免费的电子邮件转发',
    features: ['自定义域名', 'API', '开源'],
    category: 'api'
  },
  {
    id: '8',
    name: 'ThrowAwayMail',
    url: 'https://www.throwawaymail.com',
    description: '一次性邮箱地址',
    features: ['48小时', '支持转发', '无限邮箱'],
    category: 'anonymous'
  },
  {
    id: '9',
    name: 'FakeMail',
    url: 'https://www.fakemail.net',
    description: '临时邮箱生成器',
    features: ['随机生成', '简单', '快速'],
    category: 'custom'
  },
  {
    id: '10',
    name: 'TempMail.plus',
    url: 'https://tempmail.plus',
    description: '高级临时邮箱服务',
    features: ['高级功能', '多域名', 'API'],
    category: 'api'
  }
];

export const categories = {
  popular: { name: '热门推荐', icon: '🔥' },
  anonymous: { name: '匿名邮箱', icon: '🔒' },
  custom: { name: '自定义', icon: '⚙️' },
  api: { name: 'API支持', icon: '⚡' },
  other: { name: '其他', icon: '📧' }
};
