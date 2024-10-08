import { JIRA_TOKEN, JIRA_ASSIGNEE, JIRA_PROJECTS, JIRA_URL, JIRA_USERNAME } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';
import type { TLink } from '../../../LINKS';

const projectStrings = JIRA_PROJECTS.split(',')
  .map((proj) => `project=${proj}`)
  .join(' OR ');

export const GET: RequestHandler = async ({ setHeaders }) => {
  setHeaders({
    'cache-control': 'max-age=60'
  });

  const response = await fetch(
    `${JIRA_URL}/rest/api/3/search?jql=` +
      `(${projectStrings}) AND ` +
      `sprint in openSprints() AND ` +
      `status in ("In Progress"%2C "In Review"%2C "To Do"%2C "Blocked"%2C "Dev Test") ` +
      `AND assignee=${JIRA_ASSIGNEE}`,
    {
      headers: {
        Authorization: `Basic ${btoa(`${JIRA_USERNAME}:${JIRA_TOKEN}`)}`
      }
    }
  );

  const issues: TLink[] = (await response.json()).issues
    .map((v: any) => ({
      name: `${v.key} - ${v.fields.summary}`,
      group: v.fields.status.name,
      url: `${JIRA_URL}/browse/${v.key}`,
      icon: v.fields.issuetype.iconUrl
    }))
    .sort((a: any, b: any) => (a.name > b.name ? 1 : -1));

  // <a href={issue.url}><img src={issue.taskIcon} />{issue.ticket} - {issue.title} - {issue.status}</a><br />

  return json({
    ...issues
  });
};
