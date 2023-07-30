import { GITHUB_TOKEN, GITHUB_ORG, GITHUB_USERNAME, GITHUB_FILTER } from '$env/static/private';
import { Octokit } from '@octokit/rest';
import { json, type RequestHandler } from '@sveltejs/kit';

const gh = new Octokit({ auth: GITHUB_TOKEN });

const group_sort = ['My PRs', 'Team PRs', 'Draft PRs'];

export const GET: RequestHandler = async ({ setHeaders }) => {
  setHeaders({
    'cache-control': 'max-age=60'
  });

  const repos = (await gh.rest.repos.listForOrg({ org: GITHUB_ORG, per_page: 200 })).data
    .map((v) => v.name)
    .filter((name) => name.includes(GITHUB_FILTER));

  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);

  const pullRequests = await Promise.all(
    repos.map((repo) =>
      gh.rest.pulls
        .list({
          owner: GITHUB_ORG,
          repo,
          state: 'open',
          per_page: 1000
        })
        .then((res) =>
          res.data
            .flat()
            .filter((v) => v.created_at > lastWeek.toISOString())
            .map((v) => ({
              url: v.html_url,
              name: `${v.base.repo.name}/#${v.number} - ${v.title}`,
              group: v.user?.login === GITHUB_USERNAME ? 'My PRs' : v.draft ? 'Draft PRs' : 'Team PRs'
            }))
            .sort((a, b) =>
              a.group === b.group
                ? a.name > b.name
                  ? 1
                  : -1
                : group_sort.indexOf(a.group) - group_sort.indexOf(b.group)
            )
        )
    )
  );

  return json(pullRequests.flat());
};

export type TPRResponse = { pullRequests: { url: string; title: string; repo: string; number: number }[] };
