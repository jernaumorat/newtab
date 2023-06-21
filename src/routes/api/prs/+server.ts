import { GITHUB_TOKEN, GITHUB_ORG, GITHUB_USERNAME, GITHUB_FILTER } from '$env/static/private';
import { Octokit } from '@octokit/rest';
import { json, type RequestHandler } from '@sveltejs/kit';

const gh = new Octokit({ auth: GITHUB_TOKEN });

export const GET: RequestHandler = async ({ url }) => {
  const repos = (await gh.rest.repos.listForOrg({ org: GITHUB_ORG })).data
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
            // .filter((v) => )
            .map((v) => ({
              url: v.html_url,
              name: `${v.base.repo.name}/#${v.number} - ${v.title}`,
              group: v.user?.login === GITHUB_USERNAME ? 'My PRs' : 'Team PRs'
            }))
        )
    )
  );

  return json({
    ...pullRequests.flat()
  });
};

export type TPRResponse = { pullRequests: { url: string; title: string; repo: string; number: number }[] };
