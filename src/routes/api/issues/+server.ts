import { JIRA_TOKEN, JIRA_ASSIGNEE, JIRA_PROJECT, JIRA_URL, JIRA_USERNAME } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';
import type { TLink } from '../../../LINKS';

export const GET: RequestHandler = async () => {
  const issues: TLink[] = (
    await (
      await fetch(
        `${JIRA_URL}/rest/api/3/search?jql=` +
          `project=${JIRA_PROJECT} AND ` +
          `sprint in openSprints() AND ` +
          `status in ("In Progress"%2C "In Review"%2C "To Do") ` +
          `AND assignee=${JIRA_ASSIGNEE}`,
        {
          headers: {
            Authorization: `Basic ${btoa(`${JIRA_USERNAME}:${JIRA_TOKEN}`)}`
          }
        }
      )
    ).json()
  ).issues.map((v: any) => ({
    name: `${v.key} - ${v.fields.summary}`,
    group: v.fields.status.name,
    url: `${JIRA_URL}/browse/${v.key}`,
    icon: v.fields.issuetype.iconUrl
  }));

  // <a href={issue.url}><img src={issue.taskIcon} />{issue.ticket} - {issue.title} - {issue.status}</a><br />

  return json({
    ...issues
  });
};
