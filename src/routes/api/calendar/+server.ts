// import { MS_CLIENT_ID } from '$env/static/private';

// import { json, type RequestHandler } from '@sveltejs/kit';
// import msal from '@azure/msal-node';

// const storeToken = async () => {
//   const msalInstance = new msal.PublicClientApplication({ auth: { clientId: MS_CLIENT_ID } });
//   const request = {
//     scopes: ['offline_access', 'Calendars.Read', 'Calendars.Read.Shared', 'Calendars.ReadBasic'],
//     account: await msalInstance.getAllAccounts()[0]
//   };
//   await msalInstance.initialize();
//   try {
//     localStorage.setItem('msal-token', JSON.stringify(await msalInstance.acquireTokenSilent(request)));
//   } catch (e) {
//     if (e instanceof InteractionRequiredAuthError || e instanceof BrowserAuthError) {
//       localStorage.setItem('msal-token', JSON.stringify(await msalInstance.acquireTokenPopup(request)));
//     } else {
//       console.error(e);
//     }
//   }
// };

// const getCalendar = async (attempts = 1) => {
//   if (attempts === 0) {
//     return;
//   }

//   try {
//     const todayStart = encodeURIComponent(formatISO(startOfDay(new Date())));
//     const tomorrowEnd = encodeURIComponent(formatISO(addDays(endOfDay(new Date()), 1)));
//     const res = await fetch(
//       `https://graph.microsoft.com/v1.0/me/calendars/${config.MS_CALENDAR_ID}/calendarview?startdatetime=${todayStart}&enddatetime=${tomorrowEnd}`,
//       {
//         headers: {
//           Authorization: 'Bearer ' + getMsalToken()?.accessToken,
//           'outlook.timezone': 'AEST'
//         }
//       }
//     );
//     const meetingInProgress = res.data.value.find((res) =>
//       isWithinInterval(new Date(), {
//         start: new Date(res.start.dateTime),
//         end: new Date(res.end.dateTime)
//       })
//     );
//     if (meetingInProgress) {
//       return void setNextMeeting({ ...meetingInProgress, inProgress: true });
//     }
//     const nextMeeting = _orderBy(res.data.value, 'start.dateTime').find((event) =>
//       isFuture(new Date(event.start.dateTime))
//     );
//     setNextMeeting(nextMeeting || null);
//   } catch {
//     await storeToken();
//     return getCalendar(attempts - 1);
//   }
// };

// export const GET: RequestHandler = async ({ setHeaders }) => {
//   setHeaders({
//     'cache-control': 'max-age=60'
//   });

//   return json({});
// };
