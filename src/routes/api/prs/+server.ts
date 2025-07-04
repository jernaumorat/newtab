import { GITHUB_TOKEN, GITHUB_ORG, GITHUB_USERNAME, GITHUB_FILTER, SVMNL_URL, SVMNL_KEY } from '$env/static/private';
import { Octokit } from '@octokit/rest';
import { json, type RequestHandler } from '@sveltejs/kit';
import { match } from 'ts-pattern';

const gh = new Octokit({ auth: GITHUB_TOKEN });

const group_sort = ['My PRs', 'Team PRs', 'Draft PRs'];

export const GET: RequestHandler = async ({ setHeaders }) => {
  setHeaders({
    'cache-control': 'max-age=60'
  });

  const { pullRequests } = (await (
    await fetch(`${SVMNL_URL}/api/open-prs?org=${GITHUB_ORG}&username=${GITHUB_USERNAME}`, {
      headers: { Authorization: `Bearer ${SVMNL_KEY}` }
    })
  ).json()) as TPRResponse;

  console.log(JSON.stringify(pullRequests.flat(), null, 2));

  const formattedPRs = pullRequests
    .flat()
    .map(({ url, title, number, repoName, approvedByMe, owned, owner, draft }) => ({
      name: `${approvedByMe ? '✓ ' : ''}${repoName} - ${owner} - ${title} #${number}`,
      group: match({ owned, draft })
        .with({ draft: true }, () => 'Draft PRs')
        .with({ owned: true }, () => 'My PRs')
        .otherwise(() => 'Team PRs'),
      category: 'github',
      url
    }));

  console.log(JSON.stringify(formattedPRs, null, 2));

  return json(formattedPRs);
};

export type TPRResponse = {
  pullRequests: {
    url: string;
    title: string;
    repoName: string;
    number: number;
    owned: boolean;
    owner: boolean;
    draft: boolean;
    blocked: boolean;
    approvedByMe: boolean;
  }[];
};
