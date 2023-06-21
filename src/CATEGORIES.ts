const CATEGORIES = {
  aws: { label: 'AWS Accounts', image: '/aws.png' },
  github: { label: 'GitHub', image: '/github.png' },
  neon: { label: 'NEONNOW Environments', image: '/neon.png' },
  atlassian: { label: 'Confluence Pages', image: '/atlassian.svg' },
  inbox: { label: 'Inbox', image: '/inbox.png' }
};

export default CATEGORIES;
export type TCategory = { label: string; image: string };
